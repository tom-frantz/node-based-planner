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

// CampaignNodes is the resolver for the campaignNodes field.
func (r *campaignResolver) CampaignNodes(ctx context.Context, obj *model.Campaign) ([]*model.CampaignNode, error) {
	var nodes []*model.CampaignNode
	err := r.Db.
		NewSelect().
		Model(&nodes).
		Where("? = ?", bun.Ident("campaign_id"), obj.ID).
		Scan(ctx)

	if err != nil {
		return nil, err
	}
	return nodes, nil
}

// Owner is the resolver for the owner field.
func (r *campaignResolver) Owner(ctx context.Context, obj *model.Campaign) (*model.User, error) {
	user := &model.User{ID: obj.OwnerId}
	_, err := r.Db.NewSelect().Model(user).WherePK().Exec(ctx)

	if err != nil {
		return nil, err
	}
	return user, nil
}

// Gms is the resolver for the gms field.
func (r *campaignResolver) Gms(ctx context.Context, obj *model.Campaign) ([]*model.User, error) {
	playersInCampaign := r.Db.
		NewSelect().
		Model((*databaseModel.Gamer)(nil)).
		Column("user_id").
		WhereGroup("AND", func(q *bun.SelectQuery) *bun.SelectQuery {
			return q.Where("? = ?", bun.Ident("campaign_id"), obj.ID)
		}).
		WhereGroup("AND", func(q *bun.SelectQuery) *bun.SelectQuery {
			return q.Where("? = ?", bun.Ident("role"), model.PlayerTypeGm)
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
			return q.Where("? = ?", bun.Ident("role"), model.PlayerTypePlayer)
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

// Campaign returns generated.CampaignResolver implementation.
func (r *Resolver) Campaign() generated.CampaignResolver { return &campaignResolver{r} }

type campaignResolver struct{ *Resolver }
