import { ReactNode } from "react";

export interface AuthPageProps {
    children: ReactNode;
    redirectTo?: string;
}

const DEFAULT_REDIRECT = "login";

const AuthPage = (props: AuthPageProps) => {
    return <>{props.children}</>;
};

export default AuthPage;
