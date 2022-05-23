import {PexesoBoard} from "./PexesoBoard";
import {ScoreBoard} from "./ScoreBoard";

/**
 * Initalize navigation and set route on load of page
 */
function initializeNavigation(setRoute: (s: string) => void) {
    /**
     * Action when hash changes in URL
     */
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

/**
 * Main App class
 */
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


    /**
     * Change active page of application and change hash
     */
    setRoute(route: string) {
        location.hash = route;
        const views = document.querySelectorAll("[data-view]");
        views.forEach(function(view) {
            view.classList.remove("active")
        })
        document.querySelector("[data-view="+route+"]").classList.add("active");
    }

    /**
     * Check if size in input field is a valid value
     */
    validateSize(): boolean {
        const validValues = [2, 4]
        const size = parseInt(this.sizeInputElement.value);

        if (!validValues.includes(size)) {
            return true;
        }
        this.size = size;
        return false;
    }

    /**
     * Check if name input is valid
     */
    validateName(): boolean {
        const value = this.nameInputElement.value

        if (value.length < 1) {
            return true;
        }
        this.name = value
        return false;
    }

    /**
     * Action when Start button gets clicked
     */
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


    /**
     * Start new game of Pexeso
     */
    startPexeso(){
        if (this.pexesoBoard == null) {
            this.pexesoBoard = new PexesoBoard();
            this.pexesoBoard.setApp(this)
        }
        this.pexesoBoard.draw(this.size, this.pexesoBoardSelector)
    }

    /**
     * Game is won so do a coupe of actions
     */
    gameWon() {
        this.pexesoBoard.gameWon()
        this.scoreBoard.playerWon(this.name)
        this.scoreBoard.renderView()
        this.setRoute("score")
    }
}

new App()