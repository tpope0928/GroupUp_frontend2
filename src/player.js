//const playerEndPoint = "http://localhost:3000/api/v1/players"

document.addEventListener('DOMContentLoaded', ()=> {
    Player.createPlayer();
})

//Player Params
class Player {
    constructor(player) {
        this.id = player.id;
        this.name = player.name;
        this.city = player.city;
        this.state = player.state;
        this.games = player.games
    }
    // Creating a Player POST fetch
    static createPlayer() {
        let newPlayerForm = document.getElementById('new-player-form')
        newPlayerForm.addEventListener('submit', function (e){
            e.preventDefault();
            fetch('http://localhost:3000/api/v1/players', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify({
                    player: {
                        name: e.target.children[1].value,
                        city: e.target.children[3].value,
                        state: e.target.children[5].value
                    }
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error();
                    }
                    return res.json();
                })
                .then (player => {
                    let newPlayer = new Player(player)
                    console.log(player)
                    newPlayer.displayPlayer();
                })
                .catch(error => {
                    console.error('Player class Error' , error)
                })
        })
    }

    displayPlayer() {
        let body = document.getElementById('container');
        body.innerHTML = ''
        let div = document.createElement('div');
        div.setAttribute('class', 'player-greeting');
        let gc = document.getElementById('games-container')
        gc.classList.remove('hidden')
        let Greeting = document.createElement('p');
        Greeting.innerHTML = `<h1>Hi ${this.name}! What game would you like to find players in?</h1>`
        div.appendChild(Greeting);
        body.appendChild(div);
    }
}

