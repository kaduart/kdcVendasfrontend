import { useContext, useEffect, useState } from 'react';
import './styles.css';
import { OrderDTO } from '../../../models/order';
import * as cartService from '../../../services/cart-service';
import { Link, useNavigate } from 'react-router-dom';
import { ContextCartCount } from '../../../utils/context-cart';
import * as orderService from '../../../services/order-service';


export default function Cart() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState<OrderDTO>();

    const { setContextCartCount } = useContext(ContextCartCount);

    useEffect(() => {
        setCartItems(cartService.getCart());

        if (cartItems) {
            setCartItems(cartItems);
        }
    });


    const [cart, setCart] = useState<OrderDTO>(cartService.getCart());

    function handleCartClear() {
        cartService.clearCart();
        updatCart();
    }

    function handleIncreaseItem(productId: number) {
        cartService.increaseItem(productId);
        setCart(cartService.getCart());
    }

    function handleDecreaseItem(productId: number) {
        cartService.decreaseItem(productId);

        updatCart();
    }

    function updatCart() {
        const newCart = cartService.getCart();
        setCart(newCart);
        setContextCartCount(newCart.items.length);
    }

    function handlePlaceOrderClick() {
        if (cartItems) {

            orderService.placeOrderRequest(cartItems)
                .then((response) => {
                    cartService.clearCart();
                    setContextCartCount(0);
                    navigate(`/confirmation/${response.data.id}`);
                });
        }
    }

    return (
        <main>
            <section id="cart-container-section" className="kdc-container">
                {
                    cart.items.length === 0
                        ? (
                            <div className="">
                                <h1>Cart is empty </h1>
                            </div>
                        )
                        : (
                            <>
                                <div className="kdc-card kdc-mb20">
                                    {
                                        cart.items.map(item =>
                                            <div key={item.productId} className="kdc-cart-item-container kdc-line-bottom">
                                                <div className="kdc-cart-item-left">
                                                    <img src={item.imgUrl} alt="Computador" />
                                                    <div className="kdc-cart-item-description">
                                                        <h3>{item.name}</h3>
                                                        <div className="kdc-cart-item-quantity-container">
                                                            <div onClick={() => handleDecreaseItem(item.productId)} className="kdc-cart-item-quantity-btn">-</div>
                                                            <p>{item.quantity}</p>
                                                            <div onClick={() => handleIncreaseItem(item.productId)} className="kdc-cart-item-quantity-btn">+</div>
                                                        </div>
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
                                            R${cart.total.toFixed(2)}
                                        </h3>
                                    </div>
                                </div>
                                <div className="kdc-btn-page-container">
                                    <button onClick={handlePlaceOrderClick} className="kdc-btn kdc-btn-blue">
                                        Finalizar pedido
                                    </button>
                                    <button className="kdc-btn kdc-btn-white">
                                        <Link to='catalog' >
                                            Continuar comprando
                                        </Link>
                                    </button>
                                    <button className="kdc-btn kdc-btn-red"
                                        onClick={handleCartClear}>
                                        Clear cart
                                    </button>
                                </div>
                            </>
                        )
                }

            </section>
        </main>
    )

}