package database

import (
	"github.com/uptrace/bun"
	"nodeBasedPlanner/graph"
)

func NewResolver(db *bun.DB) *graph.Resolver {
	resolver := graph.Resolver{
		Db: db,
	}
	return &resolver
}
