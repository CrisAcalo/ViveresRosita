import React from "react";
import { ShoppingCartContext } from "../../Context";
import { CalendarDaysIcon, ChevronRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const OrdersCard = (props) => {
    const { id, date, totalPrice, totalProducts } = props;

    return (
        <div className="flex flex-col w-full">
            <span className="text-sm font-light mx-auto w-full text-center">{id}</span>
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                    <div className="flex gap-3">
                        <CalendarDaysIcon className="h-6 w-6 text-indigo-500" />
                        <p>{date}</p>
                    </div>
                    <div className="flex gap-3">
                        <ShoppingBagIcon className="h-6 w-6 text-indigo-500" />
                        <p>{totalProducts} articles</p>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <p className="text-2xl font-bold text-indigo-500">${totalPrice}</p>
                    <ChevronRightIcon className="h-10 w-10 text-indigo-500" />
                </div>
            </div>
        </div>
    )
}

export default OrdersCard;