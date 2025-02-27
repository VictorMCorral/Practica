let FormatsElementos = document.getElementById('Formats');

function getFormats(done) {
    fetch(`https://api.magicthegathering.io/v1/formats`)
        .then(response => response.json())
        .then(data => {
            if (data.formats.length > 0) {
                done(data.formats);
            } else {
                console.log("No hay más formatos disponibles.");
            }
        })
        .catch(error => console.error("Error al obtener los formatos:", error));
}

getFormats(formats => {
    console.log(formats);
    createSearchInput(formats);
    renderFormats(formats);
});

function createSearchInput(formats) {
    const searchContainer = document.getElementById("search-container");
    const searchInput = document.createElement("input");
    searchInput.id = "search-input";
    searchInput.placeholder = "Buscar por nombre del formato...";
    searchContainer.appendChild(searchInput);

    searchInput.addEventListener("input", () => {
        filterFormats(formats, searchInput.value);
    });
}

function filterFormats(formats, query) {
    const filteredFormats = formats.filter(format => 
        format.toLowerCase().includes(query.toLowerCase())
    );
    renderFormats(filteredFormats);
}

function renderFormats(formats) {
    const formatsContainer = document.getElementById("Contenedor-formats");
    formatsContainer.innerHTML = "";

    formats.forEach(format => {
        const div = document.createRange().createContextualFragment(`
            <div class="formatos">
                <div class="n">Nombre: ${format || "Desconocido"}</div>
            </div>
        `);
        formatsContainer.appendChild(div);
    });
}
