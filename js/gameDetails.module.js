export class GameDetails {
    constructor(apiKey, apiHost) {
        this.apiKey = apiKey;
        this.apiHost = apiHost;
    }

    async getGameDetails(id) {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': this.apiHost
            }
        };

        try {
            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
            const response = await api.json();
            console.log(response);
            this.displayGame(response);
        } catch (error) {
            console.error('Error fetching the games:', error);
        }
    }

    displayGame(game) {
        const gameDataContainer = document.getElementById('gameContianer');
        gameDataContainer.innerHTML = '';

        const gameCard = document.createElement('div');
        gameCard.className = 'row align-items-center';

        const maxLength = 200;
        let shortDescription = game.description;
        let fullDescription = game.description;
        let showMoreButton = '';

        if (game.description.length > maxLength) {
            shortDescription = game.description.substring(0, maxLength) + '...';
            showMoreButton = `<a id="seeMoreButton" class="text-decoration-none text-warning" style="cursor: pointer;">See More</a>`;
        }

        gameCard.innerHTML = `
            <div class="col-md-6">
                <div class="card bg-dark border-0">
                    <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}">
                </div>
            </div>
            <div class="col-md-6">
                <h2 class="text-white">Title: <span>${game.title}</span></h2>
                <p class="text-white"><strong>Category:</strong> <span class="badge text-white badge-primary">${game.genre}</span></p>
                <p class="text-white"><strong>Platform:</strong> <span class="badge text-white badge-info">${game.platform}</span></p>
                <p class="text-white"><strong>Status:</strong> <span class="badge text-white badge-success">${game.status}</span></p>
                <p class="text-white" id="description">${shortDescription}  <span>${showMoreButton}</span></p>
                <button class="btn btn-outline-warning"><a href="${game.game_url}" class="text-white">Show Game</a></button>
            </div>
        `;

        gameDataContainer.appendChild(gameCard);

        const seeMoreButton = document.getElementById('seeMoreButton');
        if (seeMoreButton) {
            seeMoreButton.addEventListener('click', () => {
                const descriptionElement = document.getElementById('description');
                descriptionElement.textContent = fullDescription;
                seeMoreButton.remove(); // Remove the "See More" button after expanding
            });
        }
    }
}
