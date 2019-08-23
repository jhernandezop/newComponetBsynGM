import React, { Component } from 'react';
import './BpmnViewer.css';
import BpmnViewer from 'bpmn-js'

class BpmnViewerComponente extends Component {
  
//this.overlays = [{"ID_ETAPA_PROCESO":"SCAN_OK", "NOTA":"AQUI HAY 2 FICHAS" },{"ID_ETAPA_PROCESO":"sid-D7F237E8-56D0-4283-A3CE-4F0EFE446138", "NOTA":"AQUI HAY 1 FICHAS" }]
  constructor(props){
    super(props);
    this.state = {
      xmlViwEstadoProceso:""
    }
    
  }

 componentDidMount() {
    this.componentWillReceiveProps({xmlProceso:this.props.xmlProceso, xmlOverlays: this.props.xmlOverlays});
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    /*if(nextProps.xmlOverlays[0]){
      console.log("CONSTRUIDO")
      if(this.id_ficha_actual!=nextProps.xmlOverlays[0].ID_FICHA){
        this.construirDiagrama(nextProps.xmlOverlays);
      }

    }*/
    this.bpmn(nextProps)
  }

  enviarEstadoProcesod = (event) => {
    event.preventDefault();
    this.props.estadoProceso()

  }


  enviarEstadoProceso(){
    
  }

  


  bpmn(nextProps){

        const xml = nextProps.xmlProceso
        const Viewer = new BpmnViewer();
        const NotasOverlays=nextProps.xmlOverlays
        
        // SE IMPORTA
        Viewer.importXML(xml, function(err) {
          //SI HAY ERROR SE ARROJA A LA CONSOLA
          if (err) {
            return console.error('could not import BPMN 2.0 diagram', err);
          }
          //SE HABILITAN EL VISON Y EL LA CAPA DE OVERLAYS
          var canvas = Viewer.get('canvas');
          var overlays = Viewer.get('overlays');
          // SE AJUSTA EL ZOON EN EL INICIO
          canvas.zoom('fit-viewport');
          // SE ATACHA LOS OVERLAYS (ID DE ESTADO EN EL PROCESO Y NOTA)
          //console.log(NotasOverlays)
          if(NotasOverlays){
            NotasOverlays.forEach(function(element) {
              //console.log(element);
              overlays.add(element.ID_ETAPA_PROCESO, 'note', {
                position: {
                  bottom: 0,
                  right: 0
                },
                html: '<div class="diagram-note">'+element.NOTA+'</div>'
              });


            });
          }
          
        })
        
        
        //EVENTOS
        var eventBus = Viewer.get('eventBus');

        // you may hook into any of the following events
        var events = [
          //'element.hover',
          //'element.out',
          'element.click',
          'element.dblclick',
          //'element.mousedown',
          //'element.mouseup'
        ];

        

        events.forEach(function(event) {
          eventBus.on(event, function(e) {
            // e.element = the model element
            // e.gfx = the graphical element
            if(event==="element.click" &&  e.element.id==="sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9"){
                  
                  document.getElementById("A-tab").click();
            }else if(event==="element.click" &&  e.element.id==="SCAN_OK"){
                  document.getElementById("B-tab").click();

            }
             console.log(event, 'on', e.element);
             document.getElementById("bpmnContainer").innerHTML = ""
/**/         Viewer.attachTo('#bpmnContainer');
            

          });

        });

    
        document.getElementById("bpmnContainer").innerHTML = ""
/**/    Viewer.attachTo('#bpmnContainer');


  }



    render(){
        return <div className="col-lg-12 BpmnViewer" id="bpmnContainer"></div>;
    }
}

export default BpmnViewerComponente;
