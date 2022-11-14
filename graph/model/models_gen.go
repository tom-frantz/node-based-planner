// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"fmt"
	"io"
	"strconv"
)

type AuthTokens struct {
	Access  string `json:"access"`
	Refresh string `json:"refresh"`
}

type CampaignInput struct {
	Title       *string  `json:"title"`
	Description *string  `json:"description"`
	Notes       []string `json:"notes"`
}

type CampaignNodeInput struct {
	Title *string `json:"title"`
}

type NewUserInput struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type TransitionInput struct {
	Title          *string         `json:"title"`
	Description    *string         `json:"description"`
	FromNode       *string         `json:"fromNode"`
	ToNode         *string         `json:"toNode"`
	TransitionType *TransitionType `json:"transitionType"`
}

type PlayerType string

const (
	PlayerTypeGm     PlayerType = "Gm"
	PlayerTypePlayer PlayerType = "Player"
)

var AllPlayerType = []PlayerType{
	PlayerTypeGm,
	PlayerTypePlayer,
}

func (e PlayerType) IsValid() bool {
	switch e {
	case PlayerTypeGm, PlayerTypePlayer:
		return true
	}
	return false
}

func (e PlayerType) String() string {
	return string(e)
}

func (e *PlayerType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = PlayerType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid PlayerType", str)
	}
	return nil
}

func (e PlayerType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type TransitionType string

const (
	TransitionTypeClue         TransitionType = "Clue"
	TransitionTypeTemporal     TransitionType = "Temporal"
	TransitionTypeGeographic   TransitionType = "Geographic"
	TransitionTypeRandomly     TransitionType = "Randomly"
	TransitionTypeProactively  TransitionType = "Proactively"
	TransitionTypeHybrid       TransitionType = "Hybrid"
	TransitionTypePlayerDriven TransitionType = "PlayerDriven"
)

var AllTransitionType = []TransitionType{
	TransitionTypeClue,
	TransitionTypeTemporal,
	TransitionTypeGeographic,
	TransitionTypeRandomly,
	TransitionTypeProactively,
	TransitionTypeHybrid,
	TransitionTypePlayerDriven,
}

func (e TransitionType) IsValid() bool {
	switch e {
	case TransitionTypeClue, TransitionTypeTemporal, TransitionTypeGeographic, TransitionTypeRandomly, TransitionTypeProactively, TransitionTypeHybrid, TransitionTypePlayerDriven:
		return true
	}
	return false
}

func (e TransitionType) String() string {
	return string(e)
}

func (e *TransitionType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = TransitionType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid TransitionType", str)
	}
	return nil
}

func (e TransitionType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
