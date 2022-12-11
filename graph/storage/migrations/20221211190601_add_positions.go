package migrations

import (
	"context"
	"fmt"
	"github.com/uptrace/bun"
)

func init() {
	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [up migration] ")

		db.ExecContext(ctx, "alter table campaign_nodes add column position_x int NOT NULL default 0")
		db.ExecContext(ctx, "alter table campaign_nodes add column position_y int NOT NULL default 0")

		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [down migration] ")

		db.ExecContext(ctx, "alter table campaign_nodes drop column position_x")
		db.ExecContext(ctx, "alter table campaign_nodes drop column position_y")

		return nil
	})
}
