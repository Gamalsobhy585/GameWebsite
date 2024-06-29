
export class GameModule {
    constructor() {
        this.apiKey = 'ed9bfc5b00msh8fd87ca79de53b3p187d19jsn616103e57633';
        this.apiHost = 'free-to-play-games-database.p.rapidapi.com';
    }

    changeFilter(index) {
        let categories = document.querySelectorAll('.category');

        categories.forEach((category, i) => {
            if (i === index) {
                category.classList.add('active');
            } else {
                category.classList.remove('active');
            }
        });
    }

    async getGames(category = 'mmorpg') {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': this.apiHost
            }
        };

        try {
            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
            const response = await api.json();
            console.log(response);
            this.displayGames(response);
        } catch (error) {
            console.error('Error fetching the games:', error);
        }
    }

    displayGames(games) {
        const gameDataContainer = document.getElementById('gameData');
        gameDataContainer.innerHTML = '';

        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'col';

            gameCard.innerHTML = ` 
            <a href='/pages/item.html?id=${game.id}'>
                <div class="card h-100 bg-secondary" role="button">
                    <div class="card-body">
                        <figure class="position-relative">
                            <img class="card-img-top object-fit-cover h-100" src="${game.thumbnail}" alt="${game.title}">
                        </figure>
                        <figcaption>
                            <div class="hstack d-flex flex-row align-items-center justify-content-between">
                                <h3 class="h6 text-white small">${game.title}</h3>
                                <span class="badge text-bg-primary p-2">Free</span>
                            </div>
                            <p class="card-text small text-center text-white">
                                ${game.short_description.length > 200 ? game.short_description.slice(0, 200) + '... <span class="see-more">See More</span>' : game.short_description}
                            </p>
                        </figcaption>
                    </div>
                    <footer class="card-footer small hstack d-flex flex-row align-items-center justify-content-between">
                        <span class="badge badge-color">${game.genre}</span>
                        <span class="badge badge-color">${game.platform}</span>
                    </footer>
                </div>
            </a>
            `;

            gameDataContainer.appendChild(gameCard);

            const seeMore = gameCard.querySelector('.see-more');
            if (seeMore) {
                seeMore.addEventListener('click', () => {
                    seeMore.parentNode.innerHTML = game.short_description;
                });
            }
        });
    }

    isLoggedIn() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        return loggedInUser !== null;
    }

    checkBrowser() {
        if (!$.browser.webkit) {
            $('.wrapper').html('<p>Sorry! Non webkit users. :(</p>');
        }
    }

    logout() {
        localStorage.removeItem('loggedInUser');
        window.location.href = '/pages/login.html';
    }
    
}
document.querySelector('.navbar-toggler').classList.add('bg-secondary');
