import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

const urlComments = '../assets/json/Comments.json'

export default function Entry() {
    const parms = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const comment_id = parseInt(parms.id);

        fetch(urlComments)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(comment => comment.entry_id===comment_id);
                setComments(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [parms.id]);

    return (
        <>
            <h1>Wpis</h1>
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