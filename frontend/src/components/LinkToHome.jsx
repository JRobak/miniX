import { Link, Outlet } from "react-router-dom";

export default function LinkToHome() {
    return(
        <>
            <Link to="/"><div id="LinkToHome">Home</div></Link>
            <Outlet />
        </>
    );
}