package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"nodeBasedPlanner/generated"
	"nodeBasedPlanner/graph/model"
)

// CampaignCreate is the resolver for the campaignCreate field.
func (r *mutationResolver) CampaignCreate(ctx context.Context, input *model.CampaignInput) (*model.Campaign, error) {
	panic(fmt.Errorf("not implemented: CampaignCreate - campaignCreate"))
}

// CampaignUpdate is the resolver for the campaignUpdate field.
func (r *mutationResolver) CampaignUpdate(ctx context.Context, id string, input *model.CampaignInput) (*model.Campaign, error) {
	panic(fmt.Errorf("not implemented: CampaignUpdate - campaignUpdate"))
}

// CampaignDelete is the resolver for the campaignDelete field.
func (r *mutationResolver) CampaignDelete(ctx context.Context, id string) (*model.Campaign, error) {
	panic(fmt.Errorf("not implemented: CampaignDelete - campaignDelete"))
}

// CampaignRegisterUser is the resolver for the campaignRegisterUser field.
func (r *mutationResolver) CampaignRegisterUser(ctx context.Context, id string, userID string, playerType model.PlayerType) (*model.Campaign, error) {
	panic(fmt.Errorf("not implemented: CampaignRegisterUser - campaignRegisterUser"))
}

// CampaignRemoveUser is the resolver for the campaignRemoveUser field.
func (r *mutationResolver) CampaignRemoveUser(ctx context.Context, id string, userID string) (*model.Campaign, error) {
	panic(fmt.Errorf("not implemented: CampaignRemoveUser - campaignRemoveUser"))
}

// CampaignChangeOwner is the resolver for the campaignChangeOwner field.
func (r *mutationResolver) CampaignChangeOwner(ctx context.Context, id string, newOwner string) (*model.Campaign, error) {
	panic(fmt.Errorf("not implemented: CampaignChangeOwner - campaignChangeOwner"))
}

// CampaignNodeCreate is the resolver for the campaignNodeCreate field.
func (r *mutationResolver) CampaignNodeCreate(ctx context.Context, input *model.CampaignNodeInput) (*model.CampaignNode, error) {
	panic(fmt.Errorf("not implemented: CampaignNodeCreate - campaignNodeCreate"))
}

// CampaignNodeUpdate is the resolver for the campaignNodeUpdate field.
func (r *mutationResolver) CampaignNodeUpdate(ctx context.Context, id string, input *model.CampaignNodeInput) (*model.CampaignNode, error) {
	panic(fmt.Errorf("not implemented: CampaignNodeUpdate - campaignNodeUpdate"))
}

// CampaignNodeDelete is the resolver for the campaignNodeDelete field.
func (r *mutationResolver) CampaignNodeDelete(ctx context.Context, id string) (*model.CampaignNode, error) {
	panic(fmt.Errorf("not implemented: CampaignNodeDelete - campaignNodeDelete"))
}

// TransitionCreate is the resolver for the transitionCreate field.
func (r *mutationResolver) TransitionCreate(ctx context.Context, input *model.TransitionInput) (*model.Transition, error) {
	panic(fmt.Errorf("not implemented: TransitionCreate - transitionCreate"))
}

// TransitionUpdate is the resolver for the transitionUpdate field.
func (r *mutationResolver) TransitionUpdate(ctx context.Context, id string, input *model.TransitionInput) (*model.Transition, error) {
	panic(fmt.Errorf("not implemented: TransitionUpdate - transitionUpdate"))
}

// TransitionDelete is the resolver for the transitionDelete field.
func (r *mutationResolver) TransitionDelete(ctx context.Context, id string) (*model.Transition, error) {
	panic(fmt.Errorf("not implemented: TransitionDelete - transitionDelete"))
}

// UserRegister is the resolver for the userRegister field.
func (r *mutationResolver) UserRegister(ctx context.Context, input model.NewUserInput) (*model.User, error) {
	user := model.User{
		Email:    input.Email,
		Name:     input.Username,
		Password: input.Password,
	}

	if err := user.CreateUser(ctx, r.Db); err != nil {
		return nil, err
	}

	return &user, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
