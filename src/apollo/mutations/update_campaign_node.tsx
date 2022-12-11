import {gql} from "graphql-tag";

export const UPDATE_CAMPAIGN_NODE = gql`
    mutation updateCampaignNode($id: ID!, $input: CampaignNodeInput!) {
        campaignNodeUpdate(id: $id, input: $input) {
            __typename
            id
            
            title
            description
            
            label
            notes
            
            position {
                x
                y
            }
        }
    }
`