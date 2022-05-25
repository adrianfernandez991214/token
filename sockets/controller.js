const TiketControl = require("../models/ticket-control");

const tiketControl = new TiketControl();


const socketController = (socket) => {

    /*socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });
    */

    socket.emit('ultimo-tiker', tiketControl.ultimo);
    socket.emit('estado-actual', tiketControl.ultimos4);
    socket.emit('ticket-pendientes', tiketControl.tickets.length);

    socket.on('siguiente-tecket', (payload, callback) => {

        const siguiente = tiketControl.siguiente();
        callback(siguiente);

        //Notifica que hay un nuevo tiker pendiente de asignar
        socket.broadcast.emit('ticket-pendientes', tiketControl.tickets.length);

    })

    socket.on('atender-tecket', ({ escritorio }, callback) => {
        
        //notificar los ultimos 4
        
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = tiketControl.atenderTicket(escritorio);
  
        //Notificar ultimos 4
        socket.broadcast.emit('estado-actual', tiketControl.ultimos4);

        if (!ticket) {
            return callback({
                ok: false,
                msg: 'No hay tickets pendientes'
            });
        } else {
            socket.emit('ticket-pendientes', tiketControl.tickets.length);
            socket.broadcast.emit('ticket-pendientes', tiketControl.tickets.length);
            return callback({
                ok: true,
                ticket
            });
        }
    })

}

module.exports = {
    socketController
}

