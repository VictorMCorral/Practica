let SetsElementos = document.getElementById('Sets');

function getSets(done) {
    fetch(`https://api.magicthegathering.io/v1/sets`)
        .then(response => response.json())
        .then(data => {
            if (data.sets.length > 0) {
                done(data.sets);
            } else {
                console.log("No hay más sets disponibles.");
            }
        })
        .catch(error => console.error("Error al obtener los sets:", error));
}

getSets(sets => {
    console.log(sets);
    createSearchInput(sets);
    renderSets(sets);
});

function createSearchInput(sets) {
    const searchContainer = document.getElementById("search-container"); // Asegúrate de que este elemento existe en tu HTML
    const searchInput = document.createElement("input");
    searchInput.id = "search-input";
    searchInput.placeholder = "Buscar por nombre de set...";
    searchContainer.appendChild(searchInput);

    searchInput.addEventListener("input", () => {
        filterSets(sets, searchInput.value);
    });
}

function filterSets(sets, query) {
    const filteredSets = sets.filter(set => set.name.toLowerCase().includes(query.toLowerCase()));
    renderSets(filteredSets);
}

function renderSets(sets) {
    const setsContainer = document.getElementById("Contenedor-sets");
    setsContainer.innerHTML = "";

    sets.forEach(set => {
        const div = document.createRange().createContextualFragment(`
            <div class="sets">
                <div class="namesets">Nombre: ${set.name || "Desconocido"}</div>
                <div class="code"> Codigo MKM: ${set.code ?? "N/A"}</div>
                <div class="releaseDate">Fecha de lanzamiento: ${set.releaseDate || "Fecha no disponible"}</div>
            </div>
        `);
        setsContainer.appendChild(div);
    });
}
