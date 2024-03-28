import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

function Prodected({ children }: { children: React.ReactNode | any }) {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    auth.authStateReady().finally(() => setloading(false));
  }, []);

  if (loading) {
    return "Loading....!";
  } else {
    if (auth.currentUser) {
      return children;
    }

    return <Navigate to={"/signUp"}></Navigate>;
  }
}

export default Prodected;
