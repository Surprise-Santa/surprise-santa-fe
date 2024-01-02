"use client";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-destructive font-semibold">{error.message}</p>

            <Button onClick={reset}>Try again</Button>
        </div>
    );
}
