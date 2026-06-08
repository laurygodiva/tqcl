export const calculateExperienceForLevel = (level: number): number => {
  if (level === 1) return 100;
  return Math.pow(2, level) * 50;
};

export const calculateTotalExperienceForLevel = (level: number): number => {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += calculateExperienceForLevel(i);
  }
  return total;
};

export const getLevelFromTotalExperience = (totalExp: number): { level: number; currentExp: number; expForNext: number } => {
  let level = 1;
  let accumulated = 0;
  
  while (true) {
    const expForThisLevel = calculateExperienceForLevel(level);
    if (accumulated + expForThisLevel > totalExp) {
      return {
        level,
        currentExp: totalExp - accumulated,
        expForNext: expForThisLevel,
      };
    }
    accumulated += expForThisLevel;
    level++;
  }
};