const topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];

class config {
    constructor() {
       this.topics = topics;
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
    
    input(newURL) {
        async function showInput() {
            try {
                const response = await fetch(newURL);
                const data = await response.json();
                data.data.forEach(item => {
                    const gif = document.createElement('img');
                    let gifURL = item.images.original.url;
                    gif.setAttribute('src', gifURL);
                    gif.setAttribute('width', '200px');
                    gif.setAttribute('height', '150px');
                    document.querySelector('.containerContent').appendChild(gif);
                })  
            } catch (err) {
                console.log(err);
            }
        }
        showInput();
    }

    removeText() {
        const remove = document.querySelectorAll('img');
        Array.prototype.forEach.call(remove, function(node) {
            node.parentNode.removeChild(node);
        });
    }
}

const ctg = new catalog();

ctg.renderButtons();

document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();
    const inputValue = document.getElementById('input').value;
    let url = `https://api.giphy.com/v1/gifs/search?q=${inputValue}&api_key=aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB`;
    ctg.removeText();
    ctg.input(url);
})