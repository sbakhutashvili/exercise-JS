const topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];
const url = "https://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB";

class config {
    constructor() {
       this.topics = topics;
       this.url = url;
    }
}

class catalog extends config {
    renderButtons() {
        this.topics.forEach(item => {
            const btn = document.createElement('button');
            btn.innerHTML = item;
            document.querySelector('.buttons').appendChild(btn);
        })
    }

    input() {
        async function showInput() {
            try {
                console.log('data is requested...')
                const response = await fetch(url, {
                    dataType: 'json',
                    contentType: 'text/html' 
                });
                const data = await response.json();
                console.log(data.data);
                data.data.forEach(item => {
                    const gif = document.createElement('img');
                    gif.setAttribute('src', item.type);
                    document.querySelector('.containerContent').appendChild(gif);
                })  
            } catch (err) {
                console.log(err);
            }
        }
        showInput();
    }
}

const ctg = new catalog();
ctg.renderButtons();
ctg.input();