import React from "react";

const StatCard = ({ title, value, color }) => {
    return (
        <div className={`${color} text-white p-6 rounded-lg shadow-md`}>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    );
};

export default StatCard;
