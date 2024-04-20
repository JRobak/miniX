import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

const urlentry = '../assets/json/entries.json'

export default function Profile() {
    const parms = useParams();
    const [entries, setentries] = useState([]);

    useEffect(() => {
        const username = parseInt(parms.id);
        fetch(urlentry)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(entry => entry.name===username);
                setentries(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [parms.id]);

    return (
        <>
            <h1>Profil: <span className="profilName">{parms.id}</span></h1>
            {entries.map(entry => (
                <div key={entry.id} className="entry">
                    <h2><Link to={`/profile/${entry.name}`}>{entry.name}</Link></h2>
                    <p><Link to={`/entry/${entry.id}`}>{entry.content}</Link></p>
                </div>
            ))}

            {entries.length === 0 ? <h3>Brak Wpisów</h3> : null}
        </>
    );
}