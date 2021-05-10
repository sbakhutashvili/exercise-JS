const topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];
const url = "https://api.giphy.com/v1/gifs/search?&api_key=aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB";

class config {
    constructor() {
       this.topics = topics;
       this.url = url;
    }
}

class catalog extends config {
    render() {
        this.topics.forEach(item => {
            const btn = document.createElement('button');
            btn.innerHTML = item;
            document.querySelector('.buttons').appendChild(btn);
        })
    }

    input() {
        function showInput() {
            console.log('dariduridarale...')
            const response = fetch(url);
            const data = response.json();
            console.log('data', data);
        }
        showInput();
    }
}

const ctg = new catalog();
ctg.render();
ctg.input();