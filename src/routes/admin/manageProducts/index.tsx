import './styles.css';
import editImg from '../../../assets/images/edit.svg';
import deletImg from '../../../assets/images/delete.svg';
import { useEffect, useState } from 'react';
import { Product } from '../../../models/product';
import * as productService from '../../../services/product-service';
import Search from '../../../components/product/searchProduct';
import ButtonNextPage from '../../../components/buttons/button-next-page';
import DialogInfo from '../../../components/dialogInfo';
import DialogConfirmation from '../../../components/dialogConfirmation';
import ButtonPrimaryInverse from '../../../components/buttons/button-primary-inverse';
import { Link, useNavigate } from 'react-router-dom';

type QueryParam = {
    page: number;
    size: number;
    name: string;
}

export default function ManageProducts() {

    const navigate = useNavigate();

    const [queryParams, setQueryParams] = useState<QueryParam>({
        page: 0,
        size: 12,
        name: ''
    });

    const [dialogConfirmationData, setDialogConfirmationData] = useState({
        idProduct: 0,
        visible: false,
        message: 'Tem certeza?'
    });

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: 'Operacao com sucesso!'
    });

    const [isLastPage, setLastPage] = useState(false)
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        productService.findPageRequest(queryParams.page, queryParams.name, queryParams.size)
            .then((response: any) => {
                const nextPageList = response.data.content;

                setLastPage(response.data.last);

                setProducts(products.concat(nextPageList));
            });

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

    function handleDeleteClick(productId: number) {
        setDialogConfirmationData({ ...dialogConfirmationData, idProduct: productId, visible: true });
    }

    function handleUpdateClick(productId: number) {
        navigate(`/admin/products/${productId}`);
    }

    function handleDialogConfirmation(answer: boolean) {

        if (answer) {
            productService.deleteProduct(dialogConfirmationData.idProduct)
                .then(() => {
                    setProducts([]);
                    setQueryParams({ ...queryParams, page: 0 });
                })
                .catch((error: any) =>
                    setDialogInfoData({ visible: true, message: error.response.data })
                );
        }
        setDialogConfirmationData({ ...dialogConfirmationData, visible: false });
    }

    function handleDialogInfoClose() {
        setDialogInfoData({ ...dialogInfoData, visible: false });

    }

    return (

        <main>
            <section id="product-listing-section" className="kdc-container">
                <h2 className="kdc-section-title kdc-mb20">Cadastro de produtos</h2>

                <div className="kdc-btn-page-container kdc-mb20">

                    <Link to="/admin/products/create">
                        <ButtonPrimaryInverse text="Add" />
                    </Link>

                </div>

                <Search onSearchValue={handleNewSearchValue} />

                <table className="kdc-table kdc-mb20 kdc-mt20">
                    <thead>
                        <tr>
                            <th className="kdc-tb576">ID</th>
                            <th></th>
                            <th className="kdc-tb768">Preço</th>
                            <th className="kdc-txt-left">Nome</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td className="kdc-tb576">{product.id}</td>
                                    <td>
                                        <img className="kdc-product-listing-image" src={product.imgUrl} alt="Computer" />
                                    </td>
                                    <td className="kdc-tb768">R$ {product.price}</td>
                                    <td className="kdc-txt-left">{product.name}</td>
                                    <td>
                                        <img onClick={() => handleUpdateClick(product.id)} className="kdc-product-listing-btn" src={editImg} alt="Editar" />
                                    </td>
                                    <td>
                                        <img onClick={() => handleDeleteClick(product.id)}
                                            className="kdc-product-listing-btn" src={deletImg} alt="Deletar" />
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                {
                    !isLastPage &&
                    < ButtonNextPage onClickEvent={handleClickEvent} text="Carregar mais" />
                }

            </section>

            {
                dialogInfoData.visible &&
                <DialogInfo
                    message={dialogInfoData.message}
                    onDialogClose={handleDialogInfoClose} />
            }

            {
                dialogConfirmationData.visible &&
                <DialogConfirmation
                    id={dialogConfirmationData.idProduct}
                    message={dialogConfirmationData.message}
                    onDialogAnswer={handleDialogConfirmation}
                />
            }

        </main>


    )
}