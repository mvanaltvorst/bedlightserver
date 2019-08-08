
class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    turnOn() {
        fetch(`${this.baseUrl}turnOn`)
            .catch(err => {
                console.err(err);
            });
    }

    setBgColor(bgColor) {
        console.log(`${this.baseUrl}setBgColor?r=${bgColor.r}&g=${bgColor.g}&b=${bgColor.b}`);
        fetch(`${this.baseUrl}setBgColor?r=${bgColor.r}&g=${bgColor.g}&b=${bgColor.b}`)
        .catch(err => {
            console.err(err);
        })
    }
}

export default Api;