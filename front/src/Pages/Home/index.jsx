import React, { useState, useEffect, useContext } from "react";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";
import { useParams } from "react-router-dom";
import { config } from "../../../config/config";
import { MagnifyingGlassIcon, TagIcon, AdjustmentsVerticalIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";


function Home() {
    const {
        items, setItems,
        filteredItems, setSearchByTitle, searchByTitle,
        setCategoryId, categories, categoryId
    } = useContext(ShoppingCartContext);

    const { catName } = useParams();

    // Filtros y ordenamiento
    const [filterPrice, setFilterPrice] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [collection, setCollection] = useState(null);

    useEffect(() => {
        catName ? setCategoryId(categories[catName]) : setCategoryId(0);
    }, [catName]);

    useEffect(() => {
        fetchProducts();
    }, [categoryId]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${config.domain}/api/v1/products?categoryId=${categoryId}`);
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (!items) return;

        let filtered = filteredItems ? [...filteredItems] : [...items];

        // Filtrar por precio
        if (filterPrice) {
            const priceLimit = parseFloat(filterPrice);
            filtered = filtered.filter(product => parseFloat(product.price) <= priceLimit);
        }

        // Ordenar según criterio seleccionado
        if (sortBy === "priceAsc") {
            filtered = [...filtered].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortBy === "priceDesc") {
            filtered = [...filtered].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sortBy === "dateNewest") {
            filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === "dateOldest") {
            filtered = [...filtered].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        setCollection(filtered);
    }, [filteredItems, items, filterPrice, sortBy]);


    return (
        <>
            <div className="flex items-center justify-center mt-4">
                <h1 className="relative text-5xl font-bold text-center text-indigo-500">
                    Productos
                    {catName && <h3 className="absolute text-sm right-0">{catName}</h3>}
                </h1>
            </div>

            {/* Filtros */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 my-6 px-4">
                <div className="w-full md:w-auto flex flex-wrap justify-center gap-4 bg-white shadow-md rounded-lg p-4 border border-indigo-300">

                    {/* Buscar producto */}
                    <div className="relative w-full md:w-60">
                        <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-indigo-500" />
                        <input
                            type="text"
                            className="w-full p-2 pl-10 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 border border-indigo-300 transition duration-200"
                            placeholder="Buscar producto..."
                            value={searchByTitle}
                            onChange={(e) => setSearchByTitle(e.target.value)}
                        />
                    </div>

                    {/* Filtrar por Categoría */}
                    <div className="relative w-full md:w-40">
                        <TagIcon className="absolute left-3 top-2.5 w-5 h-5 text-indigo-500" />
                        <select
                            className="w-full p-2 pl-10 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 border border-indigo-300 transition duration-200"
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value={0}>Categorías</option>
                            {categories && categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Filtrar por Precio Máximo */}
                    <div className="relative w-full md:w-40">
                        <CurrencyDollarIcon className="absolute left-3 top-2.5 w-5 h-5 text-indigo-500" />
                        <input
                            type="number"
                            className="w-full p-2 pl-10 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 border border-indigo-300 transition duration-200"
                            placeholder="Precio máx."
                            value={filterPrice}
                            onChange={(e) => setFilterPrice(e.target.value)}
                        />
                    </div>

                    {/* Ordenar por */}
                    <div className="relative w-full md:w-48">
                        <AdjustmentsVerticalIcon className="absolute left-3 top-2.5 w-5 h-5 text-indigo-500" />
                        <select
                            className="w-full p-2 pl-10 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 border border-indigo-300 transition duration-200"
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="">Ordenar por</option>
                            <option value="priceAsc">Precio: menor a mayor</option>
                            <option value="priceDesc">Precio: mayor a menor</option>
                            <option value="dateNewest">Más recientes</option>
                            <option value="dateOldest">Más antiguos</option>
                        </select>
                    </div>

                </div>
            </div>


            {/* Productos */}
            <div>
                {collection ? (
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-lg mx-auto"

                    >
                        {collection.map((item) => (
                            <Card key={item.id} data={item} />
                        ))}
                    </div>
                ) : (
                    <p>Cargando productos...</p>
                )}
                {collection && searchByTitle && collection.length === 0 && (
                    <p className="text-center">No se encontraron resultados</p>
                )}
            </div>

            <ProductDetail />
        </>
    );
}

export default Home;
