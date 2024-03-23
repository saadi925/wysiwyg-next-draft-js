import { useEffect, useState } from "react";
const useAuthentication = () => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, [auth]);
  return { auth };
};

export default useAuthentication;
