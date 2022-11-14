package model

type Transition struct {
	ID    string `json:"id" bun:"id,pk,type:uuid,default:gen_random_uuid(),notnull"`
	Title string `json:"title" bun:"title"`

	FromId string        `bun:"from_id,type:uuid,notnull"`
	From   *CampaignNode `json:"from" bun:"rel:belongs-to,join:from_id=id"`
	ToID   string        `bun:"to_id,type:uuid,notnull"`
	To     *CampaignNode `json:"to" bun:"rel:belongs-to,join:to_id=id"`

	TransitionType TransitionType `json:"transitionType" bun:"transition_type,"`
	Description    string         `json:"description" bun:"description"`
}
