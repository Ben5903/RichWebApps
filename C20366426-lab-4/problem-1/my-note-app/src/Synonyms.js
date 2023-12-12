import React, { useState } from 'react';
import axios from 'axios';

const Synonyms = ({ word }) => {
    const [synonyms, setSynonyms] = useState([]);

    const getSynonyms = async () => {
        try {
            const response = await axios.get(
                `https://api.datamuse.com/words?rel_syn=${word}`
            );
            setSynonyms(response.data.map((result) => result.word));
        } catch (error) {
            console.error('Error fetching synonyms:', error.message);
        }
    };

    return (
        <div>
            <h2>Synonyms for "{word}":</h2>
            <button onClick={getSynonyms}>Get Synonyms</button>
            <ul>
                {synonyms.map((synonym, index) => (
                    <li key={index}>{synonym}</li>
                ))}
            </ul>
        </div>
    );
};

export default Synonyms;