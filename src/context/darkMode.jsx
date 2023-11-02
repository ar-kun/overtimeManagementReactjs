/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
 const [darkMode, setDarkMode] = useState(false);

 return <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>{children}</DarkModeContext.Provider>;
};

export const DarkMode = DarkModeContext;
export default DarkModeProvider;
