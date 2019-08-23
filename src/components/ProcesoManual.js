import React, { Component } from 'react';
import './ProcesoManual.css';


class ProcesoManual extends Component {
  
//this.overlays = [{"ID_ETAPA_PROCESO":"SCAN_OK", "NOTA":"AQUI HAY 2 FICHAS" },{"ID_ETAPA_PROCESO":"sid-D7F237E8-56D0-4283-A3CE-4F0EFE446138", "NOTA":"AQUI HAY 1 FICHAS" }]
  constructor(props){
    super(props);
    this.state = {
      procesomanualFiltro:[]
    }
    
  }

 componentDidMount() {
    this.componentWillReceiveProps();
  }

  componentWillReceiveProps(nextProps){
    //console.log(nextProps)
  }

  
  


    render(){

        const proceso = this.props.procesomanual;
        const dimension = 100/3 
        const estilos ={ width: dimension+"%"};
        const filtro= this.props.filtro


        const elementos_proceso = proceso.map((number) => (number.ver==true) ?
             
                <li key={number.tag}  className="" style={estilos}>
                  <span className="cantidad" >
                    <div onClick={() => this.props.filtroFichas(number.tag)}>{number.cantidad}</div>
                    <Canales  canales={number.canales} filtroFichas={this.props.filtroFichas}/>
                    <div className="tag"  >{number.tag}</div>
                  </span>
                  
                </li>
              :
                <li key={number.tag}  className="" style={estilos}>
                  <span className="cantidad off" >
                    <div onClick={() => this.props.filtroFichas(number.tag)}>{number.cantidad}</div>
                    <Canales  canales={number.canales} filtroFichas={this.props.filtroFichas} />
                    <div className="tag"  >{number.tag}</div>
                  </span>
                  
                </li>

             

        );

        return ( <ul id="linea_proceso" className="linea_proceso" >
                    <span className="linea"></span>
                    {elementos_proceso}
                  </ul>);
    }
}


class Canales extends Component {
  
//this.overlays = [{"ID_ETAPA_PROCESO":"SCAN_OK", "NOTA":"AQUI HAY 2 FICHAS" },{"ID_ETAPA_PROCESO":"sid-D7F237E8-56D0-4283-A3CE-4F0EFE446138", "NOTA":"AQUI HAY 1 FICHAS" }]
  constructor(props){
    super(props);
    this.state = {
      canales:[]
    }
    
  }

 componentDidMount() {
    this.componentWillReceiveProps();
  }

  componentWillReceiveProps(nextProps){
   // console.log(nextProps)
  }

  retornariconos(tipo){

    if(tipo=="w" || tipo=="W"){
      return 'fas fa-desktop'
    }else if(tipo=="t" || tipo=="T"){
      return 'fas fa-mobile-alt'
    }

  }

  
  


    render(){

        const proceso = this.props.canales;
        //console.log(proceso)


        const elementos_proceso = proceso.map((number) => (number.ver==true) ?
                
                  <span className="totales" key={number.tag} onClick={() => this.props.filtroFichas(number.tag)}>
                    {number.tag.charAt(0).toUpperCase()}:
                    {number.cantidad}
                  </span>
                
                :
               
                  <span className="totales off" key={number.tag} onClick={() => this.props.filtroFichas(number.tag)}>
                    {number.tag.charAt(0).toUpperCase()}:
                    {number.cantidad}
                  </span>
                
                
        );

        /*<div className="marcadores">
                    <div>
                      {elementos_proceso}
                    </div>
                  </div>*/

        return ( <span></span> );
    }
}

export default ProcesoManual;
