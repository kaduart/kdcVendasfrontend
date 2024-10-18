import { useContext, useState } from 'react';
import './styles.css';
import * as authService from '../../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import { ContextToken } from '../../../utils/context-token';
import FormInput from '../../../components/formInput';
import * as forms from '../../../utils/forms';

type FormData = {
    username: string,
    password: string
}


export default function Login() {

    const navigate = useNavigate();

    const { setContextTokenPayload } = useContext(ContextToken);
    const [submitReponseFail, setSubmitResponseFail] = useState(false)
        ;
    const [formData, setFormData] = useState<any>({
        username: {
            value: "",
            id: "username",
            name: "username",
            type: "text",
            placeholder: "Email",
            validation: function (value: string) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.toLowerCase());
            },
            message: "Favor informar um email válido",
        },
        password: {
            value: "",
            id: "password",
            name: "password",
            type: "password",
            placeholder: "Senha",
            message: "Favor informar sua senha",
            /*  validation: function (value: string) {
                 return /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/.test(value);
 
             }, */

        }
    })

    function handleSubmit(event: any) {
        event.preventDefault();

        const formDataValidated: any = forms.dirtyAndValidateAll(formData);

        setSubmitResponseFail(false);

        if (forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);

            return;
        }

        authService.loginRequest(forms.toValues(formData))
            .then((response: any) => {
                authService.saveAccessToken(response.data.access_token);
                setContextTokenPayload(authService.getAccessTokenPayload());

                navigate("/cart");
            })
            .catch((error: any) => {
                setSubmitResponseFail(true);
            });

    }

    function handleChangeForm(event: any) {
        const name = event.target.name;
        const value = event.target.value;

        const result = forms.updateAndValidate(formData, name, value)

        setFormData(result);
    }

    function handleTurnDirty(name: string) {
        const newFormData = forms.toDirtyAndValidate(formData, name);

        setFormData(newFormData);
    }

    return (

        <main>
            <section id="login-section" className="dsc-container">
                <div className="kdc-login-form-container">
                    <form className="kdc-card kdc-form" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className="kdc-form-controls-container">
                            <div>
                                <FormInput
                                    {...formData.username}
                                    onChange={handleChangeForm}
                                    onTurnDirty={handleTurnDirty}
                                    className="kdc-form-control" type="text" placeholder="Email"
                                />
                                <div className="kdc-form-error">{formData.username.message}</div>

                            </div>
                            <div>
                                <FormInput
                                    {...formData.password}
                                    onChange={handleChangeForm}
                                    onTurnDirty={handleTurnDirty}
                                    className="kdc-form-control" type="password" placeholder="Senha"
                                />
                                <div className="kdc-form-error">{formData.password.message}</div>

                            </div>
                        </div>

                        {
                            submitReponseFail &&
                            <div className="kdc-form-global-error">User or password invalid</div>
                        }

                        <div className="kdc-login-form-buttons kdc-mt20">
                            <button type="submit" className="kdc-btn kdc-btn-blue">Entrar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>

    )
}