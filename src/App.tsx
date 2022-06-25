import React, { useRef, useState } from "react";

import "./App.css";
import Aria2Client from "./aria2-client";
import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import Downloading from "./Downloading";
import Waiting from "./Waiting";
import NewTask from "./NewTask";
import Header from "./Header";
import { useMemo } from "react";
import Stopped from "./Stopped";
import TaskDetail from "./TaskDetail";
import {selectedTasksContext} from "./selectedContext"
import Servers from "./Servers";
// @ts-ignore
globalThis.Aria2Client = Aria2Client;
function App() {
  let client = useMemo(() => {
    console.log("ok");
    return new Aria2Client("10.3.1.202", "11000", "111222333");
  }, []);
  let listComponent =  useRef()
  let [selectedTasks,setSelectedTasks] = useState([])
  let aria2_servers = useMemo(()=>{
    return JSON.parse(localStorage.GET_ARIA2??"[]")
},[])
function changeServer(){
  
}
  console.log("client", client);
  return (
    <selectedTasksContext.Provider value={{selectedTasks,setSelectedTasks}}>
    <HashRouter>
      <div className="App">
        <div className="App-left">
          <select name="" id="" onChange={changeServer}>
              {aria2_servers.map((server:any) => {
                return <option value={server.ip + ":" + server.port} key={server.ip}>{server.ip}</option>
              })}
          </select>
          <div>
            <NavLink style={({isActive})=>({backgroundColor: isActive ? "lightpink" : "white"})} to="/downloading">downloading-nav</NavLink>
          </div>
          <div>
            <NavLink style={({isActive})=>({backgroundColor: isActive ? "lightpink" : "white"})} to="/waiting">waiting-nav</NavLink>
          </div>
          
          <div>
            <NavLink style={({isActive})=>({backgroundColor: isActive ? "lightpink" : "white"})} to="/stopped">done-nav</NavLink>
          </div>
          <div>
            <NavLink style={({isActive})=>({backgroundColor: isActive ? "lightpink" : "white"})} to="/newTask">newTask</NavLink>
          </div>
          <div>
            <NavLink style={({isActive})=>({backgroundColor: isActive ? "lightpink" : "white"})} to="/servers">servers</NavLink>
          </div>
        </div>
        <div className="App-right">
          <div className="App-right-header">
            <Header listComponent={listComponent} />
          </div>
          <div className="App-right-main">
            <Routes>
              <Route
                path="/downloading"
                element={<Downloading client={client} />}
              ></Route>
              <Route
                path="/waiting"
                element={<Waiting client={client} />}
              ></Route>
              <Route path="/done"></Route>
              <Route
                path="/newTask"
                element={<NewTask client={client} />}
              ></Route>
              <Route
                path="/stopped"
                element={<Stopped client={client} ref={listComponent} />}
              ></Route>
              <Route
                path="/task/detail/:gid"
                element={<TaskDetail client={client}
               />}
              ></Route>
              <Route
                path="/servers"
                element={<Servers />}
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
    </HashRouter>
    </selectedTasksContext.Provider>
  );
}

export default App;
