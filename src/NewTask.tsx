import React from 'react';
import { useNavigate } from 'react-router-dom';
import Aria2Client from './aria2-client'
import {useInput} from './hooks'
export interface Props {
    client: Aria2Client;
}
export default function NewTask({client}: Props) {
    let uris = useInput("")
    let downloadSpeed = useInput("")
    console.log("uris",uris)
    console.log("speed",downloadSpeed)
    let navigate = useNavigate()

    function start() {
        let links=uris.value.split("\n").map(it=>{return it.trim()}).filter(it=>it)
        console.log("links",links)
        for(let link of links) {
             //@ts-ignore
        client.addUri([link],{
            "max-download-limit":downloadSpeed.value?downloadSpeed.value:"1000m"
        })
        }
       
        navigate("/downloading")
    }


    return (
        <div>
            <div>
            选项 🧜‍♂️ 
            <div>下载速度:
                <input type="text" {...downloadSpeed} />
            </div>
            </div>
            <div>
                <div>
                下载链接 💆 
                一行一个  🧙‍♂️ </div> 
                
                <textarea name="" id="" cols={30} rows={10} {...uris}>

                </textarea>
                <button onClick={start}>start downloading</button>
            </div>
        </div>
    )
}