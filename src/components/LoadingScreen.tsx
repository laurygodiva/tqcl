import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showStart, setShowStart] = useState(false);
  const [glowOpacity, setGlowOpacity] = useState(0.5);

  // Irregular blink effect
  useEffect(() => {
    const blinkSequence = [0.8, 0.3, 0.9, 0.4, 0.7, 0.2, 0.85, 0.5, 0.6, 0.75];
    let index = 0;
    
    const blinkInterval = setInterval(() => {
      setGlowOpacity(blinkSequence[index % blinkSequence.length]);
      index++;
    }, 150 + Math.random() * 100);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowStart(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    onComplete();
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#10131a" }}>
      {/* Floating hearts - left side */}
      <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none flex justify-center">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`left-${i}`}
            className="absolute opacity-20"
            style={{ left: "50%", transform: "translateX(-50%)" }}
            initial={{ y: "100vh" }}
            animate={{
              y: "-20vh",
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <Heart
              size={20 + Math.random() * 24}
              style={{ color: i % 2 === 0 ? "#4ef4ff" : "#d666ff" }}
              fill={i % 2 === 0 ? "#4ef4ff" : "#d666ff"}
            />
          </motion.div>
        ))}
      </div>

      {/* Floating hearts - right side */}
      <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none flex justify-center">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`right-${i}`}
            className="absolute opacity-20"
            style={{ right: "50%", transform: "translateX(50%)" }}
            initial={{ y: "100vh" }}
            animate={{
              y: "-20vh",
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <Heart
              size={20 + Math.random() * 24}
              style={{ color: i % 2 === 0 ? "#d666ff" : "#4ef4ff" }}
              fill={i % 2 === 0 ? "#d666ff" : "#4ef4ff"}
            />
          </motion.div>
        ))}
      </div>

      {/* Logo container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="relative">
          {/* Glow effect with irregular blink */}
          <motion.div
            className="absolute inset-0 blur-3xl rounded-full"
            style={{ 
              backgroundColor: "#80D4FF",
              opacity: glowOpacity,
            }}
          />
          
          {/* Logo */}
          <motion.img
            src="https://i.postimg.cc/cCJxBKN0/Chat-GPT-Image-22-may-2026-03-28-14.png"
            alt="Logo"
            className="w-72 h-72 object-contain relative z-10"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Loading bar */}
      {!showStart && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 w-56"
        >
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#1a1f2e" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #d666ff, #6635f6, #4ef4ff, #0432bd)",
                width: `${progress}%`,
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Start button */}
      {showStart && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="mt-10 px-8 py-3 rounded-xl font-bold text-base tracking-widest relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #d666ff, #6635f6, #4ef4ff, #0432bd)",
            color: "#10131a",
            boxShadow: "0 0 25px rgba(168, 180, 255, 0.4)",
            fontFamily: "Orbitron, sans-serif",
          }}
        >
          ACCEDER
        </motion.button>
      )}
    </div>
  );
};

export default LoadingScreen;