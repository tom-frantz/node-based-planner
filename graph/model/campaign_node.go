package model

import (
	"context"
	"fmt"
	"github.com/99designs/gqlgen/graphql"
	"github.com/uptrace/bun"
)

type CampaignNode struct {
	bun.BaseModel `bun:"table:campaign_nodes"`

	ID    string `json:"id" bun:"id,pk,type:uuid,default:gen_random_uuid(),notnull"`
	Title string `json:"title" bun:"title,notnull"`

	CampaignId string    `bun:"campaign_id,type:uuid,notnull"`
	Campaign   *Campaign `json:"campaign" bun:"rel:belongs-to,join:campaign_id=id"`

	// TODO
	Visited []*User `json:"visited" bun:"-"`
	// TODO
	Transitions []*Transition `json:"transitions" bun:"-"`

	Label       string   `json:"label" bun:"label,notnull"`
	Position    Position `json:"position" bun:"-"`
	PositionX   float64  `bun:"position_x,notnull,type:double precision"`
	PositionY   float64  `bun:"position_y,notnull,type:double precision"`
	Description *string  `json:"description" bun:"description"`
	Notes       []string `json:"notes" bun:"notes,array"`
}

type CampaignNodeCreateInput struct {
	CampaignId string
	Input      *CampaignNodeInput
}

func (campaignNode *CampaignNode) CreateFromInput(simpleInput interface{}, ctx context.Context, query *bun.InsertQuery) (err error) {
	createInput := simpleInput.(*CampaignNodeCreateInput)
	input := createInput.Input
	campaignId := createInput.CampaignId

	if input.Title == nil || *input.Title == "" {
		graphql.AddErrorf(ctx, "'title' is a required field, but was not set")
	}

	if input.Label == nil || *input.Label == "" {
		graphql.AddErrorf(ctx, "'label' is a required field, but was not set")
	}

	if input.Position.X == nil || input.Position.Y == nil {
		graphql.AddErrorf(ctx, "'position.X' and 'position.Y' are required fields, but was not set")
	}

	errors := graphql.GetErrors(ctx)
	if len(errors) > 0 {
		return fmt.Errorf("input validation error")
	}

	campaignNode.Title = *input.Title
	campaignNode.CampaignId = campaignId
	campaignNode.Label = *input.Label
	campaignNode.Description = input.Description
	campaignNode.Notes = input.Notes
	campaignNode.PositionX = *input.Position.X
	campaignNode.PositionY = *input.Position.Y

	return
}

func (campaignNode *CampaignNode) ApplyInput(simpleInput interface{}, ctx context.Context, query *bun.UpdateQuery) (err error) {
	input := simpleInput.(*CampaignNodeInput)

	if input.Title != nil && *input.Title != "" {
		campaignNode.Title = *input.Title
	} else {
		query.ExcludeColumn("title")
	}

	if input.Label != nil && *input.Label != "" {
		campaignNode.Label = *input.Label
	} else {
		query.ExcludeColumn("label")
	}

	if input.Notes != nil {
		println("Updating notes ...")
		campaignNode.Notes = input.Notes
	}

	if input.Description != nil {
		campaignNode.Description = input.Description
	}

	if input.Position.X != nil {
		campaignNode.PositionX = *input.Position.X
	}

	if input.Position.Y != nil {
		campaignNode.PositionY = *input.Position.Y
	}

	return
}
