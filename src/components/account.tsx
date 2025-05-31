"use client";

import { useFarcasterAccount } from "@/hooks/useFarcasterAccount";
import { useFrameAdded } from "@/hooks/useFrameAdded";
import { useAddFrame } from "@/hooks/useAddFrame";
import { SignIn } from "./signin";

export function Account() {
  const { data: account } = useFarcasterAccount();
  const { data: frameAdded } = useFrameAdded();
  const addFrame = useAddFrame();

  return (
    <div className="flex items-center gap-4">
      {account && !frameAdded && (
        <button className="btn btn-xs btn-soft" onClick={addFrame}>
          Add
        </button>
      )}

      <SignIn />
    </div>
  );
}
