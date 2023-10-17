import React from "react";

interface Expense {
    time: string;
    date: string;
    text: string;
    category: string;
    amount: number | string;
  }

interface HistoryTableProps {
    expensesData : Expense[];
}

const HistoryTable:React.FC<HistoryTableProps> = ({expensesData}) => {

    // Reversing the Expense Data
    // const reverseData: Expense[] = expensesData.reverse();
    
    return(
        <>
            <table className=" w-full overflow-y-auto">
                <thead className=" border-b-2 border-b-blueGray-100 text-[#dadada] font-normal text-sm">
                    <tr>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Text</th>
                        <th>category</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody className="text-white text-sm text-center">
                    {expensesData.reverse().map((income, index) => (
                        <tr key={index}>
                            <td>{income?.time}</td>
                            <td>{income?.date}</td>
                            <td>{income?.text}</td>
                            <td>{income?.category}</td>
                            <td>&#8377;{income?.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
} 

export default HistoryTable;