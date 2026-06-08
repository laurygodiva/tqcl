export type User = "laury" | "danny" | null;

export interface UserData {
  name: string;
  shadow: string;
  light: string;
  avatar: string;
}

export interface RelationshipData {
  level: number;
  experience: number;
}

export interface ActivityOption {
  id: string;
  name: string;
  experience: number;
  icon: string;
}