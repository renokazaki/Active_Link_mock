import { ActivityData, WeeklyTarget } from "@/shared/types/type";

export interface FriendData {
  id: string;
  name: string;
  stats: {
    totalActivities: number;
    activitiesThisWeek: number;
    completionRate: number;
    completionTrend: number;
    currentStreak: number;
    bestStreak: number;
  };
  activityData: ActivityData[];
  weeklyData: WeeklyTarget[];
  status: "active" | "inactive";
  lastActive: string;
  activityTypes: {
    name: string;
    duration: number;
  }[];
}

// Generate some sample activity data for the past 3 months
const generateActivityData = (seed: number): ActivityData[] => {
  const data: ActivityData[] = [];
  const today = new Date();

  // Generate data for the past 90 days
  for (let i = 90; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Use the seed to create some variation between friends
    const baseValue = Math.sin(i * 0.1) * 5 + 5; // Creates a wave pattern
    const randomFactor = Math.random() * 2 - 1; // Random value between -1 and 1
    const seedFactor = (seed % 5) * 0.5; // Different pattern based on seed

    // Calculate value with some randomness and seed influence
    let value = Math.round(baseValue + randomFactor * 3 + seedFactor);

    // Ensure value is between 0 and 10
    value = Math.max(0, Math.min(10, value));

    data.push({
      id: i,
      date: date.toISOString().split("T")[0],
      duration: value,
      name: "Activity " + i,
    });
  }

  return data;
};

export const friendsData: FriendData[] = [
  {
    id: "1",
    name: "Alex Johnson",
    stats: {
      totalActivities: 342,
      activitiesThisWeek: 18,
      completionRate: 87,
      completionTrend: 5,
      currentStreak: 12,
      bestStreak: 21,
    },
    activityData: generateActivityData(1),
    weeklyData: [
      {
        goal: "Running",
        description: "Weekly running distance goal",
        status: "pending",
        startDate: "2024-03-20",
        endDate: "2024-03-26",
      },
    ],
    status: "active",
    lastActive: "2024-03-20",
    activityTypes: [
      {
        name: "朝のランニング",
        duration: 30,
      },
      {
        name: "ジムトレーニング",
        duration: 45,
      },

      {
        name: "読書",
        duration: 60,
      },
      {
        name: "プログラミング",
        duration: 90,
      },
    ],
  },
  {
    id: "2",
    name: "Taylor Smith",
    stats: {
      totalActivities: 256,
      activitiesThisWeek: 12,
      completionRate: 72,
      completionTrend: -3,
      currentStreak: 4,
      bestStreak: 14,
    },
    activityData: generateActivityData(2),
    weeklyData: [
      {
        goal: "Running",
        description: "Weekly running distance goal",
        status: "pending",
        startDate: "2024-03-20",
        endDate: "2024-03-26",
      },
    ],
    status: "inactive",
    lastActive: "2024-03-20",
    activityTypes: [
      {
        name: "朝のランニング",
        duration: 30,
      },
    ],
  },
  {
    id: "3",
    name: "Jordan Lee",
    stats: {
      totalActivities: 421,
      activitiesThisWeek: 23,
      completionRate: 91,
      completionTrend: 2,
      currentStreak: 28,
      bestStreak: 32,
    },
    activityData: generateActivityData(3),
    weeklyData: [
      {
        goal: "Running",
        description: "Weekly running distance goal",
        status: "pending",
        startDate: "2024-03-20",
        endDate: "2024-03-26",
      },
    ],
    status: "active",
    lastActive: "2024-03-20",
    activityTypes: [
      {
        name: "朝のランニング",
        duration: 30,
      },
      {
        name: "ジムトレーニング",
        duration: 45,
      },
    ],
  },
  {
    id: "4",
    name: "Casey Morgan",
    stats: {
      totalActivities: 187,
      activitiesThisWeek: 9,
      completionRate: 65,
      completionTrend: 8,
      currentStreak: 3,
      bestStreak: 10,
    },
    activityData: generateActivityData(4),
    weeklyData: [
      {
        goal: "Running",
        description: "Weekly running distance goal",
        status: "pending",
        startDate: "2024-03-20",
        endDate: "2024-03-26",
      },
    ],
    status: "inactive",
    lastActive: "2024-03-20",
    activityTypes: [
      {
        name: "朝のランニング",
        duration: 30,
      },
      {
        name: "ジムトレーニング",
        duration: 45,
      },

      {
        name: "読書",
        duration: 60,
      },
      {
        name: "プログラミング",
        duration: 90,
      },
    ],
  },
  {
    id: "5",
    name: "Riley Parker",
    stats: {
      totalActivities: 312,
      activitiesThisWeek: 16,
      completionRate: 83,
      completionTrend: -1,
      currentStreak: 7,
      bestStreak: 18,
    },
    activityData: generateActivityData(5),
    weeklyData: [
      {
        goal: "Running",
        description: "Weekly running distance goal",
        status: "pending",
        startDate: "2024-03-20",
        endDate: "2024-03-26",
      },
    ],
    status: "active",
    lastActive: "2024-03-20",
    activityTypes: [
      {
        name: "朝のランニング",
        duration: 30,
      },
    ],
  },
];
