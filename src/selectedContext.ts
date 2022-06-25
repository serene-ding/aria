import React from "react";

export const selectedTasksContext = React.createContext<{selectedTasks:any[],setSelectedTasks:Function}>({
    selectedTasks:[],
    setSelectedTasks:Function,
   
});
selectedTasksContext.displayName = "selectedTasksContext"