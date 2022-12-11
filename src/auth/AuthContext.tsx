import React, {
    Context,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    ACCESS_TOKEN_KEY,
    clearAllTokens,
    REFRESH_TOKEN_KEY,
    Tokens,
} from "./tokens";
import { LoginDocument, LoginMutation, User } from "../generated/graphql";
import { ToastId, useToast } from "@chakra-ui/react";
import { FetchResult, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

interface AuthContextValues {
    tokens?: Tokens;
    user?: User;
    isLoggedIn: boolean;

    loginByTokens(
        tokens: Tokens,
        user: LoginMutation["login"]["user"],
        stayLoggedIn: boolean
    ): void;
    logout(): void;
}

const AuthContext: Context<AuthContextValues> = React.createContext({
    isLoggedIn: false as boolean,
    loginByTokens: (tokens: Tokens, user: LoginMutation["login"]["user"]) => {},
    logout: () => {},
} as AuthContextValues);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthProvider = (props: AuthContextProviderProps) => {
    const [storageAccessToken, setStorageAccessToken] = useLocalStorage<
        string | undefined
    >(ACCESS_TOKEN_KEY, undefined);
    const [storageRefreshToken, setStorageRefreshToken] = useLocalStorage<
        string | undefined
    >(REFRESH_TOKEN_KEY, undefined);

    const [accessToken, setAccessToken] = useSessionStorage<string | undefined>(
        ACCESS_TOKEN_KEY,
        undefined
    );
    const [refreshToken, setRefreshToken] = useSessionStorage<
        string | undefined
    >(REFRESH_TOKEN_KEY, undefined);

    return (
        <AuthContext.Provider
            value={{
                tokens:
                    accessToken && refreshToken
                        ? {
                              accessToken,
                              refreshToken,
                          }
                        : undefined,
                isLoggedIn: accessToken !== undefined,
                loginByTokens(
                    tokens: Tokens,
                    user: LoginMutation["login"]["user"],
                    stayLoggedIn: boolean
                ) {
                    if (stayLoggedIn) {
                        setStorageAccessToken(tokens?.accessToken);
                        setStorageRefreshToken(tokens?.refreshToken);
                    }

                    setAccessToken(tokens?.accessToken);
                    setRefreshToken(tokens?.refreshToken);
                },
                logout() {
                    clearAllTokens();
                },
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextValues => {
    return useContext(AuthContext);
};

export const useRedirectAuthenticated = (to?: string) => {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn && router) {
            router.push(to ?? "home");
        }
    }, [router, isLoggedIn]);
};

export const useRedirectUnauthenticated = (to?: string) => {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn && router) {
            router.push(to ?? "login");
        }
    }, [router, isLoggedIn]);
};
