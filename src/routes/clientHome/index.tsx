import { Outlet } from "react-router-dom";
import HeaderClient from "../../components/headerClient";

export default function ClienteHome() {
    return (
        <>
            <HeaderClient />
            <Outlet />
        </>
    )
}