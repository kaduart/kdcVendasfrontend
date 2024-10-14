import './styles.css';
import { useEffect, useState } from "react"
import { OrderDTO } from "../../models/order"
import { useParams } from "react-router-dom";
import * as orderService from "../../services/order-service";
import { Link } from "react-router-dom";
export default function Confirmation() {

    const params = useParams();

    const [order, setOrder] = useState<OrderDTO>();

    useEffect(() => {
        orderService.findByIdRequest(Number(params.orderId)).then(response => setOrder(response.data));
    }, [params.orderId]);

    return (

        <main>
            <section id="cart-container-section" className="kdc-container">
                <>
                    <div className="kdc-card kdc-mb20">
                        {
                            order &&
                            order.items.map(item =>
                                <div className="kdc-cart-item-container kdc-line-bottom">
                                    <div className="kdc-cart-item-left">
                                        <img src={item.imgUrl} alt="Computador" />
                                        <div className="kdc-cart-item-description">
                                            <h3>{item.name}</h3>

                                        </div>
                                    </div>
                                    <div className="kdc-cart-item-right">
                                        {item.price}
                                    </div>
                                </div>
                            )
                        }
                        <div className="kdc-cart-total-container">
                            <h3>
                                R${order?.total.toFixed(2)}
                            </h3>
                        </div>
                    </div>
                    <div className="kdc-btn-page-container">
                        <button className="kdc-btn kdc-btn-blue">
                            Pedido realizado! Número {order?.id}
                        </button>
                        <button className="kdc-btn kdc-btn-white">
                            <Link to='/' >
                                Continuar comprando
                            </Link>
                        </button>
                
                    </div>
                </>


            </section>
        </main>

    )
}