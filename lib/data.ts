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
  weeklyData: WeeklyData[];
  status: "active" | "inactive";
  lastActive: string;
  activityTypes: {
    name: string;
    duration: string;
  }[];
}

export interface ActivityData {
  date: string;
  value: number;
}

export interface WeeklyData {
  goal: string;
  description: string;
  current: number;
  target: number;
  unit: string;
  startDate: string;
  endDate: string;
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
      date: date.toISOString().split("T")[0],
      value,
    });
  }

  return data;
};

// Generate weekly goals data
const generateWeeklyData = (seed: number): WeeklyData[] => {
  const goals = [
    {
      goal: "Running",
      description: "Weekly running distance goal",
      target: 20,
      unit: "km",
    },
    {
      goal: "Reading",
      description: "Pages read this week",
      target: 300,
      unit: "pages",
    },
    {
      goal: "Meditation",
      description: "Meditation sessions",
      target: 7,
      unit: "sessions",
    },
    {
      goal: "Coding",
      description: "Hours spent coding",
      target: 15,
      unit: "hours",
    },
  ];

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return goals.map((goal, index) => {
    // Use seed and index to create variation
    const progressFactor = ((seed + index) % 10) / 10;
    const current = Math.round(
      goal.target * progressFactor * (0.7 + Math.random() * 0.6)
    );

    return {
      ...goal,
      current: Math.min(current, goal.target),
      startDate: startOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      endDate: endOfWeek.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
  });
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
    weeklyData: generateWeeklyData(1),
    status: "active",
    lastActive: "2024-03-20",
    activityTypes: [
      {
        name: "朝のランニング",
        duration: "30分",
      },
      {
        name: "ジムトレーニング",
        duration: "45分",
      },
      {
        name: "瞑想",
        duration: "15分",
      },
      {
        name: "読書",
        duration: "60分",
      },
      {
        name: "プログラミング",
        duration: "90分",
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
    weeklyData: generateWeeklyData(2),
    status: "inactive",
    lastActive: "2024-03-20",
    activityTypes: [
      {
        name: "朝のランニング",
        duration: "30分",
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
    weeklyData: generateWeeklyData(3),
    status: "active",
    lastActive: "2024-03-20",
    activityTypes: [
      {
        name: "朝のランニング",
        duration: "30分",
      },
      {
        name: "ジムトレーニング",
        duration: "45分",
      },
      {
        name: "瞑想",
        duration: "15分",
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
    weeklyData: generateWeeklyData(4),
    status: "inactive",
    lastActive: "2024-03-20",
    activityTypes: [
      {
        name: "朝のランニング",
        duration: "30分",
      },
      {
        name: "ジムトレーニング",
        duration: "45分",
      },
      {
        name: "瞑想",
        duration: "15分",
      },
      {
        name: "読書",
        duration: "60分",
      },
      {
        name: "プログラミング",
        duration: "90分",
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
    weeklyData: generateWeeklyData(5),
    status: "active",
    lastActive: "2024-03-20",
    activityTypes: [
      {
        name: "朝のランニング",
        duration: "30分",
      },
    ],
  },
];
