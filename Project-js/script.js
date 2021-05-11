const topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];

class config {
    constructor() {
       this.topics = topics; 
       this.url = 'https://api.giphy.com/v1/gifs/';
       this.apiKey = 'api_key=aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB';
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
    
    // პრომისი, მოაქვს url
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

    // tab - ის gif url
    tabURL() {
        let arrBtn = document.querySelectorAll('div.buttons > button');
        arrBtn.forEach((item) => {
            item.addEventListener('click', () =>{
                item.value = item.innerHTML;
                const buttonValue = item.value;
                let url = `${this.url}search?q=${buttonValue}&limit=12&${this.apiKey}`;
                this.removeGifs();
                this.fetch(url);
            })
        })
    }
    // ახალ მასივს ვქმნი აქ
    addInput(value) {
        if(value !== '') {
            this.topics.push(value);
            this.topics.shift()
            this.deleteButtons();
            this.renderButtons();
            this.tabURL();
        }
        
    }
    // ძველს ვშლი
    deleteButtons() {
        let myNode = document.querySelector('.buttons');
        myNode.innerHTML = '';
    }
    //ტრენდები
    seeWhatsTrending() {
        const trendBtn = document.getElementById('seeWhatsTrending');
        trendBtn.addEventListener('click', () => {
            let url = `${this.url}trending?&limit=12&${this.apiKey}`;
            this.fetch(url);
            this.removeGifs();
        })
    }
}

// input - ში ჩაწერისას და submit ბათონის დაჭერისას გიფები რო ამოაგდოს
document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();
    const inputValue = document.getElementById('input').value;  
    let url = `${ctg.url}search?q=${inputValue}&limit=12&${ctg.apiKey}`;
    ctg.removeGifs();
    ctg.fetch(url);
    ctg.addInput(inputValue);
})


const ctg = new catalog();

ctg.renderButtons();

ctg.tabURL();

ctg.seeWhatsTrending();