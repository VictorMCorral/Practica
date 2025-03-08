let CartasElementos = document.getElementById('Cartas');

async function getTypes() {
    try {
        const response = await fetch(`https://api.magicthegathering.io/v1/types`);
        const data = await response.json();
        if (data.types.length > 0) {
            return data.types;
        } else {
            console.log("No hay más tipos disponibles.");
            return [];
        }
    } catch (error) {
        console.error("Error al obtener los tipos:", error);
        return [];
    }
}

async function getSets() {
        const response = await fetch(`https://api.magicthegathering.io/v1/sets`);
        const data = await response.json();
        if (data.sets.length > 0) {
            return data.sets;
        } else {
            console.log("No hay más sets disponibles.");
            return [];
        }
}

async function getCards(filters) {
    const query = new URLSearchParams(filters).toString();
        const response = await fetch(`https://api.magicthegathering.io/v1/cards?${query}`);
        const data = await response.json();
        if (data.cards.length > 0) {
            return data.cards;
        } else {
            alert("No hay cartas disponibles con esos filtros.");
            return [];
        }
}


async function initialize() {
    const types = await getTypes();
    createTypesFilter(types);

    const sets = await getSets();
    createSetsFilter(sets);

    createSearchButton(); 
}

function createTypesFilter(types) {
    const selectContainer = document.getElementById("select");

    const typesSelect = document.createElement("select");
    typesSelect.id = "types-select";
    typesSelect.className = "select";

    const defaultTypeOption = document.createElement("option");
    defaultTypeOption.value = "";
    defaultTypeOption.textContent = "Seleccionar tipo...";
    typesSelect.appendChild(defaultTypeOption);

    types.forEach(type => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        typesSelect.appendChild(option);
    });

    selectContainer.appendChild(typesSelect);
}

function createSetsFilter(sets) {
    const selectContainer = document.getElementById("select");

    const setsSelect = document.createElement("select");
    setsSelect.id = "sets-select";
    setsSelect.className = "select";

    const defaultSetOption = document.createElement("option");
    defaultSetOption.value = "";
    defaultSetOption.textContent = "Seleccionar set...";
    setsSelect.appendChild(defaultSetOption);

    sets.forEach(set => {
        const option = document.createElement("option");
        option.value = set.code;
        option.textContent = set.name;
        setsSelect.appendChild(option);
    });

    selectContainer.appendChild(setsSelect);
}


function createSearchButton() {
    const selectContainer = document.getElementById("select");

    const searchButton = document.createElement("button");
    searchButton.id = "buscar-btn";
    searchButton.textContent = "Buscar";
    searchButton.className = "select";


    searchButton.addEventListener('click', async () => {
        const selectedType = document.getElementById("types-select").value;
        const selectedSet = document.getElementById("sets-select").value;

        const filters = {};
        if (selectedType) filters.types = selectedType; 
        if (selectedSet) filters.set = selectedSet; 
        const cards = await getCards(filters);
        renderCards(cards);
    });

    selectContainer.appendChild(searchButton);
}

initialize();

function renderCards(cards) {
    const cartasContainer = document.getElementById("Contenedor-cartas");
    cartasContainer.innerHTML = ""; 

    cards.forEach(card => {
        const div = document.createRange().createContextualFragment(`
        <div class="cartas">
            <div class="contenedor-img">
                <img src="${card.imageUrl || './Imagenes/reverso.png'}" alt="${card.name}">
            </div>
                <div class="name">${card.name || "Desconocido"}</div>
                <div class="cmc">${card.cmc ?? "N/A"}</div>
                <div class="types">${card.types?.join(", ") || ""}</div>

                <div class="rarity">${card.rarity || "Desconocida"}</div>
                <div class="text">${card.text || "Sin descripción"}</div>
                <div class="power">${card.power || ""} /</div>
                <div class="toughness">${card.toughness || ""}</div>
        </div>
        `);
        cartasContainer.appendChild(div);
    });
}
