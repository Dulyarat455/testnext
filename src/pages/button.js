import React, { useState, useEffect } from "react";



export default function ButtonPage() {

    const [status, setStatus] = useState(0);

    useEffect(() => {
       
        const res = fetch("/api/statusbutton", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.gettemp.status)
              setStatus(data.gettemp.status)
            });


      }, []);


    

return(
    <div>
        <h1>Button Page</h1>
        <h1>{status}</h1>

    </div>
)

}