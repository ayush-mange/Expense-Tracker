import React, { useEffect } from "react";
import { useState } from "react";
import { database } from "../../../firebase/fb-config";
import { addDoc, collection } from "firebase/firestore";
import { useUserAuth } from "../../../context/UserAuthContext";
// import { Alert } from "react-bootstrap";

interface IncomeCardProps {
    setIncomeCard : React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
    text: string;
    amount: number;
    category: string;
    userID:string;
    date : string;
    time : string;
}

const Categories: string[] = ["Salary" , "Mutual Fund" , "Trading" , "Insurance"];

const IncomeCard: React.FC<IncomeCardProps> = ({setIncomeCard}) => {
    const[uid,setUID] = useState("");
    const {user} = useUserAuth();
    const value = collection(database,"Income");
    const val = collection(database,"History")


    const[ formData , setFormData ] = useState<FormData>({
        text: "",
        amount: 0,
        category: Categories[0],
        userID : user?.uid,
        date: "",
        time : "",
    });

    useEffect(()=>{
        try {
            setUID(user.uid)
        } catch (error) {
            console.log(error);
        }
    },[ ])

    console.log(uid);
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const {name , value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === "amount" ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        setIncomeCard(false);

        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
           timeZone: "Asia/Kolkata",
           hour12: false, 
           hour: "2-digit",
           minute: "2-digit",
       };

       const dateOptions: Intl.DateTimeFormatOptions = {
           timeZone: "Asia/Kolkata",
           day: "2-digit",
           month: "2-digit",
           year: "numeric"
         };

     const currentTime = new Intl.DateTimeFormat("en-IN", options).format(now);
     const todaydate = new Intl.DateTimeFormat("en-IN", dateOptions).format(now);

     console.log(todaydate);
     
        
        const { text , category , amount  , userID ,date , time } = formData;

        // Firestore Database
        if(uid===""||uid===undefined){
            alert("please login")
        }else{
            if (amount===0) {
                alert("amount should be greater than 0")
            }else{
                if ((date==="" || date === undefined) && todaydate!=="") {
                    await addDoc(value,{text:text , category: category , income: amount , userID : userID , date:todaydate ,time : currentTime});
                    await addDoc(val,{text:text , category: category , amount: amount , userID : userID , date: todaydate , time : currentTime});
                }else{
                    await addDoc(value,{text:text , category: category , income: amount , userID : userID , date:date ,time : currentTime});
                await addDoc(val,{text:text , category: category , amount: amount , userID : userID , date: date , time : currentTime});
                }
                
            }
        }
        

    };


    return(<>
        <div className="absolute ml-[10%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[300px] h-[400px] rounded-md shadow-sm bg-[#282828] p-5 ">

                <div className="flex flex-row justify-between ">
                    <p className="text-xl font-normal text-white">Add Income</p>
                    <p className="cursor-default hover:text-[#c9c8c8]" onClick={()=>{setIncomeCard(false)}}> &#10005;</p>
                </div>
                <div className="mt-[20%] " >
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div id="text" className="">
                        <label>
                            text : 
                            <input className="text-white text-sm bg-[#555555] p-2 ml-2 rounded-md w-[78%] h-[60%] whitespace-normal"
                                type="textbox" 
                                name="text" 
                                value={formData.text} 
                                onChange={handleInputChange} />
                        </label>
                    </div>
                    <div id="amount ">
                        <label>
                             Amount :
                        <input className="text-white text-sm bg-[#555555] p-2 ml-2 rounded-md w-[65%]"
                            type="number" 
                            name="amount" 
                            value={formData.amount} 
                            onChange={handleInputChange} />
                        </label>
                    </div>
                    <div id="date ">
                        <label>
                             Date :
                        <input className="text-white text-sm bg-[#555555] p-2 ml-2 rounded-md w-[75%]"
                            type="date" 
                            name="date" 
                            value={formData.date} 
                            onChange={handleInputChange} />
                        </label>
                    </div>
                    
                    <div>
                        <label>
                            Category : 
                                <select className="text-white text-sm bg-[#555555] p-2 ml-2 rounded-md w-[61%]"
                                    name="category" 
                                    value={formData.category} 
                                    onChange={handleInputChange}>
                                        {Categories.map(category => (
                                            <option 
                                                key={category} 
                                                value={category}>
                                                {category}
                                            </option>
                                        ))}
                                </select>
                        </label>
                    </div>
                    <button type="submit" className="mt-[25%] bg-[#EA4C4C] p-2 rounded-md">Submit</button>
                </form>
                </div>
            </div>

            
        </div>
    </>)
}

export default IncomeCard;