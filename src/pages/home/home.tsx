import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import ExpenseCard from "../../components/sidebar/card/expense-card";
import IncomeCard from "../../components/sidebar/card/income-card";
import HistoryTable from "../../components/table/history-table";
// import { database } from "../../firebase/fb-config";
// import {app} from "../../firebase/fb-config";
import { ref , onValue } from "firebase/database"



const Home = () => {
    const { user } = useUserAuth();
    const[ expenseCard , setExpenseCard ]   = useState<boolean>(false);
    const[ incomeCard , setIncomeCard ]     = useState(false);
    const [data, setData] = useState(null);



    const mockData = [{time:"12:45" , date:"15-10-2023" , text:"Expense" , category:"food",amount:"1200"}]
    
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
                                        <div>month : </div>
                                        <div>year : </div>
                                    </div>
                                    <div className=" flex flex-col gap-3">
                                        <p className=" text-white text-lg font-semibold">Total Income : </p>
                                        <p className=" text-white text-lg font-semibold">Total Expense : </p>
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
                            {expenseCard && <ExpenseCard setExpenseCard={setExpenseCard}/>}
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
                        <HistoryTable expensesData={mockData}/>
                    </div>
                    </div>

                </div>
            </div>
            
        </div>

    )
}

export default Home;