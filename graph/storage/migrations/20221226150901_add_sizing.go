package migrations

import (
	"context"
	"fmt"
	"github.com/uptrace/bun"
)

func init() {
	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [up migration] ")

		db.ExecContext(ctx, "alter table campaign_nodes add column height double precision NOT NULL default 200")
		db.ExecContext(ctx, "alter table campaign_nodes add column width double precision NOT NULL default 200")

		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [down migration] ")

		db.ExecContext(ctx, "alter table campaign_nodes drop column height")
		db.ExecContext(ctx, "alter table campaign_nodes drop column width")

		return nil
	})
}
