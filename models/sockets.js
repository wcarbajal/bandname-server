const BandList = require( './band-list' );


class Sockets {

  constructor( io ) {

    this.io = io;
    this.bandList = new BandList;
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on( 'connection', ( socket ) => {

      console.log( 'Cliente conectado' );

      //Emnitir al cliente conectado, todas las bandas actuales

      socket.emit( 'current-bands', this.bandList.getBands() );

      //Votar por la banda

      socket.on( 'votar-banda', ( id ) => {
        this.bandList.increaseVotes( id );
        this.io.emit( 'current-bands', this.bandList.getBands() );
      } );

      socket.on( 'borrar-banda', ( id ) => {
        this.bandList.removeBand( id );
        this.io.emit( 'current-bands', this.bandList.getBands() );
      } );

      socket.on( 'cambiar-nombre-banda', ( { id, nombre } ) => {
        
        this.bandList.changeName( id, nombre );
        this.io.emit( 'current-bands', this.bandList.getBands() );
      } );

      socket.on( 'crear-banda', ( { nombre } ) => {
        
        this.bandList.addBand( nombre );
        this.io.emit( 'current-bands', this.bandList.getBands() );
      } );


    } );
  }


}


module.exports = Sockets;