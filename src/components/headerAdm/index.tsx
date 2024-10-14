import './styles.css';
import productsImg from '../../assets/images/products.svg';
import homeImg from '../../assets/images/home.svg';
import { Link } from 'react-router-dom';
import LoggedUser from '../loggedUser';

export default function HeaderAdm() {

    return (

        <header className="kdc-header-admin">
            <nav className="kdc-container">
                <h1>kdc Admin</h1>
                <div className="kdc-navbar-right">
                    <div className="kdc-menu-items-container">
                        <div className="kdc-menu-item">
                            <img src={homeImg} alt="Início" />
                            <p>Início</p>
                        </div>
                        <div className="kdc-menu-item">
                            <img src={productsImg} alt="Cadastro de produtos" />
                            <p className="kdc-menu-item-active">
                                <Link to='/catalog'>
                                    Produtos
                                </Link>
                            </p>
                        </div>
                    </div>

                    <LoggedUser />

                </div>
            </nav>
        </header>

    )
}




