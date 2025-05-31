import { PropsWithChildren } from "react";
import { QueryProvider } from "./query";
import { FarcasterProvider } from "./farcaster";
import { NeynarProvider } from "./neynar";

export function Providers(props: PropsWithChildren) {
  return (
    <QueryProvider>
      <NeynarProvider>
        <FarcasterProvider>{props.children}</FarcasterProvider>
      </NeynarProvider>
    </QueryProvider>
  );
}
