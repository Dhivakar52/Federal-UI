import { createContext } from "react";
import { TrendingUp, Newspaper, IdCard } from "lucide-react";
import Editorial from '../../assets/images/Editorial.png'




export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const menuItems = [
    { icon: <TrendingUp color="white" size={20} />,activeIcon:<TrendingUp color="black" size={20} />,  label: "Trends", path: "/trends" },
    { icon: <Newspaper size={20} />,activeIcon:<Newspaper color="black" size={20} />, label: "Summarize", path: "/summary" },
    { icon: <IdCard size={20} />, activeIcon:<IdCard color="black" size={20} />, label: "FlashCard", path: "/flashcard" },
    { icon: <IdCard size={20} />,activeIcon:<IdCard color="black" size={20} />,  label: "Peer News", path: "/peer" },
    { icon: <IdCard size={20} />,activeIcon:<IdCard color="black" size={20} />,  label: "Press Pivot", path: "/press-pivot" },
    { icon: <IdCard size={20} />,activeIcon:<IdCard color="black" size={20} />,  label: "Tube Scribe", path: "/youtube-script" },
    { icon: <IdCard size={20} />,activeIcon:<IdCard color="black" size={20} />,  label: "SEO Guru", path: "/seo-guru" },
    { icon: <IdCard size={20} />,activeIcon:<IdCard color="black" size={20} />,  label: "Editorial Mosaic", path: "/editor-mosaic" },
    { icon: <IdCard size={20} />,activeIcon:<IdCard color="black" size={20} />,  label: "Opinion Junction", path: "/option-junction" },
    { icon: <IdCard size={20} />,activeIcon:<IdCard color="black" size={20} />,  label: "Custom GPT", path: "/custom-gpt" },
    { icon: <IdCard size={20} />,activeIcon:<IdCard color="black" size={20} />,  label: "The Federal Bot", path: "/federal-bot" },
    { icon: <IdCard size={20} />,activeIcon:<IdCard color="black" size={20} />,  label: "Accounts", path: "/account" },
  ];

  const users = [
    { name: "Admin", email: "admin@gmail.com", password: "1" },
    { name: "Dhivakar", email: "dhiva@gmail.com", password: "2" },
    { name: "Vengat", email: "vengat@gmail.com", password: "3" },
  ];

  return (
    <MenuContext.Provider value={{ menuItems, users }}>
      {children}
    </MenuContext.Provider>
  );
};
