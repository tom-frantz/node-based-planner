package model

import (
	"context"
	"github.com/uptrace/bun"
)

type User struct {
	bun.BaseModel `bun:"table:users,alias:u"`

	ID    string `json:"id" bun:"id,pk,type:uuid,default:gen_random_uuid(),notnull"`
	Email string `json:"email" bun:"email,unique,notnull"`
	Name  string `json:"name" bun:"name,notnull"`

	// DB Fields for internal application things.
	Password string `bun:"password,notnull"`

	Campaigns []*Campaign `json:"campaigns" bun:"-"`
}

func (user *User) CreateUser(ctx context.Context, db *bun.DB) error {
	user.ID = ""

	_, err := db.
		NewInsert().
		Model(user).
		Value("password", "crypt(?, gen_salt('bf'))", user.Password).
		Exec(ctx)

	if err != nil {
		return err
	}

	return nil
}

func (user *User) DeleteUser(ctx context.Context, db *bun.DB) error {

	_, err := db.
		NewDelete().
		Model(user).
		Exec(ctx)

	if err != nil {
		return err
	}

	return nil
}
