import './styles.css';
import { Product } from '../../models/product';
import { Link } from 'react-router-dom';

type Props = {
    product: Product;
}

export default function CatalogCard({ product }: Props) {
    return (
        <Link to={`/product-details/${product.id}`} >
            <div className="kdc-card">
                <div className="kdc-catalog-card-top kdc-line-bottom">
                    <img src={product.imgUrl} alt={product.name} />
                </div>

                <div className="kdc-catalog-card-bottom">

                    <h3>
                        {product.price}
                    </h3>
                    <h4>
                        {product.name}
                    </h4>

                </div>
            </div>
        </Link>
    )
}