import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, Heart } from "lucide-react";
import ProgressBar from "./ProgressBar";
import ActivityMenu from "./ActivityMenu";
import { loadUserData, saveUserData, UserData } from "../utils/storage";

interface DashboardProps {
  user: "laury" | "danny";
  onLogout: () => void;
}

const userColors = {
  laury: { light: "#C0A4FE", shadow: "#8B5CF6" },
  danny: { light: "#82D2FF", shadow: "#3B82F6" },
};

const userAvatars = {
  laury: "https://i.postimg.cc/7hNYrpgH/Diseno-sin-titulo-(4).png",
  danny: "https://i.postimg.cc/kMN5Stk2/Diseno-sin-titulo-(6).png",
};

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [userData, setUserData] = useState<UserData>(() => loadUserData());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [triggerGlow, setTriggerGlow] = useState(false);
  const maxXP = 100;

  useEffect(() => {
    saveUserData(userData);
  }, [userData]);

  const handleAddExperience = (amount: number) => {
    setUserData((prev) => {
      let newXP = prev.currentXP + amount;
      let newLevel = prev.level;
      let newTotalXP = prev.totalXP + amount;

      while (newXP >= maxXP) {
        newXP -= maxXP;
        newLevel += 1;
      }

      return {
        level: newLevel,
        currentXP: newXP,
        totalXP: newTotalXP,
      };
    });
    setTriggerGlow(true);
    setTimeout(() => setTriggerGlow(false), 1100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center p-4 pt-8"
      style={{ backgroundColor: "#10131a" }}
    >
      {/* Avatar in top left */}
      <div className="fixed top-4 left-4 z-20">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative"
        >
          <div
            className="w-14 h-14 rounded-full overflow-hidden border-2"
            style={{ borderColor: userColors[user].light }}
          >
            <img
              src={userAvatars[user]}
              alt={user}
              className="w-full h-full object-cover"
            />
          </div>
          <motion.button
            onClick={onLogout}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#2a2f3e" }}
          >
            <LogOut size={12} className="text-white opacity-70" />
          </motion.button>
        </motion.div>
      </div>

      {/* Logo centered at top */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 -mt-4"
      >
        <img
          src="https://i.postimg.cc/cCJxBKN0/Chat-GPT-Image-22-may-2026-03-28-14.png"
          alt="Logo"
          className="w-64 h-64 object-contain"
        />
      </motion.div>

      {/* Progress Bar with Heart Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 w-full max-w-sm"
      >
        <ProgressBar
          level={userData.level}
          currentXP={userData.currentXP}
          maxXP={maxXP}
          userColor={userColors[user]}
          triggerGlow={triggerGlow}
        />

        {/* Heart Button */}
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setIsMenuOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, #d666ff, #6635f6, #4ef4ff, #0432bd)`,
          }}
        >
          <Heart size={22} className="text-white" style={{ fill: "white" }} />
        </motion.button>
      </motion.div>

      {/* Activity Menu */}
      <ActivityMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onAddExperience={handleAddExperience}
        userColor={userColors[user]}
      />
    </motion.div>
  );
};

export default Dashboard;