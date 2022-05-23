import {State} from "./State";
import {MyImage} from "./MyImage";

export class PexesoCard {
    private id: number;
    private state: State;
    private image: MyImage;
    private htmlElement: HTMLDivElement

    constructor(id: number, imageCode: number) {
        // three states, closed, revealed, opened
        this.id = id;
        this.state = new State("closed")
        this.image = new MyImage(imageCode)
        this.htmlElement = this.toHTMLElement();
    }

    getId(): number {
        return this.id
    }

    getState(): State {
        return this.state
    }

    getImage(): MyImage {
        return this.image
    }

    removeAllClasses() {
        this.htmlElement.classList.remove("revealed")
        this.htmlElement.classList.remove("opened")
        this.htmlElement.classList.remove("closed")
    }

    setState(state: string) {
        switch (state) {
            case "closed":
                this.removeAllClasses()
                this.htmlElement.classList.add("closed")
                break;
            case "revealed":
                this.removeAllClasses()
                this.htmlElement.classList.add("revealed")
                break;
            case "opened":
                this.removeAllClasses()
                this.htmlElement.classList.add("opened")
                break;
        }
        this.state = new State(state)
    }

    toString(): string {
        return "|S" + this.state.getStateCode() + " I" + this.image.getImageCode() + "|"
    }

    getHtmlElement(): HTMLDivElement {
        if (this.htmlElement == null) {
            this.htmlElement = this.toHTMLElement();
        }
        return this.htmlElement
    }
    
    toHTMLElement(): HTMLDivElement {
        const div = document.createElement("div")
        div.setAttribute("class", "pexeso-card " + this.state.getState())
        div.setAttribute("data-id", this.getId().toString())

        const img = document.createElement("img")
        img.setAttribute("src",this.getImage().getSvgPath())
        img.setAttribute("class", "pexeso-card-image")

        div.append(img)

        div.addEventListener("click", e=> {
            if(div.classList.contains("revealed")) {
                div.classList.remove("revealed")
                div.classList.add("closed")
            }
            else if(div.classList.contains("closed")) {
                div.classList.remove("closed")
                div.classList.add("revealed")
            }

        }, true)


        return div;
    }

    imgEquals(o: PexesoCard): boolean {
        return this.image.getImageCode() === o.image.getImageCode();
    }
}
