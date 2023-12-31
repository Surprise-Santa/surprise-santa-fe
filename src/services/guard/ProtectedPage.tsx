import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "./isAuthenticated";

export default function protectedPage(WrappedComponent: React.ComponentType) {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
        const router = useRouter();
        const pathname = usePathname();

        useEffect(() => {
            const checkAuth = async () => {
                const authenticated = await isAuthenticated();
                if (!authenticated) {
                    router.push("/auth/signin");
                    return;
                }

                if (authenticated && pathname?.startsWith("/auth")) {
                    router.push("/");
                    return;
                }
            };

            checkAuth();
        }, [pathname, router]);

        return <WrappedComponent {...props} />;
    };
}
