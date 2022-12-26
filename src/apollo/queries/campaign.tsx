import gql from "graphql-tag";

const CAMPAIGN = gql`
    query campaign($id: ID!) {
        campaign(id: $id) {
            id
            __typename

            owner {
                id
                __typename

                name
            }

            title
            description
            campaignNodes {
                id
                __typename

                title
                description
                
                position {
                    x
                    y
                }
                width
                height

                transitions {
                    to {
                        id
                    }

                    from {
                        id
                    }
                }
            }
        }
    }
`;

export default CAMPAIGN;
