"use client";

import { useStorageInfo } from "@/hooks/useStorageInfo";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function StorageUnits({ className }: { className?: string }) {
  let classes = "flex flex-col gap-4";
  if (className) classes += ` ${className}`;

  const { data, isLoading } = useStorageInfo();

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>No data</div>;

  return (
    <div className={classes}>
      {/* Storage usage Stats */}
      <div className="stats w-full bg-base-200 rounded-xl">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-primary"
            >
              <ellipse
                cx="12"
                cy="6"
                rx="8"
                ry="3"
                fill="currentColor"
                opacity=".2"
              />
              <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" />
              <path
                stroke="currentColor"
                d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6"
              />
              <path
                stroke="currentColor"
                d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6"
              />
            </svg>
          </div>
          <div className="stat-title">Active Storage Units</div>
          <div className="stat-value">
            {data.storage.total_active_units ?? 0}
          </div>
        </div>
      </div>

      {/* Allocations Table */}
      <div className="overflow-x-auto">
        <table className="table table-sm w-full">
          <thead>
            <tr>
              <th className="w-24">Units</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.storage.allocations.map((i: any, index: number) => (
              <tr key={`allocation-${index}-${i.timestamp}`}>
                <td>{i.units}</td>
                <td>{dayjs(i.expiry).format("YYYY-MM-DD HH:mm")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
