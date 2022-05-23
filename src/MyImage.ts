/**
 * Image class for PexesoCard so correct image gets oaded
 */
export class MyImage {
    private imageCode: number
    private imageFolder: string = "./pexeso-images"
    constructor(imageCode: number) {
        this.imageCode = imageCode
    }

    getImageCode(): number {
        return this.imageCode
    }

    getSvgPath(): string {
        let imagePath
        switch (this.imageCode) {
            case 0:
                imagePath = "/ai.svg"
                break;
            case 1:
                imagePath = "/ai-color.svg"
                break;
            case 2:
                imagePath = "/browser.svg"
                break;
            case 3:
                imagePath = "/browser-color.svg"
                break;
            case 4:
                imagePath = "/camera.svg"
                break;
            case 5:
                imagePath = "/camera-color.svg"
                break;
            case 6:
                imagePath = "/cd.svg"
                break;
            case 7:
                imagePath = "/cd-color.svg"
                break;
            case 8:
                imagePath = "/circular.svg"
                break;
            case 9:
                imagePath = "/circular-color.svg"
                break;
            case 10:
                imagePath = "/feather.svg"
                break;
            case 11:
                imagePath = "/feather-color.svg"
                break;
            case 12:
                imagePath = "/invisible.svg"
                break;
            case 13:
                imagePath = "/invisible-color.svg"
                break;
            case 14:
                imagePath = "/light.svg"
                break;
            case 15:
                imagePath = "/maskman.svg"
                break;
            case 16:
                imagePath = "/zoom.svg"
                break;
            case 17:
                imagePath = "/zoom-color.svg"
                break;
        }
        return this.imageFolder + imagePath;
    }

}
