import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Seller } from "./components/Interfaces";
import { historialConst } from "../constantes";

interface AppContextProps {
  file: Blob | null;
  productName: string;
  sellers: Seller[];
  setFile: (file: Blob | null) => void;
  setProductName: (productName: string) => void;
  setSellers: (sellers: Seller[]) => void;
  historial: string[];
  setHistorial: (historial: string[]) => void;
  user: any;
  setUser: (user: any) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);
const setInitialHistorial = (user: any) => {
    console.log('user', user);
    let historial: any = [];
    if (user === null) {
        return historial;
    }
    for (let i = 0; i < historialConst.length; i++) {
        if (historialConst[i].id === user) {
            historial = historialConst[i].titles;
        }
    }
    console.log(historial);
    return historial;
};
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [file, setFile] = useState<Blob | null>(null);
  const [productName, setProductName] = useState("");
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [user, setUser] = useState<any>('auth0|6743ec8d0b7fa3b0dd19f5b0');
  const [historial, setHistorial] = useState<string[]>(setInitialHistorial(user));

  useEffect(() => {
    const hisotrial = setInitialHistorial(user)
    setHistorial(hisotrial);
    console.log('historial', hisotrial);
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
        historial,
        setHistorial,
        user,
        setUser
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
