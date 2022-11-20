package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"nodeBasedPlanner/generated"
	"nodeBasedPlanner/graph/model"
	databaseModel "nodeBasedPlanner/storage/model"

	"github.com/uptrace/bun"
)

// Campaign is the resolver for the campaign field.
func (r *campaignNodeResolver) Campaign(ctx context.Context, obj *model.CampaignNode) (*model.Campaign, error) {
	campaign := &model.Campaign{ID: obj.CampaignId}
	err := (&databaseModel.SimpleModel{Model: campaign}).SelectByPk(ctx, r.Db)

	if err != nil {
		return nil, err
	}
	return campaign, nil
}

// Transitions is the resolver for the transitions field.
func (r *campaignNodeResolver) Transitions(ctx context.Context, obj *model.CampaignNode) ([]*model.Transition, error) {
	var transitions []*model.Transition
	err := r.Db.
		NewSelect().
		Model(&transitions).
		Where("? = ?", bun.Ident("from_id"), obj.ID).
		WhereOr("? = ?", bun.Ident("to_id"), obj.ID).Scan(ctx)

	if err != nil {
		return nil, err
	}
	return transitions, nil
}

// CampaignNode returns generated.CampaignNodeResolver implementation.
func (r *Resolver) CampaignNode() generated.CampaignNodeResolver { return &campaignNodeResolver{r} }

type campaignNodeResolver struct{ *Resolver }
