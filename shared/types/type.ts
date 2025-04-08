export type User = {
  id: string;
  name: string;
  img: string;
  status: "active" | "inactive";
  lastActive: string;
  isFriend?: boolean;
};

export type FriendData = {
  id: number;
  name: string;
  img: string;
  status: "active" | "inactive";
  lastActive: string;
  stats: Stats;
  activityData: ActivityData[];
};

export type Stats = {
  activitiesThisWeek: number;
  activitiesThisMonth: number;
  activitiesTotal: number;
  activityTimeThisWeek: number;
  activityTimeThisMonth: number;
  activityTimeTotal: number;
  currentStreak: number;
  bestStreak: number;
};

export type ActivityData = {
  date: string;
  duration: number;
  description: string;
};

export type WeeklyTarget = {
  goal: string;
  description: string;
  status: "pending" | "completed" | "started";
  startDate: string;
  endDate: string;
};
