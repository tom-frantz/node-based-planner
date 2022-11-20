package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	generated1 "nodeBasedPlanner/graph/generated"
	"nodeBasedPlanner/graph/model"
	databaseModel "nodeBasedPlanner/graph/storage/model"
)

// From is the resolver for the from field.
func (r *transitionResolver) From(ctx context.Context, obj *model.Transition) (*model.CampaignNode, error) {
	campaignNode := &model.CampaignNode{ID: obj.FromId}
	err := (&databaseModel.SimpleModel{Model: campaignNode}).SelectByPk(ctx, r.Db)

	if err != nil {
		return nil, err
	}
	return campaignNode, nil
}

// To is the resolver for the to field.
func (r *transitionResolver) To(ctx context.Context, obj *model.Transition) (*model.CampaignNode, error) {
	campaignNode := &model.CampaignNode{ID: obj.ToId}
	err := (&databaseModel.SimpleModel{Model: campaignNode}).SelectByPk(ctx, r.Db)

	if err != nil {
		return nil, err
	}
	return campaignNode, nil
}

// Transition returns generated1.TransitionResolver implementation.
func (r *Resolver) Transition() generated1.TransitionResolver { return &transitionResolver{r} }

type transitionResolver struct{ *Resolver }
