import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { RefreshDocument } from "../generated/graphql";
import {
    ACCESS_TOKEN_KEY,
    clearAllTokens,
    getAccessToken,
    getRefreshToken,
    REFRESH_TOKEN_KEY,
} from "../auth/tokens";
import { REFRESH_MUTATION_NAME } from "./mutations/auth";

let server = "http://localhost:8080";
let endpoint = `query`;

let uri = `${server}/${endpoint}`;
const httpLink = createHttpLink({
    uri,
});

export const authLink = setContext((req, { headers }) => {
    // @ts-ignore
    if (req?.query?.definitions?.[0]?.name?.value == REFRESH_MUTATION_NAME) {
        const refreshToken = getRefreshToken();
        return {
            headers: {
                ...headers,
                authorization: refreshToken ? `Bearer ${refreshToken}` : "",
            },
        };
    }

    // get the authentication token from local storage if it exists
    // then return the headers to the context so httpLink can read them
    const accessToken = getAccessToken();
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
    };
});

const logoutLink = onError(({ operation, forward, networkError }) => {
    // @ts-ignore
    if (networkError?.statusCode === 401) {
        const refreshToken = getRefreshToken();

        if (refreshToken === undefined) {
            clearAllTokens();
            return;
        }

        return new Observable((observer) => {
            client
                .mutate({
                    mutation: RefreshDocument,
                })
                .then((res) => {
                    if (res.data?.refresh.tokens === undefined) {
                        return;
                    }

                    let { access, refresh } = res.data?.refresh.tokens;
                    access = JSON.stringify(access);
                    refresh = JSON.stringify(refresh);

                    if (localStorage.getItem(REFRESH_TOKEN_KEY) != null) {
                        localStorage.setItem(ACCESS_TOKEN_KEY, access);
                        localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
                    }
                    sessionStorage.setItem(ACCESS_TOKEN_KEY, access);
                    sessionStorage.setItem(REFRESH_TOKEN_KEY, refresh);

                    const subscriber = {
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    };

                    // Retry last failed request
                    forward(operation).subscribe(subscriber);
                })
                .catch((e) => {
                    clearAllTokens();
                });
        });
    }
});

const client = new ApolloClient({
    link: logoutLink.concat(authLink).concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
