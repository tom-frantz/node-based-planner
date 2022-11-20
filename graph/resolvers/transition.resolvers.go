package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"nodeBasedPlanner/generated"
	"nodeBasedPlanner/graph/model"
)

// From is the resolver for the from field.
func (r *transitionResolver) From(ctx context.Context, obj *model.Transition) (*model.CampaignNode, error) {
	panic(fmt.Errorf("not implemented: From - from"))
}

// To is the resolver for the to field.
func (r *transitionResolver) To(ctx context.Context, obj *model.Transition) (*model.CampaignNode, error) {
	panic(fmt.Errorf("not implemented: To - to"))
}

// Transition returns generated.TransitionResolver implementation.
func (r *Resolver) Transition() generated.TransitionResolver { return &transitionResolver{r} }

type transitionResolver struct{ *Resolver }
