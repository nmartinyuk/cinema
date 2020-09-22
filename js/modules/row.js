export default class Row {
    constructor(number, rowKind) {
        this.rowKind = rowKind;
        this.divRow = document.createElement('div');
        this.divRow.classList.add('row');
        let divNumberLeft = document.createElement('div');
        divNumberLeft.classList.add("number");
        divNumberLeft.classList.add("left");
        divNumberLeft.style.width = "20px";
        divNumberLeft.innerText = number;
        this.divRow.appendChild(divNumberLeft);
        let divNumberRight = document.createElement('div');
        divNumberRight.classList.add("number");
        divNumberRight.classList.add("right");
        divNumberRight.style.width = "20px";
        this.number = number;
        divNumberRight.innerText = number;
        this.divRow.appendChild(divNumberRight);
        this.places = [];
    }
    
    addPlace(place) {
        this.divRow.appendChild(place.divPlace);
        this.places.push(place);
    }
}