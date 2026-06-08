import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  level: number;
  currentXP: number;
  maxXP: number;
  userColor: { light: string; shadow: string };
  triggerGlow: boolean;
}

const ProgressBar = ({ level, currentXP, maxXP, userColor, triggerGlow }: ProgressBarProps) => {
  const progress = (currentXP / maxXP) * 100;
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    if (triggerGlow) {
      setShowGlow(true);
      const timer = setTimeout(() => setShowGlow(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [triggerGlow]);

  return (
    <div className="flex flex-col gap-2 flex-1">
      {/* Level */}
      <div
        className="text-white text-sm font-bold tracking-wider text-center"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        NIVEL DE VINCULO {level}
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-full">
        {/* Bar Background */}
        <div
          className="w-full h-4 rounded-full overflow-hidden"
          style={{ backgroundColor: "#2a2f3e" }}
        >
          {/* Progress Fill */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full rounded-full relative"
            style={{
              background: `linear-gradient(90deg, #d666ff, #6635f6, #4ef4ff, #0432bd)`,
            }}
          />
        </div>

        {/* Glow Effect */}
        {showGlow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1 }}
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, #d666ff, #6635f6, #4ef4ff, #0432bd)`,
              filter: "blur(8px)",
            }}
          />
        )}
      </div>

      {/* XP Counter */}
      <div
        className="text-white text-xs opacity-80 text-center"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        {currentXP}/{maxXP} XP
      </div>
    </div>
  );
};

export default ProgressBar;