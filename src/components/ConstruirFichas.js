import React, { Component } from 'react';
//import * as d3 from "d3";
import './login.css';
import './ficha.css';
import moment from 'moment';


class ConstruirFichas extends Component {

  constructor(props) {
    super(props);
    this.state = {  
       fichas:[],
       peticion_detalle:false
       

     }
     
     this.peticionDetalle=this.peticionDetalle.bind(this)
  }

  //

  peticionDetalle(){
    this.setState(state => ({
      peticion_detalle: !state.peticion_detalle
    }));
  }
  
  componentDidMount(nextProps) {
    console.log(nextProps)
    this.componentWillReceiveProps(nextProps);
  }

  componentWillReceiveProps(nextProps){
    this.setState({fichas:[]});
    if(nextProps){
      console.log(nextProps.fichas)
      this.setState({fichas:nextProps.fichas});
    }
    console.log(this.state.fichas)
    
  }
  
  render(){
      const grupos = this.props.grupos;
      const fichas = this.state.fichas;

      const grupo_fichas = fichas.map((number) => {
        if(number.canal=="telefonia"){
          return (
            <UnaFichaTelefonia 
                  key={number.caso} 
                  datosFicha={number} 
                  filtro={this.props.filtro}
                  desplegarEdicion={this.props.desplegarEdicion}
                  searchFiltro={this.props.searchFiltro}
                  anexo={this.props.anexo}
                  actualizarUniqueid={this.props.actualizarUniqueid}
                  peticion_detalle={this.state.peticion_detalle}
                  peticionDetalle={this.peticionDetalle}
                />
          )
        }else if(number.canal=="web"){
          return (
              <UnaFichaCotizacionWeb 
                  key={number.caso} 
                  datosFicha={number} 
                  filtro={this.props.filtro}
                  desplegarEdicion={this.props.desplegarEdicion}
                  searchFiltro={this.props.searchFiltro}
                  anexo={this.props.anexo}
                  actualizarUniqueid={this.props.actualizarUniqueid}
                  peticion_detalle={this.state.peticion_detalle}
                  peticionDetalle={this.peticionDetalle}
                />

          )
        }
      }
            
                
              
            
      );
      
      return ( 
          <div id="divFichas" className='row'>
            <div id="lista_fichas" className="col-sm-12 col-md-12 col-lg-12 accordion h-75"  >
              
                {grupo_fichas}
              
            </div>
          </div> 
         
      ); 
  }
}

class UnaFichaTelefonia extends Component {
  constructor(props) {
    super(props);
    this.state = {  
          canal:this.props.datosFicha.canal,
          anexo:this.props.anexo,
          acciones: this.props.datosFicha.acciones,
          caso_CAM: "",
          caso_ES: this.props.datosFicha.caso,
          datos_ficha: this.props.datosFicha.datos_ficha,
          estado_proceso: "",
          nro_gestion: "",
          timeline: this.props.datosFicha.timeline,
          tipo_caso:this.props.datosFicha.tipo,
          tipificacion:this.props.datosFicha.tipificacion,
          selcionada:this.props.datosFicha.selcionada
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.datosFicha.estado)
     this.setState({estado_proceso:nextProps.datosFicha.estado});
     this.setState({caso_CAM:nextProps.datosFicha.casoCAM});
     this.setState({nro_gestion:nextProps.datosFicha.nro_gestion});
     this.setState({selcionada:nextProps.datosFicha.selcionada});
    
  }

  llamarFormulario= (event) => {

      console.log(this.props.peticion_detalle)
      if(this.props.peticion_detalle==true){
        console.log("detenida")
        return false;
      }
      console.log("paso")
      
      this.props.desplegarEdicion("limpiar","","");
      this.props.actualizarUniqueid("0");

      if(this.state.estado_proceso=="contacto"){
         this.props.desplegarEdicion("",["1"], this.state.caso_ES);
      }else{
          this.props.peticionDetalle()
          this.props.desplegarEdicion("buscar","",this.state);
          var url = 'https://bscore.openpartner.cl/gdm';
          var data = {
                      "tx": "doc0",
                      "ts_o": moment().format('YYYY-MM-DDTHH:mm:ss'),
                      "tx_user": "",
                      "origen": "face",
                      "caso": {
                        "user": this.state.anexo,
                        "tipo": "",
                        "S2_id": this.state.caso_ES,
                        "C_T_id": this.state.caso_CAM,
                        "campania": "",
                        "estado": ""
                      }
                    };
            fetch(url, {
              method: 'POST', 
              body: JSON.stringify(data), 
              headers:{
              'Content-Type': 'text/plain'
              }
            })
            .then(res => res.json())
            .then(response => {
                            this.props.peticionDetalle()
                            console.log(response);
                              if(response.data){
                             console.log(response);
                              this.props.desplegarEdicion("cargar", response.data, this.state);
                              

                            }})
            //.catch(error => console.error('Error:', error));



      }


  }

  llamarCliente(numero) {
      //console.log(numero)

    fetch("http://172.27.86.16:3000/bsync/face/call", {
        "method": "POST",
        "headers": {
          "content-type": "application/json"
        },
        "body": JSON.stringify({
          "agente": this.state.anexo,
          "accion": "Llamar",
          "datos": {
            "destino": numero
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

  filtrarFicha(ficha){
    console.log(ficha)
    if(this.props.searchFiltro==""){ 
      return true;
    }else{
      for (const prop in ficha) {
        
        const dimension = this.props.searchFiltro.length
        if(typeof (ficha[prop])=="string"){
            
            if(ficha[prop].slice(0, dimension)==this.props.searchFiltro){
              return true;
            }
        }else{
            console.log("AQUI")
            console.log(ficha[prop])
            for(const prop_dos in ficha[prop]){
              console.log(ficha[prop][prop_dos])
              if(ficha[prop][prop_dos].slice(0, dimension)==this.props.searchFiltro){
                return true;
              }
            }

        }
      }
    }
   return false
  }

  render(){
    //console.log(this.state.datos_ficha.fecha_co.length)
    
    
    const indicador_b=moment.unix(this.state.datos_ficha.fecha_co).format("HH:MM:SS");
    //const indicador=moment(this.state.datos_ficha.fecha_co.split("T", 2)

    const detalle = this.state.datos_ficha

    const estado_proceso=this.state.estado_proceso
    const filtro= this.props.filtro

    const tipo_caso=this.state.tipo_caso
    const tipificacion=this.state.tipificacion

    
    //console.log(filtro.indexOf(tipo_caso))
    console.log(estado_proceso)
    //console.log(filtro.indexOf(estado_proceso))
    
    if(filtro.indexOf(estado_proceso)==-1 && filtro.indexOf(tipo_caso)==-1 && filtro.indexOf(this.state.tipificacion)==-1 && this.filtrarFicha(this.props.datosFicha)==true){
      return ( <div className={this.state.selcionada ? 'selecionada card ficha' : 'card ficha'}  onDoubleClick = {this.llamarFormulario}>
             <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapseOne_"+this.state.caso_ES.replace(".","")} aria-expanded="false" aria-controls={"collapseOne_"+this.state.caso_ES.replace(".","")}>
                    <div className="row">
                      <div className="col-12"><i className="fas fa-mobile-alt"></i> Telefónica</div>
                      <div className="col-12 cotizacion"><i className="far fa-hand-paper"></i> {this.state.caso_ES}</div>
                      <div className="col-12"><i className="far fa-calendar-alt"></i>{" "}  
                        {this.state.datos_ficha.fecha_co.length==10 && moment.unix(this.state.datos_ficha.fecha_co).format("DD-MM-YYYY")}
                        {this.state.datos_ficha.fecha_co.length==10 && " "+moment.unix(this.state.datos_ficha.fecha_co).format("HH:MM:SS")}
                        {this.state.datos_ficha.fecha_co.length==13 && moment.unix(this.state.datos_ficha.fecha_co/1000).format("DD-MM-YYYY")}
                        {this.state.datos_ficha.fecha_co.length==13 && " "+moment.unix(this.state.datos_ficha.fecha_co/1000).format("HH:MM:SS")}
                        
                      </div>
                    </div>
                    
                    
                  </button>
                </h2>
              </div>
              <div id={"collapseOne_"+this.state.caso_ES.replace(".","")} className="collapse" aria-labelledby="headingOne" data-parent="#lista_fichas">
                <div className="card-body detalle">
                  
                  <div className="row">
                      <div className="col-12">{detalle.rut}</div>
                      <div className="col-12">{detalle.correo}</div>
                      <div className="col-12">{detalle.sucursal}</div>
                    </div>

                </div>
              </div>
              <div className="card-body telefono">
                <button type="button" onClick={() => this.llamarCliente(this.state.datos_ficha.telefono)} className="btn btn-light">
                    <i className="fas fa-headset"></i> {this.state.datos_ficha.telefono}
                    <span className="nro_gestion badge badge-pill badge-light">{this.state.nro_gestion}</span>
                </button>

              </div>


            </div> 
        )
      }else{
        return (<div></div>)
      }
   }

}

class UnaFichaCotizacionWeb extends Component {
  constructor(props) {
    super(props);
    this.state = {  
          canal:this.props.datosFicha.canal,
          anexo:this.props.anexo,
          acciones: this.props.datosFicha.acciones,
          caso_CAM: "",
          caso_ES: this.props.datosFicha.caso,
          datos_ficha: this.props.datosFicha.datos_ficha,
          estado_proceso: "",
          nro_gestion: "",
          timeline: this.props.datosFicha.timeline,
          tipo_caso:this.props.datosFicha.tipo,
          tipificacion:this.props.datosFicha.tipificacion,
          selcionada:this.props.datosFicha.selcionada
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.datosFicha.estado)
     this.setState({estado_proceso:nextProps.datosFicha.estado});
     this.setState({caso_CAM:nextProps.datosFicha.casoCAM});
     this.setState({nro_gestion:nextProps.datosFicha.nro_gestion});
     this.setState({selcionada:nextProps.datosFicha.selcionada});
    
  }

  llamarFormulario= (event) => {
      console.log(this.props.peticion_detalle)
      if(this.props.peticion_detalle==true){
        console.log("detenida")
        return false;
      }
      console.log("paso")

      this.props.desplegarEdicion("limpiar","","");
      this.props.actualizarUniqueid("0");

      if(this.state.estado_proceso=="contacto"){
         this.props.desplegarEdicion("",["1"], this.state.caso_ES);
      }else{
          this.props.peticionDetalle()
          this.props.desplegarEdicion("buscar","",this.state);
          var url = 'https://bscore.openpartner.cl/gdm';
          var data = {
                      "tx": "doc0",
                      "ts_o": moment().format('YYYY-MM-DDTHH:mm:ss'),
                      "tx_user": "",
                      "origen": "face",
                      "caso": {
                        "user": this.state.anexo,
                        "tipo": "",
                        "S2_id": this.state.caso_ES,
                        "C_T_id": this.state.caso_CAM,
                        "campania": "",
                        "estado": ""
                      }
                    };
            fetch(url, {
              method: 'POST', 
              body: JSON.stringify(data), 
              headers:{
              'Content-Type': 'text/plain'
              }
            })
            .then(res => res.json())
            .then(response => {if(response.data){
                            this.props.peticionDetalle()
                            //console.log(response);
                              this.props.desplegarEdicion("cargar", response.data, this.state);
                              

                            }})
            .catch(error => console.error('Error:', error));



      }


  }

  llamarCliente(numero) {
      //console.log(numero)

    fetch("http://172.27.86.16:3000/bsync/face/call", {
        "method": "POST",
        "headers": {
          "content-type": "application/json"
        },
        "body": JSON.stringify({
          "agente": this.state.anexo,
          "accion": "Llamar",
          "datos": {
            "destino": numero
          }
        })
      })
      .then(res => res.json())
      .then(response => {
        this.props.actualizarUniqueid(response.uniqueid);
        console.log(response);
      })
      .catch(err => {
        //console.log(err);
      });
    

  }

  filtrarFicha(ficha){
    console.log(ficha)
    if(this.props.searchFiltro==""){ 
      return true;
    }else{
      for (const prop in ficha) {
        
        const dimension = this.props.searchFiltro.length
        if(typeof (ficha[prop])=="string"){
            
            if(ficha[prop].slice(0, dimension)==this.props.searchFiltro){
              return true;
            }
        }else{
            console.log("AQUI")
            console.log(ficha[prop])
            for(const prop_dos in ficha[prop]){
              console.log(ficha[prop][prop_dos])
              if(ficha[prop][prop_dos].slice(0, dimension)==this.props.searchFiltro){
                return true;
              }
            }

        }
      }
    }
   return false
  }

  render(){
    //const indicador_a=moment.unix(this.state.datos_ficha.fecha_co).format("DD-MM-YYYY")
    //const indicador_b=moment.unix(this.state.datos_ficha.fecha_co).format("HH:MM:SS")
    const indicador=this.state.datos_ficha.fecha_co.split("T", 2);

    const detalle = this.state.datos_ficha;

    const estado_proceso=this.state.estado_proceso;
    const filtro= this.props.filtro;

    const tipo_caso=this.state.tipo_caso;
    const tipificacion=this.state.tipificacion;

    
    //console.log(filtro.indexOf(tipo_caso))
    console.log(estado_proceso)
    //console.log(filtro.indexOf(estado_proceso))
    
    if(filtro.indexOf(estado_proceso)==-1 && filtro.indexOf(tipo_caso)==-1 && filtro.indexOf(this.state.tipificacion)==-1 && this.filtrarFicha(this.props.datosFicha)==true){
      return ( <div className={this.state.selcionada ? 'selecionada card ficha' : 'card ficha'}  onDoubleClick = {this.llamarFormulario}>
             <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapseOne_"+this.state.caso_ES.replace(".","")} aria-expanded="false" aria-controls={"collapseOne_"+this.state.caso_ES.replace(".","")}>
                    <div className="row">
                      <div className="col-12"><i className="fas fa-globe"></i> Web</div>
                      <div className="col-12 cotizacion"><i className="far fa-hand-paper"></i> {detalle.cotizacion}</div>
                      <div className="col-12"><i className="far fa-calendar-alt"></i> 
                        {moment(indicador[0]).format("DD-MM-YYYY")}, {indicador[1]}</div>
                      
                    </div>
                    
                    
                  </button>
                </h2>
              </div>
              <div id={"collapseOne_"+this.state.caso_ES.replace(".","")} className="collapse" aria-labelledby="headingOne" data-parent="#lista_fichas">
                <div className="card-body detalle">
                  
                  <div className="row">
                      <div className="col-12">{detalle.nombre}</div>
                      <div className="col-12">{detalle.rut}</div>
                      <div className="col-12">{detalle.correo}</div>
                      <div className="col-12">{detalle.sucursal}</div>
                    </div>

                </div>
              </div>
              <div className="card-body telefono">
                <button type="button" onClick={() => this.llamarCliente(this.state.datos_ficha.telefono)} className="btn btn-light">
                    <i className="fas fa-headset"></i> {this.state.datos_ficha.telefono}
                    <span className="nro_gestion badge badge-pill badge-light">{this.state.nro_gestion}</span>
                </button>

              </div>


            </div> 
        )
      }else{
        return (<div></div>)
      }
   }

}





export default ConstruirFichas;

