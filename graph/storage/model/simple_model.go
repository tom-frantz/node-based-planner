package model

import (
	"context"
	"github.com/uptrace/bun"
)

type Updatable interface {
	ApplyInput(simpleInput interface{}, ctx context.Context, query *bun.UpdateQuery) error
	CreateFromInput(simpleInput interface{}, ctx context.Context, query *bun.InsertQuery) error
}

type SimpleModel struct {
	Model Updatable
}

func (simpleModel *SimpleModel) Create(input interface{}, ctx context.Context, db *bun.DB) (err error) {
	query := db.
		NewInsert().
		Model(simpleModel.Model)

	err = simpleModel.Model.CreateFromInput(input, ctx, query)
	if err != nil {
		return err
	}

	_, err = query.
		Exec(ctx)
	return
}

func (simpleModel *SimpleModel) SelectByPk(ctx context.Context, db *bun.DB) (err error) {
	err = db.NewSelect().Model(simpleModel.Model).WherePK().Scan(ctx)
	return
}

func (simpleModel *SimpleModel) Update(input interface{}, ctx context.Context, db *bun.DB) (err error) {
	model := simpleModel.Model
	query := db.NewUpdate().Model(model).WherePK()

	err = model.ApplyInput(input, ctx, query)
	if err != nil {
		return err
	}

	_, err = query.OmitZero().Returning("*").Exec(ctx)
	return
}

func (simpleModel *SimpleModel) Delete(ctx context.Context, db *bun.DB) (err error) {
	_, err = db.NewDelete().Model(simpleModel.Model).WherePK().Exec(ctx)
	return
}
