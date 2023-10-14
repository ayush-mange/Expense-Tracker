import React from "react";

interface IncomeCardProps {
    setIncomeCard : React.Dispatch<React.SetStateAction<boolean>>;
}

const IncomeCard: React.FC<IncomeCardProps> = ({setIncomeCard}) => {
    return(<>
        <div className="absolute ml-[10%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[300px] h-[400px] rounded-md shadow-sm bg-[#282828] p-5 flex flex-row justify-between  ">
                <p className="text-xl font-normal text-white">Add Income</p>
                <p className="cursor-default hover:text-[#c9c8c8]" onClick={()=>{setIncomeCard(false)}}> &#10005;</p>
            </div>
        </div>
    </>)
}

export default IncomeCard;