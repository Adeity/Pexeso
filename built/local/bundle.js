/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/MyImage.ts":
/*!************************!*\
  !*** ./src/MyImage.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.MyImage = void 0;\r\nclass MyImage {\r\n    constructor(imageCode) {\r\n        this.imageFolder = \"./pexeso-images\";\r\n        this.imageCode = imageCode;\r\n    }\r\n    getImageCode() {\r\n        return this.imageCode;\r\n    }\r\n    getSvgPath() {\r\n        let imagePath;\r\n        switch (this.imageCode) {\r\n            case 0:\r\n                imagePath = \"/ai.svg\";\r\n                break;\r\n            case 1:\r\n                imagePath = \"/ai-color.svg\";\r\n                break;\r\n            case 2:\r\n                imagePath = \"/browser.svg\";\r\n                break;\r\n            case 3:\r\n                imagePath = \"/browser-color.svg\";\r\n                break;\r\n            case 4:\r\n                imagePath = \"/camera.svg\";\r\n                break;\r\n            case 5:\r\n                imagePath = \"/camera-color.svg\";\r\n                break;\r\n            case 6:\r\n                imagePath = \"/cd.svg\";\r\n                break;\r\n            case 7:\r\n                imagePath = \"/cd-color.svg\";\r\n                break;\r\n            case 8:\r\n                imagePath = \"/circular.svg\";\r\n                break;\r\n            case 9:\r\n                imagePath = \"/circular-color.svg\";\r\n                break;\r\n            case 10:\r\n                imagePath = \"/feather.svg\";\r\n                break;\r\n            case 11:\r\n                imagePath = \"/feather-color.svg\";\r\n                break;\r\n            case 12:\r\n                imagePath = \"/invisible.svg\";\r\n                break;\r\n            case 13:\r\n                imagePath = \"/invisible-color.svg\";\r\n                break;\r\n            case 14:\r\n                imagePath = \"/light.svg\";\r\n                break;\r\n            case 15:\r\n                imagePath = \"/maskman.svg\";\r\n                break;\r\n            case 16:\r\n                imagePath = \"/zoom.svg\";\r\n                break;\r\n            case 17:\r\n                imagePath = \"/zoom-color.svg\";\r\n                break;\r\n        }\r\n        return this.imageFolder + imagePath;\r\n    }\r\n}\r\nexports.MyImage = MyImage;\r\n\n\n//# sourceURL=webpack://semestralka_pexeso/./src/MyImage.ts?");

/***/ }),

/***/ "./src/PexesoBoard.ts":
/*!****************************!*\
  !*** ./src/PexesoBoard.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.PexesoBoard = void 0;\r\nconst PexesoCard_1 = __webpack_require__(/*! ./PexesoCard */ \"./src/PexesoCard.ts\");\r\nclass PexesoBoard {\r\n    constructor(size, selector) {\r\n        this.nDimension = size % 2 == 0 ? size : size + 1;\r\n        this.numOfOpenedCards = 0;\r\n        this.numOfCards = this.nDimension * this.nDimension;\r\n        this.cards = new Array(this.numOfCards);\r\n        this.openedCards = new Array(this.numOfCards);\r\n        this.revealedCardOne = null;\r\n        this.revealedCardTwo = null;\r\n        this.htmlElement = document.body.querySelector(selector);\r\n        this.htmlElement.addEventListener(\"click\", evt => this.handleClick(evt), true);\r\n        this.initializeCards();\r\n        this.shuffleBoard();\r\n        this.audio = new Audio(\"./sound/whoosh.mp3\");\r\n    }\r\n    playSound() {\r\n        if (this.audio.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {\r\n            this.audio.play();\r\n        }\r\n    }\r\n    handleClick(e) {\r\n        e.stopPropagation();\r\n        const pexesoCard = e.composedPath()[0];\r\n        const pexesoCardId = pexesoCard.getAttribute(\"data-id\");\r\n        const pexesoCardInstance = this.getCardById(Number(pexesoCardId));\r\n        const pexesoCardState = pexesoCardInstance.getState();\r\n        console.log(pexesoCardState);\r\n        switch (pexesoCardState.getState()) {\r\n            case \"opened\":\r\n                break;\r\n            case \"closed\":\r\n                console.log(\"card is closed, try revealing\");\r\n                this.revealCard(pexesoCardInstance);\r\n                break;\r\n            case \"revealed\":\r\n                break;\r\n        }\r\n    }\r\n    getCardById(id) {\r\n        for (let i = 0; i < this.numOfCards; i++) {\r\n            if (this.cards[i].getId() === id) {\r\n                return this.cards[i];\r\n            }\r\n        }\r\n        return null;\r\n    }\r\n    initializeCards() {\r\n        let imageCode = 0;\r\n        for (let i = 0; i < this.numOfCards; i++) {\r\n            this.cards[i] = new PexesoCard_1.PexesoCard(i, imageCode);\r\n            i++;\r\n            this.cards[i] = new PexesoCard_1.PexesoCard(i, imageCode);\r\n            imageCode++;\r\n        }\r\n    }\r\n    isGameOver() {\r\n        return this.openedCards.length == this.numOfCards;\r\n    }\r\n    shuffleBoard() {\r\n        for (let i = this.cards.length - 1; i > 0; i--) {\r\n            const j = Math.floor(Math.random() * (i + 1));\r\n            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];\r\n        }\r\n        return this.cards;\r\n    }\r\n    printBoard() {\r\n        let row = \"\";\r\n        for (let i = 0; i < this.numOfCards; i++) {\r\n            if (i % this.nDimension == 0) {\r\n                console.log(row);\r\n                row = \"\";\r\n                console.log(\"\\n\");\r\n            }\r\n            row += this.cards[i].toString() + \" \";\r\n        }\r\n        console.log(row);\r\n        row = \"\";\r\n        console.log(\"\\n\");\r\n    }\r\n    toString() {\r\n        let row = \"\";\r\n        for (let i = 0; i < this.numOfCards; i++) {\r\n            if (i % this.nDimension == 0) {\r\n                row += \"\\n\";\r\n            }\r\n            row += this.cards[i].toHTMLElement() + \" \";\r\n        }\r\n        row += \"\\n\";\r\n        return row;\r\n    }\r\n    fillBoard() {\r\n        const element = this.htmlElement;\r\n        let index = 0;\r\n        for (let i = 0; i < this.nDimension; i++) {\r\n            const divElement = document.createElement(\"div\");\r\n            divElement.classList.add(\"pexeso-board-row\");\r\n            for (let j = 0; j < this.nDimension; j++) {\r\n                divElement.append(this.cards[index].getHtmlElement());\r\n                index++;\r\n            }\r\n            element.append(divElement);\r\n        }\r\n    }\r\n    refillBoard(element) {\r\n        element.innerHTML = \"\";\r\n        for (let i = 0; i < this.numOfCards; i++) {\r\n            element.append(this.cards[i].getHtmlElement());\r\n        }\r\n    }\r\n    getPositionOfCard(id) {\r\n        for (let i = 0; i < this.numOfCards; i++) {\r\n            let currentCard = this.cards[i];\r\n            if (currentCard.getId() == id) {\r\n                return i;\r\n            }\r\n        }\r\n        return null;\r\n    }\r\n    getCardAtPosition(position) {\r\n        return this.cards[position];\r\n    }\r\n    isFirstCardRevealed() {\r\n        return this.revealedCardOne != null;\r\n    }\r\n    isSecondCardRevealed() {\r\n        return this.revealedCardTwo != null;\r\n    }\r\n    revealCardById(id) {\r\n        let cardAtPosition = this.getCardById(id);\r\n        this.revealCard(cardAtPosition);\r\n    }\r\n    revealCard(card) {\r\n        if (this.isSecondCardRevealed()) {\r\n            return null;\r\n        }\r\n        card.setState(\"revealed\");\r\n        if (this.isFirstCardRevealed()) {\r\n            this.revealedCardTwo = card;\r\n            this.checkRevealedCards();\r\n        }\r\n        else if (!this.isSecondCardRevealed()) {\r\n            this.revealedCardOne = card;\r\n        }\r\n        return card;\r\n    }\r\n    checkRevealedCards() {\r\n        if (this.revealedCardOne.imgEquals(this.revealedCardTwo)) {\r\n            this.openRevealedCards();\r\n            return;\r\n        }\r\n        this.hideRevealedCards();\r\n    }\r\n    hideRevealedCards() {\r\n        setTimeout(e => {\r\n            debugger;\r\n            this.revealedCardOne.setState(\"closed\");\r\n            this.revealedCardTwo.setState(\"closed\");\r\n            this.revealedCardOne = null;\r\n            this.revealedCardTwo = null;\r\n        }, 1000);\r\n    }\r\n    hideCardById(id) {\r\n        let cardAtPosition = this.getCardById(id);\r\n        this.hideCard(cardAtPosition);\r\n    }\r\n    hideCard(card) {\r\n        card.setState(\"closed\");\r\n        if (card == this.revealedCardOne) {\r\n            this.revealedCardOne = null;\r\n        }\r\n        else if (card == this.revealedCardTwo) {\r\n            this.revealedCardTwo = null;\r\n        }\r\n    }\r\n    openCardById(id) {\r\n        let cardAtPosition = this.getCardById(id);\r\n        this.openCard(cardAtPosition);\r\n    }\r\n    openCard(card) {\r\n        card.setState(\"opened\");\r\n        this.openedCards.push(card);\r\n    }\r\n    getOpenedCards() {\r\n        return this.openedCards;\r\n    }\r\n    openRevealedCards() {\r\n        this.playSound();\r\n        this.openedCards.push(this.revealedCardOne);\r\n        this.openedCards.push(this.revealedCardTwo);\r\n        this.numOfOpenedCards++;\r\n        this.numOfOpenedCards++;\r\n        this.revealedCardOne.setState(\"opened\");\r\n        this.revealedCardTwo.setState(\"opened\");\r\n        this.revealedCardOne.getHtmlElement().querySelector(\"svg\");\r\n        this.revealedCardOne = null;\r\n        this.revealedCardTwo = null;\r\n        this.checkGameWon();\r\n    }\r\n    checkGameWon() {\r\n        if (this.numOfCards === this.numOfOpenedCards) {\r\n            this.gameWon();\r\n        }\r\n    }\r\n    gameWon() {\r\n        const svgElement = document.body.querySelector(\"#Capa_1\");\r\n        const mouth = svgElement.querySelector(\"#smiley-mouth\");\r\n        const face = svgElement.querySelector(\"#smiley-face\");\r\n        face.setAttributeNS(null, \"style\", \"fill:#FFA233\");\r\n        mouth.setAttributeNS(null, \"style\", \"fill: red\");\r\n    }\r\n}\r\nexports.PexesoBoard = PexesoBoard;\r\n\n\n//# sourceURL=webpack://semestralka_pexeso/./src/PexesoBoard.ts?");

/***/ }),

/***/ "./src/PexesoCard.ts":
/*!***************************!*\
  !*** ./src/PexesoCard.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.PexesoCard = void 0;\r\nconst State_1 = __webpack_require__(/*! ./State */ \"./src/State.ts\");\r\nconst MyImage_1 = __webpack_require__(/*! ./MyImage */ \"./src/MyImage.ts\");\r\nclass PexesoCard {\r\n    constructor(id, imageCode) {\r\n        this.id = id;\r\n        this.state = new State_1.State(\"closed\");\r\n        this.image = new MyImage_1.MyImage(imageCode);\r\n        this.htmlElement = this.toHTMLElement();\r\n    }\r\n    getId() {\r\n        return this.id;\r\n    }\r\n    getState() {\r\n        return this.state;\r\n    }\r\n    getImage() {\r\n        return this.image;\r\n    }\r\n    removeAllClasses() {\r\n        this.htmlElement.classList.remove(\"revealed\");\r\n        this.htmlElement.classList.remove(\"opened\");\r\n        this.htmlElement.classList.remove(\"closed\");\r\n    }\r\n    setState(state) {\r\n        switch (state) {\r\n            case \"closed\":\r\n                this.removeAllClasses();\r\n                this.htmlElement.classList.add(\"closed\");\r\n                break;\r\n            case \"revealed\":\r\n                this.removeAllClasses();\r\n                this.htmlElement.classList.add(\"revealed\");\r\n                break;\r\n            case \"opened\":\r\n                this.removeAllClasses();\r\n                this.htmlElement.classList.add(\"opened\");\r\n                break;\r\n        }\r\n        this.state = new State_1.State(state);\r\n    }\r\n    toString() {\r\n        return \"|S\" + this.state.getStateCode() + \" I\" + this.image.getImageCode() + \"|\";\r\n    }\r\n    getHtmlElement() {\r\n        if (this.htmlElement == null) {\r\n            this.htmlElement = this.toHTMLElement();\r\n        }\r\n        return this.htmlElement;\r\n    }\r\n    toHTMLElement() {\r\n        const div = document.createElement(\"div\");\r\n        div.setAttribute(\"class\", \"pexeso-card \" + this.state.getState());\r\n        div.setAttribute(\"data-id\", this.getId().toString());\r\n        const img = document.createElement(\"img\");\r\n        img.setAttribute(\"src\", this.getImage().getSvgPath());\r\n        img.setAttribute(\"class\", \"pexeso-card-image\");\r\n        div.append(img);\r\n        div.addEventListener(\"click\", e => {\r\n            console.log(e);\r\n            if (div.classList.contains(\"revealed\")) {\r\n                div.classList.remove(\"revealed\");\r\n                div.classList.add(\"closed\");\r\n            }\r\n            else if (div.classList.contains(\"closed\")) {\r\n                div.classList.remove(\"closed\");\r\n                div.classList.add(\"revealed\");\r\n            }\r\n        }, true);\r\n        return div;\r\n    }\r\n    imgEquals(o) {\r\n        return this.image.getImageCode() === o.image.getImageCode();\r\n    }\r\n}\r\nexports.PexesoCard = PexesoCard;\r\n\n\n//# sourceURL=webpack://semestralka_pexeso/./src/PexesoCard.ts?");

/***/ }),

/***/ "./src/State.ts":
/*!**********************!*\
  !*** ./src/State.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.State = void 0;\r\nclass State {\r\n    constructor(state) {\r\n        this.state = state;\r\n    }\r\n    getState() {\r\n        return this.state;\r\n    }\r\n    getStateCode() {\r\n        switch (this.state) {\r\n            case \"closed\": return \"C\";\r\n            case \"opened\": return \"O\";\r\n            case \"revealed\": return \"R\";\r\n            default: return \"N\";\r\n        }\r\n    }\r\n}\r\nexports.State = State;\r\n\n\n//# sourceURL=webpack://semestralka_pexeso/./src/State.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst PexesoBoard_1 = __webpack_require__(/*! ./PexesoBoard */ \"./src/PexesoBoard.ts\");\r\nfunction initializeNavigation(setRoute) {\r\n    function onHashChanged() {\r\n        switch (location.hash) {\r\n            case \"#home\":\r\n                setRoute(\"home\");\r\n                break;\r\n            case \"#hra\":\r\n                setRoute(\"hra\");\r\n                break;\r\n            default: break;\r\n        }\r\n    }\r\n    window.addEventListener('hashchange', onHashChanged, false);\r\n}\r\nfunction initializeViewHra() {\r\n    const pexesoBoard = new PexesoBoard_1.PexesoBoard(4, \"#pexeso-board\");\r\n    pexesoBoard.fillBoard();\r\n}\r\nclass App {\r\n    constructor() {\r\n        const defaultRoute = \"home\";\r\n        this.setRoute(defaultRoute);\r\n        initializeNavigation(this.setRoute);\r\n    }\r\n    setRoute(route) {\r\n        const views = document.querySelectorAll(\"[data-view]\");\r\n        views.forEach(function (view) {\r\n            view.classList.remove(\"active\");\r\n        });\r\n        document.querySelector(\"[data-view=\" + route + \"]\").classList.add(\"active\");\r\n        console.log(\"Route changed to \" + route);\r\n    }\r\n}\r\nnew App();\r\n\n\n//# sourceURL=webpack://semestralka_pexeso/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;