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

func (user *User) UserByLogin(ctx context.Context, db *bun.DB) (err error) {
	err = db.
		NewSelect().
		Model(user).
		Where("? = ?", bun.Ident("email"), user.Email).
		Where("? = crypt(?, password)", bun.Ident("password"), user.Password).
		Scan(ctx)

	return
}

func (user *User) CreateUser(ctx context.Context, db *bun.DB) (err error) {
	user.ID = ""

	_, err = db.
		NewInsert().
		Model(user).
		Value("password", "crypt(?, gen_salt('bf'))", user.Password).
		Exec(ctx)

	return
}

func (user *User) DeleteUser(ctx context.Context, db *bun.DB) (err error) {
	_, err = db.
		NewDelete().
		Model(user).
		Exec(ctx)

	return
}
