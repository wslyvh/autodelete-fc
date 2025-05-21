import { useFarcasterAccount } from "./useFarcasterAccount";
import { DEFAULT_CACHE_TIME } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";

export function useStorageInfo() {
  const { data: account } = useFarcasterAccount();
  return useStorageInfoByFid(account?.fid ?? 0, !!account?.fid);
}

export function useStorageInfoByFid(fid: number, enabled: boolean = true) {
  return useQuery({
    queryKey: ["farcaster", "storage", fid],
    queryFn: async () => {
      console.log("Fetching storage info for fid", fid);
      const res = await fetch(`/api/storage?fid=${fid}`);
      return res.json();
    },
    enabled,
    staleTime: DEFAULT_CACHE_TIME,
  });
}
