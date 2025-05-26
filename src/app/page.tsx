import { StorageUnits } from "@/components/units";
import { Usage } from "@/components/usage";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <StorageUnits />
      <Usage />
    </div>
  );
}
