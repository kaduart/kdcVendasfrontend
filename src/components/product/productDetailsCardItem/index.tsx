import { Product } from "../../../models/product"
import ProductCategory from "../productCategory";

type Props = {
    product: Product;
}

export default function ProductDetailsCardItem({product}:Props) {
    return (
        <>
            <div className="kdc-product-details-top kdc-line-bottom">
                <img src={product.imgUrl} alt={product.name} />
            </div>
            <div className="kdc-product-details-bottom">
                <h3>{product.price.toFixed(2)}</h3>
                <h4>{product.name}</h4>
                <p>
                    {product.description}
                </p>
                <div className="kdc-category-container" >
                    {product.categories.map((category) => (
                        <ProductCategory key={category.id} name={category.name} />
                    ))}
                </div>
            </div>
        </>
    )
}