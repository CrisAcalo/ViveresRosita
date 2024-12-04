/**
 * Function to calculate the total price of the products in a new order
 * @param {array} product - array of objects
 * @returns {number} - total price of the products in the cart
 */
const totalPrice = (product) => {
    let total = 0;
    product.map(product => total += product.price);
    return total;
}

export { totalPrice };