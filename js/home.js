// home.js

import { GameModule } from './game.module.js';

const gameModule = new GameModule();

document.addEventListener('DOMContentLoaded', function() {
    if (!gameModule.isLoggedIn()) {
        window.location.href = '/GameWebsite/pages/login.html';
    } else {
        gameModule.getGames();
    }

    const categories = document.querySelectorAll('.category');
    categories.forEach((category, index) => {
        category.addEventListener('click', () => {
            const categoryType = category.getAttribute('data-category');
            gameModule.getGames(categoryType);
            gameModule.changeFilter(index);
        });
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        gameModule.logout();
    });
});


