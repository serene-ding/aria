import Aria2Client from "./aria2-client";
import { getTaskName, humanizeSpeed } from "./functionHelpers";
import { useTasksImproved } from "./hooks";
interface Props {
  client: Aria2Client;
}

export default function Downloading({ client }: Props) {
  let tasks = useTasksImproved(() => {
      //@ts-ignore
    return client.ready().then((client) => {return client.tellActive()});
  }, 1000);
  // console.log("tasks",tasks)
  if(tasks.length>0){
    // console.log("okkk",Number(tasks[0].completedLength) , Number(tasks[0].totalLength))
  }
  return (
    <div>
      downloading...
      <ul>
        {tasks.map((task) => {
         
          return (
            <li key={task.gid}>
              <input type="checkbox" />
              <span>🙇‍♂️{getTaskName(task)}</span>
              <span> 👸{humanizeSpeed(task.completedLength)}</span>
              <span> 👨‍🎨{humanizeSpeed(task.downloadSpeed)}/s </span>
              
              <span> 🙇‍♂️progess {((Number(task.completedLength) / Number(task.totalLength))*100).toFixed(2)}% </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

