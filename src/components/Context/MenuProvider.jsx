import React, { useEffect, useState, createContext } from 'react';
import { TrendingUp, Newspaper, IdCard } from "lucide-react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const menuItems = [
    { icon: <TrendingUp color="white" size={20} />, activeIcon: <TrendingUp color="black" size={20} />, label: "Trends", path: "/trends" },
    { icon: <Newspaper size={20} />, activeIcon: <Newspaper color="black" size={20} />, label: "Summarize", path: "/summary" },
    { icon: <IdCard size={20} />, activeIcon: <IdCard color="black" size={20} />, label: "FlashCard", path: "/flashcard" },
    { icon: <IdCard size={20} />, activeIcon: <IdCard color="black" size={20} />, label: "Peer News", path: "/peer" },
    { icon: <IdCard size={20} />, activeIcon: <IdCard color="black" size={20} />, label: "Press Pivot", path: "/press-pivot" },
    { icon: <IdCard size={20} />, activeIcon: <IdCard color="black" size={20} />, label: "Tube Scribe", path: "/youtube-script" },
    // { icon: <IdCard size={20} />, activeIcon: <IdCard color="black" size={20} />, label: "SEO Guru", path: "/seo-guru" },
    // { icon: <IdCard size={20} />, activeIcon: <IdCard color="black" size={20} />, label: "Editorial Mosaic", path: "/editor-mosaic" },
    // { icon: <IdCard size={20} />, activeIcon: <IdCard color="black" size={20} />, label: "Opinion Junction", path: "/option-junction" },
    // { icon: <IdCard size={20} />, activeIcon: <IdCard color="black" size={20} />, label: "Custom GPT", path: "/custom-gpt",
    //   submenu: [
    //     { icon: <IdCard size={20} />, activeIcon: <IdCard color="black" size={20} />, label: "The Federal Assistant", path: "federal-assist" },
    //     { icon: <IdCard size={20} />, activeIcon: <IdCard color="black" size={20} />, label: "The Federal Editorial Analytics", path: "federal-editorial" },
    //   ],
    // },
    // { icon: <IdCard size={20} />, activeIcon: <IdCard color="black" size={20} />, label: "The Federal Bot", path: "/federal-bot" },
    { icon: <IdCard size={20} />, activeIcon: <IdCard color="black" size={20} />, label: "Accounts", path: "/account" },
  ];

  // const users = [
  //   { name: "Admin", email: "admin@gmail.com", password: "1" },
  //   { name: "Dhivakar", email: "dhiva@gmail.com", password: "2" },
  //   { name: "Vengat", email: "vengat@gmail.com", password: "3" },
  // ];

  const [userName, setUserName] = useState(sessionStorage.getItem("userName") || "");
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem("userEmail") || "");

  // Update sessionStorage when userName or userEmail changes
  useEffect(() => {
    if (userName) {
      sessionStorage.setItem("userName", userName);
    }
    if (userEmail) {
      sessionStorage.setItem("userEmail", userEmail);
    }
  }, [userName, userEmail]);

  return (
    <MenuContext.Provider value={{ menuItems, userName, userEmail, setUserName, setUserEmail }}>
      {children}
    </MenuContext.Provider>
  );
};
