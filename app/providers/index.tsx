import React from "react";
import DataProvider from "./DataProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <DataProvider>{children}</DataProvider>;
}
