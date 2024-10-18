import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import FormInput from '../../../components/formInput';
import { useEffect, useState } from 'react';
import * as forms from '../../../utils/forms';
import * as productService from '../../../services/product-service';
import * as categoriesService from '../../../services/categories-service';

import FormTextArea from '../../../components/formTextArea';
import { Category } from '../../../models/category';
import FormSelect from '../../../components/formSelect';
import { selectStyles } from '../../../utils/select';
export default function ProductsForm() {

    const navigate = useNavigate();

    const params = useParams();
    const isEditing = params.productId !== 'create';

    const [categories, setCategories] = useState<Category[]>([]);


    const [formData, setFormData] = useState({
        name: {
            value: '',
            id: 'name',
            name: 'name',
            type: 'text',
            placeholder: 'Name',
            validation: function (value: any) {
                return /^.{3,80}$/.test(value);
            },
            message: 'Informe um nome válido'

        },
        price: {
            value: '',
            id: 'price',
            name: 'price',
            type: 'number',
            placeholder: 'Price',
            message: 'Informe um valor positivo',
            validation: function (value: any) {
                return value > 0;
            },
        },
        imgUrl: {
            value: '',
            id: 'imgUrl',
            name: 'imgUrl',
            type: 'text',
            placeholder: 'Image',
            message: 'Informe uma imagem'

        },
        description: {
            value: '',
            id: 'description',
            name: 'description',
            type: 'text',
            placeholder: 'Description',
            message: 'Informe uma descricao do produto',
            validation: function (value: any) {
                return /^.{8,80}$/.test(value);

            },
        },
        categories: {
            value: [],
            id: 'categories',
            name: 'categories',
            type: 'text',
            placeholder: 'Categories',
            message: 'Informe pelo menos uma categoria do produto',
            validation: function (value: Category[]) {
                return value.length > 0;

            },

        },
    });

    useEffect(() => {
        categoriesService.getAll()
            .then(response => {
                setCategories(response.data);
            });
    }, []);

    useEffect(() => {

        if (isEditing) {

            productService.findById(Number(params.productId))
                .then((response) => {
                    const newValue = forms.updateAll(formData, response.data);

                    forms.validate(formData, newValue);

                    setFormData(newValue);
                });
        }
    }, []);

    function handleChangeForm(event: any) {
        const name = event.target.name;
        const value = event.target.value;

        const result = forms.updateAndValidate(formData, name, value)

        setFormData(result);
    }

    function handleTurnDirty(name: string) {
        const result = forms.toDirtyAndValidate(formData, name)

        setFormData(result);
    }


    function handleSubmit(event: any) {
        event.preventDefault();
        const formDataValidated: any = forms.dirtyAndValidateAll(formData);

        if (forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
        }

        const request = forms.toValues(formData);

        if (isEditing) {
            request.id = Number(params.productId);
        }

        const response = isEditing
            ? productService.updateProduct(request)
            : productService.addProduct(request);

        response
            .then(() => {
                alert('Success Update/Add product!');
                navigate('/admin/products');
            })
            .catch((error: any) => {

                const newInputs = forms.setBackendErrors(formData, error.response.data.errors);

                setFormData(newInputs);
            })
    }

    return (

        <main>
            <section id="product-form-section" className="kdc-container">
                <div className="kdc-product-form-container">
                    <form className="kdc-card kdc-form" onSubmit={handleSubmit}>
                        <h2>Dados do produto</h2>
                        <div className="kdc-form-controls-container">
                            <div>
                                <FormInput
                                    {...formData.name}
                                    onChange={handleChangeForm}
                                    onTurnDirty={handleTurnDirty}
                                    className="kdc-form-control"
                                />
                                <div className="kdc-form-error">{formData.name.message}</div>

                            </div>
                            <div>
                                <FormInput
                                    {...formData.price}
                                    onChange={handleChangeForm}
                                    onTurnDirty={handleTurnDirty}
                                    className="kdc-form-control"
                                />
                                <div className="kdc-form-error">{formData.price.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.imgUrl}
                                    onChange={handleChangeForm}
                                    onTurnDirty={handleTurnDirty}
                                    className="kdc-form-control"
                                />
                                <div className="kdc-form-error">{formData.imgUrl.message}</div>
                            </div>
                            <div >
                                <FormSelect
                                    {...formData.categories}
                                    options={categories}
                                    onChange={((obj: any) => {
                                        const newFOrmData = forms.update(formData, "categories", obj);

                                        setFormData(newFOrmData);
                                    })}
                                    closeMenuOnSelect={false}
                                    getOptionLabel={(obj: any) => obj.name}
                                    getOptionValue={(obj: any) => String(obj.id)}
                                    onTurnDirty={handleTurnDirty}
                                    isMulti
                                    className="kdc-form-control kdc-form-select-container "
                                    styles={selectStyles}
                                />
                                <div className="kdc-form-error">{formData.categories.message}</div>
                            </div>
                            <div>
                                <FormTextArea
                                    {...formData.description}
                                    onChange={handleChangeForm}
                                    onTurnDirty={handleTurnDirty}
                                    className="kdc-form-control kdc-textarea"
                                />
                                <div className="kdc-form-error">{formData.description.message}</div>

                            </div>
                        </div>

                        <div className="kdc-product-form-buttons">
                            <button type="reset" className="kdc-btn kdc-btn-white">

                                <Link to="/admin/products">
                                    Cancelar
                                </Link>

                            </button>

                            <button type="submit" className="kdc-btn kdc-btn-blue">Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>

    )
}