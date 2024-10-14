import './styles.css'
import cartImg from '../../assets/images/cart.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContextCartCount } from '../../utils/context-cart';
import configImg from '../../assets/images/config.svg';
import * as authService from '../../services/auth-service';
import { ContextToken } from '../../utils/context-token';
import LoggedUser from '../loggedUser';
export default function HeaderClient() {

    const { contextCartCount } = useContext(ContextCartCount);

    const { contextTokenPayload } = useContext(ContextToken);

    return (

        <header className="kdc-header-client">
            <nav className="kdc-container">

                <Link to="/">
                    <h1>KDCommerce</h1>
                </Link>

                <div className="kdc-navbar-right">
                    <div className="kdc-menu-items-container">

                        {
                            contextTokenPayload &&
                            authService.hasAnyRoles(['ROLE_ADMIN']) &&
                            <div className="kdc-menu-item">
                                <Link to="/admin">
                                    <img src={configImg} alt="config" />
                                </Link>
                            </div>
                        }

                        <div className="kdc-menu-item">
                            <div className="kdc-header-cart-icon">
                                <Link to="/cart">
                                    <img src={cartImg} alt="Carrinho de compras" />
                                </Link>
                            </div>
                            {
                                contextCartCount > 0 &&
                                <div className="kdc-header-notification">
                                    {contextCartCount}
                                </div>
                            }
                        </div>
                    </div>

                    <LoggedUser />

                </div>
            </nav>
        </header>

    )
}