import React from 'react';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

const urlEntry = './assets/json/Entries.json'

export default function Home() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch(urlEntry)
            .then(response => response.json())
            .then(data => {
                setEntries(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    
    return (
        <>
            <h1>Strona Główna</h1>
            {entries.map(entry => (
                <div key={entry.id} className="entry">
                    <h2><Link to={`/profile/${entry.name}`} >{entry.name}</Link></h2>
                    <p><Link to={`/entry/${entry.id}`}>{entry.content}</Link></p>
                </div>
            ))}
        </>
    )
}
