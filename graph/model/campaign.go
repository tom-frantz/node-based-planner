package model

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
