package migrations

import (
	"context"
	"fmt"
	"github.com/uptrace/bun"
)

func init() {
	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [up migration] ")

		db.ExecContext(ctx, "alter table transitions alter column transition_type type character varying[] using transition_type::character varying[];")

		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Print(" [down migration] ")

		db.ExecContext(ctx, "alter table transitions alter column transition_type type varchar using transition_type::varchar")

		return nil
	})
}
