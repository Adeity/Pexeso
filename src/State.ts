export class State {
    private state: string
    constructor(state: string) {
        this.state = state
    }

    getState(): string {
        return this.state
    }

    getStateCode(): string {
        switch (this.state) {
            case "closed": return "C"
            case "opened": return "O"
            case "revealed": return "R"
            default: return "N"
        }
    }
}
