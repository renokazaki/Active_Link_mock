import { Sparkles } from "lucide-react";

export function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-pink-500" />
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          {children}
        </h1>
      </div>
    </div>
  );
}
