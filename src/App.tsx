import { Navigate, Route, Routes } from 'react-router-dom';
import ClienteHome from './routes/clientHome';
import ProductDetails from './routes/clientHome/productDetails';
import Catalog from './routes/clientHome/catalog';
import Cart from './routes/clientHome/cart';
import { useEffect, useState } from 'react';
import { ContextCartCount } from './utils/context-cart';
import Login from './routes/clientHome/login';
import InitialPage from './routes/admin/adminHome';
import Admin from './routes/admin';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import { PrivateRoute } from './components/privateRoute';
import { AccessTokenPayloadDTO } from './models/credentialsDTO';
import { ContextToken } from './utils/context-token';
import * as authService from './services/auth-service';
import * as cartervice from './services/cart-service';
import Confirmation from './routes/confirmation';
export default function App() {

  const [contextCartCount, setContextCartCount] = useState<number>(0);
  const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();

  useEffect(() => {
    setContextCartCount(cartervice.getCart().items.length);

    if (authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
    }
  }, []);

  return (
    <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
      <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }} >


        <HistoryRouter history={history}>

          <Routes>

            <Route path="/admin"
              element={
                <PrivateRoute roles={['ROLE_ADMIN']}>
                  <Admin />
                </PrivateRoute>
              } >
              <Route index element={<InitialPage />} />
              <Route path='initial-page' element={<InitialPage />} />
            </Route>

            <Route path="/" element={<ClienteHome />} >
              <Route index element={<Catalog />} />
              <Route path='catalog' element={<Catalog />} />
              <Route path='cart' element={<Cart />} />
              <Route path='product-details/:productId' element={<ProductDetails />} />
              <Route path='login' element={<Login />} />
              <Route path='confirmation/:orderId' element={ <PrivateRoute><Confirmation /></PrivateRoute>} />
            </Route>

            <Route path='*' element={<Navigate to="/" />} />

          </Routes>
        </HistoryRouter>

      </ContextToken.Provider>
    </ContextCartCount.Provider>
  )
}


