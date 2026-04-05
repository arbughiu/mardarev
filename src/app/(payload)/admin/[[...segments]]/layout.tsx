import "@payloadcms/next/css";
import { RootLayout } from "@payloadcms/next/layouts";
import configPromise from "@payload-config";
import React from "react";

import { importMap } from "../importMap";

import type { ServerFunctionClient } from "payload";

interface Args {
  children: React.ReactNode;
}

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  const { handleServerFunctions } = await import("@payloadcms/next/layouts");
  return handleServerFunctions({ config: configPromise, importMap, ...args });
};

const Layout = ({ children }: Args) => (
  <RootLayout
    config={configPromise}
    importMap={importMap}
    serverFunction={serverFunction}
  >
    {children}
  </RootLayout>
);

export default Layout;
