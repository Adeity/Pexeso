import {PexesoBoard} from "./PexesoBoard";

function initializeNavigation(setRoute: (s: string) => void) {
    function onHashChanged() {
        switch (location.hash) {
            case "#home": setRoute("home"); break;
            case "#hra": setRoute("hra"); break;
            default: break;
        }
    }
    window.addEventListener('hashchange', onHashChanged, false);
}


function initializeViewHra() {
    const pexesoBoard = new PexesoBoard(4, "#pexeso-board")
    pexesoBoard.fillBoard()
}


class App {
    constructor() {
        const defaultRoute = "home"
        this.setRoute(defaultRoute)

        // Initialize navigation
        initializeNavigation(this.setRoute);
    }

    setRoute(route: string) {
        const views = document.querySelectorAll("[data-view]");
        views.forEach(function(view) {
            view.classList.remove("active")
        })
        document.querySelector("[data-view="+route+"]").classList.add("active");
        console.log("Route changed to " + route);
    }
}

new App()
