import React from "react";
import DataProvider from "./DataProvider";
import { QueryProviders } from "./query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryProviders>
            <DataProvider>{children}</DataProvider>
        </QueryProviders>
    );
}
