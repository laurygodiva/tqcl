import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";

interface ActivityMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExperience: (amount: number) => void;
  userColor: { light: string; shadow: string };
}

const activities = [
  { id: "piropos", name: "Piropos", experience: 15, icon: "💋" },
  { id: "mimitos", name: "Mimitos", experience: 20, icon: "🥰" },
  { id: "sorpresa", name: "Detallito Sorpresa", experience: 50, icon: "🎀" },
  { id: "regalito", name: "Regalito Especial", experience: 60, icon: "🎁" },
  { id: "masajito", name: "Masajito", experience: 70, icon: "💆" },
  { id: "dormir", name: "Dormir Juntos", experience: 100, icon: "😴" },
  { id: "videollamada", name: "Videollamada", experience: 150, icon: "📹" },
  { id: "cita", name: "Cita Romántica", experience: 200, icon: "💕" },
  { id: "pasion", name: "Momento de Pasión", experience: 300, icon: "🔥" },
].sort((a, b) => a.experience - b.experience);

const ActivityMenu = ({ isOpen, onClose, onAddExperience }: ActivityMenuProps) => {
  const handleActivityClick = (experience: number) => {
    onAddExperience(experience);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(16, 19, 26, 0.9)" }}
          />

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 -translate-y-1/2 z-50 rounded-2xl p-3"
            style={{ 
              backgroundColor: "#1a1f2e",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white text-sm font-bold" style={{ fontFamily: "Audiowide, sans-serif" }}>
                Añadir Experiencia
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full"
                style={{ backgroundColor: "#2a2f3e" }}
              >
                <X size={14} className="text-white text-opacity-60" />
              </button>
            </div>

            {/* Activities */}
            <div className="flex flex-col gap-1.5">
              {activities.map((activity, index) => {
                const isEven = index % 2 === 0;
                const accentColor = isEven ? "#d666ff" : "#4ef4ff";
                
                return (
                  <motion.button
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleActivityClick(activity.experience)}
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-all hover:scale-[1.02] w-full"
                    style={{ 
                      backgroundColor: "#2a2f3e",
                      borderLeft: `3px solid ${accentColor}`,
                    }}
                  >
                    <div className="flex items-center">
                      <span className="text-base">{activity.icon}</span>
                      <span className="text-white text-xs font-medium ml-1.5 whitespace-nowrap" style={{ fontFamily: "Orbitron, sans-serif" }}>
                        {activity.name}
                      </span>
                    </div>
                    <div className="flex items-center shrink-0">
                      <span className="text-[10px]" style={{ color: accentColor, fontFamily: "Orbitron, sans-serif" }}>
                        +{activity.experience} XP
                      </span>
                      <Heart size={8} className="ml-0.5" style={{ fill: accentColor, color: accentColor }} />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ActivityMenu;