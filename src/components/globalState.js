import React, { useState } from "react";

export const BarContext = React.createContext();

export const BarProvider = ({ children }) => {
    const [content, setContent] = useState('default');

    return(
        <BarContext.Provider value={{content, setContent}}>
            {children}
        </BarContext.Provider>
    )
}
export const TasksContext = React.createContext();

export const TasksProvider = ({ children }) => {
    const [content, setContent] = useState(null);

    return(
        <TasksContext.Provider value={{content, setContent}}>
            {children}
        </TasksContext.Provider>
    )
}