/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n    mutation login($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n            tokens {\n                access\n                refresh\n            }\n            user {\n                id\n                __typename\n\n                email\n                name\n            }\n            __typename\n        }\n    }\n": types.LoginDocument,
    "\n    mutation refresh {\n        refresh {\n            tokens {\n                access\n                refresh\n            }\n            user {\n                id\n                __typename\n\n                email\n                name\n            }\n            __typename\n        }\n    }\n": types.RefreshDocument,
    "\n    mutation updateCampaignNode($id: ID!, $input: CampaignNodeInput!) {\n        campaignNodeUpdate(id: $id, input: $input) {\n            __typename\n            id\n            \n            title\n            description\n            \n            label\n            notes\n            \n            position {\n                x\n                y\n            }\n        }\n    }\n": types.UpdateCampaignNodeDocument,
    "\n    query campaign($id: ID!) {\n        campaign(id: $id) {\n            id\n            __typename\n\n            owner {\n                id\n                __typename\n\n                name\n            }\n\n            title\n            description\n            campaignNodes {\n                id\n                __typename\n\n                title\n                description\n                \n                position {\n                    x\n                    y\n                }\n\n                transitions {\n                    to {\n                        id\n                    }\n\n                    from {\n                        id\n                    }\n                }\n            }\n        }\n    }\n": types.CampaignDocument,
    "\n    query Me {\n        me {\n            id\n            __typename\n\n            name\n            email\n\n            campaigns {\n                id\n                __typename\n\n                title\n                description\n            }\n        }\n    }\n": types.MeDocument,
};

export function gql(source: "\n    mutation login($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n            tokens {\n                access\n                refresh\n            }\n            user {\n                id\n                __typename\n\n                email\n                name\n            }\n            __typename\n        }\n    }\n"): (typeof documents)["\n    mutation login($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n            tokens {\n                access\n                refresh\n            }\n            user {\n                id\n                __typename\n\n                email\n                name\n            }\n            __typename\n        }\n    }\n"];
export function gql(source: "\n    mutation refresh {\n        refresh {\n            tokens {\n                access\n                refresh\n            }\n            user {\n                id\n                __typename\n\n                email\n                name\n            }\n            __typename\n        }\n    }\n"): (typeof documents)["\n    mutation refresh {\n        refresh {\n            tokens {\n                access\n                refresh\n            }\n            user {\n                id\n                __typename\n\n                email\n                name\n            }\n            __typename\n        }\n    }\n"];
export function gql(source: "\n    mutation updateCampaignNode($id: ID!, $input: CampaignNodeInput!) {\n        campaignNodeUpdate(id: $id, input: $input) {\n            __typename\n            id\n            \n            title\n            description\n            \n            label\n            notes\n            \n            position {\n                x\n                y\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation updateCampaignNode($id: ID!, $input: CampaignNodeInput!) {\n        campaignNodeUpdate(id: $id, input: $input) {\n            __typename\n            id\n            \n            title\n            description\n            \n            label\n            notes\n            \n            position {\n                x\n                y\n            }\n        }\n    }\n"];
export function gql(source: "\n    query campaign($id: ID!) {\n        campaign(id: $id) {\n            id\n            __typename\n\n            owner {\n                id\n                __typename\n\n                name\n            }\n\n            title\n            description\n            campaignNodes {\n                id\n                __typename\n\n                title\n                description\n                \n                position {\n                    x\n                    y\n                }\n\n                transitions {\n                    to {\n                        id\n                    }\n\n                    from {\n                        id\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query campaign($id: ID!) {\n        campaign(id: $id) {\n            id\n            __typename\n\n            owner {\n                id\n                __typename\n\n                name\n            }\n\n            title\n            description\n            campaignNodes {\n                id\n                __typename\n\n                title\n                description\n                \n                position {\n                    x\n                    y\n                }\n\n                transitions {\n                    to {\n                        id\n                    }\n\n                    from {\n                        id\n                    }\n                }\n            }\n        }\n    }\n"];
export function gql(source: "\n    query Me {\n        me {\n            id\n            __typename\n\n            name\n            email\n\n            campaigns {\n                id\n                __typename\n\n                title\n                description\n            }\n        }\n    }\n"): (typeof documents)["\n    query Me {\n        me {\n            id\n            __typename\n\n            name\n            email\n\n            campaigns {\n                id\n                __typename\n\n                title\n                description\n            }\n        }\n    }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;