
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

    addAlarm(hour, minute, r, g, b, interactive, enabled) {
        fetch(`${this.baseUrl}/addAlarm?hour=${hour}&minute=${minute}&r=${r}&g=${g}&b=${b}&enabled=${enabled ? 1 : 0}&interactive=${interactive ? 1 : 0}`)
            .catch(err => {
                console.err(err);
            });
    }

    deleteAlarm(id) {
        fetch(`${this.baseUrl}/deleteAlarm?id=${id}`)
            .catch(err => {
                console.err(err);
            });
    }

    async getAlarms() {
        let resp = await fetch(`${this.baseUrl}/getAlarms`);
        let data = await resp.json();
        return data;
    }

    updateAlarm(hour, minute, r, g, b, interactive, enabled, id) {
        fetch(`${this.baseUrl}/updateAlarm?hour=${hour}&minute=${minute}&r=${r}&g=${g}&b=${b}&enabled=${enabled ? 1 : 0}&interactive=${interactive ? 1 : 0}&id=${id}`)
            .catch(err => {
                console.err(err);
            });
    }
}

export default Api;