package resolvers

import (
	"github.com/uptrace/bun"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	Db *bun.DB
}

func NewResolver(db *bun.DB) *Resolver {
	resolver := Resolver{
		Db: db,
	}
	return &resolver
}
