import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectedTasksContext } from './selectedContext';
interface IProps {
    listComponent:any
}
export default function Header({listComponent}: IProps){
    let navigate = useNavigate()
    let tasksContext = useContext(selectedTasksContext)
    console.log("header tasks",tasksContext.selectedTasks)
    function selectAll(){
        console.log("selectAll")
        console.log(listComponent.current.selectAll)
        listComponent.current.selectAll()
    }
    function newButton(){
        navigate("/newTask")
    }
  
    return (
        <div>
            <button onClick={newButton}>
                new a task
            </button>
            <button disabled = {tasksContext.selectedTasks.length === 0}>delete selected tasks</button>
            <button   onClick={selectAll}>select all completed tasks</button>
        </div>
    )
}