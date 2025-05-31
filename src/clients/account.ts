import { redis } from "./redis";

export interface Account {
  fid: number;
  signer_uuid: string;
  whitelist: string[];
}

export async function getAllAccounts() {
  if (!redis) {
    return [];
  }

  const keys = await redis.keys("autodelete:account:*");
  const accounts = await Promise.all(
    keys.map((key) => redis?.get<Account>(key))
  );

  return accounts.filter((account) => account !== null) as Account[];
}

export async function getAccount(fid: number) {
  if (!redis) {
    throw new Error("Redis is not initialized");
  }

  return await redis.get<Account>(`autodelete:account:${fid}`);
}

export async function createAccount(
  data: Omit<Account, "whitelist" | "subscription">
) {
  console.log("createAccount", data);

  if (!redis) {
    throw new Error("Redis is not initialized");
  }

  const account = await redis.get<Account>(`autodelete:account:${data.fid}`);
  if (account) {
    return account;
  } else {
    await redis.set(`autodelete:account:${data.fid}`, {
      ...data,
      whitelist: [],
    });

    return data;
  }
}

export async function updateAccount(fid: number, data: Partial<Account>) {
  if (!redis) {
    throw new Error("Redis is not initialized");
  }

  const account = await redis.get<Account>(`autodelete:account:${fid}`);
  if (!account) {
    throw new Error("Account not found");
  }

  return await redis.set(`autodelete:account:${fid}`, {
    ...account,
    ...data,
  });
}
