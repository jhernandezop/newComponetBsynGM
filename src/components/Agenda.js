import React, { Component } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import './Agenda.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import moment from 'moment';
//import events from './events';
//import ExampleControlSlot from './ExampleControlSlot';
import Draggable from 'react-draggable';
import {DraggableCore} from 'react-draggable'; // <DraggableCore>
import {Form} from 'react-formio';
require('moment/locale/es.js');

const events = []
const propTypes = {}
const DragAndDropCalendar = withDragAndDrop(Calendar)

class Agenda extends Component {

	constructor(...args) {
	    super(...args)

	    this.state = { 
	    	events,  
	    	expandida:true,
	    	maximixada:false, 
	    	tipificando:false
	    }

	    this.moveEvent = this.moveEvent.bind(this)
    	this.newEvent = this.newEvent.bind(this)
	  }

	componentDidMount(nextProps) {

		const events = this.props.eventosAgenda
		this.state.events=events

	   	console.log(this.props)
	   	if(this.props.edicion!=""){
	   		console.log("existe ficha")
	   	}else{
	   		console.log("no existe ficha")
	   	}

	   	/*const ejecutivos = [];
      	const los_ejecitivos=this.props.ejecutivos
      	//console.log(los_ejecitivos)
      	los_ejecitivos.forEach(function(element) {
        
        	ejecutivos.push({
                                    "label": element.ConsultorVentas,
                                    "value": element.RUT
        	})  

      	});
      	seguimiento_agenda.components[0].components[3].columns[0].components[0].data.values=ejecutivos
      	*/
	}

	componentWillReceiveProps(nextProps){
   
		const events = this.props.eventosAgenda
		this.state.events=events
	   	console.log(nextProps)
	   	
	    
	}

		

	  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
	    const { events } = this.state

	    const idx = events.indexOf(event)
	    let allDay = event.allDay

	    if (!event.allDay && droppedOnAllDaySlot) {
	      allDay = true
	    } else if (event.allDay && !droppedOnAllDaySlot) {
	      allDay = false
	    }

	    const updatedEvent = { ...event, start, end, allDay }

	    const nextEvents = [...events]
	    nextEvents.splice(idx, 1, updatedEvent)

	    this.setState({
	      events: nextEvents,
	    })

	    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
	  }

  resizeEvent = ({ event, start, end }) => {
    /*const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })*/

    //alert(`${event.title} was resized to ${start}-${end}`)
  }

  newEvent(event) {
  	const hora = JSON.stringify(moment())
     const title = window.prompt('Agendamiento')

	 if (title){
	     let idList = this.state.events.map(a => a.id)
	     let newId = Math.max(...idList) + 1
	     let hour = {
	       id: newId,
	       title: title,
	       allDay: event.slots.length == 1,
	       start: event.start,
	       end: event.end,
	    }
	    this.setState({
	       events: this.state.events.concat([hour]),
	    })}

	    console.log(this.state.events)


  }

	  handleSelect = ({ start, end }) => {
	  	console.log(start, end)
	  	
	  	if(this.props.edicion!=""){
	   		this.setState({tipificando:true});
	   	}else{
	   		this.setState({tipificando:false});
	   	}



	   	//document.getElementById("fechaDeAgendamientoPropio").value = moment(start).format("YYYY-MM-DD HH:MM a");
	   	
		//seguimiento_agenda.components[0].components[2].columns[0].components[1].customDefaultValue=moment(start).format("YYYY-MM-DD HH:MM a");
		//seguimiento_agenda.components[0].components[2].columns[0].components[1].defaultDate=moment(start).format("YYYY-MM-DD HH:MM a");
		//seguimiento_agenda.components[0].components[2].columns[0].components[1].defaultValue=moment(start).format("YYYY-MM-DD HH:MM a");
		//seguimiento_agenda.components[0].components[2].columns[0].components[1].datePicker.initDate=moment(start).format("YYYY-MM-DD HH:MM a");
	   	//seguimiento_agenda.components[0].components[1].defaultValue=moment(start).format("YYYY-MM-DD HH:MM a");
	   	seguimiento_agenda.components[0].components[2].defaultValue=moment(start).format("YYYY-MM-DD HH:MM a");
	   	seguimiento_agenda.components[0].legend="Agendando el: "+moment(start).format("YYYY-MM-DD HH:MM a");

	   	seguimientoAgendaServicioTecnico.components[0].components[2].defaultValue=moment(start).format("YYYY-MM-DD HH:MM a");
	   	seguimientoAgendaServicioTecnico.components[0].legend="Agendando el: "+moment(start).format("YYYY-MM-DD HH:MM a");
	   	//console.log(seguimiento_agenda.components[0])
	   	//console.log(seguimiento_agenda.components[0].components[3].columns[0].components[0].data)
	   	//console.log(seguimiento_agenda.components[0].components[2].columns[0].components[1])
	    /*const title = window.prompt('Crear un nuevo Agendamiento')
	    if (title)
	      this.setState({
	        events: [
	          ...this.state.events,
	          {
	            start,
	            end,
	            title,
	          },
	        ],
	      })*/
	  }

	onSelectEvent(pEvent) {
	   //this.props.llamafichaDesdeAgenda(pEvent.id)

	   

      this.props.desplegarEdicion("limpiar","","");
      

          
          var url = 'https://bscore.openpartner.cl/gdm';
          var data = {
                      "tx": "doc0",
                      "ts_o": moment().format('YYYY-MM-DDTHH:mm:ss'),
                      "tx_user": "",
                      "origen": "face",
                      "caso": {
                        "user": this.props.anexo,
                        "tipo": "",
                        "S2_id": pEvent.id,
                        "C_T_id": "",
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
                              this.props.desplegarEdicion("cargar_ficha_agenda", response.data, pEvent.id);
                              

                            }})
            .catch(error => console.error('Error:', error));



      



//console.log(pEvent)
	   /*const r = window.confirm("Seguro que desea eliminar el agendamiento?")
	   if(r == true){
	     
	     this.setState((prevState, props) => {
	       const events = [...prevState.events]
	       const idx = events.indexOf(pEvent)
	       events.splice(idx, 1);
	       return { events };
	     });
	   }*/
	

	}

	minimizar(){

		if(this.state.maximixada==true){
			//this.state.maximixada=false
			this.setState({maximixada:false})
		}else{
			this.setState(state => ({
		    expandida: !state.expandida
		  }));
		}
	  

	}

	maximizar(){
		if(this.state.expandida==false){
			//this.state.expandida=false
			this.setState({expandida:true})
		}else{
			this.setState(state => ({
		    	maximixada: !state.maximixada
		  	}));
		}
		
	}

    

enviarGestionAgenda = (event) => {

    //document.getElementById("submit").setAttribute("disabled","disabled");

    console.log(event)
    const items_doc_data={}
    if(event.data.select=="agendamiento_tercero"){



        console.log(event.data.fechaDeAgendamiento)
        const los_ejecitivos=this.props.ejecutivos 
        const datos_ejecutivo = []
        los_ejecitivos.forEach(function(element) {
            if(element.RUT==event.data.ejecutivoDePiso){
                //console.log(rut, element.Sucursal) 
                datos_ejecutivo.push(element.Sucursal, element.COMUNA, element.CIUDAD)
                
            }
        })
       
        console.log(datos_ejecutivo)
        //const fechas_seguimiento=event.data.fechaDeAgendamiento
        //const fechas_seguimiento=fecha_seguimiento.split("T",2)
        items_doc_data["ges_ciudad_agenda"]=datos_ejecutivo[2]
        items_doc_data["ges_comentario_sv"]=event.data.comentarios
        items_doc_data["ges_comuna_agenda"]=datos_ejecutivo[1]
        items_doc_data["ges_comentario_gestion"]=event.data.comentarioAEjecutivo
        items_doc_data["ges_fecha_agendamiento"]=event.data.fechaDeAgendamiento.slice(0, 10)
        items_doc_data["ges_hora_agendamiento"]=event.data.fechaDeAgendamiento.slice(11, 18)
        items_doc_data["ges_resultado"]=event.data.select
        items_doc_data["ges_rut_asesor_piso"]=event.data.ejecutivoDePiso
        items_doc_data["ges_sucursal_agenda"]=datos_ejecutivo[0]
        items_doc_data["ges_ts"]=this.props.edicion[0].datosFormulario.caso_ts
        items_doc_data["ges_tso"]=moment().format('YYYY-MM-DDTHH:mm:ss')
        items_doc_data["ges_user"]=this.props.anexo
        
      
    }else if(event.data.select=="agendamiento_propio"){



        console.log(event.data.fechaDeAgendamiento)
        //const fechas_seguimiento=event.data.fechaDeAgendamiento
        //const fechas_seguimiento=fecha_seguimiento.split("T",2)
        items_doc_data["ges_ciudad_agenda"]=""
        items_doc_data["ges_comentario_sv"]=event.data.comentarios
        items_doc_data["ges_comuna_agenda"]=""
        items_doc_data["ges_comentario_gestion"]=""
        items_doc_data["ges_fecha_agendamiento"]=event.data.fechaDeAgendamiento.slice(0, 10)
        items_doc_data["ges_hora_agendamiento"]=event.data.fechaDeAgendamiento.slice(11, 19)
        items_doc_data["ges_resultado"]=event.data.select
        items_doc_data["ges_rut_asesor_piso"]=""
        items_doc_data["ges_sucursal_agenda"]=""
        items_doc_data["ges_ts"]=this.props.edicion[0].datosFormulario.caso_ts
        items_doc_data["ges_tso"]=moment().format('YYYY-MM-DDTHH:mm:ss')
        items_doc_data["ges_user"]=this.props.anexo
        
      
    }; 
     
    //this.props.formulario[0].datosFormulario["comentario_sv"]=event.data.comentarios
    this.props.edicion[0].datosFormulario["doc_nu_documento"]=this.props.edicion[0].datosFormulario.doc_nu_documento
    const items_gestion_data={}
    const items_gestion_data_var= this.props.edicion[0].datosFormulario
    for(const key in items_gestion_data_var) {
        
        if(key.slice(0, 3)!="ges"){
              items_gestion_data[key]=items_gestion_data_var[key]
        }

    };

    console.log("aqui"); 
    console.log(this.props.edicion[0].ficha) 
    const transaccion={
                        "tx":"gesSV",
                        "ts_o":moment().format('YYYY-MM-DDTHH:mm:ss'),
                        "tx_user":this.props.anexo,
                        "destino":"test",
                        "tx_version" : "0.3",
                        "origen":"face",
                        "uniqueid":this.props.edicion[0].ficha.caso_ES,
                        "accion":"",
                        "caso": {
                            "nro_gestion": this.props.edicion[0].ficha.nro_gestion,
                            "S2_id":this.props.edicion[0].ficha.caso_ES,
                            "casoCAM":this.props.edicion[0].ficha.caso_CAM,
                            "user":this.props.anexo,
                            "tipo":"",
                            "padre":"0",
                            "campania":"",
                            "estado":this.props.edicion[0].ficha.estado_proceso,
                        },
                        "gestion_data":items_gestion_data,
                        "doc_data":items_doc_data
                        }
    console.log(this.props.edicion[0].ficha.canal)
    console.log(this.props.edicion[0].data_editada)
    if(this.props.edicion[0].data_editada==true && this.props.edicion[0].ficha.estado_proceso=="nuevo"){
        if(this.props.edicion[0].ficha.canal=="telefonia") {
          transaccion["accion"]="gestion"
        }else if(this.props.edicion[0].ficha.canal=="web"){
          transaccion["accion"]="actualizacion"
        }
        
    }else if(this.props.edicion[0].data_editada==true && this.props.edicion[0].ficha.estado_proceso=="en_gestion"){
        transaccion["accion"]="actualizacion"
    }else if(this.props.edicion[0].data_editada==true && this.props.edicion[0].ficha.estado_proceso=="agendado"){
        transaccion["accion"]="actualizacion"
    }

     console.log(transaccion)
     var url = 'https://bscore.openpartner.cl/gdm';
         //return false;
            fetch(url, {
              method: 'POST', 
              body: JSON.stringify(transaccion), 
              headers:{
              'Content-Type': 'text/plain'
              }
            })
            .then(res => res.json())
            .then(response => {if(response){
                            console.log(response);
                             this.props.pedirFichas()
                             this.props.desplegarEdicion("limpiar","","", "")
                              this.setState({tipificando:false});

                            }})
            .catch(error => console.error('Error:', error));


}

  render() {

  	


//seguimiento_agenda

  	const localizer = momentLocalizer(moment)
	const dragHandlers = {onStart: this.onStart, onStop: this.onStop, handle:".controlador"};
    

    if(this.state.maximixada==false){

    	return (
    		/*<Draggable {...dragHandlers}>
		        <div id="Agenda">
		          <div className="handle">Drag from here</div>
		          <div>This readme is really dragging on...</div>
		          <input type="text"/>
		        </div>
		      </Draggable>*/
    		<Draggable  {...dragHandlers}>

		      <div id="Agenda">
		      	<div className="controlador">
		      			<span className="indicador">Agenda</span>
                        <div className="btn-group btn-group-sm" role="group" >
                            <button type="button" className="btn btn-light" onClick={() => this.minimizar()}><i className="fas fa-window-minimize"></i></button>
                            <button type="button" className="btn btn-light" onClick={() => this.maximizar()}><i className="far fa-window-maximize"></i></button>
                            <button type="button" className="btn btn-light" onClick={() => this.props.estadoAgenda()}><i className="fas fa-times"></i></button>
                        </div>
                </div>

                <div className={this.state.expandida ? 'detalleAgenda' : 'detalleAgenda minimizada'}>
			 		
			 		{this.state.tipificando==true && this.props.area=="" &&
			 			<div className="agendamiento" >
                            <button type="button" className="btn btn-light" onClick={() => this.setState({tipificando:false})}><i className="fas fa-times"></i></button>
			 				<div><Form  form={seguimiento_agenda} onSubmit={this.enviarGestionAgenda} /></div>
			 				<div></div>
			 			</div>
			 		}

			 		{this.state.tipificando==true && this.props.area=="servicio_tecnico" &&
			 			<div className="agendamiento">
                            <button type="button" className="btn btn-light" onClick={() => this.setState({tipificando:false})}><i className="fas fa-times"></i></button>
			 				<div><Form form={seguimientoAgendaServicioTecnico} onSubmit={this.enviarGestionAgenda} /></div>
			 				<div></div>
			 			</div>
			 		}

			        <Calendar
			          selectable
			          localizer={localizer}
			          events={this.props.eventosAgenda}
			          scrollToTime={new Date(1970, 1, 1, 6)}
			          defaultDate={new Date(moment().format("YYYY-MM-DD"))}
			          onSelectEvent={event => this.onSelectEvent(event)}
			          onSelectSlot={this.handleSelect}
			          messages={{
			              next: <i className="fas fa-angle-right"></i>,
			              previous: <i className="fas fa-angle-left"></i>,
			              today: "Hoy",
			              month: "Mes",
			              week: "Semana",
			              day: "Día"
			            }}

			          
			        />
		        </div>
		      </div>
      		</Draggable>
      			)
    }else if(this.state.maximixada==true){
		return (
      		<div id="Agenda" className="maximixada">
		      	<div className="controlador">
		      			<span className="indicador">Agenda</span>
                        <div className="btn-group btn-group-sm" role="group" >
                            <button type="button" className="btn btn-light" onClick={() => this.minimizar()}><i className="fas fa-window-minimize"></i></button>
                            <button type="button" className="btn btn-light" onClick={() => this.maximizar()}><i className="far fa-window-maximize"></i></button>
                            <button type="button" className="btn btn-light" onClick={() => this.props.estadoAgenda()}><i className="fas fa-times"></i></button>
                        </div>
                </div>
                <div className={this.state.expandida ? 'detalleAgenda' : 'detalleAgenda minimizada'}>
			        
			        <DragAndDropCalendar
			          
			          messages={{
			              next: <i className="fas fa-angle-right"></i>,
			              previous: <i className="fas fa-angle-left"></i>,
			              today: "Hoy",
			              month: "Mes",
			              week: "Semana",
			              day: "Día"
			            }}
			          //selectable
				      localizer={localizer}
				      events={this.state.events}
				      //onEventDrop={this.moveEvent}
				      //resizable
				      //onEventResize={this.resizeEvent}
				      //onSelectSlot={this.newEvent}
				      //onSelectEvent = {event => this.onSelectEvent(event)} //Fires selecting existing event
				      //onDragStart={console.log}
				      defaultView={Views.MONTH}
				      defaultDate={new Date(2019, 7, 5)}
			        />
		        </div>
		      </div>
			)
      	}
	}


}

const seguimiento_agenda= {
    "display": "form",
    "components": [
        {
            "label": "Field Set",
            "legend": "Agendamiento <div></div>",
            "mask": false,
            "tableView": true,
            "alwaysEnabled": false,
            "type": "fieldset",
            "input": false,
            "key": "fieldSet2",
            "conditional": {
                "show": "",
                "when": "",
                "json": ""
            },
            "components": [
                {
                    "label": "Seleccionar",
                    "mask": false,
                    "tableView": true,
                    "alwaysEnabled": false,
                    "type": "select",
                    "input": true,
                    "key": "select",
                    "defaultValue": "",
                    "validate": {
                        "customMessage": "",
                        "json": "",
                        "required": true,
                        "select": false
                    },
                    "conditional": {
                        "show": "",
                        "when": "",
                        "json": ""
                    },
                    "data": {
                        "values": [
                            
                            {
                                "label": "Agendamiento propio",
                                "value": "agendamiento_propio"
                            }
                        ]
                    },
                    "valueProperty": "value",
                    "selectThreshold": 0.3,
                    "encrypted": false,
                    "properties": {},
                    "customConditional": "",
                    "logic": [],
                    "attributes": {},
                    "lazyLoad": false,
                    "selectValues": "",
                    "disableLimit": false,
                    "sort": "",
                    "reference": false,
                    "reorder": false
                },
                {
                    "label": "Comentarios",
                    "showWordCount": false,
                    "showCharCount": false,
                    "tableView": true,
                    "alwaysEnabled": false,
                    "type": "textarea",
                    "input": true,
                    "key": "comentarios",
                    "defaultValue": "",
                    "validate": {
                        "customMessage": "",
                        "json": ""
                    },
                    "conditional": {
                        "show": "",
                        "when": "",
                        "json": ""
                    },
                    "inputFormat": "html",
                    "encrypted": false,
                    "properties": {},
                    "customConditional": "",
                    "logic": [],
                    "attributes": {},
                    "autoExpand": true,
                    "isUploadEnabled": false,
                    "uploadUrl": "",
                    "uploadOptions": "",
                    "uploadDir": "",
                    "reorder": false,
                    "hidden": false
                },
                {
		            "label": "Fecha de Agendamiento",
		            "defaultValue": "",
		            "inputFormat": "plain",
		            "key": "fechaDeAgendamiento",
		            "type": "textfield",
		            "input": true,
		             "hidden": true
		        },
                {
                    "label": "Detalle del Agendamiento",
                    "columns": [
                        {
                            "components": [
                                {
                                    "label": "Ejecutivo de Piso",
                                    "mask": false,
                                    "tableView": true,
                                    "alwaysEnabled": false,
                                    "type": "select",
                                    "input": true,
                                    "key": "ejecutivoDePiso",
                                    "validate": {
                                        "customMessage": "",
                                        "json": "",
                                        "required": true,
                                        "select": false
                                    },
                                    "conditional": {
                                        "show": "",
                                        "when": "",
                                        "json": ""
                                    },
                                    "data": {
                                        "values": [
                                            {
                                                "label": "",
                                                "value": ""
                                            }
                                        ]
                                    },
                                    "valueProperty": "value",
                                    "lazyLoad": false,
                                    "selectValues": "",
                                    "disableLimit": false,
                                    "sort": "",
                                    "reference": false,
                                    "selectThreshold": 0.3,
                                    "encrypted": false,
                                    "properties": {},
                                    "customConditional": "",
                                    "logic": [],
                                    "attributes": {},
                                    "defaultValue": "",
                                    "reorder": false
                                }
                            ],
                            "width": 6,
                            "offset": 0,
                            "push": 0,
                            "pull": 0,
                            "type": "column",
                            "input": false,
                            "hideOnChildrenHidden": false,
                            "key": "column",
                            "tableView": true,
                            "label": "Column"
                        },
                        {
                            "components": [
                                {
                                    "label": "Comentario a ejecutivo",
                                    "autoExpand": false,
                                    "isUploadEnabled": false,
                                    "showWordCount": false,
                                    "showCharCount": false,
                                    "tableView": true,
                                    "alwaysEnabled": false,
                                    "type": "textarea",
                                    "input": true,
                                    "key": "comentarioAEjecutivo",
                                    "defaultValue": "",
                                    "refreshOn": "submit",
                                    "validate": {
                                        "customMessage": "",
                                        "json": ""
                                    },
                                    "conditional": {
                                        "show": "",
                                        "when": "",
                                        "json": ""
                                    },
                                    "inputFormat": "html",
                                    "encrypted": false,
                                    "uploadUrl": "",
                                    "uploadOptions": "",
                                    "uploadDir": "",
                                    "reorder": false,
                                    "properties": {},
                                    "customConditional": "",
                                    "logic": [],
                                    "attributes": {}
                                }
                            ],
                            "width": 6,
                            "offset": 0,
                            "push": 0,
                            "pull": 0,
                            "type": "column",
                            "input": false,
                            "hideOnChildrenHidden": false,
                            "key": "column",
                            "tableView": true,
                            "label": "Column"
                        }
                    ],
                    "mask": false,
                    "tableView": false,
                    "alwaysEnabled": false,
                    "type": "columns",
                    "input": false,
                    "key": "detalleDelAgendamiento",
                    "conditional": {
                        "show": "true",
                        "when": "select",
                        "eq": "agendamiento_tercero",
                        "json": ""
                    },
                    "properties": {},
                    "customConditional": "",
                    "logic": [],
                    "attributes": {},
                    "reorder": false
                }
                
            ],
            "reorder": false,
            "properties": {},
            "customConditional": "",
            "logic": [],
            "attributes": {}
        },

        {
            "label": "Enviar",
            "state": "",
            "shortcut": "",
            "disableOnInvalid": true,
            "mask": false,
            "tableView": true,
            "alwaysEnabled": false,
            "type": "button",
            "key": "submit",
            "input": true,
            "defaultValue": false,
            "validate": {
                "customMessage": "",
                "json": ""
            },
            "conditional": {
                "show": "",
                "when": "",
                "json": ""
            },
            "encrypted": false,
            "properties": {},
            "showValidations": false,
            "event": "",
            "url": "",
            "custom": "",
            "reorder": false,
            "customConditional": "",
            "logic": [],
            "attributes": {}
        }
    ],
    "settings": {
        "pdf": {
            "id": "1ec0f8ee-6685-5d98-a847-26f67b67d6f0",
            "src": "https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0"
        }
    }
}

const seguimientoAgendaServicioTecnico= {
    "display": "form",
    "components": [
        {
            "label": "Field Set",
            "legend": "Agendamiento <div></div>",
            "mask": false,
            "tableView": true,
            "alwaysEnabled": false,
            "type": "fieldset",
            "input": false,
            "key": "fieldSet2",
            "conditional": {
                "show": "",
                "when": "",
                "json": ""
            },
            "components": [
                {
                    "label": "Seleccionar",
                    "mask": false,
                    "tableView": true,
                    "alwaysEnabled": false,
                    "type": "select",
                    "input": true,
                    "key": "select",
                    "defaultValue": "",
                    "validate": {
                        "customMessage": "",
                        "json": "",
                        "required": true,
                        "select": false
                    },
                    "conditional": {
                        "show": "",
                        "when": "",
                        "json": ""
                    },
                    "data": {
                        "values": [
                            
                            {
                                "label": "Agendamiento para ingreso",
                                "value": "agendamiento_propio"
                            },
                        ]
                    },
                    "valueProperty": "value",
                    "selectThreshold": 0.3,
                    "encrypted": false,
                    "properties": {},
                    "customConditional": "",
                    "logic": [],
                    "attributes": {},
                    "lazyLoad": false,
                    "selectValues": "",
                    "disableLimit": false,
                    "sort": "",
                    "reference": false,
                    "reorder": false
                },
                {
                    "label": "Comentarios",
                    "showWordCount": false,
                    "showCharCount": false,
                    "tableView": true,
                    "alwaysEnabled": false,
                    "type": "textarea",
                    "input": true,
                    "key": "comentarios",
                    "defaultValue": "",
                    "validate": {
                        "customMessage": "",
                        "json": ""
                    },
                    "conditional": {
                        "show": "",
                        "when": "",
                        "json": ""
                    },
                    "inputFormat": "html",
                    "encrypted": false,
                    "properties": {},
                    "customConditional": "",
                    "logic": [],
                    "attributes": {},
                    "autoExpand": true,
                    "isUploadEnabled": false,
                    "uploadUrl": "",
                    "uploadOptions": "",
                    "uploadDir": "",
                    "reorder": false,
                    "hidden": false
                },
                {
		            "label": "Fecha de Agendamiento",
		            "defaultValue": "",
		            "inputFormat": "plain",
		            "key": "fechaDeAgendamiento",
		            "type": "textfield",
		            "input": true,
		             "hidden": true
		            },
                {
                    "label": "Detalle del Agendamiento",
                    "columns": [
                        
                        
                    ],
                    "mask": false,
                    "tableView": false,
                    "alwaysEnabled": false,
                    "type": "columns",
                    "input": false,
                    "key": "detalleDelAgendamiento",
                    "conditional": {
                        "show": "true",
                        "when": "select",
                        "eq": "agendamiento_tercero",
                        "json": ""
                    },
                    "properties": {},
                    "customConditional": "",
                    "logic": [],
                    "attributes": {},
                    "reorder": false
                }
                
            ],
            "reorder": false,
            "properties": {},
            "customConditional": "",
            "logic": [],
            "attributes": {}
        },

        {
            "label": "Enviar",
            "state": "",
            "shortcut": "",
            "disableOnInvalid": true,
            "mask": false,
            "tableView": true,
            "alwaysEnabled": false,
            "type": "button",
            "key": "submit",
            "input": true,
            "defaultValue": false,
            "validate": {
                "customMessage": "",
                "json": ""
            },
            "conditional": {
                "show": "",
                "when": "",
                "json": ""
            },
            "encrypted": false,
            "properties": {},
            "showValidations": false,
            "event": "",
            "url": "",
            "custom": "",
            "reorder": false,
            "customConditional": "",
            "logic": [],
            "attributes": {}
        }
    ],
    "settings": {
        "pdf": {
            "id": "1ec0f8ee-6685-5d98-a847-26f67b67d6f0",
            "src": "https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0"
        }
    }
}

export default Agenda;