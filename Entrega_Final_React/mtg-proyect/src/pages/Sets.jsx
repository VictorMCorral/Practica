import React, { useState, useEffect } from 'react';
import './Sets.css';

const Sets = () => {
    const [sets, setSets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchSets = async () => {
            const response = await fetch("https://api.magicthegathering.io/v1/sets");
            const data = await response.json();
            setSets(data.sets || []);
        };

        fetchSets();
    }, []);

    const filteredSets = sets.filter(set => set.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div>
            <div id="search-container" className="input-sets">
                <input 
                    type="text" 
                    placeholder="Buscar por nombre de set..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
            </div>

            <div id="Contenedor-sets" className="contenedor-cartas">
                {filteredSets.map(set => (
                    <div key={set.code} className="sets">
                        <div className="namesets">Nombre: {set.name || "Desconocido"}</div>
                        <div className="code">Código MKM: {set.code ?? "N/A"}</div>
                        <div className="releaseDate">Fecha de lanzamiento: {set.releaseDate || "Fecha no disponible"}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sets;
