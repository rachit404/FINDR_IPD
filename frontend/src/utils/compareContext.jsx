import { createContext, useState } from "react";

export const CompareContext = createContext(null);

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  return (
    <CompareContext.Provider value={{ compareList, setCompareList }}>
      {children}
    </CompareContext.Provider>
  );
};
