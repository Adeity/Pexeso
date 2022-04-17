import {PexesoBoard, PexesoCard} from "../src/index";
describe('testing PexesoBoard class', () => {
    test('test', () => {
        let pexesoBooard:  PexesoBoard = new PexesoBoard(4)
        let card1: PexesoCard = pexesoBooard.revealCard(0)
        let card2: PexesoCard = pexesoBooard.revealCard(1)

        expect(card1.getState().getStateCode()).toBe("R")
        expect(card2.getState().getStateCode()).toBe("R")

        pexesoBooard.openRevealedCards()

        expect(card1.getState().getStateCode()).toBe("O")
        expect(card2.getState().getStateCode()).toBe("O")

        const openedCards = pexesoBooard.getOpenedCards()
        expect(openedCards[0]).toBe(card1)
        expect(openedCards[1]).toBe(card2)

    });
});