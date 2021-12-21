import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"

const Out = () => {
    const history = useHistory();
    useEffect(() => {
        fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            history.push("./log");
        }).catch((e) => {
            console.log("somethin", e);
        })
    })
    return (<>
        <h1>this is logout part</h1>
    </>)
}
export default Out;