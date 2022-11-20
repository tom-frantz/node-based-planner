package database

import (
	"github.com/uptrace/bun"
	"nodeBasedPlanner/graph/resolvers"
)

func NewResolver(db *bun.DB) *resolvers.Resolver {
	resolver := resolvers.Resolver{
		Db: db,
	}
	return &resolver
}
