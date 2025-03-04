import React, { useEffect, useState } from "react";
import { getUsers } from "../../../api/usersApi";
import { getProducts } from "../../../api/productsApi";
import { getOrders } from "../../../api/ordersApi";
import { getCategories } from "../../../api/categoriesApi";
import { useAdminUI } from "../../Context/AdminUIContext";
import StatCard from "../../Components/StatCard";

const Dashboard = () => {
    const { setGlobalAlert } = useAdminUI();
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        orders: 0,
        categories: 0,
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const users = await getUsers();
            const products = await getProducts();
            const orders = await getOrders();
            const categories = await getCategories();
            setStats({
                users: users.length,
                products: products.length,
                orders: orders.length,
                categories: categories.length,
            });
        } catch (error) {
            setGlobalAlert({ type: "error", messages: ["Error al cargar estadísticas"] });
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Usuarios" value={stats.users} color="bg-blue-500" />
                <StatCard title="Productos" value={stats.products} color="bg-green-500" />
                <StatCard title="Órdenes" value={stats.orders} color="bg-red-500" />
                <StatCard title="Categorías" value={stats.categories} color="bg-yellow-500" />
            </div>
        </div>
    );
};

export default Dashboard;
