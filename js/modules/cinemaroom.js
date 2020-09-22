import Place from "./place";
import Row from "./row";

export default class Cinemaroom {
    constructor(rowsCount, placesOnRow) {
        this.rowsCount = rowsCount;
        this.placesOnRow = placesOnRow;
        this.rows = [];
    }

    render(container) {
        const colorBlue = "rgb(0, 102, 255)";
        this.places = container.querySelector('.places');
        let rowsCountCheap = Math.round(this.rowsCount / 10);
        let placeId = 1;
        for (let i = 0; i < this.rowsCount; i++) {
            let rowKind;
            if (i <= rowsCountCheap) {
                rowKind = 'cheap';
            } else if (i === this.rowsCount - 1) {
                rowKind = 'vip';
            } else {
                rowKind = 'regular';
            }
            let row = new Row(i + 1, rowKind);
            for (let j = 0; j < this.placesOnRow; j++) {
                
                let place = new Place(rowKind, i + 1, j + 1, placeId);
                placeId++;
                row.addPlace(place);
            }
            this.places.appendChild(row.divRow);
            
            this.rows.push(row);
        }

        let canvas = container.querySelector('canvas.screen');
        let style = window.getComputedStyle(this.places);
        let screenWidth = parseFloat(style.width);
        let screenHeight = Math.round(screenWidth / 20);
        canvas.width = screenWidth;
        canvas.height = `${screenHeight + 10}`;
        canvas.style.marginBottom = screenWidth / 10 + "px";
        var context = canvas.getContext("2d");
        context.beginPath();
        context.moveTo(0, screenHeight);

        context.quadraticCurveTo(screenWidth / 2, 0, screenWidth, screenHeight);
        context.lineWidth = 1;
        context.strokeStyle = colorBlue;
        context.stroke();

        let text = "Экран";
        context.font = `${screenHeight / 2}px Verdana`;
        let measure = context.measureText(text);
        context.fillStyle = "#FFF";
        let screenCenter = screenWidth / 2;
        let rectCenter = measure.width / 2;
        let x = screenCenter - rectCenter;
        context.fillRect(x ,0, measure.width, screenHeight);
        
        context.fillStyle = colorBlue;
        context.textAlign = "center";
        
        

        context.fillText(text, screenWidth / 2, screenHeight / 2);
    }
}

