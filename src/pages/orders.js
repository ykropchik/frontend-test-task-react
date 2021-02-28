import React from 'react';
import {getOrders, deleteOrder} from '../localStorage';

class Orders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: null
        }
    }

    componentDidMount() {
        let orders = getOrders();
        this.setState({orders: orders});
    }

    deleteOrder(orderId) {
        deleteOrder(orderId);
        this.componentDidMount();
    }

    render() {
        let ordersList;

        if (this.state.orders === null) {
            ordersList = null;
        } else {
            ordersList = Object.keys(this.state.orders).map(orderId => {
                return(
                    <div className="table-item" key={orderId} order-id={orderId}>
                        <span>{this.state.orders[orderId].cityName}</span>
                        <span>{this.state.orders[orderId].date.split(' ')[0]}</span>
                        <span>{this.state.orders[orderId].date.split(' ')[1]}</span>
                        <span>{this.state.orders[orderId].name}</span>
                        <span>{'+7' + this.state.orders[orderId].phone}</span>
                        <button className="del-btn" onClick={() => this.deleteOrder(orderId)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#db001b" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                        </button>
                    </div>
                )
                
            })
        }

        return(
            <div id="orders-wrap">
                <div id="orders-header">
                    <span>Город</span>
                    <span>Дата</span>
                    <span>Время</span>
                    <span>Имя</span>
                    <span>Номер телефона</span>
                    <span></span>
                </div>
                <div id="orders-table">
                    {ordersList}
                </div>
            </div>
        )
    }
    
}

export default Orders;