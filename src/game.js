//document.addEventListener('DOMContentLoaded', ()=> {
//    Game.newGameForm();
//})

class Game {
    constructor(game) {
        this.id = game.id;
        this.title = game.title;
        this.genre = game.genre;
        this.skill_level = game.skill_level;
        this.game_username = game.game_username
    }

    static newGameForm(player_id){
        let body = document.getElementById('container')

        let form = `
        <form id="new-game-form">
        <br>
        <label>Game Title:</label>
        <input type="text" id="game-title" placeholder="Title">
        <br>
        <label>Genre:</label>
        <input type="text" id="game-genre" placeholder="Game Genre">
        <br>
        <label>Skill Level:</label>
        <input type="number" id="game-skill-level" placeholder="Skill Level">
        <br>
        <label>Game Username:</label>
        <input type="text" id="game-username" placeholder="Game Username">
        <br>
        <input type="submit">
        </form>        
        `

        body.insertAdjacentHTML('beforeend', form)
        Game.postGame(player_id)
    }

    //POST fetch for creating Game
    static postGame(player_id) {
        let newForm = document.getElementById('new-game-form')
        newForm.addEventListener('submit', function (e){
            e.preventDefault()
            fetch('http://localhost:3000/api/v1/games',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify({
                    game: {
                        title: e.target.children[1].value,
                        genre: e.target.children[3].value,
                        skill_level: e.target.children[5].value,
                        game_username: e.target.children[7].value,
                        player_id: player_id
                    }
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error();
                    }
                    return res.json();
                })
                .then(json => {
                    let newGame = new Game(json);
                    console.log(newGame)
                newGame.appendGame()
            })
            .catch(error => {
                console.error('Game Class Error', error)
            })
        })
    }

    appendGame() {
        let gc = document.getElementsByClassName('games-container')
        let p = document.createElement('p')
        p.setAttribute('data-id', this.id)
        p.innerHTML = `Title: ${this.title}</br>Genre:${this.genre}</br>Skill Level:${this.skill_level}</br>Game Username:${this.game_username}`
    }
}