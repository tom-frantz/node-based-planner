package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	generated1 "nodeBasedPlanner/graph/generated"
	"nodeBasedPlanner/graph/model"
	"nodeBasedPlanner/graph/security"
	model2 "nodeBasedPlanner/graph/storage/model"

	"github.com/uptrace/bun"
)

// Me is the resolver for the me field.
func (r *queryResolver) Me(ctx context.Context) (*model.User, error) {
	user := security.UserForContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("oof")
	}

	return user, nil
}

// Campaign is the resolver for the campaign field.
func (r *queryResolver) Campaign(ctx context.Context, id string) (*model.Campaign, error) {
	campaign := &model.Campaign{ID: id}

	err := (&model2.SimpleModel{Model: campaign}).SelectByPk(ctx, r.Db)
	if err != nil {
		return nil, err
	}

	return campaign, nil
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

// Query returns generated1.QueryResolver implementation.
func (r *Resolver) Query() generated1.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
