/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  tokens: AuthTokens;
  user: User;
};

export type AuthTokens = {
  __typename?: 'AuthTokens';
  access: Scalars['String'];
  refresh: Scalars['String'];
};

export type Campaign = {
  __typename?: 'Campaign';
  campaignNodes: Array<CampaignNode>;
  description?: Maybe<Scalars['String']>;
  gms: Array<User>;
  id: Scalars['ID'];
  notes: Array<Scalars['String']>;
  owner: User;
  players: Array<User>;
  title: Scalars['String'];
};

export type CampaignInput = {
  description?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type CampaignNode = {
  __typename?: 'CampaignNode';
  campaign: Campaign;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  label: Scalars['String'];
  notes: Array<Scalars['String']>;
  position: Position;
  title: Scalars['String'];
  transitions: Array<Transition>;
  visited: Array<User>;
};

export type CampaignNodeInput = {
  description?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Array<Scalars['String']>>;
  position?: InputMaybe<PositionInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  campaignChangeOwner: Campaign;
  campaignCreate: Campaign;
  campaignDelete: Campaign;
  campaignNodeCreate: CampaignNode;
  campaignNodeDelete: CampaignNode;
  campaignNodeUpdate: CampaignNode;
  campaignRegisterUser: Campaign;
  campaignRemoveUser: Campaign;
  campaignUpdate: Campaign;
  login: AuthResponse;
  refresh: AuthResponse;
  transitionCreate: Transition;
  transitionDelete: Transition;
  transitionUpdate: Transition;
  userRegister: User;
};


export type MutationCampaignChangeOwnerArgs = {
  id: Scalars['ID'];
  newOwner: Scalars['ID'];
};


export type MutationCampaignCreateArgs = {
  input?: InputMaybe<CampaignInput>;
  userId: Scalars['ID'];
};


export type MutationCampaignDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationCampaignNodeCreateArgs = {
  campaignId: Scalars['ID'];
  input?: InputMaybe<CampaignNodeInput>;
};


export type MutationCampaignNodeDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationCampaignNodeUpdateArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<CampaignNodeInput>;
};


export type MutationCampaignRegisterUserArgs = {
  id: Scalars['ID'];
  playerType: PlayerType;
  userId: Scalars['ID'];
};


export type MutationCampaignRemoveUserArgs = {
  id: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationCampaignUpdateArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<CampaignInput>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationTransitionCreateArgs = {
  input?: InputMaybe<TransitionInput>;
};


export type MutationTransitionDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationTransitionUpdateArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<TransitionInput>;
};


export type MutationUserRegisterArgs = {
  input: NewUserInput;
};

export type NewUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export enum PlayerType {
  Gm = 'GM',
  Player = 'PLAYER'
}

export type Position = {
  __typename?: 'Position';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type PositionInput = {
  x?: InputMaybe<Scalars['Float']>;
  y?: InputMaybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  campaign: Campaign;
  me: User;
  user: User;
};


export type QueryCampaignArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Transition = {
  __typename?: 'Transition';
  description?: Maybe<Scalars['String']>;
  from: CampaignNode;
  id: Scalars['ID'];
  title: Scalars['String'];
  to: CampaignNode;
  transitionType: Array<TransitionType>;
};

export type TransitionInput = {
  description?: InputMaybe<Scalars['String']>;
  fromNode?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  toNode?: InputMaybe<Scalars['ID']>;
  transitionType?: InputMaybe<Array<TransitionType>>;
};

export enum TransitionType {
  Clue = 'CLUE',
  Geographic = 'GEOGRAPHIC',
  Hybrid = 'HYBRID',
  Playerdriven = 'PLAYERDRIVEN',
  Proactively = 'PROACTIVELY',
  Randomly = 'RANDOMLY',
  Temporal = 'TEMPORAL'
}

export type User = {
  __typename?: 'User';
  campaigns: Array<Campaign>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'AuthResponse', tokens: { __typename?: 'AuthTokens', access: string, refresh: string }, user: { __typename: 'User', id: string, email: string, name: string } } };

export type RefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMutation = { __typename?: 'Mutation', refresh: { __typename: 'AuthResponse', tokens: { __typename?: 'AuthTokens', access: string, refresh: string }, user: { __typename: 'User', id: string, email: string, name: string } } };

export type UpdateCampaignNodeMutationVariables = Exact<{
  id: Scalars['ID'];
  input: CampaignNodeInput;
}>;


export type UpdateCampaignNodeMutation = { __typename?: 'Mutation', campaignNodeUpdate: { __typename: 'CampaignNode', id: string, title: string, description?: string | null, label: string, notes: Array<string>, position: { __typename?: 'Position', x: number, y: number } } };

export type CampaignQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CampaignQuery = { __typename?: 'Query', campaign: { __typename: 'Campaign', id: string, title: string, description?: string | null, owner: { __typename: 'User', id: string, name: string }, campaignNodes: Array<{ __typename: 'CampaignNode', id: string, title: string, description?: string | null, position: { __typename?: 'Position', x: number, y: number }, transitions: Array<{ __typename?: 'Transition', to: { __typename?: 'CampaignNode', id: string }, from: { __typename?: 'CampaignNode', id: string } }> }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename: 'User', id: string, name: string, email: string, campaigns: Array<{ __typename: 'Campaign', id: string, title: string, description?: string | null }> } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"refresh"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RefreshDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"refresh"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<RefreshMutation, RefreshMutationVariables>;
export const UpdateCampaignNodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCampaignNode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CampaignNodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaignNodeUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCampaignNodeMutation, UpdateCampaignNodeMutationVariables>;
export const CampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"campaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"campaignNodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transitions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CampaignQuery, CampaignQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;