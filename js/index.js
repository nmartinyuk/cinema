import Cinemaroom from './modules/cinemaroom';
import '../less/style.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import $ from 'jquery';
import {ticket} from './modules/tickets';
let cinemaroom = new Cinemaroom(5, 20);
document.addEventListener('DOMContentLoaded', function () {
    $('#btnSubmit').on('click', function() {
        try {
            ticket.buy();
            $('#modalThanks').modal('show');
        } catch(e) {
            $('#error').html(e.message);
            $('#modalError').modal('show');
        }
    });
    cinemaroom.render(document.getElementById('cinemaroom'));
});