import { ticket, tickets } from './tickets';

export default class Place {
    constructor(rowKind, rowNumber, number, id) {
        this.rowNumber = rowNumber;
        this.number = number;
        this.id = id;

        this.buyed = false;
        for (let i = 0; i < tickets.getAll().length; i++) {
            for (let j = 0; j < tickets.getAll()[i].orders.length; j++) {
                if (tickets.getAll()[i].orders[j].place.number === this.number && tickets.getAll()[i].orders[j].place.rowNumber === this.rowNumber) {
                    this.buyed = true;
                }
            }
        }

        if (!this.buyed) {
            switch (rowKind) {
                case 'cheap':
                    this.color = "rgb(0, 102, 255)";
                    this.price = 10;
                    break;
                case 'regular':
                    this.color = "rgb(86, 227, 105)";
                    this.price = 20;
                    break;
                case 'vip':
                    this.color = "rgb(255,215,0)";
                    this.price = 30;
                    break;
            }
        } else {
            this.color = this.colorBuyed;
        }

        this.status = 'free';
        this.divPlace = document.createElement('div');
        this.divPlace.style.borderColor = this.color;
        this.divPlace.style.backgroundColor = this.color;
        this.divPlace.style.width = this.divPlace.style.height = "20px";

        this.divPlace.innerText = number;
        this.divPlace.classList.add('place');
        if (!this.buyed) {
            this.divPlace.onmouseover = (e) => {
                if (this.status === 'free') {
                    e.target.style.backgroundColor = 'transparent';
                }
            }
            this.divPlace.onmouseout = (e) => {
                if (this.status === 'free') {
                    e.target.style.backgroundColor = this.color;
                }
            }
            this.divPlace.onclick = (e) => {
                if (this.status === 'free') {
                    this.orderPlace();
                    ticket.orderPlace(this);
                }
                else if (this.status === 'ordered') {
                    this.freePlace();
                    ticket.removeOrder(this);
                }
            }
        }
    }

    get colorBuyed() {
        return "gray";
    }

    buyPlace() {
        this.buyed = true;
        this.divPlace.onmouseover = null;
        this.divPlace.onmouseout = null;
        this.divPlace.onclick = null;
        this.divPlace.style.backgroundColor = this.colorBuyed;
        this.divPlace.style.borderColor = this.colorBuyed;
    }

    orderPlace() {
        this.status = 'ordered';
        this.divPlace.style.backgroundColor = `red`;
    }

    freePlace() {
        this.status = 'free';
        this.divPlace.style.backgroundColor = this.color;
    }
}