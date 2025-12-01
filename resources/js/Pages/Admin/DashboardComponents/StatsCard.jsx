import React from "react";

const StatsCard = ({ stats, title }) => {
    return (
        <div className="w-full aspect-4/3 flex relative flex-col justify-between bg-bluey-light rounded-lg min-h-[14rem] p-4">
            <div>
                <h5 className="font-bold text-xl text-indigo-950">{title}</h5>
                <span className="font-light">Minggu ini</span>
            </div>
            <span className="text-right flex justify-end items-end font-semibold text-6xl text-bluey mb-10">
                {stats}
            </span>
            <div className="absolute w-3 h-20 right-0 bottom-12 bg-bluey"></div>
        </div>
    );
};

export default StatsCard;
