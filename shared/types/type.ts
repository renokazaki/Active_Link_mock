export type User = {
  id: string;
  name: string;
  img: string;
  status: "active" | "inactive";
  lastActive: string;
  isFriend?: boolean;
};
