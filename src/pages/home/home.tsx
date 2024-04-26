import React, { useEffect, useState , useRef } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import ExpenseCard from "../../components/sidebar/card/expense-card";
import IncomeCard from "../../components/sidebar/card/income-card";
import HistoryTable from "../../context/table/history-table";
import { database , realtimeDB } from "../../firebase/fb-config";
import { collection, getDocs , query , where } from "firebase/firestore";
import Chart from "chart.js/auto";
import { log } from "console";


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
    time:string;


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
    const[ userUID , setUserUID ]           = useState()
    const value = collection(database,"History");
    const[ data , setData ] = useState<YourData[]> ([])
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(()=>{
      setInterval(()=>{
          try {
            setUserUID(user.uid)
          } catch (error) {
            
          }
      },1000);
    },[]);

    console.log(userUID);
    

    // Query
    
    //   const incomeQuery = query(
    //     collection(database,"Income"),
    //     where("income",">",0)
    // )
    
    
    // FireStore
    if(user?.email){
      // console.log(userUID);
      
      const getData = async()=>{
        const q = query(collection(database,"History"),where("userEmail","==",user.email));
        const dbData = await getDocs(q);
        setData(dbData.docs.map(doc=>({...doc.data(),id:doc.id})) as YourData[])
        console.log(data); 
        
        // Income Query
        try {
          if (user.email) {
            // console.log(userUID);

            const incomeQuery = query(
              collection(database,"Income"),
              where("userEmail","==",user.email)
          )
            
            const incomeQuerySnapshot = await getDocs(incomeQuery);
              const incomeData: number[] = incomeQuerySnapshot.docs.map((doc) => doc.data().income) as number[];
              setIncome(incomeData);

              const totalIncomeValue = incomeData?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
              setTotalIncome(totalIncomeValue);

              const expenseQuery = query(collection(database,"Expense"),where("userEmail","==",user.email));
              const expenseQuerySnapshot = await getDocs(expenseQuery);
              const expenseData: number[] = expenseQuerySnapshot.docs.map((doc) => doc.data().expense) as number[];
              setExpense(expenseData);

              const totalExpenseValue = expenseData?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
              setTotalExpense(totalExpenseValue);

              const bal = totalIncomeValue - totalExpenseValue;
              setBalance(bal);
            
          }
            
        } catch (error) {
            console.error("Error fetching data: ", error);
        }

            
    }
    getData();
    }else{console.log("no users");
    }

    useEffect(()=>{
      if (totalIncome && totalExpense) {
        const bal = totalIncome - totalExpense;
        setBalance(bal);
        console.log(bal);
        
      }else{
        console.log("no balance");
        
      }
    },[2000])
        
    

        // console.log(data);

    
    useEffect(()=>{
        setInterval(() => {
          console.log(balance);


        }, 8000 );
    }, [])

    
    useEffect(() => {
        if (chartInstanceRef.current) {
          // Destroy the existing chart instance
          chartInstanceRef.current.destroy();
        }
    
        if (chartRef.current) {
          const ctx = chartRef.current.getContext("2d");
    
          if (ctx) {
            const validTotalIncome = totalIncome || 0;
            const validTotalExpense = totalExpense || 0;

            // Create a new chart instance
            chartInstanceRef.current = new Chart(ctx, {
              type: "bar",
              data: {
                labels: ["Income", "Expense"],
                datasets: [
                  {
                    label: "Amount",
                    data: [validTotalIncome, validTotalExpense],
                    backgroundColor: ["green", "red"],
                    barPercentage: 0.5, // Adjust the width of the bars (0.5 means 50% of available space)
                categoryPercentage: 0.5,
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                    legend: {
                      display: true,
                      labels: {
                        font: {
                          size: 10, // Adjust font size for the legend
                        },
                      },
                    },
                  },
                  layout: {
                    padding: {
                      left: 10, // Adjust padding on the left side of the graph
                      right: 10, // Adjust padding on the right side of the graph
                      top: 10, // Adjust padding on the top side of the graph
                      bottom: 10, // Adjust padding on the bottom side of the graph
                    },
                  },
                  maintainAspectRatio: false,
              },
            });
          }
        }
    
        // Cleanup: destroy the chart instance when the component is unmounted
        return () => {
          if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
          }
        };
      }, [totalIncome, totalExpense]);
    
    
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
            time: item.time, // You might need to set a default or extract the 'time' value from somewhere
        };
    });

    // console.log(transformedData);

    
    

    return (
      <div id="home-header" className="flex flex-col">
         <div className=" h-max p-3 mb-4">
          {/* <p className="text-white text-lg font-medium">Categories : </p> */}
          <div className="flex flex-row mt-5 text-white text-base font-normal">
            <div className="flex flex-row items-center gap-2 cursor-pointer mb-3" onClick={handleExpense}>
              {/* <div className="w-[30px] h-[30px] rounded-[50%] bg-[#EA4C4C]"></div> */}
              <div><img className="w-40 ml-[460%] " src={require("../../Assets/add-expense-button.png")} alt="" /></div>
            </div>
            {expenseCard && <ExpenseCard setExpenseCard={setExpenseCard} balance={balance}/>}
            <div className="flex flex-row items-center gap-2 cursor-pointer mb-3 " onClick={handleIncome}>
              {/* <div className="w-[30px] h-[30px] rounded-[50%] bg-[#25B7AE]"></div> */}
              <div><img className="w-40 ml-[475%] " src={require("../../Assets/add-income-button.png")} alt="" /></div>
            </div>
            {incomeCard && <IncomeCard setIncomeCard={setIncomeCard}/>}
            {/* <div className="flex flex-row items-center gap-2 cursor-pointer mb-3">
              <div className="w-[30px] h-[30px] rounded-[50%] bg-[#5B5B5B]"></div>
              <div>Create Category</div>
            </div> */}
          </div>
        </div>
        <div className="h-max p-3">
          <p className="text-white text-lg font-medium">History : </p>
          <div>
            <HistoryTable expensesData={transformedData}/>
          </div>
        </div>
        <div className=" h-max p-3 mb-4">
          <canvas ref={chartRef} width="200" height="250"></canvas>
        </div>
        <div className=" p-3 mb-4">
          <div className="pt-5">
            <div className="text-[#b1b1b1] text-sm flex flex-row gap-24 mb-[5%]">
              <div>month: April</div>
              <div>year: 2024 </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white text-lg font-semibold">Total Income : &#8377;{totalIncome}</p>
              <p className="text-white text-lg font-semibold">Total Expense : &#8377;{totalExpense}</p>
            </div>
            <div>
              <p className="text-white mt-10">Balance : &#8377;{balance}</p>
            </div>
          </div>
        </div>
       
        
      </div>
    );
    
}

export default Home;