import React, { useState, useEffect } from "react";
import OfflinePage from "./Pages/OfflinePage/OfflinePage";

const OfflineBoundary = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline ? children : <OfflinePage />;
};

export default OfflineBoundary;
