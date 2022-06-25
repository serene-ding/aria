import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "./hooks";
import { Props } from "./NewTask";
import {getTaskName} from "./functionHelpers"

export default function TaskDetail({ client }: Props) {
  let params = useParams();
  console.log("params", params);
  let { value: task, pending,error } = useAsync(
    useCallback(async () => {
      //@ts-ignore
    let task = await client.tellStatus(params.gid);
    console.log("hello useAsync")
    return task;
    }, [])
  );
  console.log("taskdetail", task)
  if(error) {
    console.log("error",error)
  }
  if (pending) {
    return <div>loading</div>;
  }
  if (task) {
    return (
      <div>
        <div>
          总览
          <div>name:{getTaskName(task)}</div>
        </div>
        <div></div>
        <div></div>
        {[params.gid]}
      </div>
    );
  }
  return null;
}
