import React , { useEffect, useState } from "react";
import ExpenseTable from "../../components/table/expense-table";
// import { collection, getDocs } from "firebase/firestore";
import { useUserAuth } from "../../context/UserAuthContext";
import { database } from "../../firebase/fb-config";
import { collection, getDocs , query , where } from "firebase/firestore";
import IncomeTable from "../../components/table/income-table";




interface Expense {
    time: string;
    date: string;
    text: string;
    category: string;
    amount: number | string;
    income: number | string;
  }


interface YourData {
    id: string;
    text: string;
    date: string;
    category: string;
    amount: number | string;
    income: number | string;
    time:string;

    // Define other properties of your data here
  }


const Income = () => {
    const { user } = useUserAuth();
    const[ data , setData ] = useState<YourData[]> ([])
    const value = collection(database,"Income");
    const[ income , setIncome ]             = useState<any[]>([])
    const[ totalIncome , setTotalIncome ]   = useState<number>();
    const[ userUID , setUserUID ]           = useState()



    console.log(user);
    
    // Query
    // const incomeQuery = query(
    //     collection(database,"Income"),
    //     where("income",">",0)
    // )

    useEffect(()=>{
        try {
          setUserUID(user.uid)
        } catch (error) {
          
        }
      },[])

     // FireStore
     if(userUID){
        const getData = async()=>{
            const q = query(collection(database,"Income"),where("userEmail","==",user.email))
            const dbData = await getDocs(q);
            setData(dbData.docs.map(doc=>({...doc.data(),id:doc.id})) as YourData[])
            try {
                if (userUID) {
                    const incomeQuery = query(
                        collection(database,"Income"),
                        where("userEmail","==",user.email)
                    )
                    const querySnapshot = await getDocs(incomeQuery);
                    const incomeData: number[] = querySnapshot.docs.map((doc) => doc.data().income) as number[];
                    setIncome(incomeData);

                    const total = incomeData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                    setTotalIncome(total);
                }
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
        }
        getData();
     }
        

    useEffect(()=>{
        setInterval(() => {

                console.log(data);
                console.log(income);
                console.log(totalIncome);
                
                
                
        }, 8000 );
    }, [])

    const transformedData: Expense[] = data.map(item => {
        return {
            id: item.id,
            text: item.text,
            date: item.date,
            category: item.category,
            amount: item.amount,
            time: item.time, 
            income: item.income
        };
    });

    console.log(transformedData);

    return(
        <div className="gap-3 flex flex-col">
            <div >
                <div className="bg-[rgb(48,48,48)] w-[100%] h-max p-3">
                        <p className="text-white text-lg font-medium mb-[2%]">Total Income : &#8377;{totalIncome} </p>
                        
                </div>
            </div>

            <div id="history" className="w-[99%] h-[200px] ">
                    <div className="bg-[rgb(48,48,48)] w-[100%] h-max p-3">
                    <p className="text-white text-lg font-medium mb-[2%]">Income History : </p>
                    <div>
                        {/* <ExpenseTable expensesData={transformedData}/> */}
                        <IncomeTable incomeData={transformedData}/>
                    </div>
                    </div>

            </div>


        </div>
        
    )
}

export default Income;