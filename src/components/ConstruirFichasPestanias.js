import React, { Component } from 'react';
//import * as d3 from "d3";
import './login.css';
import './ficha.css';



class ConstruirFichas extends Component {
  //

  /*<PrimerGrafico id={this.state.id} data={this.state.data} width={this.state.width} height={this.state.height} />*/


  
    render(){
      const grupos = this.props.grupos;
      const fichas = this.props.fichas;

      const grupo_pestnias = grupos.map((number) =>
            <li key={number}  className="nav-item"  role='presentation'  >
              <a className="nav-link" id={number+"-tab"} data-toggle="tab" href={"#"+number} role="tab" aria-controls={number} aria-selected="true" >{number}</a>
            </li>

      );

      const grupo_contenedores_fichas = grupos.map((number) =>
            <div key={number} className="tab-pane fade row" id={number} role="tabpanel" aria-labelledby="profile-tab">
              <Fichas grupo={number} 
                fichas={this.props.fichas} 
                actualizarOverlayXml={this.props.actualizarOverlayXml}
                desplegarEdicion={this.props.desplegarEdicion} 
              />
            </div>

      );
      
      return ( 
          <div id="divFichas" className='row'>
            <div id='lista_opciones' className='tab-content'>
              <ul  className='nav nav-tabs justify-content-center'>
                  {grupo_pestnias}
              </ul>
            </div>
            <div className='col-sm-12 col-md-12 col-lg-12 tab-content' id="myTabContent">
              {grupo_contenedores_fichas}
            </div>
          </div> 
         
      ); 
  }
}

class Fichas extends Component {

  

  componentDidMount() {
    this.drawChart();
  } 


  drawChart() {
    const data = [12, 5, 6, 6, 9, 10];
    //const data = this.props.data;

    document.getElementById("chart").innerHTML = ""
    const svg = d3.select("#chart" )//+ this.props.id
        .append("svg")
        .attr("width", "100%")//this.props.width
        .attr("height", 150)//this.props.height
        //.style("margin-left", 100);
                  
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 15)
      .attr("y", (d, i) => 150 - 10 * d)
      .attr("width", 10)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "#dc3545")
  }

   render(){

    const fichas = this.props.fichas;
    const grupo_fichas_filtradas = fichas.filter(fichas => {return fichas.estado_proceso== this.props.grupo});
    const grupo_fichas = grupo_fichas_filtradas.map((number) =>
              <UnaFicha 
                key={number.caso_ES} 
                datosFicha={number} 
                actualizarOverlayXml={this.props.actualizarOverlayXml}
                desplegarEdicion={this.props.desplegarEdicion}
              />
              //<div onClick={this.actualizarOverlayXml} key={number.caso_ES} >{number.caso_ES},{number.estado_proceso}</div>

            
    );
    return ( <div className="accordion" id="accordionExample">{grupo_fichas}</div> )
   }

}

class UnaFicha extends Component {
  constructor(props) {
    super(props);
    this.state = {  
          acciones: this.props.datosFicha.acciones,
          caso_CAM: this.props.datosFicha.caso_CAM,
          caso_ES: this.props.datosFicha.caso_ES,
          datos_ficha: this.props.datosFicha.datos_ficha,
          estado_proceso: this.props.datosFicha.estado_proceso,
          nro_gestion: this.props.datosFicha.nro_gestion,
          timeline: this.props.datosFicha.timeline
    }


  }
  
  

  llamarFormulario= (event) => {
      console.log(this.state.caso_ES)

    var url = 'http://172.27.86.16:3000/bsync/face/getDetalleCaso';
    var data = {
                  "tx":"doc0",
                  "ts_o":"2019-07-03T15:05:49",
                  "tx_user":"",
                  "origen":"face",
                  "caso":{
                          "user":"3099",
                          "tipo":"",
                          "S2_id":this.state.caso_ES,
                          "C_T_id":"6e426b01-91e7-11e9-a9f7-0af90a69b8d6",
                          "campania":"",
                          "estado":""
                          }
    };
    fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data), 
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => {if(response){
                    //console.log(response);
                      this.props.desplegarEdicion(response.data[0], this.state.caso_ES);
                      this.props.actualizarOverlayXml(this.state.datos_ficha.dst);

                    }})
    .catch(error => console.error('Error:', error));
    

  }

  render(){

    const indicador=this.state.datos_ficha.calldate.split("T", 2)

    const detalle = this.state.datos_ficha
    

    return ( <div className="card ficha"  onDoubleClick = {this.llamarFormulario}>
             <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapseOne_"+this.state.caso_ES.replace(".","")} aria-expanded="false" aria-controls={"collapseOne_"+this.state.caso_ES.replace(".","")}>
                    <div className="row">
                      <div className="col-12"><i className="far fa-calendar-alt"></i> {indicador[0]}</div>
                      <div className="col-12"><i className="far fa-clock"></i> {indicador[1].replace(".000Z","")}</div>
                    </div>
                    
                    
                  </button>
                </h2>
              </div>
              <div id={"collapseOne_"+this.state.caso_ES.replace(".","")} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="card-body detalle">
                  
                  <div className="row">
                      <div className="col-12">{detalle.disposition}</div>
                      <div className="col-12">{detalle.dst}</div>
                      <div className="col-12">{detalle.src}</div>
                      <div className="col-12">{detalle.uniqueid}</div>
                    </div>

                </div>
              </div>
              <div className="card-body telefono">
                <button type="button" className="btn btn-danger">
                    <i className="fas fa-headset"></i> {this.state.datos_ficha.src}
                    <span className="nro_gestion badge badge-pill badge-light">{this.state.nro_gestion}</span>
                </button>

              </div>


            </div> )
   }

}

export default ConstruirFichas;

