import { ticket, tickets } from './tickets';

function checkIfCanBuy(target, key, descriptor) {
    const originFn = descriptor.value;
    descriptor.value = function(...args) {
        if (this.totalPrice === 0) {
            throw new Error('Сделайте заказ сначала!');
        }
        originFn.apply(this, args);
        return this;
    };
}

export default class Ticket {
    constructor(divContainer) {
        this.orders = [];
        this.divContainer = divContainer;
        this.totalPrice = 0;
    }

    orderPlace(place) {
        let divTicket = document.createElement('div');
        divTicket.classList.add('ticket-item');

        this.totalPrice += place.price;
        let divCard = document.createElement('div');
        divCard.classList.add('card');

        let divCardBody = document.createElement('div');
        divCardBody.classList.add('card-body');
        divCardBody.classList.add('ticket-body');
        
        let divRow = document.createElement('div');
        let pRow = document.createElement('p');
        pRow.classList.add('h4');
        pRow.innerText = place.rowNumber;
        let pRowTitle = document.createElement('p');
        pRowTitle.innerText = 'ряд';
        divRow.appendChild(pRow);
        divRow.appendChild(pRowTitle);
        divRow.classList.add('ticket-row');
        divCardBody.appendChild(divRow);
        let divPlace = document.createElement('div');
        let pPlace = document.createElement('p');
        pPlace.classList.add('h4');
        pPlace.innerText = place.number;
        let pPlaceTitle = document.createElement('p');
        pPlaceTitle.innerText = 'место';
        divPlace.appendChild(pPlace);
        divPlace.appendChild(pPlaceTitle);
        divPlace.classList.add('ticket-place');
        divCardBody.appendChild(divPlace);
        let divPrice = document.createElement('div');
        let pPrice = document.createElement('p');
        pPrice.classList.add('price');
        pPrice.innerText = place.price;
        pPrice.classList.add('h4');
        let pPriceTitle = document.createElement('p');
        pPriceTitle.innerText = 'грн.';
        pPriceTitle.classList.add('price');
        divPrice.appendChild(pPrice);
        divPrice.appendChild(pPriceTitle);
        divPrice.classList.add('ticket-price');
        divCardBody.appendChild(divPrice);
        divCard.appendChild(divCardBody);
        divTicket.appendChild(divCard);
        let btnClose = document.createElement('button');
        btnClose.classList.add('close');
        btnClose.type = 'button';
        let spanClose = document.createElement('span');
        spanClose.innerText = '×';
        btnClose.appendChild(spanClose);
        btnClose.onclick = () => {
            this.removeOrder(place);
            place.freePlace.call(place);
        }
        divTicket.appendChild(btnClose);
        this.orders.push({
            place: place,
            divTicket: divTicket
        });
        this.divContainer.appendChild(divTicket);
        btnSubmit.innerText = `До сплати: ${this.totalPrice} грн.`;
    }

    removeOrder(place) {
        let index = this.orders.findIndex(item => item.place.id === place.id);
        this.divContainer.removeChild(this.orders[index].divTicket);
        this.orders.splice(index, 1);
        this.totalPrice -= place.price;
        btnSubmit.innerText = `До сплати: ${this.totalPrice} грн.`;
    }

    @checkIfCanBuy
    buy() {
        this.orders.map(o => {
            o.place.buyPlace();
        });
        tickets.add(this);
        localStorage.setItem('tickets', JSON.stringify(tickets.getAll()));
        this.clearAll();
    }

    clearAll() {
        for (let i = 0; i < this.orders.length; i++) {
            let index = this.orders.findIndex(item => item.place.id === this.orders[i].place.id);
            this.divContainer.removeChild(this.orders[index].divTicket);
            this.totalPrice -= this.orders[i].place.price;
        }
        btnSubmit.innerText = `До сплати: ${this.totalPrice} грн.`;
        this.orders = [];
    }
}

