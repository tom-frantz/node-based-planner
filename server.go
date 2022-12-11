package main

import (
	"context"
	"fmt"
	"github.com/99designs/gqlgen/graphql"
	"github.com/go-chi/chi/v5"
	"github.com/uptrace/bun/extra/bundebug"
	"log"
	"net/http"
	"nodeBasedPlanner/graph/generated"
	"nodeBasedPlanner/graph/resolvers"
	"nodeBasedPlanner/graph/security"
	database "nodeBasedPlanner/graph/storage/database"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/joho/godotenv"
)

const defaultPort = "8080"

func main() {
	// HOST PORT + ENV VARS
	if err := godotenv.Load(); err != nil {
		return
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// DB
	db := database.BunDb(os.Getenv("DB_PW"))
	db.AddQueryHook(bundebug.NewQueryHook())

	// ROUTER
	router := chi.NewRouter()

	// Router: Add CORS middleware around every request
	//See https://github.com/rs/cors for full option listing
	router.Use(security.CorsConfiguration())

	// Router: Inject security middleware here.
	router.Use(security.GetUserFromJwtMiddleware(db))

	graphResolver := resolvers.NewResolver(db)

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: graphResolver}))
	srv.AroundOperations(func(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
		oc := graphql.GetOperationContext(ctx)
		fmt.Printf("around: %s %s", oc.OperationName, oc.RawQuery)
		return next(ctx)
	})
	//srv.AddTransport(&transport.Websocket{
	//	Upgrader: websocket.Upgrader{
	//		CheckOrigin: func(r *http.Request) bool {
	//			// Check against your desired domains here
	//			return r.Host == "localhost" || r.Host == "tomfrantz.dev"
	//		},
	//		ReadBufferSize:  1024,
	//		WriteBufferSize: 1024,
	//	},
	//})

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
