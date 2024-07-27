import React, { useState, useEffect } from "react";
import Image from "next/image";
import sun1 from '../../public/images/sun1.png';
import moon2 from '../../public/images/moon2.png' 

export default function ButtonPage() {

    const [status, setStatus] = useState();
    const [isHovered, setIsHovered] = useState(false);

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


    const updateStatusOn = () =>{

        const res = fetch("/api/updatestatus", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({updateStatus:1}),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.message)
            });

        window.location.reload();

    }


    const updateStatusOff = () =>{

      const res = fetch("/api/updatestatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({updateStatus:0}),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.message)
          });
      
      window.location.reload();

  }




return(
    // <div>
  <div className={`flex items-center justify-center h-screen ${status === 0 ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <div className="text-center">
            <Image src={status === 0 ?  moon2 : sun1 } alt="user"   className="cursor-pointer" style={{ width: 'auto', height: 'auto' }}/>
                <h1 className="text-3xl">Button Page</h1>
                <h2 className="text-2xl my-4">{status}</h2>
                <button
                    type="button"
                    className="bg-gray-500 text-white py-2 px-4 rounded m-2"
                    onClick={()=>{
                      updateStatusOn()
                     
                    }}
                >
                    On
                </button>
                <button
                    type="button"
                    className="bg-red-500 text-white py-2 px-4 rounded m-2"
                    onClick={()=>{
                      updateStatusOff()
                      
                    }}
                >
                    Off
                </button>
            </div>
        </div>
    // </div>
)

}