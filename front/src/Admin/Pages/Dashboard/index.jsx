import React, { useEffect, useState, useContext } from "react";
import { getUsers } from "../../../api/usersApi";
import { getProducts } from "../../../api/productsApi";
import { getOrders } from "../../../api/ordersApi";
import { getCategories } from "../../../api/categoriesApi";
import { useAdminUI } from "../../Context/AdminUIContext";
import StatCard from "../../Components/StatCard";
import { ShoppingCartContext } from "../../../Context";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
    const { setGlobalAlert } = useContext(ShoppingCartContext);
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        orders: 0,
        categories: 0,
        totalSales: 0,
        topProducts: [],
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

            // Calcular total de ventas y productos más vendidos
            let totalSales = 0;
            let productSales = {};

            orders.forEach(order => {
                order.orderItems.forEach(item => {
                    totalSales += parseFloat(item.product.price) * item.quantity;

                    if (productSales[item.product.name]) {
                        productSales[item.product.name] += item.quantity;
                    } else {
                        productSales[item.product.name] = item.quantity;
                    }
                });
            });

            // Ordenar productos más vendidos
            const topProducts = Object.entries(productSales)
                .map(([name, quantity]) => ({ name, quantity }))
                .sort((a, b) => b.quantity - a.quantity)
                .slice(0, 5); // Solo los 5 más vendidos

            setStats({
                users: users.length,
                products: products.length,
                orders: orders.length,
                categories: categories.length,
                totalSales,
                topProducts,
            });
        } catch (error) {
            setGlobalAlert({ type: "error", messages: ["Error al cargar estadísticas"], duration: 4000 });
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Dashboard</h2>

            {/* Tarjetas de Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard title="Usuarios" value={stats.users} color="bg-blue-500" />
                <StatCard title="Productos" value={stats.products} color="bg-green-500" />
                <StatCard title="Órdenes" value={stats.orders} color="bg-red-500" />
                <StatCard title="Categorías" value={stats.categories} color="bg-yellow-500" />
                <StatCard title="Total Ventas" value={`$${stats.totalSales.toFixed(2)}`} color="bg-indigo-500" />
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Gráfico de Barras - Productos Más Vendidos */}
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold text-indigo-600">Productos Más Vendidos</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.topProducts}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="quantity" fill="#6366F1" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Gráfico de Pastel - Distribución de Ventas */}
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold text-indigo-600">Distribución de Ventas</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={stats.topProducts}
                                dataKey="quantity"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#6366F1"
                                label
                            >
                                {stats.topProducts.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={["#6366F1", "#22C55E", "#EF4444", "#EAB308", "#3B82F6"][index % 5]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
