"use client";

import { useStorageInfo } from "@/hooks/useStorageInfo";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function Usage({ className }: { className?: string }) {
  let classes = "flex flex-col gap-4";
  if (className) classes += ` ${className}`;

  const { data, isLoading } = useStorageInfo();

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>No data</div>;

  return (
    <div className={classes}>
      <div className="flex flex-row justify-between items-center">
        <span className="font-bold">Casts</span>
        <span className="text-sm">
          {data.usage.casts.used} / {data.usage.casts.capacity}
        </span>
      </div>
      <progress
        className="progress"
        value={(data.usage.casts.used / data.usage.casts.capacity) * 100}
        max={100}
      ></progress>

      <div className="flex flex-row justify-between items-center">
        <span className="font-bold">Reactions</span>
        <span className="text-sm">
          {data.usage.reactions.used} / {data.usage.reactions.capacity}
        </span>
      </div>
      <progress
        className="progress"
        value={
          (data.usage.reactions.used / data.usage.reactions.capacity) * 100
        }
        max={100}
      ></progress>

      <div className="flex flex-row justify-between items-center">
        <span className="font-bold">Follows</span>
        <span className="text-sm">
          {data.usage.links.used} / {data.usage.links.capacity}
        </span>
      </div>
      <progress
        className="progress"
        value={(data.usage.links.used / data.usage.links.capacity) * 100}
        max={100}
      ></progress>
    </div>
  );
}
