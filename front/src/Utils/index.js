/**
 * Function to calculate the total price of the products in a new order
 * @param {array} product - array of objects
 * @returns {number} - total price of the products in the cart
 */
const totalPrice = (product) => {
    let total = 0;
    product.map(product => total += Number(product.price));
    return total;
}

const totalPriceOrder = (orderItems) => {
    let total = 0;
    orderItems.map(item => total += Number(item.product.price) * item.quantity);
    return total;
}

export { totalPrice, totalPriceOrder };