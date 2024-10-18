import './styles.css';
import productsImg from '../../assets/images/products.svg';
import homeImg from '../../assets/images/home.svg';
import LoggedUser from '../loggedUser';
import { NavLink } from 'react-router-dom';

export default function HeaderAdm() {

    return (

        <header className="kdc-header-admin">
            <nav className="kdc-container">
                <h1>kdc Admin</h1>
                <div className="kdc-navbar-right">
                    <div className="kdc-menu-items-container">
                        <div className="kdc-menu-item">
                            <img src={homeImg} alt="Início" />
                            <p>
                                <NavLink to='/admin/home'
                                    className={({ isActive }) => isActive ? "kdc-menu-item-active" : ""}>
                                    Início
                                </NavLink>
                            </p>
                        </div>
                        <div className="kdc-menu-item">
                            <img src={productsImg} alt="Cadastro de produtos" />
                            <p >
                                <NavLink to='/admin/products'
                                    className={({ isActive }) => isActive ? "kdc-menu-item-active" : ""}>
                                    Produtos
                                </NavLink>
                            </p>
                        </div>
                    </div>

                    <LoggedUser />

                </div>
            </nav>
        </header>

    )
}




