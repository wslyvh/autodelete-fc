"use client";

import { PropsWithChildren } from "react";
import { NeynarContextProvider, Theme, useNeynarContext } from "@neynar/react";
import "@neynar/react/dist/style.css";

export function NeynarProvider({ children }: PropsWithChildren) {
  return (
    <NeynarContextProvider
      settings={{
        clientId: process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID || "",
        defaultTheme: Theme.Light,
        eventsCallbacks: {
          onAuthSuccess: async (data) => {
            console.log("onAuthSuccess. Registering account: ", data);
            const res = await fetch("/api/account", {
              method: "POST",
              body: JSON.stringify({
                fid: data.user.fid,
                signer_uuid: data.user.signer_uuid,
              }),
            });

            console.log("Account registered: ", res);
          },
        },
      }}
    >
      {children}
    </NeynarContextProvider>
  );
}

export const useNeynar = useNeynarContext;
