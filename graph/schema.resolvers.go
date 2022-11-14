package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"github.com/uptrace/bun"
	"nodeBasedPlanner/auth"
	"nodeBasedPlanner/graph/generated"
	"nodeBasedPlanner/graph/model"
	databaseModel "nodeBasedPlanner/storage/model"
)

// CampaignNodes is the resolver for the campaignNodes field.
func (r *campaignResolver) CampaignNodes(ctx context.Context, obj *model.Campaign) ([]*model.CampaignNode, error) {
	panic(fmt.Errorf("not implemented: CampaignNodes - campaignNodes"))
}

// Gms is the resolver for the gms field.
func (r *campaignResolver) Gms(ctx context.Context, obj *model.Campaign) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented: Gms - gms"))
}

// Players is the resolver for the players field.
func (r *campaignResolver) Players(ctx context.Context, obj *model.Campaign) ([]*model.User, error) {
	playersInCampaign := r.Db.
		NewSelect().
		Model((*databaseModel.Gamer)(nil)).
		Column("user_id").
		WhereGroup("AND", func(q *bun.SelectQuery) *bun.SelectQuery {
			return q.Where("? = ?", bun.Ident("campaign_id"), obj.ID)
		}).
		WhereGroup("AND", func(q *bun.SelectQuery) *bun.SelectQuery {
			return q.Where("? = ?", bun.Ident("role"), "player")
		})

	var users []*model.User

	err := r.Db.
		NewSelect().
		Model(&users).
		Where("? IN (?)", bun.Ident("id"), playersInCampaign).
		Scan(ctx)

	if err != nil {
		return nil, err
	}

	return users, nil
}

// CampaignNodeCreate is the resolver for the campaignNodeCreate field.
func (r *mutationResolver) CampaignNodeCreate(ctx context.Context, input model.NewCampaignNode) (*model.CampaignNode, error) {
	panic(fmt.Errorf("not implemented: CampaignNodeCreate - campaignNodeCreate"))
}

// UserRegister is the resolver for the userRegister field.
func (r *mutationResolver) UserRegister(ctx context.Context, input model.NewUserInput) (*model.User, error) {
	panic(fmt.Errorf("not implemented: UserRegister - userRegister"))
}

// Campaign is the resolver for the campaign field.
func (r *queryResolver) Campaign(ctx context.Context, id string) (*model.Campaign, error) {
	panic(fmt.Errorf("not implemented: Campaign - campaign"))
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	user := new(model.User)
	err := r.Db.NewSelect().Model(user).Where("id = ?", id).Scan(ctx)

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
	user := new(model.User)

	err := r.Db.
		NewSelect().
		Model(user).
		Where("? = ?", bun.Ident("email"), email).
		Where("password = crypt(?, password)", password).
		Scan(ctx)

	if err != nil {
		// TODO log it here
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

// Campaigns is the resolver for the campaigns field.
func (r *userResolver) Campaigns(ctx context.Context, obj *model.User) ([]*model.Campaign, error) {
	gamerCampaigns := r.Db.
		NewSelect().
		Model((*databaseModel.Gamer)(nil)).
		Column("campaign_id").
		Where("? = ?", bun.Ident("user_id"), obj.ID)

	var campaigns []*model.Campaign

	err := r.Db.
		NewSelect().
		Model(&campaigns).
		Where("? IN (?)", bun.Ident("id"), gamerCampaigns).
		WhereOr("? = ?", bun.Ident("owner_id"), obj.ID).
		Scan(ctx)

	if err != nil {
		println(err.Error())
		return nil, err
	}

	return campaigns, nil
}

// Campaign returns generated.CampaignResolver implementation.
func (r *Resolver) Campaign() generated.CampaignResolver { return &campaignResolver{r} }

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type campaignResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
