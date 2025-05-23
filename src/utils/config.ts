export const APP_EMOJI = "🗑️";
export const APP_NAME = "Auto Delete";
export const APP_DESCRIPTION =
  "Automatically delete your old casts from Farcaster";
export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_APP_DOMAIN || "farcaster.autodelete.me";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || `https://${APP_DOMAIN}`;

// More info // https://miniapps.farcaster.xyz/docs/specification#frame
export const APP_ICON = `${APP_URL}/api/images/icon`; // 1024 x 1024 for Farcaster
export const APP_IMAGE = `${APP_URL}/api/images/image`; // 1200 x 800 for Farcaster
export const APP_OG_IMAGE = `${APP_URL}/api/images/og`; // 1200 x 630 for Open Graph + Twitter. Can replace with /opengraph-image
export const APP_WEBHOOK = `${APP_URL}/api/webhook`;
export const APP_FRAME_VERSION = "next";
export const APP_FRAME_PRIMARY_CATEGORY = "utility";
export const APP_FRAME_TAGS = ["farcaster", "delete", "privacy"];

export const FARCASTER_ACCOUNT_ASSOCIATION = {
  header:
    "eyJmaWQiOjEyNTgwLCJ0eXBlIjoiY3VzdG9keSIsImtleSI6IjB4NTQzOTY4YzU4YTRlYTEyNTllMTIxOUI2MjE5MjBDMjQ2OTMxRGYxRiJ9",
  payload: "eyJkb21haW4iOiJmYXJjYXN0ZXIuYXV0b2RlbGV0ZS5tZSJ9",
  signature:
    "MHgyZGMxODAyNjgyZTVjOTU4MGVmNGQxMGM0MDkzYmIyM2FhNzQ5YWZlNTY5ZWY1NjI5YWQzZjUyNTNhZTE2NzhhNDI3YmU4NzFjNDY5YzRjYzYzYWNlMWZkYWU3YWU5OTc4YTg1YWM3NTVjYjlkNDQyNGFkNDY0MWIwYzA1YmRhZjFi",
};

export const SOCIAL_TWITTER = "wslyvh";
export const SOCIAL_FARCASTER = "wslyvh.eth";
export const SOCIAL_GITHUB = "wslyvh/autodelete-fc";

export const DEFAULT_CACHE_TIME = 24 * 60 * 60 * 1000; // 24-hrs (e.g. user context)
