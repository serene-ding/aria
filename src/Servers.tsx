import { useMemo, useState } from "react"
import { useInput } from "./hooks"

export default function Servers(){
    let ip:any = useInput("")
    let port:any = useInput("")
    let secret:any = useInput("")
    let aria2_servers = useMemo(()=>{
        return JSON.parse(localStorage.GET_ARIA2??"[]")
    },[])
    let [servers,setServers] =useState(aria2_servers)
    function addServer(){
        let newServers = [...servers,{ip:ip.value,port:port.value,secret:secret.value}]
       setServers(newServers)
       ip.clear()
       port.clear()
       secret.clear()
       localStorage.GET_ARIA2 = JSON.stringify(newServers)
    }
    return (
        <div>
        <h2>servers</h2>
       
        <ul>
            {
                servers.map((server:any) => {
                    return (
                        <li>
                            <div>ip : {server.ip}</div>
                            <div>port : {server.port}</div>
                            <div>secret : {server.secret}</div>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <div>ip <input type="text" {...ip} /></div>
            <div>port <input type="text" {...port} /></div>
            <div>secret <input type="text" {...secret} /></div>
        <button onClick={addServer}>add server</button>
        </div>
        </div>
    )
}