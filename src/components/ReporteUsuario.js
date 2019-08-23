import React, { Component } from 'react';
import moment from 'moment';
import { Calendar } from 'react-date-range';
import { DateRange } from 'react-date-range';
import './reportes.css';

class ReporteUsuario extends Component {
constructor(props) {
    super(props);
    this.state = {  
       desde:moment().format("YYYY-MM-DD"),
       hasta:moment().format("YYYY-MM-DD"),
       rangovwiu:false
     }
     this.verrango=this.verrango.bind(this)
     this.handleSelect=this.handleSelect.bind(this)
  }
  handleSelect(date){
    console.log(date); // Momentjs object
    console.log(this.state);
    
    if(moment(date.startDate._d).format("YYYY-MM-DD")!=this.state.desde && moment(date.endDate._d).format("YYYY-MM-DD")!=this.state.hasta){
        this.setState({desde:moment(date.startDate._d).format("YYYY-MM-DD")});
        this.setState({hasta:moment(date.endDate._d).format("YYYY-MM-DD")});
        this.verrango();
    }

    

  }
  verrango() {
    //console.log("SS")
    this.setState(state => ({
      rangovwiu: !state.rangovwiu
    }));
  }

  render(){
    return ( 
      <div className="col-12 ">
        <div className="row h-100">
          <div type="button"  className="perioreporte">
            <div className={this.state.rangovwiu ? 'display' : 'no-display'}>
              <DateRange 
                onInit={this.handleSelect}
                onChange={this.handleSelect}
              />
            </div>
              <button  type="button" onClick={this.verrango} className="btn btn-secondary btn-lg btn-block">Periodo, desde:{this.state.desde}, hasta: {this.state.hasta}</button>
          </div>
		  <iframe src={"https://ks2.openpartner.cl/s/gildemeister/app/kibana#/dashboard/3d231760-ba0a-11e9-9b8e-b94dc0c5d9c8?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:'"+this.state.desde+"T00:00:00.000Z',to:'"+this.state.hasta+"T23:59:59.999Z'))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'1dc57010-b9f7-11e9-9b8e-b94dc0c5d9c8',key:caso_face_user.keyword,negate:!f,params:(query:'"+this.props.anexo+"'),type:phrase,value:'"+this.props.anexo+"'),query:(match:(caso_face_user.keyword:(query:'"+this.props.anexo+"',type:phrase))))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:12,i:'1',w:7,x:0,y:0),id:'98c3edc0-ba09-11e9-9b8e-b94dc0c5d9c8',panelIndex:'1',title:'Casos%20del%20periodo',type:visualization,version:'7.3.0'),(embeddableConfig:(),gridData:(h:12,i:'2',w:19,x:7,y:0),id:'1a9a1000-ba13-11e9-9b8e-b94dc0c5d9c8',panelIndex:'2',title:'Estado%20de%20casos',type:visualization,version:'7.3.0'),(embeddableConfig:(),gridData:(h:6,i:'3',w:7,x:26,y:0),id:'889f5880-ba13-11e9-9b8e-b94dc0c5d9c8',panelIndex:'3',title:Contactabilidad,type:visualization,version:'7.3.0'),(embeddableConfig:(),gridData:(h:6,i:'4',w:8,x:33,y:0),id:e443e2f0-ba13-11e9-9b8e-b94dc0c5d9c8,panelIndex:'4',title:Agendamiento,type:visualization,version:'7.3.0'),(embeddableConfig:(),gridData:(h:6,i:'5',w:7,x:41,y:0),id:'57d4b1e0-ba14-11e9-9b8e-b94dc0c5d9c8',panelIndex:'5',title:'Casos%20Gestionados',type:visualization,version:'7.3.0'),(embeddableConfig:(),gridData:(h:6,i:'6',w:22,x:26,y:6),id:'877b38f0-ba15-11e9-9b8e-b94dc0c5d9c8',panelIndex:'6',title:'M%C3%A9tricas%20por%20sucursal',type:visualization,version:'7.3.0'),(embeddableConfig:(),gridData:(h:5,i:'7',w:7,x:0,y:12),id:'1e601150-ba16-11e9-9b8e-b94dc0c5d9c8',panelIndex:'7',title:'C.%20%20gestionados%20del%20periodo',type:visualization,version:'7.3.0'),(embeddableConfig:(),gridData:(h:5,i:'8',w:7,x:0,y:17),id:'9a969040-ba1c-11e9-9b8e-b94dc0c5d9c8',panelIndex:'8',title:'Total%20gestiones%20del%20periodo',type:visualization,version:'7.3.0'),(embeddableConfig:(vis:(legendOpen:!f)),gridData:(h:10,i:'9',w:19,x:7,y:12),id:'51305ce0-ba1e-11e9-9b8e-b94dc0c5d9c8',panelIndex:'9',title:'Resultado%20de%20gestion',type:visualization,version:'7.3.0'),(embeddableConfig:(),gridData:(h:10,i:'10',w:22,x:26,y:12),id:'51a9dd30-ba1f-11e9-9b8e-b94dc0c5d9c8',panelIndex:'10',title:'Gestiones%20por%20caso',type:visualization,version:'7.3.0'),(embeddableConfig:(),gridData:(h:9,i:'11',w:48,x:0,y:22),id:c09925a0-ba21-11e9-9b8e-b94dc0c5d9c8,panelIndex:'11',title:'Casos%20Ingresados%20Por%20D%C3%ADa%20y%20Gestionados',type:visualization,version:'7.3.0'),(embeddableConfig:(),gridData:(h:9,i:'12',w:48,x:0,y:31),id:'562e4c80-ba22-11e9-9b8e-b94dc0c5d9c8',panelIndex:'12',type:visualization,version:'7.3.0')),query:(language:kuery,query:''),timeRestore:!f,title:'FACE%200.3%20-%20EJECUTIVOS',viewMode:view)"} height="100%" width="100%"></iframe>
         </div>
      </div>        
    )
      

  }
}

export default ReporteUsuario;