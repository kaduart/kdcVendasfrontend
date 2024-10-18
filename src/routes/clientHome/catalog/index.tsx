import ButtonNextPage from '../../../components/buttons/button-next-page';
import CatalogCard from '../../../components/catalogCard';
import Search from '../../../components/product/searchProduct';
import './styles.css';
import { Product } from '../../../models/product';
import { useEffect, useState } from 'react';
import * as productService from '../../../services/product-service';

type QueryParam = {
    page: number;
    size: number;
    name: string;
}
export default function Catalog() {

    const [queryParams, setQueryParams] = useState<QueryParam>({
        page: 0,
        size: 12,
        name: ''
    });

    const [isLastPage, setLastPage] = useState(false)
    const [products, setProducts] = useState<Product[]>([]);
    const [erro, setErro] = useState();

    useEffect(() => {
        productService.findPageRequest(queryParams.page, queryParams.name, queryParams.size)
            .then((response) => {
                const nextPageList = response.data.content;

                setLastPage(response.data.last);

                setProducts(products.concat(nextPageList));
            }).catch((error) =>
                setErro(error.response.data)
            );
    }, [queryParams]);

    function handleNewSearchValue(value: string) {
        setProducts([]);

        setQueryParams({
            ...queryParams,
            page: 0,
            size: 12,
            name: value
        });
    }

    function handleClickEvent(event: number) {

        setQueryParams({
            ...queryParams,
            page: event,
            size: 12,
            name: queryParams.name
        });
    }

    return (
        <main>
            <section id="catalog-section" className="kdc-container">
                <Search onSearchValue={handleNewSearchValue} />

                <div className="kdc-catalog-cards kdc-mb20 kdc-mt20">

                    {
                        products.length > 0 && products
                            ? products.map((searchProduct: Product, index: number) =>
                                <CatalogCard key={index} product={searchProduct} />)
                            : erro || <h3 >No data for showing</h3>

                    }

                </div>

                {
                    !isLastPage &&
                    < ButtonNextPage onClickEvent={handleClickEvent} text="Carregar mais" />
                }

            </section>
        </main>

    )
}