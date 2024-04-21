import React from 'react';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Form from './Form';

const urlEntry = './assets/json/Entries.json'

export default function Home() {
    const [entries, setEntries] = useState([]);
    const [isActive, setActive] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        content: ''
    });
    const [entryCount, setEntryCount] = useState(0);

    useEffect(() => {
        GetEntireFromFile();
    }, []);

    function GetEntireFromFile() {
        fetch(urlEntry)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => b.id - a.id);
                setEntries(data);
                setEntryCount(data.length);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const handleSubmit = (e) => {
        // nie działa dodawanie nowego wpisu do pozostałych
        e.preventDefault();
        const newEntry = {
            id: entryCount + 1,
            name: formData.name,
            content: formData.content
        };
        fetch(urlEntry, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry),
            })
            .then(response => response.json())
            .then(data => {
                setEntries(prevEntries => [...prevEntries, newEntry]); 
                setFormData({ name: '', content: '' });
                setEntryCount(entryCount + 1);
                GetEntireFromFile();
            })
            .catch(error => {
                console.error('Error adding entry:', error);
            });
    };
    
    
    return (
        <>
            <h1>Strona Główna</h1>
            {isActive && <Form handleSubmit={handleSubmit}  formData={formData}  setFormData={setFormData}/>}   
            <div className="butttonToActiveForm"><button onClick={() => setActive(!isActive)}>{isActive ? "Schowaj": "Pokaż"} formularz do dodawania wpisu</button></div>
            {entries.map(entry => (
                <div key={entry.id} className="entry">
                    <h2><Link to={`/profile/${entry.name}`} >{entry.name}</Link></h2>
                    <p><Link to={`/entry/${entry.id}`}>{entry.content}</Link></p>
                </div>
            ))}
        </>
    )
}
