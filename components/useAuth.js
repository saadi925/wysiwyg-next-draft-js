import { useEffect, useState } from "react";
const useAuthentication = () => {
  const [auth, setAuth] = useState(false);
  const [Token, setToken] = useState(""); // [1]
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const token = localStorage.getItem("token");
    setToken(token);
    setAuth(!!token);
  }

  return auth;
};

export default useAuthentication;
