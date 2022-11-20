package database

import (
	"database/sql"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

func BunDb(password string) (db *bun.DB) {
	dsn := "postgres://postgres:" + password + "@localhost:5432/node_based_planner?sslmode=disable"
	pgdb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))

	db = bun.NewDB(pgdb, pgdialect.New())
	return
}
