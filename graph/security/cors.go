package security

import (
	"github.com/rs/cors"
	"net/http"
)

func CorsConfiguration() func(h http.Handler) http.Handler {
	return cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
		Debug:            true,
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
	}).Handler
}
