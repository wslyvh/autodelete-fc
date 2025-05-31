import React from "react";
import { NeynarAuthButton } from "@neynar/react";

export function SignIn() {
  return (
    <div className="flex justify-end w-full">
      <NeynarAuthButton
        className="btn btn-xs [&_span]:mr-[5px]"
        label="Login"
        icon={<React.Fragment key="empty-icon"></React.Fragment>}
        style={{
          padding: "4px 8px",
        }}
      />
    </div>
  );
}
