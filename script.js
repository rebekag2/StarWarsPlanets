async function fetchPlanetData(planetId) {
    try {
        const response = await fetch(`https://swapi.py4e.com/api/planets/${planetId}/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching planet data:', error);
    }
}

async function fetchData() {
    try {
        const response = await fetch('https://swapi.py4e.com/api/planets/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const detailedPlanetData = await Promise.all(data.results.map(async planet => {
            const planetId = planet.url.split('/').filter(Boolean).pop();
            return await fetchPlanetData(planetId);
        }));

        displayData(detailedPlanetData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(planets) {
    const planetsContainer = document.getElementById('planets-container');
    planets.forEach(planet => {
        const planetElement = document.createElement('div');
        planetElement.innerHTML = `
            <h2>${planet.name}</h2>
            <p>Climate: ${planet.climate}</p>
            <p>Terrain: ${planet.terrain}</p>
            <p>Population: ${planet.population}</p>
            <p>Gravity: ${planet.gravity}</p>
            <!-- Add more details as needed -->
        `;
        planetsContainer.appendChild(planetElement);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    fetchData();
});
