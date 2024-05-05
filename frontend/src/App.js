import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import MarsRoverPage from "./pages/MarsRoverPage";
import ApodPage from "./pages/ApodPage";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from "react";
import Loading from "./components/design/Loading";
import AboutPage from "./pages/AboutPage";

function App() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //delay for loading user data
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [user]);

  console.log(user);

  if (isLoading) {
    return (
      <div className="h-screen w-full backdrop-blur-sm">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm">
        <Loading placement={`center`} />
      </div>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/mars-rover"
            element={user ? <MarsRoverPage /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/apod"
            element={user ? <ApodPage /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/about"
            element={user ? <AboutPage /> : <Navigate to="/sign-in" />}
          />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
