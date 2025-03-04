import React from "react";

const Table = ({ headers, data }) => {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full border-collapse">
                <thead className="bg-indigo-500 text-white">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="p-3 text-left">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b hover:bg-gray-100">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="p-3">{cell}</td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headers.length} className="p-3 text-center">No hay datos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
