package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"nodeBasedPlanner/generated"
	"nodeBasedPlanner/graph/model"
)

// Campaign is the resolver for the campaign field.
func (r *campaignNodeResolver) Campaign(ctx context.Context, obj *model.CampaignNode) (*model.Campaign, error) {
	panic(fmt.Errorf("not implemented: Campaign - campaign"))
}

// CampaignNode returns generated.CampaignNodeResolver implementation.
func (r *Resolver) CampaignNode() generated.CampaignNodeResolver { return &campaignNodeResolver{r} }

type campaignNodeResolver struct{ *Resolver }
