import { useContext, useState } from 'react';
import './styles.css';
import * as authService from '../../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import { ContextToken } from '../../../utils/context-token';

type FormData = {
    username: string,
    password: string
}


export default function Login() {

    const navigate = useNavigate();

    const { setContextTokenPayload } = useContext(ContextToken);

    const [fomrData, setFomrData] = useState<FormData>({
        username: '',
        password: ''
    });

    function handleSubmit(event: any) {
        event.preventDefault();

        authService.loginRequest(fomrData).then((response: any) => {
            authService.saveAccessToken(response.data.access_token);
            setContextTokenPayload(authService.getAccessTokenPayload());

            navigate("/cart");
        })
            .catch((error: any) => {
                console.error(error);
                confirm(error.response.data.error_description)
            });

    }

    function handleChangeForm(event: any) {
        const name = event.target.name;
        const value = event.target.value;

        setFomrData({ ...fomrData, [name]: value });
    }

    return (

        <main>
            <section id="login-section" className="dsc-container">
                <div className="kdc-login-form-container">
                    <form className="kdc-card kdc-form" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className="kdc-form-controls-container">
                            <div>
                                <input
                                    name='username'
                                    value={fomrData.username}
                                    onChange={handleChangeForm}
                                    className="kdc-form-control" type="text" placeholder="Email"
                                />
                                {/*  <div className="kdc-form-error">Campo obrigatório</div> */}
                            </div>
                            <div>
                                <input
                                    name='password'
                                    value={fomrData.password}
                                    onChange={handleChangeForm}
                                    className="kdc-form-control" type="password" placeholder="Senha"
                                />
                            </div>
                        </div>

                        <div className="kdc-login-form-buttons kdc-mt20">
                            <button type="submit" className="kdc-btn kdc-btn-blue">Entrar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>

    )
}