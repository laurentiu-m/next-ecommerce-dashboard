import { Stats } from "@/components/stats";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between gap-7">
        <Stats />
      </div>
    </div>
  );
}
