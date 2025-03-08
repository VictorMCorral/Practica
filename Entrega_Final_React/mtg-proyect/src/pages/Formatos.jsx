import React, { useState, useEffect } from 'react';
import './Formatos.css';

const Formatos = () => {
    const [formats, setFormats] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchFormats = async () => {
            const response = await fetch("https://api.magicthegathering.io/v1/formats");
            const data = await response.json();
            setFormats(data.formats || []);
        };

        fetchFormats();
    }, []);

    const filteredFormats = formats.filter(format => format.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div>
            <div id="search-container" className="input-formatos">
                <input 
                    type="text" 
                    placeholder="Buscar por nombre del formato..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
            </div>

            <div id="Contenedor-formats" className="contenedor-formatos">
                {filteredFormats.map((format, index) => (
                    <div key={index} className="formatos">
                        <div className="n">Nombre: {format || "Desconocido"}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Formatos;
