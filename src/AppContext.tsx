import React, { createContext, useContext, useState, ReactNode } from "react";
import { Seller } from "./components/Interfaces";

interface AppContextProps {
  file: Blob | null;
  productName: string;
  sellers: Seller[];
  setFile: (file: Blob | null) => void;
  setProductName: (productName: string) => void;
  setSellers: (sellers: Seller[]) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [file, setFile] = useState<Blob | null>(null);
  const [productName, setProductName] = useState("");
  const [sellers, setSellers] = useState<Seller[]>([]);

  return (
    <AppContext.Provider
      value={{
        file,
        setFile,
        productName,
        sellers,
        setProductName,
        setSellers,
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
