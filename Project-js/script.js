const topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];

class config {
    constructor() {
       this.topics = topics;  
    }
}

class catalog extends config {
    // არენდერებს მასივს 
    renderButtons() {
        this.topics.forEach(item => {
            const btn = document.createElement('button');
            btn.innerHTML = item;
            document.querySelector('.buttons').appendChild(btn);
        })
    }
    
    // პრომისი, მოქავს url
    fetch(newURL) {
        async function fetchFnc() {
            try {
                const response = await fetch(newURL);
                const data = await response.json();
                data.data.forEach(item => {
                    const gif = document.createElement('img');
                    let gifURL = item.images.original.url;
                    gif.setAttribute('src', gifURL);
                    gif.setAttribute('class', 'img');
                    document.querySelector('.containerContent').appendChild(gif);
                })  
            } catch (err) {
                console.log(err);
            }
        }
        fetchFnc();
    }

    // ფუნქცია, რომელიც შლის img თეგს. ეს გვჭირდება იმისთვის რომ ერთმანეთის ქვემოთ არ გამოიტანოს გიფები
    removeGifs() {
        const remove = document.querySelectorAll('img');
        Array.prototype.forEach.call(remove, function(node) {
            node.parentNode.removeChild(node);
        });
    }
    // ეს ჯერ დასრულებული არარი :დ
    replaceTabs() {
        let arrBtn = document.querySelectorAll('div.buttons > button');
        arrBtn.forEach((item) => {
            item.addEventListener('click', () =>{
                const buttonValue = item.textContent.value;
                let url = `https://api.giphy.com/v1/gifs/search?q=${buttonValue}&api_key=aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB`;
                fetch(url);
            })
        })
    }
}

const ctg = new catalog();

ctg.renderButtons();
// inpu - ში ჩაწერისას და submit ბათონის დაჭერისას გიფები რო ამოაგდოს
document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();
    const inputValue = document.getElementById('input').value;
    let url = `https://api.giphy.com/v1/gifs/search?q=${inputValue}&api_key=aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB`;
    ctg.removeGifs();
    ctg.fetch(url);
})

ctg.replaceTabs();