export async function getStorageInfo(fid: number) {
  console.log("getStorageInfo", fid);

  if (!process.env.NEYNAR_API_KEY) {
    console.error("NEYNAR_API_KEY is required");
    return null;
  }

  const [usageRes, storageRes] = await Promise.all([
    fetch(`https://api.neynar.com/v2/farcaster/storage/usage?fid=${fid}`, {
      headers: {
        "x-api-key": process.env.NEYNAR_API_KEY,
      },
    }),
    fetch(
      `https://api.neynar.com/v2/farcaster/storage/allocations?fid=${fid}`,
      {
        headers: {
          "x-api-key": process.env.NEYNAR_API_KEY,
        },
      }
    ),
  ]);

  return {
    usage: await usageRes.json(),
    storage: await storageRes.json(),
  };
}
