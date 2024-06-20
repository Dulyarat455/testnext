import Image from "next/image";
import { useState } from 'react';
import Navbar from "@/components/navbar";
import Remove from '../../public/images/Remove.png';
import drive1 from '../../public/images/drive1.png' 
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {


    const [base64, setBase64] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [message, setMessage] = useState("Upload image to clound success");
    const [messagestatus, setMessagestatus] = useState(true);
    const [info, setInfo] = useState({ test:" " }); 
  
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const base64String = await convertToBase64(file);
        setBase64(base64String);
      }

    }

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const uploadImage = () =>{
      const res = fetch("/api/sentimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log(data.success);

            setMessage(data.message);
            setMessagestatus(true);

            setTimeout(() => {
              router.push("/workspace_dailyexpense");
            }, 1000);
          } else {
            console.log(data);
            setMessage(data.message);
            setMessagestatus(false);
          }
        });

    }


  return (
    <div>
    <Navbar></Navbar>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
    <div  
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Image src={isHovered ? drive1 : Remove} alt="user"   className="cursor-pointer" style={{ width: 'auto', height: 'auto' }}/>
    </div>
    <div className="flex justify-center items-center ml-3 mb-4">
      {message && (
                <p
                  className={`${
                    messagestatus ? "text-green-400" : "text-red-500"
                  } w-full text-left text-sm`}
                >
                  {message}
                </p>
              )}
    </div>
    <div className="flex space-x-4">

      <button className="bg-blue-900 text-white py-2 px-4 rounded" onClick={
        ()=>{
          setIsHovered(!isHovered);
          uploadImage();
        }
      }>
        Uploaded
      </button>
      <button className="bg-gray-500 text-white py-2 px-4 rounded" >
        Download
      </button>
    </div>
    <br></br>
    
      
      <input type="file" onChange={handleFileChange} />
      <button onClick={() => {alert(base64)
        console.log(base64)}
      }>Show Base64</button>
      {base64 && (
        <div>
          {/* <h3>Base64 Output:</h3>
          <textarea value={base64} readOnly rows="10" cols="50"
          className="p-2 border border-gray-700 rounded bg-gray-800 text-white"
          /> */}
          <img src={base64} alt="Uploaded Image" style={{ maxWidth: '300px', marginTop: '10px' }} />
        </div>
      )}
    </div>
    </div>
  );
}