import { GameDetails } from './gameDetails.module.js';
import { gameModule } from './game.module.js';  

const gameDetails = new GameDetails('ed9bfc5b00msh8fd87ca79de53b3p187d19jsn616103e57633', 'free-to-play-games-database.p.rapidapi.com');

document.addEventListener('DOMContentLoaded', function() {
    if (!gameModule.isLoggedIn()) {
        window.location.href = '/pages/login.html';
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('id');

        if (gameId) {
            gameDetails.getGameDetails(gameId);
        } else {
            console.error('No game ID found in URL');
        }
    }
});
