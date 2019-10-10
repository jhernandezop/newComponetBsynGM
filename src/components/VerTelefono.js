
import React, { Component } from 'react';
import Draggable from 'react-draggable';


import './VerTelefono.css';

class Vertelefono extends Component {

    constructor(props){
        super(props);
        this.state = {
          numero:"",
          expandida:true
        }
        
      }


    numero(numero){
        console.log(numero)
        if(numero=="borrar"){
            this.setState({numero:this.state.numero.slice(0, -1)})    
        }else{
            this.setState({numero:this.state.numero+numero})
        }
       

    }

    llamarCliente() {
      
        if(this.state.numero!=""){

            fetch("http://172.27.86.16:3000/bsync/face/call", {
                "method": "POST",
                "headers": {
                  "content-type": "application/json"
                },
                "body": JSON.stringify({
                  "agente": this.props.anexo,
                  "accion": "Llamar",
                  "datos": {
                    "destino": this.state.numero
                  }
                })
              })
              .then(res => res.json())
              .then(response => {
                this.props.actualizarUniqueid(response.uniqueid);
                console.log(response);

              })
              //.catch(err => {console.log(err);});
        }

      }

   minimizar(){

        this.setState(state => ({
            expandida: !state.expandida
        }));
    }

    maximizar(){
        
        this.setState(state => ({
            expandida: !state.expandida
        }));
        
    }

  render() {

    const telefono=this.state.numero
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop, handle:".controlador"};
    return (
            
            <Draggable  {...dragHandlers}>
                  
                <div id="vertelefono">
                    <div className="controlador">
                        <span className="indicador">Teléfono</span>
                        <div className="btn-group btn-group-sm" role="group" >
                            <button type="button" className="btn btn-light" onClick={() => this.minimizar()}><i className="fas fa-window-minimize"></i></button>
                            <button type="button" className="btn btn-light" onClick={() => this.maximizar()}><i className="far fa-window-maximize"></i></button>
                            <button type="button" className="btn btn-light" onClick={() => this.props.estadoTelefono()}><i className="fas fa-times"></i></button>
                        </div>
                    </div>
                    <div className={this.state.expandida ? '' : 'minimizada'}>
                        <div>
                            <input className="numero" type="text" value={telefono}   />
                        </div>
                        <div>
                            <div className="tecla" onClick={() => this.numero('1')}>1</div>
                            <div className="tecla" onClick={() => this.numero('2')}>2</div>
                            <div className="tecla" onClick={() => this.numero('3')}>3</div>
                        </div>
                        <div>
                            <div className="tecla" onClick={() => this.numero('4')}>4</div>
                            <div className="tecla" onClick={() => this.numero('5')}>5</div>
                            <div className="tecla" onClick={() => this.numero('6')}>6</div>
                        </div>
                        <div>
                            <div className="tecla" onClick={() => this.numero('7')}>7</div>
                            <div className="tecla" onClick={() => this.numero('8')}>8</div>
                            <div className="tecla" onClick={() => this.numero('9')}>9</div>
                        </div>
                        <div>
                            <div className="tecla" onClick={() => this.numero('*')}>*</div>
                            <div className="tecla" onClick={() => this.numero('0')}>0</div>
                            <div className="tecla" onClick={() => this.numero('#')}>#</div>
                        </div>
                        <div>
                            <div className="marcar" onClick={() => this.llamarCliente()}>LLAMAR</div>
                            <div className="borrar" onClick={() => this.numero("borrar")}><i className="fas fa-times"></i></div>
                        </div>
                    </div>
                </div>
            </Draggable>
        
    );
  }
}
export default Vertelefono;

