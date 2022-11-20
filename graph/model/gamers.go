package model

import (
	"context"
	"github.com/uptrace/bun"
)

type Gamer struct {
	UserId string `bun:"user_id,type:uuid,pk"`
	User   *User  `json:"user" bun:"rel:belongs-to,join:user_id=id"`

	CampaignId string    `bun:"campaign_id,type:uuid,pk"`
	Campaign   *Campaign `json:"campaign" bun:"rel:belongs-to,join:campaign_id=id"`

	Role PlayerType `bun:"role,type:gamer_role,notnull"`
}

func (gamer *Gamer) InsertGamer(ctx context.Context, db *bun.DB) (err error) {
	_, err = db.NewInsert().Model(gamer).Exec(ctx)
	return
}

func (gamer *Gamer) DeleteGamer(ctx context.Context, db *bun.DB) (err error) {
	_, err = db.NewDelete().Model(gamer).Exec(ctx)
	return
}
