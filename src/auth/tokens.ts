export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

const getToken = (tokenStorageKey: string) => {
    return (): string | undefined => {
        let token = sessionStorage.getItem(tokenStorageKey);
        if (token) {
            console.log("session token", tokenStorageKey, token);
            return JSON.parse(token);
        }

        token = localStorage.getItem(tokenStorageKey);
        if (token) {
            console.log("local storage token", tokenStorageKey, token);

            sessionStorage.setItem(tokenStorageKey, token);
            return JSON.parse(token);
        }

        return undefined;
    };
};

export const getAccessToken: () => string | undefined =
    getToken(ACCESS_TOKEN_KEY);
export const getRefreshToken: () => string | undefined =
    getToken(REFRESH_TOKEN_KEY);

export const clearAllTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};
