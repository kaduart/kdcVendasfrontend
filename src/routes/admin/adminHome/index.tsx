import { useEffect, useState } from "react";
import { UserDTO } from "../../../models/user";
import { findMe } from "../../../services/user-service";
import * as userSevrice from "../../../services/user-service";
export default function AdminHome() {

    const [userLogged, setUserLogged] = useState<UserDTO>({
        id: 0,
        name: '',
        email: '',
        phone: 0,
        birthDate: '',
        roles: ['']
    });

    useEffect(() => {
        userSevrice.findMe().then(response => {
            if (response.status === 200) {
                setUserLogged(response.data);
            }
        })
    });

    return (
        <div className="kdc-container">
            <main>
                <section id="admin-home-section" className="kdc-container">
                    <h2 className="kdc-section-title kdc-mb20">Bem-vindo à àrea administrativa, {userLogged.name}</h2>
                </section>
            </main>
        </div>
    )
}


