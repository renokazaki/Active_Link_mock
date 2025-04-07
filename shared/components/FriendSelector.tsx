import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { friendsData } from "@/lib/data";

interface FriendSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function FriendSelector({ value, onValueChange }: FriendSelectorProps) {
  return (
    <div className="w-full md:w-[280px]">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-12 text-base bg-slate-800/80 border-slate-700/50 text-white backdrop-blur-sm">
          <SelectValue placeholder="Select a friend" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800/90 border-slate-700/50 text-white backdrop-blur-sm">
          {friendsData.map((friend) => (
            <SelectItem
              key={friend.id}
              value={friend.id}
              className="py-2.5 focus:bg-slate-700"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-medium">
                  {friend.name.charAt(0)}
                </div>
                <span>{friend.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
