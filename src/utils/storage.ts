export interface UserData {
  level: number;
  currentXP: number;
  totalXP: number;
}

const STORAGE_KEY = "arcade_love_shared_data";

const DEFAULT_DATA: UserData = {
  level: 1,
  currentXP: 0,
  totalXP: 0,
};

export const saveUserData = (data: UserData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const loadUserData = (): UserData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading user data:", error);
  }
  return { ...DEFAULT_DATA };
};

export const resetUserData = (): void => {
  saveUserData(DEFAULT_DATA);
};