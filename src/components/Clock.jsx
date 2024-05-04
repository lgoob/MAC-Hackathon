import { useState } from 'react';

function Clock() {
    let time = new Date().toLocaleTimeString()

    const[ctime,setTime] = useState(time);
    const UpdateTime=()=>{
        time = new Date().toLocaleTimeString()
        setTime(time)
    }
    setInterval(UpdateTime)
    return<h1 class="text-9xl font-serif drop-shadow-[0_1.2px_10px_rgba(0,0,0,0.8)] font-black text-white">{ctime}</h1>
    }


export default Clock;