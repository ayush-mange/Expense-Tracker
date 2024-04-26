import React , { useEffect, useState } from "react";
import ExpenseTable from "../../context/table/expense-table";
import { collection, getDocs , query , where} from "firebase/firestore";
import { useUserAuth } from "../../context/UserAuthContext";
import { database } from "../../firebase/fb-config";



interface Expense {
    time: string;
    date: string;
    text: string;
    category: string;
    amount: number | string;
    expense: number | string;
  }


interface YourData {
    id: string;
    text: string;
    date: string;
    category: string;
    amount: number | string;
    expense: number | string;



    // Define other properties of your data here
  }


const Expenses = () => {
    const { user } = useUserAuth();
    const[ data , setData ] = useState<YourData[]> ([])
    const value = collection(database,"Expense");
    const[ totalExpense , setTotalExpense ] = useState<number>();
    const[ expense , setExpense ]             = useState<any[]>([])
    const[ userUID , setUserUID ]           = useState()


    console.log(user);
    
    useEffect(()=>{
        try {
          setUserUID(user.uid)
        } catch (error) {
          
        }
      },[])

    
     // FireStore
    if(userUID){
        const getData = async()=>{
            const q = query(collection(database,"Expense"),where("userEmail","==",user.email))
            const dbData = await getDocs(q);
            setData(dbData.docs.map(doc=>({...doc.data(),id:doc.id})) as YourData[])
            try {
                if (userUID) {
                    const expenseQuery = query(collection(database,"Expense"),where("userEmail","==",user.email))
                    const expenseQuerySnapshot = await getDocs(expenseQuery);
                    const expenseData: number[] = expenseQuerySnapshot.docs.map((doc) => doc.data().expense) as number[];
                    setExpense(expenseData);
    
                    const totalExpenseValue = expenseData?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                    setTotalExpense(totalExpenseValue);
                }
                
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        getData();
        console.log(data);
    }
        

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
            expense: item.expense,
            time: "12:45", // You might need to set a default or extract the 'time' value from somewhere
        };
    });

    console.log(transformedData);

    return(
        <div className="gap-3 flex flex-col">
            <div >
                <div className="bg-[rgb(48,48,48)] w-[100%] h-max p-3">
                    <p className="text-white text-lg font-medium mb-[2%]">Total Expense : &#8377;{totalExpense} </p>
                                    
                 </div>
            </div>
            <div id="history" className="w-[99%] h-[200px] ">
                    <div className="bg-[rgb(48,48,48)] w-[100%] h-max p-3">
                    <p className="text-white text-lg font-medium mb-[2%]">Expense History : </p>
                    <div>
                        <ExpenseTable expensesData={transformedData}/>
                    </div>
                    </div>

                </div>
        </div>
        
    )
}

export default Expenses;