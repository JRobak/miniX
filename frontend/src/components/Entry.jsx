import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Form from './Form';

export default function Entry() {
    const parms = useParams();
    const [entry, setEntry] = useState([]);
    const [comments, setComments] = useState([]);
    const [isActive, setActive] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        content: ''
    });

    const comment_id = parseInt(parms.id);

    useEffect(() => {
        // on start
        fetch('http://127.0.0.1:5000/getEveryEntries', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => b.id - a.id);
                const filteredData = data.filter(entry => entry.id===comment_id);
                setEntry(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });     
        GetCommentsFromBackend();  

        // in munute refresh
        const interval = setInterval(() => {
            GetCommentsFromBackend();
        }, 60000); 

       return () => clearInterval(interval);
   }, []);

    function GetCommentsFromBackend() {
        fetch('http://127.0.0.1:5000/getEveryComments', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(comment => comment.entry_id===comment_id);
                setComments(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:5000/addNewComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({entry_id: parms.id, name: formData.name, content: formData.content}),
            })
            .then(response => response.json())
            .then(data => {
                setFormData({ name: '', content: '' });
                GetCommentsFromBackend();
            })
            .catch(error => {
                console.error('Error adding entry:', error);
            });
    };

    return (
        <>
            {entry.map(entry => (
                <div key={entry.id} className="entry">
                    <h2><Link to={`/profile/${entry.name}`}>{entry.name}</Link></h2>
                    <p><Link>{entry.content}</Link></p>
                </div>
            ))}
            
            {isActive && <Form handleSubmit={handleSubmit}  formData={formData}  setFormData={setFormData}/>}   

            <div className="butttonToActiveForm"><button onClick={() => setActive(!isActive)}>{isActive ? "Schowaj": "Pokaż"} formularz do dodawania komentarzy</button></div>
            {comments.map(comment => (
                <div key={comment.id} className="comment">
                    <h2><Link to={`/profile/${comment.name}`}>{comment.name}</Link></h2>
                    <p>{comment.content}</p>
                </div>
            ))}
            {comments.length === 0 ? <h3>Brak Komentarzy</h3> : null}
        </>
    );
}