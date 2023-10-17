import React , { useEffect, useState } from "react";
import ExpenseTable from "../../components/table/expense-table";
import { collection, getDocs } from "firebase/firestore";
import { useUserAuth } from "../../context/UserAuthContext";
import { database } from "../../firebase/fb-config";



interface Expense {
    time: string;
    date: string;
    text: string;
    category: string;
    amount: number | string;
  }


interface YourData {
    id: string;
    text: string;
    date: string;
    category: string;
    amount: number | string;


    // Define other properties of your data here
  }


const Expenses = () => {
    const { user } = useUserAuth();
    const[ data , setData ] = useState<YourData[]> ([])
    const value = collection(database,"Expense");

    console.log(user);
    


     // FireStore
     useEffect(()=>{
        const getData = async()=>{
            const dbData = await getDocs(value);
            setData(dbData.docs.map(doc=>({...doc.data(),id:doc.id})) as YourData[])
        }
        getData();
        console.log(data);
    },[])

    useEffect(()=>{
        setInterval(() => {
                console.log(data);
                
        }, 8000 );
    }, [])

    const transformedData: Expense[] = data.map(item => {
        return {
            id: item.id,
            text: item.text,
            date: item.date,
            category: item.category,
            amount: item.amount,
            time: "12:45", // You might need to set a default or extract the 'time' value from somewhere
        };
    });

    console.log(transformedData);

    return(
        <div id="history" className="w-[99%] h-[200px] ">
                    <div className="bg-[rgb(48,48,48)] w-[100%] h-max p-3">
                    <p className="text-white text-lg font-medium mb-[2%]">Expense History : </p>
                    <div>
                        <ExpenseTable expensesData={transformedData}/>
                    </div>
                    </div>

                </div>
    )
}

export default Expenses;