package model

import "github.com/uptrace/bun"

type CampaignNode struct {
	bun.BaseModel `bun:"table:campaign_nodes"`

	ID    string `json:"id" bun:"id,pk,type:uuid,default:gen_random_uuid(),notnull"`
	Title string `json:"title" bun:"title,notnull"`

	CampaignId string    `bun:"campaign_id,type:uuid,notnull"`
	Campaign   *Campaign `json:"campaign" bun:"rel:belongs-to,join:campaign_id=id"`

	// TODO
	Visited []*User `json:"visited" bun:"-"`
	// TODO
	Transit []*Transition `json:"transit" bun:"-"`

	Label       string   `json:"label" bun:"label,notnull"`
	Description *string  `json:"description" bun:"description"`
	Notes       []string `json:"notes" bun:"notes,array"`
}
