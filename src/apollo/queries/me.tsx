import gql from "graphql-tag";

const me = gql`
    query Me {
        me {
            id
            __typename

            name
            email

            campaigns {
                id
                __typename

                title
                description
            }
        }
    }
`;
