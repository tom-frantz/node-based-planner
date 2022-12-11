import gql from "graphql-tag";

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            tokens {
                access
                refresh
            }
            user {
                id
                __typename

                email
                name
            }
            __typename
        }
    }
`;

// Keep these two in sync please
export const REFRESH_MUTATION_NAME = "refresh";
export const REFRESH = gql`
    mutation refresh {
        refresh {
            tokens {
                access
                refresh
            }
            user {
                id
                __typename

                email
                name
            }
            __typename
        }
    }
`;

export default LOGIN;
