import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  available: "border-green-200 bg-green-50 text-green-800",
  occupied: "border-amber-200 bg-amber-50 text-amber-800",
  reserved: "border-blue-200 bg-blue-50 text-blue-800",
  maintenance: "border-red-200 bg-red-50 text-red-800",
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  confirmed: "border-green-200 bg-green-50 text-green-800",
  completed: "border-slate-200 bg-slate-50 text-slate-700",
  cancelled: "border-red-200 bg-red-50 text-red-800",
  new: "border-blue-200 bg-blue-50 text-blue-800",
  contacted: "border-amber-200 bg-amber-50 text-amber-800",
  site_visit: "border-purple-200 bg-purple-50 text-purple-800",
  booking_done: "border-green-200 bg-green-50 text-green-800",
  closed: "border-slate-200 bg-slate-50 text-slate-700",
  high: "border-red-200 bg-red-50 text-red-800",
  medium: "border-amber-200 bg-amber-50 text-amber-800",
  low: "border-green-200 bg-green-50 text-green-800",
  active: "border-green-200 bg-green-50 text-green-800",
  on_leave: "border-amber-200 bg-amber-50 text-amber-800",
  inactive: "border-slate-200 bg-slate-50 text-slate-700",
  present: "border-green-200 bg-green-50 text-green-800",
  absent: "border-red-200 bg-red-50 text-red-800",
  leave: "border-amber-200 bg-amber-50 text-amber-800",
  paid: "border-green-200 bg-green-50 text-green-800"
};

export function StatusBadge({ value, label }: { value: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize",
        styles[value] || "border-border bg-white text-muted-foreground"
      )}
    >
      {(label || value).replaceAll("_", " ")}
    </span>
  );
}
