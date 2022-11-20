package migrations

import (
	"context"
	"fmt"
	"github.com/uptrace/bun"
	model2 "nodeBasedPlanner/graph/model"
)

func init() {
	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [up migration] ")

		_, err := db.ExecContext(ctx, "CREATE TYPE gamer_role AS ENUM ('"+string(model2.PlayerTypeGm)+"', '"+string(model2.PlayerTypePlayer)+"')")
		if err != nil {
			return err
		}

		_, err = db.
			NewCreateTable().
			Model((*model2.Gamer)(nil)).
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
			Model((*model2.Gamer)(nil)).
			Exec(ctx)

		db.ExecContext(ctx, "DROP TYPE gamer_role")

		return nil
	})
}
