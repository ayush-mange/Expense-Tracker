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
                    {expensesData.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense?.time}</td>
                            <td>{expense?.date}</td>
                            <td>{expense?.text}</td>
                            <td>{expense?.category}</td>
                            <td>&#8377;{expense?.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
} 

export default HistoryTable;