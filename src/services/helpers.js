import axios from "axios";

const SWAPI_BASE_URL = "https://swapi.dev/api";

const IMAGE_PLACEHOLDER_URL =
    "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";

const fetchEntityData = async (id, type) => {
    try {
        const response = await axios.get(`${SWAPI_BASE_URL}/${type}/${id}`);
        return response.data;
    } catch (error) {
        console.log(`Failed to fetch data: ${error.message}`);
    }
};

const formatPeopleData = (data) => ({
    name: data.name,
    height: data.height,
    mass: data.mass,
    gender: data.gender,
    birth_year: data.birth_year,
    eye_color: data.eye_color,
});

const formatPlanetsData = (data) => ({
    name: data.name,
    climate: data.climate,
    diameter: data.diameter,
    population: data.population,
    terrain: data.terrain,
    orbital_period: data.orbital_period,
});

const formatStarshipsData = (data) => ({
    name: data.name,
    model: data.model,
    manufacturer: data.manufacturer,
    cost_in_credits: data.cost_in_credits,
});

const formatData = (data, type) => {
    if (!data) {
        return { isAvailable: "not available" };
    }

    if (type === "people") return formatPeopleData(data);
    if (type === "planets") return formatPlanetsData(data);
    if (type === "starships") return formatStarshipsData(data);
};

export const getData = async (id, type) => {
    const data = await fetchEntityData(id, type);
    return formatData(data, type);
};

export const fetchImageSrc = async (id, category) => {
    try {
        const {
            request: { responseURL },
        } = await axios.get(
            `https://starwars-visualguide.com/assets/img/${
                category === "people" ? "characters" : category
            }/${id}.jpg`
        );
        return responseURL;
    } catch {
        return IMAGE_PLACEHOLDER_URL;
    }
};

export function convertString(str) {
    return str.replace(/_/g, " ");
}
