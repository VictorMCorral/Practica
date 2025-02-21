let currentOffset = 0;

function getCards(done) {
    fetch(`https://api.magicthegathering.io/v1/cards?limit=100&offset=${currentOffset}`)
        .then(response => response.json())
        .then(data => {
            if (data.cards.length > 0) {
                done(data.cards);
                currentOffset += 100;
            } else {
                console.log("No hay más cartas disponibles.");
            }
        })
        .catch(error => console.error("Error al obtener las cartas:", error));
}

getCards(cards => {
    console.log(cards);
    const main = document.getElementById("Contenedor-cartas");
    const selectContainer = document.getElementById("select");

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

    selectContainer.appendChild(typesSelect);
    selectContainer.appendChild(colorSelect);
    selectContainer.appendChild(raritySelect);

    function renderCards(filteredCards) {
        const cartasContainer = document.getElementById("Contenedor-cartas");
        cartasContainer.innerHTML = "";

        filteredCards.forEach(card => {
            const div = document.createRange().createContextualFragment(`
                <div class="cartas">
                    <div class="name">${card.name || "Desconocido"}</div>
                    <div class="cmc">${card.cmc ?? "N/A"}</div>
                    <div class="contenedor-img">
                        <img src="${card.imageUrl || '../Imagenes/reverso.png'}" alt="${card.name}">
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

            const powerElement = div.querySelector(".power");
            const toughnessElement = div.querySelector(".toughness");

            if (powerElement && powerElement.innerHTML.trim() === "/") {
                powerElement.innerHTML = "";
            }

            if (toughnessElement && !toughnessElement.innerHTML.trim()) {
                toughnessElement.style.display = "none";
            }
        });
    }

    function filterCards() {
        const selectedType = typesSelect.value;
        const selectedColor = colorSelect.value;
        const selectedRarity = raritySelect.value;

        let filteredCards = cards;

        if (selectedType) {
            filteredCards = filteredCards.filter(card => card.types?.includes(selectedType));
        }
        
        if (selectedColor) {
            filteredCards = filteredCards.filter(card => card.colors?.includes(selectedColor));
        }
        
        if (selectedRarity) {
            filteredCards = filteredCards.filter(card => card.rarity === selectedRarity);
        }

        renderCards(filteredCards);
    }

    typesSelect.addEventListener('change', filterCards);
    colorSelect.addEventListener('change', filterCards);
    raritySelect.addEventListener('change', filterCards);
});
