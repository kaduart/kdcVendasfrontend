import { Outlet } from "react-router-dom";
import HeaderAdm from "../../components/headerAdm";

export default function Admin() {

    return (

        <>
            <HeaderAdm />

            <Outlet />
        </>

    )
}