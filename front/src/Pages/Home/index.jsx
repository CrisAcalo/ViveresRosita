import Card from "../../Components/Card"
import ProductDetail from "../../Components/ProductDetail"
import React from "react"
import { ShoppingCartContext } from "../../Context";
import { useParams } from "react-router-dom";

function Home() {
    const { items,
        filteredItems,
        setSearchByTitle,
        searchByTitle,
        setCategoryId,
        categories } = React.useContext(ShoppingCartContext);

    const { catName } = useParams();
    React.useEffect(() => {
        catName ?
            setCategoryId(categories[catName]) : setCategoryId(0);
    }, [catName]);

    const [collection, setCollection] = React.useState(null);

    React.useEffect(() => {
        !filteredItems ? setCollection(items) : setCollection(filteredItems);
    }, [filteredItems, items]);

    return (
        <>
            <div className="flex items-center justify-center mt-4">
                <h1 className='relative text-5xl font-bold text-center text-indigo-500'>Products
                    {catName && <h3 className="absolute text-sm right-0">{catName}</h3>}
                </h1>
            </div>
            <div className="w-3/5 my-6 flex justify-between">
                <input type="text"
                    className="w-4/5 p-2 rounded-lg shadow-md shadow-indigo-200/80
                focus:outline-none border-2 border-indigo-500"
                    placeholder="Search..."
                    value={searchByTitle}
                    onChange={(e) => {
                        setSearchByTitle(e.target.value);
                    }} />
                {/* Select para seleccionar la categoria y filtrar los productos */}
                <select
                    className="p-2 rounded-lg shadow-md shadow-indigo-200/80
                focus:outline-none border-2 border-indigo-500"
                    onChange={(e) => {
                        setCategoryId(e.target.value);
                    }}>
                    <option value={0}>All</option>
                    {categories && categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

            </div>
            <div>
                {collection ? (
                    <div className='grid grid-cols-4 gap-4 w-full max-w-screen-lg'>
                        {collection.map((item) => (
                            <Card key={item.id} data={item} />
                        ))}
                    </div>
                ) : (<p>Loading...</p>)}
                {collection && searchByTitle && collection.length === 0 &&
                    <p className='text-center'>No results found</p>
                }
            </div>
            <ProductDetail />
        </>
    )
}

export default Home
