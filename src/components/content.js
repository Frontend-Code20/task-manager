import { useState } from "react";
import Dashboard from "./dashboard";
import CreateTask from "./createTask";

function Content(){

    const [content, setcontent] = useState('dashboard');

    return(
        <div className="h-100 overflow-auto">
            {getContent()}
        </div>
    )

    function getContent(){
        let cont = '';
        switch(content){
            case "dashboard":
                cont = <Dashboard />
                break;
            case "newTask":
                cont = <CreateTask />
        } 
        return cont
    }
}


export default Content;