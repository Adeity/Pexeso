import {PexesoBoard} from "./PexesoBoard";

function initializeNavigation(setRoute: (s: string) => void) {
    function onHashChanged() {
        console.log("location hash:", location.hash)
        switch (location.hash) {
            case "#home": setRoute("home"); break;
            case "#hra": setRoute("hra"); break;
            case "#about": setRoute("about"); break;
            default: break;
        }
    }
    onHashChanged();
    window.addEventListener('hashchange', onHashChanged, false);
}

class App {
    private sizeInputElement: HTMLInputElement
    private startPexesoButton: HTMLButtonElement
    private pexesoBoard: PexesoBoard;
    private pexesoBoardSelector: string = "#pexeso-board"
    private size: number;
    constructor() {
        // Initialize navigation
        console.log("App#constructor")
        initializeNavigation(this.setRoute);

        this.startPexesoButton = document.querySelector("#start_pexeso_button")
        this.startPexesoButton.addEventListener("click", this.startPexesoButtonClick.bind(this))
        this.sizeInputElement = document.querySelector("#size_input")
    }

    setRoute(route: string) {
        console.log("route:", route)
        location.hash = route;
        const views = document.querySelectorAll("[data-view]");
        views.forEach(function(view) {
            view.classList.remove("active")
        })
        document.querySelector("[data-view="+route+"]").classList.add("active");
        console.log("Route changed to " + route);
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

    startPexesoButtonClick(){
        const isInvalid = this.validateSize();
        this.sizeInputElement.classList.remove("is-invalid")
        if (isInvalid) {
            this.sizeInputElement.classList.add("is-invalid")
            return
        }

        this.setRoute("hra")
        this.startPexeso()
    }


    startPexeso(){
        console.log("starting pexeso")
        if (this.pexesoBoard == null) {
            this.pexesoBoard = new PexesoBoard();
        }
        console.log("size:", this.size, "pexesoboard selector:", this.pexesoBoardSelector)
        this.pexesoBoard.draw(this.size, this.pexesoBoardSelector)
    }
}

new App()