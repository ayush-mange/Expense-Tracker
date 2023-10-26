import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import ExpenseCard from "../../components/sidebar/card/expense-card";
import IncomeCard from "../../components/sidebar/card/income-card";
import HistoryTable from "../../components/table/history-table";
import { database , realtimeDB } from "../../firebase/fb-config";
import { collection, getDocs , query , where } from "firebase/firestore";

// import { get, ref } from "firebase/database";
// import {app} from "../../firebase/fb-config";
// import { ref , onValue } from "firebase/database"

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
    income: number;
    expense: number;


    // Define other properties of your data here
  }


const Home = () => {
    const { user } = useUserAuth();
    const[ expenseCard , setExpenseCard ]   = useState<boolean>(false);
    const[ incomeCard , setIncomeCard ]     = useState<boolean>(false);
    const[ income , setIncome ]             = useState<any[]>([])
    const[ expense , setExpense ]             = useState<any[]>([])
    const[ totalIncome , setTotalIncome ]   = useState<number>();
    const[ totalExpense , setTotalExpense ] = useState<number>();
    const[ balance , setBalance ]           = useState<number>();


    // const[ realDB , setRealDB ]             = useState<YourData[]>([]);
    const value = collection(database,"History");

    // const val = collection(realtimeDB,"Expense");

    const[ data , setData ] = useState<YourData[]> ([])

    // Query
    const incomeQuery = query(
        collection(database,"Income"),
        where("income",">",0)
    )
    const expenseQuery = query(
        collection(database,"Expense"),
        where("expense",">",0)
    )
    // FireStore
    useEffect(()=>{
        const getData = async()=>{
            const dbData = await getDocs(value);
            setData(dbData.docs.map(doc=>({...doc.data(),id:doc.id})) as YourData[])
            // Income Query
            try {
            const incomeQuerySnapshot = await getDocs(incomeQuery);
            const incomeData: number[] = incomeQuerySnapshot.docs.map((doc) => doc.data().income) as number[];
            setIncome(incomeData);

            const totalIncomeValue = incomeData?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            setTotalIncome(totalIncomeValue);

            const expenseQuerySnapshot = await getDocs(expenseQuery);
                const expenseData: number[] = expenseQuerySnapshot.docs.map((doc) => doc.data().expense) as number[];
                setExpense(expenseData);
    
                const totalExpenseValue = expenseData?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                setTotalExpense(totalExpenseValue);

                const bal = totalIncomeValue - totalExpenseValue;
                setBalance(bal);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }

                
        }
        getData();

        // console.log(data);
    },[])

    
    useEffect(()=>{
        setInterval(() => {
console.log(balance);


        }, 8000 );
    }, [])
    // RealTime
    // useEffect(()=>{
    //     const fetchData = async() =>{
    //         const DbRef = ref(realtimeDB, "RecentHistory")
    //         const snapshot = await get(DbRef)
        
    //         if (snapshot.exists()) {
    //             const fetchedData: YourData[] = [];
    //             snapshot.forEach((childSnapshot)=>{
    //                 fetchedData.push({
    //                     id: childSnapshot.key,
    //                 })
    //             })
    //             setRealDB(fetchedData)
    //         }else{
    //             console.log("empty array");
                
    //         }
    //     }
    //     fetchData();
    //     console.log(realDB);
        
    // },[])
    

    // const mockData = [{time:"12:45" , date:"15-10-2023" , text:"Expense" , category:"food",amount:"1200"}]
    
    const handleExpense = () => {
        if(expenseCard){
            setExpenseCard(false);
        }else{
            setExpenseCard(true);
        }
    }
    const handleIncome = () => {
        if(incomeCard){
            setIncomeCard(false);
        }else{
            setIncomeCard(true)
        }
    }

    
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

    // console.log(transformedData);

    
    

    return(
        <div id="home-header">
            <div className="flex justify-between items-center ">
                <div className="text-2xl font-semibold text-white ">Dashboard</div>
                <div className="text-white text-sm font-normal">{user?.email}</div>
            </div>
            <div id="container" className="mt-[3%] flex flex-col gap-4 justify-center">
                <div id="top" className="w-[99%] ">
                    <div className="bg-[rgb(48,48,48)] w-[100%] h-max p-3">
                            <div className="flex flex-row">
                                <div className="relative w-[40%] h-[200px] bg-[#d3cdcd] ">
                                    <p className=" absolute left-1/2 top-1/2 -translate-x-10 -translate-y-1/2">Graph</p>
                                </div>
                                <div className="ml-[2%]">
                                    <div className="text-[#b1b1b1] text-sm flex flex-row gap-24 mb-[15%]">
                                        <div>month : october</div>
                                        <div>year : 2023 </div>
                                    </div>
                                    <div className=" flex flex-col gap-3">
                                        <p className=" text-white text-lg font-semibold">Total Income : &#8377;{totalIncome}</p>
                                        <p className=" text-white text-lg font-semibold">Total Expense : &#8377;{totalExpense} </p>
                                    </div>

                                    <div>
                                        <p className="text-white mt-10">Balance : &#8377;{balance} </p>
                                    </div>
                                    
                                </div>
                            </div>
                    </div>
                </div>
                <div id="Categories" className="w-[99%]">
                    <div className="bg-[rgb(48,48,48)] w-[100%] h-max p-3">
                        <p className="text-white text-lg font-medium">Categories : </p>
                        <div className="flex flex-row justify justify-between px-10 mt-5 text-white text-base font-normal">
                            <div className="flex flex-row items-center gap-2 cursor-pointer " onClick={handleExpense}>
                                <div className="w-[30px] h-[30px] rounded-[50%] bg-[#EA4C4C]"/>
                                <div className="">Add Expense</div>
                            </div>
                            {expenseCard && <ExpenseCard setExpenseCard={setExpenseCard} balance={balance}/>}
                            <div className="flex flex-row items-center gap-2 cursor-pointer " onClick={handleIncome}>
                                <div className="w-[30px] h-[30px] rounded-[50%] bg-[#25B7AE]"/>
                                <div className="">Add Income</div>
                            </div>
                            {incomeCard && <IncomeCard setIncomeCard={setIncomeCard}/>}
                            <div className="flex flex-row items-center gap-2 cursor-pointer ">
                                <div className="w-[30px] h-[30px] rounded-[50%] bg-[#5B5B5B]"/>
                                <div className="">Create Category</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="history" className="w-[99%] h-[200px] ">
                    <div className="bg-[rgb(48,48,48)] w-[100%] h-max p-3">
                    <p className="text-white text-lg font-medium">History : </p>
                    <div>
                        <HistoryTable expensesData={transformedData}/>
                    </div>
                    </div>

                </div>
            </div>
            
        </div>

    )
}

export default Home;