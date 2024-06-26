import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../../context/UserAuthContext";
import { database } from "../../../firebase/fb-config";
import { addDoc, collection } from "firebase/firestore";
// import { ConditionalExpression } from "typescript";
import toast from "react-hot-toast";

interface ExpenseCardProps{
    setExpenseCard : React.Dispatch<React.SetStateAction<boolean>>;
    balance?: number | undefined;

}

interface FormData {
    text: string;
    amount: number;
    category: string;
    date:string;
}

const Categories: string[] = ["Food" , "Clothing" , "Travel"];

const ExpenseCard:React.FC<ExpenseCardProps> = ({setExpenseCard , balance }) => {
    const {user} = useUserAuth(); 
    const[uid , setUID] = useState("")
    const value = collection(database,"Expense");
    const val = collection(database,"History")


    useEffect(()=>{
        try {
            setUID(user.uid)
        } catch (error) {
            console.log(error);
            
        }
        
        console.log(balance);
        
    },[])
    

    const[ formData , setFormData ] = useState<FormData>({
        text: "",
        amount: 0,
        category: Categories[0],
        date:"",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const {name , value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === "amount" ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(formData);
        //  console.log(user.uid);
        
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

      const time = new Intl.DateTimeFormat("en-IN", options).format(now);
      const todaydate = new Intl.DateTimeFormat("en-IN", dateOptions).format(now);
    //   console.log(formattedTime);
      console.log(todaydate);
      
      
        
        const { text , category , amount , date } = formData;
        
        const res = await fetch(
            "https://savesphere-a38d8-default-rtdb.asia-southeast1.firebasedatabase.app/RecentHistory.json",
            {
                method:  "POST",
                headers: {
                "Content-type" : "application/json",
                },
                body: JSON.stringify({
                    text,
                    category,
                    amount,
                    date,
                    time,
                    uid
                }),
            }
        );


        // if(res){
        //     toast.error("data stored")
        // }else{
        //     toast.error("pls fill the data")
        // }

                // Firestore Database
        if ((balance !== undefined && amount>balance)|| balance === undefined) {
            toast.error("Unsufficient balance");
        }else{
            if (uid==="" || uid===undefined) {
                toast.error("please login")
            }else{
                if (amount === 0) {
                    toast.error("amount should not be 0")
                }else{
                    if (date===""||date===undefined) {
                        await addDoc(value,{text:text , category: category , expense: amount , userID : uid ,userEmail:user.email, date:todaydate , time:time});
                    await addDoc(val,{text:text , category: category , amount: amount , userID : uid,userEmail:user.email , date:todaydate , time: time});
                    toast.success("data stored");
                    }else{
                        await addDoc(value,{text:text , category: category , expense: amount , userID : uid,userEmail:user.email , date:date , time: time});
                        await addDoc(val,{text:text , category: category , amount: amount , userID : uid,userEmail:user.email , date:date , time: time});
                        toast.success("data stored");
                    }
                    
                }
            }
           
        }
       


        setExpenseCard(false);


    };

    return(<>
        <div className="absolute  ml-[10%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[300px] h-[400px] rounded-md shadow-sm bg-[#282828] p-5 ">
                <div className="flex flex-row justify-between ">
                    <p className="text-xl font-normal text-white">Add Expense</p>
                    <p className="cursor-default hover:text-[#c9c8c8]" onClick={()=>{setExpenseCard(false)}}> &#10005;</p>
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
                    <button type="submit" className="mt-[10%] bg-[#EA4C4C] p-2 rounded-md">Submit</button>
                </form>
                </div>
            </div>
        </div>
    </>)
}

export default ExpenseCard;