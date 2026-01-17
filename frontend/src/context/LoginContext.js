import React, { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("customer"); // 'customer' | 'admin'
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("gym_session");
    if (saved) {
      const obj = JSON.parse(saved);
      setIsLogin(!!obj.isLogin);
      setUserId(obj.userId ?? null);
      setRole(obj.role ?? "customer");
      setUserName(obj.userName ?? "");
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "gym_session",
      JSON.stringify({ isLogin, userId, role, userName })
    );
  }, [isLogin, userId, role, userName]);

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        userId,
        setUserId,
        role,
        setRole,
        userName,
        setUserName,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
