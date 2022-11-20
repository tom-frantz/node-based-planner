package migrations

import (
	"context"
	"fmt"
	"github.com/uptrace/bun"
	"nodeBasedPlanner/graph/model"
)

func init() {
	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [up migration ] ")

		_, err := db.
			NewCreateTable().
			Model((*model.Campaign)(nil)).
			WithForeignKeys().
			Exec(ctx)
		if err != nil {
			return err
		}

		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [down migration] ")

		db.
			NewDropTable().
			Model((*model.Campaign)(nil)).
			Exec(ctx)

		return nil
	})
}
