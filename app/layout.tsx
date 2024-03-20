"use client"

import { Navbar } from "@/components/Navbar";
import { GeistSans } from "geist/font/sans";
import { createContext, useContext, useState } from "react";
import "./globals.css";

type  UserContextType = {
  user: any;
  setUser: (user: any) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (user: any) => {}
});

export const useUserContext = () => useContext(UserContext);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const [theme, setTheme] = useState(localStorage?.getItem("theme") || "light");
  const [user, setUser] = useState(null);

  const handleTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }

  return (
    <html data-theme={theme} lang="en" className={`${GeistSans.className} ${theme}`}>
      <body className="min-h-full">
        <main>
          <UserContext.Provider value={{user, setUser}}>
            <Navbar />
            <button className="btn btn-primary w-64 rounded-full" onClick={handleTheme}>Switch !</button>
            {children}
          </UserContext.Provider>
        </main>
      </body>
    </html>
  );
}