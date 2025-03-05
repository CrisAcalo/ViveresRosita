import React, { useState, useEffect } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

const Table = ({ headers, data }) => {
    const [sortColumn, setSortColumn] = useState(0); // Ordenar por la primera columna por defecto
    const [sortDirection, setSortDirection] = useState("asc");
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        handleSort(0); // Aplicar ordenación inicial en la primera columna
    }, [data]);

    // Función para ordenar los datos
    const handleSort = (index) => {
        let newDirection = "asc";
        if (sortColumn === index && sortDirection === "asc") {
            newDirection = "desc";
        }

        setSortColumn(index);
        setSortDirection(newDirection);

        const sorted = [...data].sort((a, b) => {
            const valueA = a[index];
            const valueB = b[index];

            if (typeof valueA === "number" && typeof valueB === "number") {
                return newDirection === "asc" ? valueA - valueB : valueB - valueA;
            }

            return newDirection === "asc"
                ? String(valueA).localeCompare(String(valueB))
                : String(valueB).localeCompare(String(valueA));
        });

        setSortedData(sorted);
    };

    return (
        <div className="overflow-x-scroll max-h-[75vh] bg-white shadow-md rounded-lg w-full">
            <table className="border-collapse w-full">
                <thead className="bg-indigo-500 text-white">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="p-3 text-left cursor-pointer select-none"
                                onClick={() => handleSort(index)}
                            >
                                <div className="flex items-center gap-1">
                                    {header}
                                    {sortColumn === index && (
                                        sortDirection === "asc" ? (
                                            <ArrowUpIcon className="w-4 h-4" />
                                        ) : (
                                            <ArrowDownIcon className="w-4 h-4" />
                                        )
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.length > 0 ? (
                        sortedData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b hover:bg-gray-100">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="p-3">
                                        {cell}
                                    </td>
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
