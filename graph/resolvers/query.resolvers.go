package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"nodeBasedPlanner/graph/auth"
	generated1 "nodeBasedPlanner/graph/generated"
	"nodeBasedPlanner/graph/model"

	"github.com/uptrace/bun"
)

// Campaign is the resolver for the campaign field.
func (r *queryResolver) Campaign(ctx context.Context, id string) (*model.Campaign, error) {
	panic(fmt.Errorf("not implemented: Campaign - campaign"))
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	user := new(model.User)
	err := r.Db.
		NewSelect().
		Model(user).
		Where("? = ?", bun.Ident("id"), id).
		Scan(ctx)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("no user with id '" + id + "' found")
		}

		return nil, err
	}

	return user, err
}

// Login is the resolver for the login field.
func (r *queryResolver) Login(ctx context.Context, email string, password string) (*model.AuthTokens, error) {
	user := &model.User{Password: password, Email: email}
	if err := user.UserByLogin(ctx, r.Db); err != nil {
		return nil, errors.New("invalid email or password")
	}

	authTokens, err := auth.NewTokens(user)
	if err != nil {
		return nil, err
	}

	return authTokens, nil
}

// Refresh is the resolver for the refresh field.
func (r *queryResolver) Refresh(ctx context.Context, refreshToken string) (*model.AuthTokens, error) {
	panic(fmt.Errorf("not implemented: Refresh - refresh"))
}

// Query returns generated1.QueryResolver implementation.
func (r *Resolver) Query() generated1.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
