package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"nodeBasedPlanner/generated"
	"nodeBasedPlanner/graph/model"

	"github.com/uptrace/bun"
)

// Campaigns is the resolver for the campaigns field.
func (r *userResolver) Campaigns(ctx context.Context, obj *model.User) ([]*model.Campaign, error) {
	gamerCampaigns := r.Db.
		NewSelect().
		Model((*model.Gamer)(nil)).
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

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type userResolver struct{ *Resolver }
