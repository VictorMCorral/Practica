export async function getTypes() {
    try {
        const response = await fetch("https://api.magicthegathering.io/v1/types");
        const data = await response.json();
        return data.types || [];
    } catch (error) {
        console.error("Error al obtener los tipos:", error);
        return [];
    }
}

export async function getSets() {
    try {
        const response = await fetch("https://api.magicthegathering.io/v1/sets");
        const data = await response.json();
        return data.sets || [];
    } catch (error) {
        console.error("Error al obtener los sets:", error);
        return [];
    }
}

export async function getCards(filters) {
    const query = new URLSearchParams(filters).toString();
    try {
        const response = await fetch(
            `https://api.magicthegathering.io/v1/cards?${query}`
        );
        const data = await response.json();
        return data.cards || [];
    } catch (error) {
        console.error("Error al obtener las cartas:", error);
        return [];
    }
}

export async function getFormats() {
    try {
        const response = await fetch("https://api.magicthegathering.io/v1/formats");
        const data = await response.json();
        return data.formats || [];
    } catch (error) {
        console.error("Error al obtener los formatos:", error);
        return [];
    }
}
