import Ticket from './ticket';
let _data = JSON.parse(localStorage.getItem('tickets'));
if (!_data) {
    _data = [];
}

const tickets = {
    add: item => {
        _data.push(item);
    },
    getAll: () => {
        return _data;
    }
};

Object.freeze(tickets);

const ticket = new Ticket(document.querySelector('.ticket'));
export { tickets, ticket };