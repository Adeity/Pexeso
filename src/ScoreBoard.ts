import {App} from "./index";

/**
 * Class that renders score board view. It also reads and sets score board which is saved in localstorage.
 */
export class ScoreBoard {
    private score: Object
    private scoreBoardElement: HTMLTableElement
    private app: App

    constructor() {
        this.scoreBoardElement = document.querySelector("#score_board")
        this.renderView()
    }

    setApp(app: App) {
        this.app = app;
    }

    /**
     * Render table according to localStorage state
     */
    renderView() {
        this.scoreBoardElement.innerHTML = "";

        const score: any[] = this.getScore();

        for (let i = 0; i < score.length; i++) {
            const row = document.createElement("tr")
            const name = document.createElement("td");
            const wonCount = document.createElement("td")

            name.innerHTML = encodeURI(score[i].name);
            wonCount.innerHTML = encodeURI(score[i].wonCount);

            row.append(name)
            row.append(wonCount)

            this.scoreBoardElement.append(row)

        }
    }

    /**
     * Read score value from localStorage
     */
    getScore(): any {
        if (window.localStorage.getItem("score") == null) {
            window.localStorage.setItem("score", JSON.stringify([]))
        }
        const score = window.localStorage.getItem("score")
        return JSON.parse(score);
    }

    setScore(score: any[]) {
        localStorage.setItem("score", JSON.stringify(score))
    }

    /**
     * Player won so update localstarege
     * @param playerName
     */
    playerWon(playerName: string){
        let playerFound: boolean = false
        const score: any[] = this.getScore();
        for (let i = 0; i < score.length; i++) {
            const entry = score[i];
            if (entry.name == playerName) {
                entry.wonCount++;
                playerFound = true
            }
        }
        if (playerFound) {
            this.setScore(score)
            return;
        }

        score.push({"name": playerName, "wonCount": 1})
        this.setScore(score)
    }
    
}