import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import Aria2Client from "./aria2-client";

export function useInput(init = "") {
    var [value, setValue] = useState(init);
    // var [checked, setChecked] = useState(init);

    function onChange(e: any) {
        let target = e.target
        if (target !== null) {
            // if (target.type === "checkbox" || target.type === "radio") {
            //     setChecked(target.checked);
            //   } else 

            setValue(target.value);

        }

    }

    function clear() {
        setValue("");
    }

    var ret = {
        value,
        //   checked,
        // clear: useCallback(clear, []),
        onChange: useCallback(onChange, [])
    };

    Object.defineProperty(ret, "clear", {
        value: useCallback(clear, [])
    });

    return ret;
}



export function useTasks(client: Aria2Client, interval: number, state: "Active" | "Waiting" | "Stopped"): any[] {
    let [tasks, setTasks] = useState<any[]>([]);
    useEffect(() => {
        console.log("useEffect");
        let id = setInterval(() => {
            client.ready().then((client) => {
                //@ts-ignore
                client["tell" + state]().then((tasks: any[]) => {
                    setTasks(tasks);
                });
            });
        }, 2000);
        return () => clearInterval(id);
    }, []);
    return tasks;
}


export function useTasksImproved(getTasks: () => Promise<any[]>, interval: number) {

    let [tasks, setTasks] = useState<any[]>([])
    // console.log("useTasks")
    useEffect(() => {
        console.log("useTasks useEffect")
        let id = setInterval(() => {
            getTasks().then(tasks => {

                setTasks(tasks)

            })
        }, interval)
        return () => {

            clearInterval(id)
        }
    }, [])
    return tasks
}

export function useAsync(asyncFunction: () => Promise<any>, immediate = true) {
    const [pending, setPending] = useState<boolean>(false);
    const [value, setValue] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    // useCallback ensures useEffect is not called on every render, but only if asyncFunction changes.
    const execute = useCallback(() => {
        setError(null);
        setPending(true);
        setValue(null);
        console.log("useAsync excute")
        return asyncFunction()
            .then((response) => setValue(response))
            .catch((err) => setError(err))
            .finally(() => setPending(false));
    }, [asyncFunction]);

    useEffect(() => {
        console.log("useAsync")
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return {
        error, execute, pending, value,
    };
};

export const SelectedTasksContext = React.createContext({})






