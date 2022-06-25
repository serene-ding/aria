
import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
import { getTaskName } from "./functionHelpers";
import { useTasksImproved } from "./hooks";
import { Props } from "./NewTask";
import { selectedTasksContext } from "./selectedContext";

 function Stopped({client}: Props,ref:React.Ref<any>){
    let tasksContext = useContext(selectedTasksContext)
    // console.log("selected tasks in stopped",tasksContext.selectedTasks)
   let newGids
    let [selectedGids,setSelectedGids] = useState<string[]>([])
    function selectTask(e:any,gid:string){
      if(e.target.checked){
        newGids = [...selectedGids,gid]
        setSelectedGids(newGids)
        //tasksContext.setSelectedTasks([...tasksContext.selectedTasks,task])
      }else{
        newGids = selectedGids.filter(id => {return id !== gid }) 
        setSelectedGids(newGids)
       // tasksContext.setSelectedTasks(tasksContext.selectedTasks.filter(it => it.gid !== task.gid))
      }
      tasksContext.setSelectedTasks(newGids.map(gid =>{
        return tasks.find(it=>it.gid === gid)
      }))

    }
   
    let tasks = useTasksImproved(async ()=>{
        
      client = await client.ready();
      //@ts-ignore
      return client.tellStopped(0,100);
  },1000)
 
    useImperativeHandle(ref,()=>{
      return {
        selectAll : function(){
          if(tasksContext.selectedTasks.length !== tasks.length) {
             tasksContext.setSelectedTasks(tasks)
             setSelectedGids(tasks.map(it=>it.gid))
            }else{
              tasks.splice(0,tasks.length)
              tasksContext.setSelectedTasks(tasks)
              setSelectedGids(tasks.map(it=>it.gid))
            }
      }}
    }
    )
   

    return (
        <div>
          stopped
          <ul>
            {tasks.map((task) => {
             let taskName = getTaskName(task)

              return (
                <li key={task.gid}>
                  <input type="checkbox" checked = {selectedGids.includes(task.gid)} onChange ={ (e)=> {selectTask(e,task.gid)} }/>
                  <span>{taskName}</span>
                  <span> {task.completeLength} bytes</span>
                  <span> {task.downloadSpeed} b/s</span>
                  <Link to={"/task/detail/"+task.gid}>💁‍♀️</Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
}


export default forwardRef(Stopped)