import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Seller } from "./components/Interfaces";

interface HistoryElement {
  searchTerm: string;
  searchDate: Date;
  imagePath: string;
  category: string;
}

interface AppContextProps {
  file: Blob | null;
  productName: string;
  sellers: Seller[];
  setFile: (file: Blob | null) => void;
  setProductName: (productName: string) => void;
  setSellers: (sellers: Seller[]) => void;
  history: HistoryElement[];
  setHistory: (history: HistoryElement[]) => void;
  user: any;
  setUser: (user: any) => void;
  categoria: string;
  setCategoria: (categoria: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);


export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [file, setFile] = useState<Blob | null>(null);
  const [productName, setProductName] = useState("");
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [user, setUser] = useState<any>('auth0|6743ec8d0b7fa3b0dd19f5b0');
  const [history, setHistory] = useState<HistoryElement[]>([]);
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    async function setInitialHistory(user: any) {
      // Parse json from db/searchHistory
      fetch(`./searchHistory.json`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          const userHistory = data[user];
          if (userHistory) {
            setHistory(userHistory);
          }
        });
    }
    setInitialHistory(user);
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        file,
        setFile,
        productName,
        sellers,
        setProductName,
        setSellers,
        history,
        setHistory,
        user,
        setUser,
        categoria,
        setCategoria
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for consuming the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
