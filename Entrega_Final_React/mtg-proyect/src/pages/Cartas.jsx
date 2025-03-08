import React, { useState, useEffect } from "react";
import './Cartas.css';

const Cartas = () => {
    const [types, setTypes] = useState([]);
    const [sets, setSets] = useState([]);
    const [cards, setCards] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [selectedSet, setSelectedSet] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const typesResponse = await fetch("https://api.magicthegathering.io/v1/types");
                const typesData = await typesResponse.json();
                setTypes(typesData.types || []);

                const setsResponse = await fetch("https://api.magicthegathering.io/v1/sets");
                const setsData = await setsResponse.json();
                setSets(setsData.sets || []);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async () => {
        try {
            const query = new URLSearchParams({
                types: selectedType,
                set: selectedSet,
            }).toString();
    
            const cardsResponse = await fetch(`https://api.magicthegathering.io/v1/cards?${query}`);
            const cardsData = await cardsResponse.json();
            setCards(cardsData.cards || []);
            console.log("Cartas recibidas de la API:", cardsData.cards);
        } catch (error) {
            console.error("Error al buscar cartas:", error);
        }
    };    

    return (
        <div>
            <div id="select">
                <select className="select" onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
                    <option value="">Seleccionar tipo...</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>

                <select className="select" onChange={(e) => setSelectedSet(e.target.value)} value={selectedSet}>
                    <option value="">Seleccionar set...</option>
                    {sets.map((set) => (
                        <option key={set.code} value={set.code}>
                            {set.name}
                        </option>
                    ))}
                </select>

                <button className="select" onClick={handleSearch}>
                    Buscar
                </button>
            </div>

            <div id="Contenedor-cartas" className="contenedor-cartas">
                {cards.map((card) => (
                    <div key={card.id} className="cartas">
                        <div className="contenedor-img">
                            <img
                                src={card.imageUrl || "src/Imagenes/reverso.png"}
                                alt={card.name || "Carta sin nombre"}
                                className="imagen-carta"
                            />
                        </div>
                        <div className="name">{card.name || "Desconocido"}</div>
                        <div className="cmc">{card.cmc ?? "N/A"}</div>
                        <div className="types">{card.types?.join(", ") || "Tipo desconocido"}</div>
                        <div className="rarity">{card.rarity || "Rareza desconocida"}</div>
                        <div className="text">{card.text || "Sin descripción"}</div>
                        <div className="power">
                            {card.power ? `${card.power} / ${card.toughness || "?"}` : ""}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cartas;