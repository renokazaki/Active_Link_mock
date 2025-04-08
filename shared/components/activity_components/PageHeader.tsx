import { Sparkles } from "lucide-react";

export function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 " />
        <h1 className="text-4xl font-bold tracking-tight ">{children}</h1>
      </div>
    </div>
  );
}
