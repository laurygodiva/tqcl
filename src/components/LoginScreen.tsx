import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, X } from "lucide-react";
import type { User as UserType } from "../App";

interface LoginScreenProps {
  currentUser: UserType;
  onUserSelect: (user: UserType) => void;
  onLogin: () => void;
}

const LoginScreen = ({ currentUser, onUserSelect, onLogin }: LoginScreenProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);

  const users = [
    { 
      id: "laury" as const, 
      name: "Laury", 
      shadow: "#6635f6",
      light: "#d666ff",
      password: "laury123", 
      avatar: "https://i.postimg.cc/zvmn610n/1.png",
      age: "29 años",
      birthday: "13/04/1997",
      zodiac: "Aries",
      skills: "Artista Polivalente, Programadora, Tatuadora"
    },
    { 
      id: "danny" as const, 
      name: "Danny", 
      shadow: "#0432bd",
      light: "#4ef4ff",
      password: "danny123", 
      avatar: "https://i.postimg.cc/2SHnmW0r/Diseno-sin-titulo-(3).png",
      age: "28 años",
      birthday: "01/09/1998",
      zodiac: "Virgo",
      skills: "Electricista, Tirador de elite, Sueño ligero"
    },
  ];

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find((u) => u.id === currentUser);
    if (user && password === user.password) {
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleBack = () => {
    onUserSelect(null);
    setPassword("");
    setError(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#10131a" }}>
      {/* Floating hearts - left side */}
      <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none flex justify-center">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`left-${i}`}
            className="absolute opacity-15"
            style={{ left: "50%", transform: "translateX(-50%)" }}
            initial={{ y: "100vh" }}
            animate={{
              y: "-20vh",
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <Heart
              size={18 + Math.random() * 20}
              style={{ color: i % 2 === 0 ? "#4ef4ff" : "#d666ff" }}
              fill={i % 2 === 0 ? "#4ef4ff" : "#d666ff"}
            />
          </motion.div>
        ))}
      </div>

      {/* Floating hearts - right side */}
      <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none flex justify-center">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`right-${i}`}
            className="absolute opacity-15"
            style={{ right: "50%", transform: "translateX(50%)" }}
            initial={{ y: "100vh" }}
            animate={{
              y: "-20vh",
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <Heart
              size={18 + Math.random() * 20}
              style={{ color: i % 2 === 0 ? "#d666ff" : "#4ef4ff" }}
              fill={i % 2 === 0 ? "#d666ff" : "#4ef4ff"}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!currentUser ? (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 text-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://i.postimg.cc/cCJxBKN0/Chat-GPT-Image-22-may-2026-03-28-14.png"
                alt="Logo"
                className="w-72 h-72 object-contain mx-auto"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base font-bold text-white mt-2 tracking-widest"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              SELECCIONA UN JUGADOR
            </motion.h2>

            <div className="flex gap-5 justify-center items-start mt-5">
              {users.map((user, index) => {
                const isHovered = hoveredUser === user.id;
                const otherIsHovered = hoveredUser && hoveredUser !== user.id;
                
                return (
                  <motion.button
                    key={user.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: isHovered ? 1.05 : otherIsHovered ? 0.95 : 1,
                      y: isHovered ? -5 : 0
                    }}
                    transition={{ 
                      delay: 0.4 + index * 0.1,
                      scale: { duration: 0.4, ease: "easeOut" },
                      y: { duration: 0.4, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onUserSelect(user.id)}
                    onHoverStart={() => setHoveredUser(user.id)}
                    onHoverEnd={() => setHoveredUser(null)}
                    className="relative w-44 rounded-2xl overflow-hidden transition-all duration-300 group"
                    style={{
                      backgroundColor: "#1a1f2e",
                      boxShadow: `0 4px 20px ${user.shadow}40, inset 0 1px 0 ${user.light}30`,
                    }}
                  >
                    {/* Hover glow effect - behind avatar */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                      style={{
                        background: `radial-gradient(circle at center, ${user.light}25 0%, transparent 70%)`,
                      }}
                    />
                    
                    {/* Top light reflection */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 opacity-60 z-10"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${user.light}50, transparent)`,
                      }}
                    />
                    
                    {/* Character card style */}
                    <div 
                      className="absolute inset-0 opacity-20 z-0"
                      style={{
                        background: `linear-gradient(180deg, ${user.light}10 0%, ${user.shadow}40 100%)`,
                      }}
                    />
                    
                    {/* Avatar container */}
                    <div className="relative pt-4 px-3 z-10">
                      <div 
                        className="w-full aspect-square rounded-xl overflow-hidden relative"
                        style={{ 
                          backgroundColor: `${user.shadow}20`,
                          boxShadow: `inset 0 0 20px ${user.shadow}50, 0 4px 12px ${user.shadow}30`,
                        }}
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover relative z-10"
                        />
                        {/* Shine effect on hover - behind image */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 z-0"
                          style={{
                            background: `linear-gradient(135deg, transparent 40%, ${user.light}30 50%, transparent 60%)`,
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Name - always visible */}
                    <div className="p-3 text-center relative z-10">
                      <p 
                        className="font-bold text-sm tracking-wide"
                        style={{ 
                          color: user.light,
                          textShadow: `0 0 10px ${user.light}50`,
                          fontFamily: "Audiowide, sans-serif",
                        }}
                      >
                        {user.name}
                      </p>
                    </div>

                    {/* Character stats - only visible on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="px-3 pb-4 space-y-1 relative z-10 overflow-hidden"
                        >
                          <div className="space-y-1">
                            <p className="flex justify-between items-center text-[10px]">
                              <span className="text-white">Edad:</span>
                              <span style={{ color: user.light }}>{user.age}</span>
                            </p>
                            <p className="flex justify-between items-center text-[10px]">
                              <span className="text-white">Cumpleaños:</span>
                              <span style={{ color: user.light }}>{user.birthday}</span>
                            </p>
                            <p className="flex justify-between items-center text-[10px]">
                              <span className="text-white">Signo:</span>
                              <span style={{ color: user.light }}>{user.zodiac}</span>
                            </p>
                            <div className="pt-1">
                              <p className="text-white text-[10px] mb-0.5">Habilidades:</p>
                              <p style={{ color: user.light }} className="text-[10px] leading-tight">{user.skills}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="password"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 w-full max-w-sm px-6"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleBack}
              className="absolute top-0 left-6 p-2 rounded-full z-20"
              style={{ backgroundColor: "#1a1f2e" }}
            >
              <X size={18} className="text-white text-opacity-60" />
            </motion.button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-6 mt-8"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-36 h-36 rounded-full mx-auto mb-4 overflow-hidden"
                style={{
                  backgroundColor: `${users.find((u) => u.id === currentUser)?.shadow}20`,
                  boxShadow: `0 0 40px ${users.find((u) => u.id === currentUser)?.light}50, inset 0 0 30px ${users.find((u) => u.id === currentUser)?.shadow}30`,
                }}
              >
                <img
                  src={users.find((u) => u.id === currentUser)?.avatar}
                  alt={users.find((u) => u.id === currentUser)?.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h2 
                className="text-xl font-bold text-white"
                style={{ fontFamily: "Audiowide, sans-serif" }}
              >
                ¡Bienvenid{currentUser === "laury" ? "a" : "o"} de nuevo, {users.find((u) => u.id === currentUser)?.name}!
              </h2>
              <p className="text-white text-opacity-50 mt-1 text-sm">
                Ingresa tu contraseña
              </p>
            </motion.div>

            <motion.form
              onSubmit={handlePasswordSubmit}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`relative ${shake ? "animate-shake" : ""}`}
            >
              <div className="relative">
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: users.find((u) => u.id === currentUser)?.light }}
                >
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-4 pl-12 pr-4 rounded-xl text-white text-base tracking-wider outline-none"
                  style={{
                    backgroundColor: "#1a1f2e",
                    border: `2px solid ${error ? "#ff6b6b" : users.find((u) => u.id === currentUser)?.shadow}60`,
                    boxShadow: `inset 0 2px 4px ${users.find((u) => u.id === currentUser)?.shadow}20`,
                    fontFamily: "Orbitron, sans-serif",
                  }}
                  autoFocus
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center mt-2 text-red-400 text-xs"
                  >
                    Contraseña incorrecta
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-5 py-4 rounded-xl font-bold text-base tracking-wider relative overflow-hidden"
                style={{
                  background: currentUser === "laury" 
                    ? "linear-gradient(135deg, #d666ff, #6635f6)" 
                    : "linear-gradient(135deg, #4ef4ff, #0432bd)",
                  color: "#10131a",
                  boxShadow: `0 0 20px ${users.find((u) => u.id === currentUser)?.light}40`,
                  fontFamily: "Orbitron, sans-serif",
                }}
              >
                Entrar
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginScreen;