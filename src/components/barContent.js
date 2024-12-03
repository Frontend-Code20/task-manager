import React, { useContext } from "react";
import { BarContext } from "./globalState";
import SideBar from "./sidebar";
import EditBar from "./editBar";

function BarContent() {

    const { content } = useContext(BarContext);

    return (
        <div className="h-100">
            {content === "default" ? <SideBar /> : <EditBar /> }
        </div>
    )

}

export default BarContent;