"use strict";
class Memoria {
    
    //Objeto JSON con la información de las tarjetas del juego
    elements = [
        { "element": "HTML5", "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg" },
        { "element": "HTML5", "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg" },
        { "element": "CSS3", "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
        { "element": "CSS3", "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
        { "element": "JS", "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg" },
        { "element": "JS", "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg" },
        { "element": "PHP", "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
        { "element": "PHP", "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
        { "element": "SVG", "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg" },
        { "element": "SVG", "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg" },
        { "element": "W3C", "source": "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg" },
        { "element": "W3C", "source": "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg" }
    ];

    constructor() {
        this.hasFlippedCard=false;
        this.lockBoard=false;
        this.firstCard=null;
        this.secondCard=null;

        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    
    
    //Método para barajar los elementos
    shuffleElements() {
        for (let i = 0; i<this.elements.length; i++) {
            let random = Math.floor(Math.random()*12);
            let temp = this.elements[i];
            this.elements[i]=this.elements[random];
            this.elements[random]=temp;
        }
        return this.elements;
    }

    unflipCards() {
        this.lockBoard=true;

        setTimeout(() => {
        
            this.firstCard.dataset.state='initial';
            this.secondCard.dataset.state='initial';

            this.resetBoard();

        }, 2500);

    }

    

    checkForMatch() {
        const isMatch = this.firstCard.dataset.element === this.secondCard.dataset.element;
        isMatch ? this.disableCards() : this.unflipCards();
        
    }


    resetBoard() {
        this.firstCard=null;
        this.secondCard=null;
        this.hasFlippedCard=false;
        this.lockBoard=false;
    }

    disableCards() {
        this.firstCard.dataset.state='revealed';
        this.secondCard.dataset.state='revealed';
        this.resetBoard();
    }


    createElements() {
        const juegoSection = document.querySelector('aside'); 

        for (const element of this.elements) {
            const article = document.createElement('article');
            article.dataset.element = element.element;
        
            const h3 = document.createElement('h3');
            h3.textContent = 'Tarjeta de memoria';
            article.appendChild(h3);
        
            const img = document.createElement('img');
            img.src = element.source;
            img.alt = element.element;
            article.appendChild(img);
        
            juegoSection.appendChild(article);
        }

        
    }

    addEventListeners() {
        const cards = document.querySelectorAll('article');
        for (const card of cards) {
            card.addEventListener('click', this.flipCard.bind(card, this));
        }
    }

    
    flipCard(game) { 

        if (this.dataset.state === 'revealed') return;
        if (game.lockBoard) return; //Evitar clics adicionales
        if (this === game.firstCard) return; //Evitar clic en la misma tarjeta
        
        this.dataset.state = 'flip';

        if (!game.hasFlippedCard) {
            //Primera tarjeta volteada
            game.hasFlippedCard = true;
            game.firstCard = this;
            this.firstCard=game.firstCard;  
        } else {
            //Segunda tarjeta volteada
            game.secondCard = this;
            this.secondCard=game.secondCard; 
            game.checkForMatch();
        }
    }

}

var memoria = new Memoria();
