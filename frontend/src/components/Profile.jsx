import { useParams } from "react-router-dom";

export default function Profile() {
    const parms = useParams();

    return (
        <>
            Profile {parms.id}
        </>
    );
}