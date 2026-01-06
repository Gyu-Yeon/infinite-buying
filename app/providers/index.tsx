import React from "react";
import DataProvider from "./DataProvider";
import { QueryProvider } from "./query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            <DataProvider>{children}</DataProvider>
        </QueryProvider>
    );
}
