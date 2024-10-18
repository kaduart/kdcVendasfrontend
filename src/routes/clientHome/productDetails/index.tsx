import ButtonPrimary from '../../../components/buttons/button-primary';
import ButtonPrimaryInverse from '../../../components/buttons/button-primary-inverse';
import ProductDetailsCard from '../../../components/product/productDetailsCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Product } from '../../../models/product';
import './styles.css';

import * as productService from '../../../services/product-service';
import * as cartService from '../../../services/cart-service';
import { ContextCartCount } from '../../../utils/context-cart';
import { Link } from 'react-router-dom';

export default function ProductDetails() {

    const params = useParams();
    const navigate = useNavigate();

    const { setContextCartCount } = useContext(ContextCartCount);

    const [product, setProduct] = useState<Product>();

    useEffect(() => {

        productService.findById(Number(params.productId))
            .then((response) => {
                if (response && response.status === 200) {
                    const prod = response.data as Product;

                    setProduct(prod);
                }
            })
            .catch(() =>
                navigate("/catalog")
            );
    }, [params, params.id]);

    function handleBuyClick() {
        if (product) {
            cartService.addProduct(product);
            setContextCartCount(cartService.getCart().items.length);
            navigate("/cart");
            console.log("Item added to cart");
        }
    }

    return (
        <main>
            <section id="section" className="kdc-container">
                {
                    product &&
                    <ProductDetailsCard product={product} />
                }

                <div className="kdc-btn-page-container">
                    <div className="" onClick={handleBuyClick}>
                        <ButtonPrimary text="Buy now" />
                    </div>

                    <Link to="/">
                        <ButtonPrimaryInverse text="Init" />
                    </Link>

                </div>
            </section>
        </main>
    )
}