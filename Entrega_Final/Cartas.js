let CartasElementos = document.getElementById('Cartas');

function getCards(done) {
    fetch(`https://api.magicthegathering.io/v1/cards`)
        .then(response => response.json())
        .then(data => {
            if (data.cards.length > 0) {
                done(data.cards);
            } else {
                console.log("No hay más cartas disponibles.");
            }
        })
        .catch(error => console.error("Error al obtener las cartas:", error));
}

getCards(cards => {
    console.log(cards);
    createFilters(cards);
    renderCards(cards); // Renderiza todas las cartas inicialmente
});

function createFilters(cards) {
    const selectContainer = document.getElementById("select");

    // Crear selector de tipos
    const typesSelect = document.createElement("select");
    typesSelect.id = "types-select";
    typesSelect.className = "select";

    const allTypes = cards.flatMap(card => card.types || []);
    const uniqueTypes = [...new Set(allTypes)];

    const defaultTypeOption = document.createElement("option");
    defaultTypeOption.value = "";
    defaultTypeOption.textContent = "Seleccionar tipo...";
    typesSelect.appendChild(defaultTypeOption);

    uniqueTypes.forEach(type => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        typesSelect.appendChild(option);
    });

    // Crear selector de colores
    const colorSelect = document.createElement("select");
    colorSelect.id = "color-select";
    colorSelect.className = "select";

    const allColors = cards.flatMap(card => card.colors || []);
    const uniqueColors = [...new Set(allColors)];

    const defaultColorOption = document.createElement("option");
    defaultColorOption.value = "";
    defaultColorOption.textContent = "Seleccionar color...";
    colorSelect.appendChild(defaultColorOption);

    uniqueColors.forEach(color => {
        const option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        colorSelect.appendChild(option);
    });

    // Crear selector de rarezas
    const raritySelect = document.createElement("select");
    raritySelect.id = "rarity-select";
    raritySelect.className = "select";

    const allRarities = cards.map(card => card.rarity).filter(rarity => rarity);
    const uniqueRarities = [...new Set(allRarities)];

    const defaultRarityOption = document.createElement("option");
    defaultRarityOption.value = "";
    defaultRarityOption.textContent = "Seleccionar rareza...";
    raritySelect.appendChild(defaultRarityOption);

    uniqueRarities.forEach(rarity => {
        const option = document.createElement("option");
        option.value = rarity;
        option.textContent = rarity;
        raritySelect.appendChild(option);
    });

    // Añadir selectores al contenedor
    selectContainer.appendChild(typesSelect);
    selectContainer.appendChild(colorSelect);
    selectContainer.appendChild(raritySelect);

    // Filtrar cartas cuando cambie alguno de los selectores
    typesSelect.addEventListener('change', () => filterCards(cards));
    colorSelect.addEventListener('change', () => filterCards(cards));
    raritySelect.addEventListener('change', () => filterCards(cards));
}

function filterCards(cards) {
    const selectedType = document.getElementById("types-select").value;
    const selectedColor = document.getElementById("color-select").value;
    const selectedRarity = document.getElementById("rarity-select").value;

    let filteredCards = cards;

    // Verifica si alguna opción por defecto está seleccionada
    if (selectedType === "" && selectedColor === "" && selectedRarity === "") {
        filteredCards = cards; // Muestra todas las cartas si no se ha filtrado
    } else {
        if (selectedType) {
            filteredCards = filteredCards.filter(card => card.types?.includes(selectedType));
        }
        
        if (selectedColor) {
            filteredCards = filteredCards.filter(card => card.colors?.includes(selectedColor));
        }
        
        if (selectedRarity) {
            filteredCards = filteredCards.filter(card => card.rarity === selectedRarity);
        }
    }

    renderCards(filteredCards);
}

function renderCards(cards) {
    const cartasContainer = document.getElementById("Contenedor-cartas");
    cartasContainer.innerHTML = ""; // Limpia el contenedor antes de agregar nuevas cartas

    cards.forEach(card => {
        const div = document.createRange().createContextualFragment(`
            <div class="cartas">
                <div class="name">${card.name || "Desconocido"}</div>
                <div class="cmc">${card.cmc ?? "N/A"}</div>
                <div class="contenedor-img">
                    <img src="${card.imageUrl || './Imagenes/reverso.png'}" alt="${card.name}">
                </div>
                <div class="types">${card.types?.join(", ") || ""}</div>
                <div class="subtypes">${card.subtypes?.join(", ") || ""}---</div>
                <div class="rarity">${card.rarity || "Desconocida"}</div>
                <div class="text">${card.text || "Sin descripción"}</div>
                <div class="power">${card.power || ""} /</div>
                <div class="toughness">${card.toughness || ""}</div>
            </div>
        `);
        cartasContainer.appendChild(div);
    });
}
