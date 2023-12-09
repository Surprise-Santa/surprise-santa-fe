import { GoogleOAuthProvider } from "@react-oauth/google";

export function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_API_CLIENT_ID as string}>
            {children}
        </GoogleOAuthProvider>
    );
}
