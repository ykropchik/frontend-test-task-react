export function writeOrder(info) {
    localStorage.setItem(Object.entries(localStorage).length, JSON.stringify(info));
}

export function getOrders() {
    
    let orders = {};
    Object.keys(localStorage).forEach(key => {
        orders = {...orders, [key]: JSON.parse(localStorage.getItem(key))};
    })
    
    return orders;
}

export function deleteOrder(orderId) {
    localStorage.removeItem(orderId);
}