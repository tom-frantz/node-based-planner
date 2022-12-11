import { useCallback, useEffect, useRef, useState } from "react";
import {
    Button,
    Center,
    Checkbox,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    LightMode,
    useToast,
    ToastId,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { LoginDocument } from "generated/graphql";
import { useAuth, useRedirectAuthenticated } from "../auth/AuthContext";

export interface LoginPageProps {}

const errorToastOptions = {
    title: "Error",
    description: "There was an error logging in.",
    status: "error" as const,
    duration: 9000,
    isClosable: true,
};

const LoginPage = (props: LoginPageProps) => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [stayLoggedIn, setStayLoggedIn] = useState(true);

    const { loginByTokens } = useAuth();

    const toast = useToast();
    const toastIdRef = useRef<ToastId>(null);

    const [login, { data, error, loading }] = useMutation(LoginDocument, {
        errorPolicy: "none",
        onError: (error, _clientOptions) => {
            if (toastIdRef.current) {
                toast.close(toastIdRef.current);
            }
            // @ts-ignore
            toastIdRef.current = toast(errorToastOptions);
        },
        onCompleted: (data, _clientOptions) => {
            if (toastIdRef.current) {
                toast.close(toastIdRef.current);
            }
            const { access: accessToken, refresh: refreshToken } =
                data.login.tokens;

            loginByTokens(
                { accessToken, refreshToken },
                data.login.user,
                stayLoggedIn
            );
        },
    });

    useRedirectAuthenticated();

    return (
        <>
            <Center height={"100vh"} flexDirection={"column"}>
                <Flex direction={"column"} w={"lg"}>
                    <Center flexDirection={"column"}>
                        <Heading>Node Based Planner</Heading>
                        <Text>Planning with style</Text>
                    </Center>

                    <Container mt={12} p={0}>
                        <FormControl>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                required
                                type="email"
                                value={email}
                                onChange={(ev) => {
                                    setEmail(ev.target.value);
                                }}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                required
                                type="password"
                                value={password}
                                onChange={(ev) => {
                                    setPassword(ev.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        login({
                                            variables: {
                                                email,
                                                password,
                                            },
                                        }).catch((e) => {});
                                    }
                                }}
                            />
                        </FormControl>
                        <LightMode>
                            <Checkbox
                                mt={4}
                                size="md"
                                defaultChecked
                                colorScheme={"primary"}
                                isChecked={stayLoggedIn}
                                onChange={() => {
                                    setStayLoggedIn(!stayLoggedIn);
                                }}
                            >
                                Stay Logged In
                            </Checkbox>
                        </LightMode>
                    </Container>

                    <LightMode>
                        <Button
                            mt={12}
                            isLoading={loading}
                            colorScheme={"primary"}
                            onClick={() => {
                                login({
                                    variables: {
                                        email,
                                        password,
                                    },
                                }).catch((e) => {});
                            }}
                        >
                            Login
                        </Button>
                    </LightMode>
                </Flex>
            </Center>
        </>
    );
};

export default LoginPage;
