import {PexesoCard} from "./PexesoCard";
import {App} from "./index";

/**
 * Pexeso board class that handles all the game logic and renders view
 */
export class PexesoBoard {
    private cards: Array<PexesoCard>;
    private nDimension: number; // if this is 4, then numOfCards is 16
    private numOfCards: number;
    private numOfOpenedCards: number;
    public revealedCardOne: PexesoCard;
    public revealedCardTwo: PexesoCard;
    private openedCards: Array<PexesoCard>;
    private htmlElement: Element;
    private audio: HTMLAudioElement
    private app: App

    constructor() {
        this.audio = new Audio("./sound/whoosh.mp3")
    }

    setApp(app: App) {
        this.app = app;
    }

    draw(size: number, selector: string) {
        this.initParameters(size, selector)
        this.initializeCards()
        this.shuffleBoard()
        this.fillBoard();
    }

    /**
     * Initalize parameters for start of the game
     * @param size - size of pexeso board
     * @param selector - selector for board element in document
     */
    initParameters(size: number, selector: string){
        this.svgGameStart()
        this.nDimension = size % 2 == 0 ? size : size + 1;
        this.numOfOpenedCards = 0;
        this.numOfCards = this.nDimension * this.nDimension;
        this.cards = new Array<PexesoCard>(this.numOfCards)
        this.openedCards = new Array<PexesoCard>(this.numOfCards)
        this.revealedCardOne = null
        this.revealedCardTwo = null
        this.htmlElement = document.body.querySelector(selector)
        this.htmlElement.innerHTML = "";
        this.htmlElement.removeEventListener("click", evt => this.handleClick(evt), true);
        this.htmlElement.addEventListener("click", evt => this.handleClick(evt), true);
    }

    /**
     * Play sound
     */
    playSound() {
        if(this.audio.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
            this.audio.play();
        }
    }

    /**
     * Handle click on the pexeso Board.
     */
    handleClick(e: Event) {
        e.stopPropagation();
        const pexesoCard = <Element> e.composedPath()[0]
        const pexesoCardId = pexesoCard.getAttribute("data-id")
        if (pexesoCardId == null) {
            return;
        }
        const pexesoCardInstance = this.getCardById(Number(pexesoCardId));

        const pexesoCardState = pexesoCardInstance.getState();
        switch (pexesoCardState.getState()){
            case "opened":
                break;
            case "closed":
                this.revealCard(pexesoCardInstance)
                break;
            case "revealed":
                break;
        }
    }

    /**
     * Find card by its id
     */
    getCardById(id: number): PexesoCard {
        for (let i = 0; i < this.numOfCards; i++) {
            if (this.cards[i].getId() === id) {
                return this.cards[i];
            }
        }
        return null;
    }


    /**
     * Fill cards aray with PexesoCards
     */
    initializeCards() {
        let imageCode: number = 0
        for (let i = 0; i < this.numOfCards; i++) {
            // 0 1 2 3
            this.cards[i] = new PexesoCard(i, imageCode)
            i++
            this.cards[i] = new PexesoCard(i, imageCode)
            imageCode++
        }
    }


    /**
     * Shuffle board af pexeso cards
     */
    shuffleBoard() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        return this.cards;
    }


    toString(): string {
        let row: string = ""
        for (let i = 0; i < this.numOfCards; i++) {
            if (i % this.nDimension == 0) {
                row += "\n"
            }
            row += this.cards[i].toHTMLElement() + " "
        }
        row += "\n"
        return row
    }

    /**
     * Fill PexesoBoard View according to state
     */
    fillBoard(): void {
        const element = this.htmlElement;
        let index = 0;
        for (let i = 0; i < this.nDimension; i++) {
            const divElement = document.createElement("div")
            divElement.classList.add("pexeso-board-row")
            for (let j = 0; j < this.nDimension; j++) {
                divElement.append(this.cards[index].getHtmlElement())
                index++;
            }
            element.append(divElement)
        }
    }


    /**
     * Check if there is one card revealed
     */
    isFirstCardRevealed(): boolean {
        return this.revealedCardOne != null
    }

    /**
     * Check if there are two cards revealed
     */
    isSecondCardRevealed(): boolean {
        return this.revealedCardTwo != null
    }

    /**
     * Reveal card that was clicked on
     */
    revealCard(card: PexesoCard) {
        //  are two cards revealed
        if (this.isSecondCardRevealed()) {
            return null;
        }
        card.setState("revealed")
        if (this.isFirstCardRevealed()) {
            this.revealedCardTwo = card
            this.checkRevealedCards();
        }
        else if(!this.isSecondCardRevealed()) {
            this.revealedCardOne = card
        }
        return card;
    }

    /**
     * See if two of revealed cards are the same. If so, open them
     */
    checkRevealedCards() {
        if (this.revealedCardOne.imgEquals(this.revealedCardTwo)) {
            this.openRevealedCards()
            return;
        }
        this.hideRevealedCards()
    }

    /**
     * Hide revealed cards if they dont match
     */
    hideRevealedCards() {
        setTimeout(e => {
            this.revealedCardOne.setState("closed")
            this.revealedCardTwo.setState("closed")
            this.revealedCardOne = null
            this.revealedCardTwo = null
        }, 1000)
    }


    /**
     * Hide individual card
     * @param card
     */
    hideCard(card: PexesoCard) {
        card.setState("closed")
        if (card == this.revealedCardOne) {
            this.revealedCardOne = null
        }
        else if (card == this.revealedCardTwo){
            this.revealedCardTwo = null
        }
    }

    openCardById(id: number) {
        let cardAtPosition = this.getCardById(id)
        this.openCard(cardAtPosition)
    }

    openCard(card: PexesoCard) {
        card.setState("opened")
        this.openedCards.push(card)
    }

    /**
     * Open revealed cards if they match. Set their state to open
     */
    openRevealedCards() {
        this.playSound();
        // push them to list
        this.openedCards.push(this.revealedCardOne)
        this.openedCards.push(this.revealedCardTwo)
        this.numOfOpenedCards++
        this.numOfOpenedCards++

        // change their state so their css changes
        this.revealedCardOne.setState("opened")
        this.revealedCardTwo.setState("opened")

        // change their svg
        this.revealedCardOne.getHtmlElement().querySelector("svg")

        this.revealedCardOne = null
        this.revealedCardTwo = null

        this.checkGameWon();
    }

    /**
     * Chekc if the game is at an end
     */
    checkGameWon() {
        if (this.numOfCards === this.numOfOpenedCards) {
            this.app.gameWon()
        }
    }

    /**
     * Set smiley face svg to black and white at the start of the game
     */
    svgGameStart() {
        const svgElement = document.body.querySelector("#Capa_1")
        const mouth = svgElement.querySelector("#smiley-mouth");
        const face = svgElement.querySelector("#smiley-face");

        face.setAttributeNS(null, "style", "fill:grey")
        mouth.setAttributeNS(null, "style", "fill: white")
    }

    /**
     * Game is won so set the svg smiley face to be colorful
     */
    gameWon() {
        const svgElement = document.body.querySelector("#Capa_1")
        const mouth = svgElement.querySelector("#smiley-mouth");
        const face = svgElement.querySelector("#smiley-face");

        face.setAttributeNS(null, "style", "fill:#FFA233")
        mouth.setAttributeNS(null, "style", "fill: red")
    }
}
