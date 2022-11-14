package model

import graphModels "nodeBasedPlanner/graph/model"

type Gamer struct {
	UserId string            `bun:"user_id,type:uuid,pk"`
	User   *graphModels.User `json:"user" bun:"rel:belongs-to,join:user_id=id"`

	CampaignId string                `bun:"campaign_id,type:uuid,pk"`
	Campaign   *graphModels.Campaign `json:"campaign" bun:"rel:belongs-to,join:campaign_id=id"`

	Role string `bun:"role,type:gamer_role,notnull"`
}
