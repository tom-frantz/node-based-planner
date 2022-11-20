package model

import (
	"context"
	"fmt"
	"github.com/99designs/gqlgen/graphql"
	"github.com/uptrace/bun"
)

type Transition struct {
	ID    string `json:"id" bun:"id,pk,type:uuid,default:gen_random_uuid(),notnull"`
	Title string `json:"title" bun:"title"`

	FromId string        `bun:"from_id,type:uuid,notnull"`
	From   *CampaignNode `json:"from" bun:"rel:belongs-to,join:from_id=id"`
	ToId   string        `bun:"to_id,type:uuid,notnull"`
	To     *CampaignNode `json:"to" bun:"rel:belongs-to,join:to_id=id"`

	TransitionType []TransitionType `json:"transitionType" bun:"transition_type,type:string,array"`
	Description    *string          `json:"description" bun:"description"`
}

func (transition *Transition) CreateFromInput(simpleInput interface{}, ctx context.Context, query *bun.InsertQuery) (err error) {
	input := simpleInput.(*TransitionInput)

	if input.FromNode == nil || *input.FromNode == "" {
		graphql.AddErrorf(ctx, "'fromNode' is a required field, but was not set")
	}

	if input.ToNode == nil || *input.ToNode == "" {
		graphql.AddErrorf(ctx, "'toNode' is a required field, but was not set")
	}

	if input.Title == nil || *input.Title == "" {
		graphql.AddErrorf(ctx, "'title' is a required field, but was not set")
	}

	errors := graphql.GetErrors(ctx)
	if len(errors) > 0 {
		return fmt.Errorf("input validation error")
	}

	transition.FromId = *input.FromNode
	transition.ToId = *input.ToNode
	transition.Title = *input.Title

	transition.TransitionType = input.TransitionType

	return
}

func (transition *Transition) ApplyInput(simpleInput interface{}, ctx context.Context, query *bun.UpdateQuery) (err error) {
	input := simpleInput.(*TransitionInput)

	if input.Title != nil && *input.Title != "" {
		transition.Title = *input.Title
	} else {
		query.ExcludeColumn("title")
	}

	if input.Description != nil {
		transition.Description = input.Description
	}
	if input.FromNode != nil {
		transition.FromId = *input.FromNode
	}
	if input.ToNode != nil {
		transition.ToId = *input.ToNode
	}
	if input.TransitionType != nil {
		transition.TransitionType = input.TransitionType
	} else {
		query.ExcludeColumn("transition_type")
	}

	return
}
