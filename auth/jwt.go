package auth

import (
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"nodeBasedPlanner/graph/model"
	"os"
	"time"
)

const AccessTokenExpiry = time.Duration(time.Hour * 24)
const RefreshTokenExpiry = time.Duration(time.Hour * 24 * 60)

func NewAccessToken(user *model.User) (token *jwt.Token) {
	token = jwt.NewWithClaims(jwt.SigningMethodHS512, jwt.MapClaims{
		"iss": "nodeBasedPlannerApp",
		"aud": "nodeBasedPlannerApp",

		"sub": user.ID,

		"exp": time.Now().Add(AccessTokenExpiry).Unix(),
		"nbf": time.Now().Unix(),
		"iat": time.Now().Unix(),

		"jti": uuid.New(),
	})

	return
}

func NewRefreshToken(user *model.User) (token *jwt.Token) {
	token = jwt.NewWithClaims(jwt.SigningMethodHS512, jwt.MapClaims{
		"iss": "nodeBasedPlannerApp",
		"aud": "nodeBasedPlannerApp",

		"sub": user.ID,

		"exp": time.Now().Add(RefreshTokenExpiry).Unix(),
		"nbf": time.Now().Unix(),
		"iat": time.Now().Unix(),

		"jti": uuid.New(),
	})

	return
}

func SignToken(token *jwt.Token) (string, error) {
	signedString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}
	return signedString, nil
}

func NewTokens(user *model.User) (*model.AuthTokens, error) {
	accessClaims := NewAccessToken(user)
	accessToken, err := SignToken(accessClaims)
	if err != nil {
		return nil, err
	}

	refreshClaims := NewRefreshToken(user)
	refreshToken, err := SignToken(refreshClaims)
	if err != nil {
		return nil, err
	}

	authTokens := &model.AuthTokens{
		Access:  accessToken,
		Refresh: refreshToken,
	}
	return authTokens, nil
}
