import './styles.css'
import PrdoductCategory from '../productCategory'
import { Product } from '../../../models/product';

type Props = {
    product: Product;
}

export default function ProductDetailsCard({ product }: Props) {
    return (
        <div className="kdc-card kdc-mb20">
            <div className="kdc-product-details-top kdc-line-bottom">
                <img src={product.imgUrl} alt="{product.name}" />
            </div>
            <div className="kdc-product-details-bottom">
                <h3>{product.price.toFixed(2)}</h3>
                <h4>{product.name}</h4>
                <p>
                    {product.description}
                </p>
                <div className="kdc-category-container" >
                    {product.categories.map((category) => (
                        <PrdoductCategory key={category.id} name={category.name} />
                    ))}
                </div>
            </div>
        </div>
    )
}