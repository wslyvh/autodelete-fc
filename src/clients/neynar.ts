export interface RegisterSignerParams {
  public_key: string;
  signature: string;
  fid: number;
  deadline: number;
  redirect_url?: string;
}

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

export async function getSigner(signer_uuid: string) {
  console.log("getSigner", signer_uuid);

  if (!process.env.NEYNAR_API_KEY) {
    console.error("NEYNAR_API_KEY is required");
    return null;
  }

  const res = await fetch(
    `https://api.neynar.com/v2/farcaster/signer?signer_uuid=${signer_uuid}`,
    {
      method: "GET",
      headers: {
        "x-api-key": process.env.NEYNAR_API_KEY,
      },
    }
  );

  return res.json();
}

export async function createSigner() {
  console.log("createSigner");

  if (!process.env.NEYNAR_API_KEY) {
    console.error("NEYNAR_API_KEY is required");
    return null;
  }

  const res = await fetch(`https://api.neynar.com/v2/farcaster/signer`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.NEYNAR_API_KEY,
    },
  });

  return res.json();
}

export async function registerSigner(params: RegisterSignerParams) {
  console.log("registerSigner", params);

  if (!process.env.NEYNAR_API_KEY) {
    console.error("NEYNAR_API_KEY is required");
    return null;
  }

  const res = await fetch(
    `https://api.neynar.com/v2/farcaster/signer/developer_managed/signed_key`,
    {
      method: "POST",
      headers: {
        "x-api-key": process.env.NEYNAR_API_KEY,
      },
      body: JSON.stringify({
        public_key: params.public_key,
        signature: params.signature,
        fid: params.fid,
        deadline: params.deadline,
        redirect_url: params.redirect_url,
      }),
    }
  );

  return res.json();
}
