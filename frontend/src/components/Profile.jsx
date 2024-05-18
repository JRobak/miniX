import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

export default function Profile() {
    const parms = useParams();
    const [entries, setEntries] = useState([]);

    const username = parms.id;

    useEffect(() => {        
        GetEntriesFromBackend();
        
        // in munute refresh
        const interval = setInterval(() => {
            GetEntriesFromBackend();
        }, 60000); 

       return () => clearInterval(interval);
    }, []);

    function GetEntriesFromBackend() {
        fetch('http://127.0.0.1:5000/getEveryEntries', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => b.id - a.id);
                const filteredData = data.filter(entry => entry.name===username);
                setEntries(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    return (
        <>
            <h1>Profil: <span className="profilName">{parms.id}</span></h1>
            {entries.map(entry => (
                <div key={entry.id} className="entry">
                    <h2>{entry.name}</h2>
                    <p><Link to={`/entry/${entry.id}`}>{entry.content}</Link></p>
                </div>
            ))}

            {entries.length === 0 ? <h3>Brak Wpisów</h3> : null}
        </>
    );
}