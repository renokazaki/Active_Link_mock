"use client";

import Link from "next/link";

import { friendsData } from "@/lib/data";

export default function Activity() {
  const friends = friendsData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-black">
      <div className=" container mx-auto py-8 px-4 space-y-8 mt-12">
        <h1 className="text-2xl font-bold mb-6 text-white">Your Friends</h1>
        <div className="grid gap-4">
          {friends.map((friend) => (
            <Link
              key={friend.id}
              href={`/Activity/Friends/${friend.id}`}
              className="block"
            >
              <div className="bg-gray-100 rounded-lg shadow p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    {/* <img
                    src={friend.img}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full"
                  /> */}
                    <h3 className="font-medium">{friend.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    {friend.status === "active" ? (
                      <span>活動中</span>
                    ) : (
                      <span>最終活動: {friend.lastActive}</span>
                    )}
                  </p>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    friend.status === "active" ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
