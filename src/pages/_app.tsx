import "../styles/globals.css";

import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import { ApolloProvider } from "@apollo/client";
import client from "apollo/client";
import theme from "theme/theme";
import { AuthProvider } from "../auth/AuthContext";

import "@fontsource/della-respira";
import "@fontsource/megrim";
import "@fontsource/quattrocento";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ApolloProvider client={client}>
                <ChakraProvider theme={theme}>
                    <Component {...pageProps} />
                </ChakraProvider>
            </ApolloProvider>
        </AuthProvider>
    );
}
