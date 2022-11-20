package model

import (
	"context"
	"fmt"
	"github.com/99designs/gqlgen/graphql"
	"github.com/uptrace/bun"
)

type Campaign struct {
	ID string `json:"id" bun:"id,pk,type:uuid,default:gen_random_uuid()"`

	CampaignNodes []*CampaignNode `json:"campaignNodes" bun:"rel:has-many,join:id=campaign_id"`

	OwnerId string `bun:"owner_id,type:uuid"`
	Owner   *User  `json:"owner" bun:"rel:belongs-to,join:owner_id=id"`

	Title       string  `json:"title" bun:"title,notnull"`
	Description *string `json:"description" bun:"description"`

	Gms     []*User `json:"gms" bun:"-"`
	Players []*User `json:"players" bun:"-"`

	Notes []string `json:"notes" bun:"notes,array"`
}

type CampaignCreateInput struct {
	UserId string
	Input  *CampaignInput
}

func (campaign *Campaign) CreateFromInput(simpleInput interface{}, ctx context.Context, query *bun.InsertQuery) (error error) {
	createInput := simpleInput.(*CampaignCreateInput)
	input := createInput.Input
	userId := createInput.UserId

	if input.Title == nil || *input.Title == "" {
		graphql.AddErrorf(ctx, "'title' is a required field, but was not set")
	}

	errors := graphql.GetErrors(ctx)
	if len(errors) > 0 {
		return fmt.Errorf("input validation error")
	}

	campaign.Title = *input.Title
	campaign.OwnerId = userId
	campaign.Description = input.Description
	campaign.Notes = input.Notes

	return
}

func (campaign *Campaign) ApplyInput(simpleInput interface{}, ctx context.Context, query *bun.UpdateQuery) error {
	input := simpleInput.(*CampaignInput)

	if input.Title != nil && *input.Title != "" {
		println("Updating Title ... ", input.Title)
		campaign.Title = *input.Title
	} else {
		query.ExcludeColumn("title")
	}

	if input.Notes != nil {
		println("Updating notes ...")
		campaign.Notes = input.Notes
	}

	if input.Description != nil {
		campaign.Description = input.Description
	}

	return nil
}
