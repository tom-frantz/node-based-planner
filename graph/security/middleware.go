package security

import (
	"context"
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v4"
	"github.com/uptrace/bun"
	"net/http"
	"nodeBasedPlanner/graph/model"
	"strings"
)

// A private key for context that only this package can access. This is important
// to prevent collisions between different context uses
var userCtxKey = &contextKey{"user"}

type contextKey struct {
	name string
}

// GetUserFromJwtMiddleware decodes the share session cookie and packs the session into context
func GetUserFromJwtMiddleware(db *bun.DB) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header, found := r.Header["Authorization"]

			// Allow unauthenticated users in
			if found == false || header == nil {
				next.ServeHTTP(w, r)
				return
			}

			tokenStr := header[0]

			if len(tokenStr) == 0 {
				next.ServeHTTP(w, r)
				return
			}

			// If there is *something* in the authorization header, we assume someone's trying to use a token
			if !strings.HasPrefix(tokenStr, "Bearer ") {
				http.Error(w, "Invalid JWT", http.StatusUnauthorized)
				return
			}
			tokenStr = strings.TrimPrefix(tokenStr, "Bearer ")

			// Parse JWT
			parsedToken, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
				return []byte(JwtSecret()), nil
			})

			if parsedToken.Valid {
				fmt.Println("You look nice today")
			} else if errors.Is(err, jwt.ErrTokenMalformed) {
				fmt.Println("That's not even a token")
			} else if errors.Is(err, jwt.ErrTokenExpired) || errors.Is(err, jwt.ErrTokenNotValidYet) {
				// Token is either expired or not active yet
				fmt.Println("Timing is everything")
			} else {
				fmt.Println("Couldn't handle this token:", err)
			}

			if err != nil {
				println(err.Error())
				http.Error(w, "Invalid JWT", http.StatusUnauthorized)
				return
			}

			claims := parsedToken.Claims.(jwt.MapClaims)
			id := claims["sub"].(string)
			println("id", id)

			// Fetch the user from the database
			user := &model.User{ID: id}
			ctx := r.Context()
			err = db.NewSelect().Model(user).WherePK().Scan(ctx)
			println("user", user.ID, user.Email)

			// Handle if the user doesn't exist anymore
			if err != nil {
				http.Error(w, "Invalid JWT", http.StatusUnauthorized)
				return
			}

			// Store the user in the context; to be used elsewhere.
			ctx = context.WithValue(ctx, userCtxKey, user)

			// and call the next with our new context
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

// UserForContext finds the user from the context. REQUIRES GetUserFromJwtMiddleware to have run.
func UserForContext(ctx context.Context) *model.User {
	raw, _ := ctx.Value(userCtxKey).(*model.User)
	return raw
}
