import React, { Component } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import './Agenda.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import moment from 'moment';
//import events from './events';
//import ExampleControlSlot from './ExampleControlSlot';
import Draggable from 'react-draggable';
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
	    	maximixada:false
	    }

	    this.moveEvent = this.moveEvent.bind(this)
    	this.newEvent = this.newEvent.bind(this)
	  }

	componentDidMount(nextProps) {

		const events = this.props.eventosAgenda
		this.state.events=events
	   	console.log(this.state)
	}

	componentWillReceiveProps(nextProps){
   
		const events = this.props.eventosAgenda
		this.state.events=events
	   	console.log(this.state)
	    
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
	    const title = window.prompt('Crear un nuevo Agendamiento')
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
	      })
	  }

	onSelectEvent(pEvent) {
	   const r = window.confirm("Seguro que desea eliminar el agendamiento?")
	   if(r == true){
	     
	     this.setState((prevState, props) => {
	       const events = [...prevState.events]
	       const idx = events.indexOf(pEvent)
	       events.splice(idx, 1);
	       return { events };
	     });
	   }
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

  render() {

  	




  	const localizer = momentLocalizer(moment)
	const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    

    if(this.state.maximixada==false){

    	return (
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
			 
			        <Calendar
			          selectable
			          localizer={localizer}
			          events={this.props.eventosAgenda}
			          scrollToTime={new Date(1970, 1, 1, 6)}
			          defaultDate={new Date(2019, 7, 5)}
			          //onSelectEvent={event => console.log(event)}
			          //onSelectSlot={this.handleSelect}
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
				      onDragStart={console.log}
				      defaultView={Views.MONTH}
				      defaultDate={new Date(2019, 7, 5)}
			        />
		        </div>
		      </div>
			)
      	}
	}


}

export default Agenda;