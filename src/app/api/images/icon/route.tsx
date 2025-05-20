import { ImageResponse } from "next/og";
import {
  APP_EMOJI,
  APP_NAME,
  APP_DESCRIPTION,
  SOCIAL_FARCASTER,
} from "@/utils/config";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        tw="flex flex-col items-center justify-center w-full h-full"
        style={{
          background: "linear-gradient(120deg, #6d28d9 60%, #2563eb 100%)",
        }}
      >
        <div tw="flex text-[700px]">{APP_EMOJI}</div>
      </div>
    ),
    {
      width: 1024,
      height: 1024,
    }
  );
}
