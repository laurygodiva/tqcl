import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";

export type User = "laury" | "danny" | null;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleUserSelect = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (!currentUser || !isAuthenticated) {
    return (
      <LoginScreen
        currentUser={currentUser}
        onUserSelect={handleUserSelect}
        onLogin={handleLogin}
      />
    );
  }

  return <Dashboard user={currentUser} onLogout={handleLogout} />;
}

export default App;