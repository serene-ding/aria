import React from 'react';
import {useTasksImproved} from "./hooks"
import { Props } from './NewTask';

export default function Waiting({client}: Props){
    let tasks = useTasksImproved(()=>{
        //@ts-ignore
        return client.ready().then((client) => client.tellWaiting(0,100))
    }, 
        
        
        1000)
    return (
        <div>
            waiting...
            <ul>
        {tasks.map((task) => {
          return (
            <li key={task.gid}>
              <span>{task.files[0].path}</span>
              <span> {task.completeLength} bytes</span>
              <span> {task.downloadSpeed} b/s</span>
            </li>
          );
        })}
      </ul>
        </div>
    )
}