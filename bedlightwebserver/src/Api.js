
class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    turnOn() {
        fetch(`${this.baseUrl}/turnOn`)
            .catch(err => {
                console.err(err);
            });
    }

    turnOff() {
        fetch(`${this.baseUrl}/turnOff`)
            .catch(err => {
                console.err(err);
            });
    }

    setBgColor(bgColor) {
        fetch(`${this.baseUrl}/bgColor?r=${bgColor.r}&g=${bgColor.g}&b=${bgColor.b}`)
            .catch(err => {
                console.err(err);
            });
    }

    setInteractive() {
        fetch(`${this.baseUrl}/interactiveLight`)
            .catch(err => {
                console.err(err);
            });
    }
    setReadingLight() {
        fetch(`${this.baseUrl}/readingLight`)
            .catch(err => {
                console.err(err);
            });
    }
}

export default Api;