package main

import (
	"github.com/uptrace/bun/extra/bundebug"
	"log"
	"net/http"
	"nodeBasedPlanner/graph/generated"
	database2 "nodeBasedPlanner/graph/storage/database"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/joho/godotenv"
)

const defaultPort = "8080"

func main() {
	if err := godotenv.Load(); err != nil {
		return
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	db := database2.BunDb(os.Getenv("DB_PW"))
	db.AddQueryHook(bundebug.NewQueryHook())

	graphResolver := database2.NewResolver(db)
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: graphResolver}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
