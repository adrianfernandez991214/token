

const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true;
});


/*socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
})*/

socket.on('ultimo-tiker', (ticket) => {
    lblNuevoTicket.innerText = "Ticket " + ticket;
})

btnCrear.addEventListener('click', () => {

    socket.emit('siguiente-tecket', null, (ticket) => {
        lblNuevoTicket.innerText = ticket;
    });

});