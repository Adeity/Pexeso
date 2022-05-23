import {PexesoBoard} from "./PexesoBoard";
import {ScoreBoard} from "./ScoreBoard";

function initializeNavigation(setRoute: (s: string) => void) {
    function onHashChanged() {
        switch (location.hash) {
            case "#home": setRoute("home"); break;
            case "#hra": setRoute("hra"); break;
            case "#about": setRoute("about"); break;
            case "#score": setRoute("score"); break;
            default:
                setRoute("home"); break;
        }
    }
    onHashChanged();
    window.addEventListener('hashchange', onHashChanged, false);
}

export class App {
    private scoreBoard: ScoreBoard
    private sizeInputElement: HTMLInputElement
    private nameInputElement: HTMLInputElement
    private startPexesoButton: HTMLButtonElement
    private pexesoBoard: PexesoBoard;
    private pexesoBoardSelector: string = "#pexeso-board"
    private size: number;
    private name: string;
    constructor() {
        // Initialize navigation
        initializeNavigation(this.setRoute);
        this.scoreBoard = new ScoreBoard()
        this.scoreBoard.setApp(this)

        this.startPexesoButton = document.querySelector("#start_pexeso_button")
        this.startPexesoButton.addEventListener("click", this.startPexesoButtonClick.bind(this))
        this.sizeInputElement = document.querySelector("#size_input")
        this.nameInputElement = document.querySelector("#name_input")
    }


    setRoute(route: string) {
        location.hash = route;
        const views = document.querySelectorAll("[data-view]");
        views.forEach(function(view) {
            view.classList.remove("active")
        })
        document.querySelector("[data-view="+route+"]").classList.add("active");
    }

    validateSize(): boolean {
        const validValues = [2, 4]
        const size = parseInt(this.sizeInputElement.value);

        if (!validValues.includes(size)) {
            return true;
        }
        this.size = size;
        return false;
    }

    validateName(): boolean {
        const value = this.nameInputElement.value

        if (value.length < 1) {
            return true;
        }
        this.name = value
        return false;
    }

    startPexesoButtonClick(){
        const isInvalidSize = this.validateSize();
        const isInvalidName = this.validateName();

        this.sizeInputElement.classList.remove("is-invalid")
        this.nameInputElement.classList.remove("is-invalid")
        if (isInvalidSize) {
            this.sizeInputElement.classList.add("is-invalid")
        }
        if (isInvalidName) {
            this.nameInputElement.classList.add("is-invalid")
        }
        if (isInvalidName || isInvalidSize) {
            return;
        }

        this.setRoute("hra")
        this.startPexeso()
    }


    startPexeso(){
        if (this.pexesoBoard == null) {
            this.pexesoBoard = new PexesoBoard();
            this.pexesoBoard.setApp(this)
        }
        this.pexesoBoard.draw(this.size, this.pexesoBoardSelector)
    }

    gameWon() {
        this.pexesoBoard.gameWon()
        this.scoreBoard.playerWon(this.name)
        this.scoreBoard.renderView()
        this.setRoute("score")
    }
}

new App()

// localStorage.clear()
// localStorage.setItem("score", JSON.stringify([]))
// localStorage.setItem("scoreObj", JSON.stringify({}))
//
// const score = localStorage.getItem("score")
// const scorehu = localStorage.getItem("scoreObj")
// const scoreParsed = JSON.parse(score);
// const scorehuParsed = JSON.parse(scorehu);
// console.log(score)
// console.log(scorehu)
// console.log(scoreParsed)
// console.log(scorehuParsed)
//
// scoreParsed[0] = "hovno"
// localStorage.setItem("score", JSON.stringify(scoreParsed));
//
// console.log(JSON.parse(localStorage.getItem("score")))

