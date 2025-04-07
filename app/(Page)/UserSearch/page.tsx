"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { User } from "@/shared/types/type";

export default function UserSearch() {
  const [query, setQuery] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [sending, setSending] = useState<string | null>(null);
  const [loading] = useState(false);
  const [sending] = useState<string | null>(null);

  //const [users, setUsers] = useState<User[]>([

  const [users] = useState<User[]>([
    {
      id: "1",
      name: "山田太郎",
      status: "active",
      lastActive: "2分前",
      img: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "鈴木花子",
      status: "inactive",
      lastActive: "1時間前",
      img: "/placeholder.svg?height=40&width=40",
    },
  ]);

  const searchUsers = () => {
    console.log("ユーザー検索します" + query);
  };

  const sendFriendRequest = (userId: string) => {
    console.log("友達申請を送信します" + userId);
  };

  return (
    <div className="space-y-4 p-16">
      <div className="flex gap-2">
        <Input
          placeholder="ユーザー名を検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchUsers()}
        />
        <Button onClick={searchUsers} disabled={loading}>
          {loading ? "検索中..." : "検索"}
        </Button>
      </div>

      <div className="space-y-2 ">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-2">
              <img
                src={user.img}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <span>{user.name}</span>
            </div>
            <Button
              onClick={() => sendFriendRequest(user.id)}
              variant="outline"
              disabled={sending === user.id}
            >
              {sending === user.id ? "送信中..." : "友達申請を送信"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
