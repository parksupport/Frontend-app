"use client"

import {  useState } from "react"
import Button from "../Buttons"
import { groteskText, groteskTextMedium } from "@/app/fonts"
import itemDetails from '@/data/data.json'
import './Contravention.css'
import { ChevronDown, MoveDiagonal } from "lucide-react"



const ContraventionTable = ({ invoices }) => {
    const [visibleCount, setVisibleCount] = useState(3);

    const handleButtonClick = () => {
        setVisibleCount((prevCount) => prevCount + 1);
    };

    return (
        <div className="w-full max-w-[680px] bg-white rounded-[1.25rem] py-[1.5rem] px-5">
            <div className="flex justify-between flex-row items-center">
            <h1 className={`text-[2rem] text-[#000000] ${groteskTextMedium.className} `}>Contravention</h1>  <button><MoveDiagonal /></button>

            </div>
            <table className="w-full border border-solid border-[#C5D5F8] rounded-[12px] border-collapse-separate ">
                <thead className="border-b border-b-[#C5D5F8]">
                    <tr className="border-b border-b-[#C5D5F8] ">
                        <th className={`text-[#757575] px-3 py-[0.75rem]  text-left   ${groteskText.className}`}>Contravention Type</th>
                        <th className={`text-[#757575] px-4 py-[0.75rem]  text-left   ${groteskText.className}`}>Vehicle Reg Number</th>
                        <th className={`text-[#757575] px-4 py-[0.75rem] text-left   ${groteskText.className}`}>Issuing Authority</th>
                        <th className={`text-[#757575] px-4 py-[0.75rem] text-left   ${groteskText.className}`}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {itemDetails.contravention.slice(0, visibleCount).map((invoice) => (
                        <tr key={invoice.ticket} className="">
                            <td className={`text-[#212121] px-[0.75rem] py-[0.75rem] ${groteskText.className}` }>{invoice.ticket}</td>
                            <td className={`text-[#212121] px-[0.75rem] py-[0.75rem] ${groteskText.className}` }>{invoice.reg_num}</td>
                            <td className={`text-[#212121] px-[0.75rem] py-[0.75rem] ${groteskText.className}` }>{invoice.issuing_auth}</td>
                            <td className={`text-[#212121] px-[0.75rem] py-[0.75rem] ${groteskText.className}` }>{invoice.status}</td>
                        </tr>
                    ))}
                </tbody>
                <div className="flex items-center flex-row justify-end mb-[1.25rem] mr-[8px]">
            {visibleCount < itemDetails.contravention.length && (
                <Button
                    variant="quinary"
                    onClick={handleButtonClick}
                    className="items-center flex-row flex py-[0.20rem] px-[12px]"
                >
                    View more <ChevronDown className="w-[15px] h-[15px] ml-[8px]" />
                </Button>
            )}
            </div>
            </table>
           
        </div>
    );
};

export default ContraventionTable;
