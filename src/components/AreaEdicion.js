import React, { Component } from 'react';
import {Form} from 'react-formio';
import './AreaEdicion.css';
import moment from 'moment';
/*
import { prueba } from './formularios/Prueba.json';
import { agendamiento } from './formularios/Tipificacion_Agendamiento.json';
import { seguimiento } from './formularios/Tipificacion_casos_en_seguimiento.json';

*/
class AreaEdicion extends Component {

  constructor(props) {
    super(props);
    this.state = {  
       ficha_S2_id:"",
       ficha_C_T_id:"",
       ficha_nro_gestion:"",
       ficha_estado:"",
       ficha_canal:"",
       expandida: false,
       formulario:"",
       detalleLLamada:"",
       data_editada:false,
       uniqueid:""

     }

     this.ocultarfomrulario=this.ocultarfomrulario.bind(this)
     this.mostrarfomrulario=this.mostrarfomrulario.bind(this)
     
     
  }

  actualizarformularios(nuevoFormulario){
    
    console.log(nuevoFormulario)
    this.setState({data_editada:false});
      this.setState({caso_ES:nuevoFormulario.formulario[0].caso_ES});
      //ACTUALIZO ESTADO DEL AREA DE EDICION
       this.setState({ficha_S2_id:nuevoFormulario.formulario[0].ficha.caso_ES});
       this.setState({ficha_C_T_id:nuevoFormulario.formulario[0].ficha.caso_CAM});
       this.setState({ficha_nro_gestion:nuevoFormulario.formulario[0].ficha.nro_gestion});
       if(nuevoFormulario.formulario[0].ficha.estado_proceso=="nuevo"){
            this.setState({ficha_estado:"nuevo"});
        }else if(nuevoFormulario.formulario[0].ficha.estado_proceso=="en_gestion" || nuevoFormulario.formulario[0].ficha.estado_proceso=="en gestion"){
            this.setState({ficha_estado:"en_gestion"});
        }else if(nuevoFormulario.formulario[0].ficha.estado_proceso=="agendado"){
            this.setState({ficha_estado:"agendado"});
        }

       
      //ACTUALIZO CANAL
      this.setState({ficha_canal:nuevoFormulario.formulario[0].ficha.canal});
      //EXTRAIGO LOS EJECUTIVOS
      const ejecutivos = [];
      const los_ejecitivos=this.props.ejecutivos
      //console.log(los_ejecitivos)
      los_ejecitivos.forEach(function(element) {
        
        ejecutivos.push({
                                    "label": element.ConsultorVentas,
                                    "value": element.RUT
        })  

      }); 
      //DETERMINO LA CONSTANTE FORMULARIO
      const f=nuevoFormulario.formulario[0].datosFormulario
     // this.setState({formulario:""});
     // this.setState({formulario:"detalleLLamada"});
      console.log(nuevoFormulario.formulario[0].ficha.canal)
      if(nuevoFormulario.formulario[0].ficha.canal=="web") {
        
        this.state.formulario="detalleLLamada";
        const newForm=detalleLLamada 
        //PESTAÑA INFO CLIENTE = detalleLLamada.components[0].components[0]
        newForm.components[0].components[0].components[0].columns[0].components[0].defaultValue=f.doc_nu_documento
        newForm.components[0].components[0].components[0].columns[0].components[1].defaultValue=f.doc_nombre
        newForm.components[0].components[0].components[0].columns[0].components[2].defaultValue=f.doc_Ap_paterno
        newForm.components[0].components[0].components[0].columns[0].components[3].defaultValue=f.doc_nu_telefono

        newForm.components[0].components[0].components[0].columns[1].components[0].defaultValue=f.doc_nucotizacion
        newForm.components[0].components[0].components[0].columns[1].components[1].defaultValue=f.doc_version
        newForm.components[0].components[0].components[0].columns[1].components[2].defaultValue=f.doc_lugaratencion

        newForm.components[0].components[0].components[1].columns[0].components[0].defaultValue=f.doc_no_correo
        newForm.components[0].components[0].components[1].columns[1].components[0].defaultValue=f.doc_Comuna
        newForm.components[0].components[0].components[1].columns[2].components[0].defaultValue=f.doc_no_direccion
        //PESTAÑA INFORMACION COMPLEMENTARIA = newForm.components[0].components[1] 
        //VEHICULO EN PARTE DE PAGO
        newForm.components[0].components[1].components[0].components[0].columns[0].components[0].defaultValue=f.doc_Retoma_no_patente
        newForm.components[0].components[1].components[0].components[0].columns[0].components[1].defaultValue=f.doc_Retoma_no_version
        newForm.components[0].components[1].components[0].components[0].columns[1].components[0].defaultValue=f.doc_Retoma_no_modelo
        newForm.components[0].components[1].components[0].components[0].columns[1].components[1].defaultValue=f.doc_Retoma_nu_anio
        newForm.components[0].components[1].components[0].components[0].columns[2].components[0].defaultValue=f.doc_Retoma_no_marca
        newForm.components[0].components[1].components[0].components[0].columns[2].components[1].defaultValue=f.doc_Retoma_ValorRetoma
        //CREDITO
        newForm.components[0].components[1].components[1].components[0].columns[0].components[0].defaultValue=f.doc_Credito_Tipo
        newForm.components[0].components[1].components[1].components[0].columns[0].components[1].defaultValue=f.doc_Credito_TotalaFinanciar
        newForm.components[0].components[1].components[1].components[0].columns[0].components[2].defaultValue=f.doc_Credito_Saldo
        newForm.components[0].components[1].components[1].components[0].columns[1].components[0].defaultValue=f.doc_Credito_MontoPie
        newForm.components[0].components[1].components[1].components[0].columns[1].components[1].defaultValue=f.doc_Credito_ValorCuota
        newForm.components[0].components[1].components[1].components[0].columns[1].components[2].defaultValue=f.doc_Credito_CAE
        newForm.components[0].components[1].components[1].components[0].columns[2].components[0].defaultValue=f.doc_Credito_Cuotas
        newForm.components[0].components[1].components[1].components[0].columns[2].components[1].defaultValue=f.doc_Credito_CostoTotal
        //SEURO
        newForm.components[0].components[1].components[2].components[0].columns[0].components[0].defaultValue=f.doc_Seguro_Deducible
        newForm.components[0].components[1].components[2].components[0].columns[1].components[0].defaultValue=f.doc_Seguro_PrimaAnual
        newForm.components[0].components[1].components[2].components[0].columns[2].components[0].defaultValue=f.doc_Seguro_PrimaMensual
        //PESTAÑA HISTORICO = detalleLLamada.components[0].components[2] 
        //VEHICULO EN PARTE DE PAGO
        /*detalleLLamada.components[0].components[2].components[0].components[0].columns[0].components[0].defaultValue=f.nucotizacion
        detalleLLamada.components[0].components[2].components[0].components[0].columns[0].components[1].defaultValue=f.Retoma_no_version
        detalleLLamada.components[0].components[2].components[0].components[0].columns[1].components[0].defaultValue=f.Retoma_no_modelo
        detalleLLamada.components[0].components[2].components[0].components[0].columns[1].components[1].defaultValue=f.Retoma_nu_anio
        detalleLLamada.components[0].components[2].components[0].components[0].columns[2].components[0].defaultValue=f.Retoma_no_marca
        detalleLLamada.components[0].components[2].components[0].components[0].columns[2].components[1].defaultValue=f.Retoma_ValorRetoma*/
        

        //RESULTADO DE LA LLAMADA
        seguimiento.components[0].components[2].columns[0].components[0].data.values=ejecutivos
        //console.log(seguimiento.components[0].components[2].columns[0].components[0].data.values)
        
        this.state.detalleLLamada=newForm
      
      }else if(nuevoFormulario.formulario[0].ficha.canal=="telefonia"){
        this.state.formulario="detalletelefonia";
        const newForm=detalletelefonia 
        //PESTAÑA INFO CLIENTE = detalleLLamada.components[0].components[0]
		newForm.components[0].components[0].components[0].defaultValue=f.doc_nu_documento
        newForm.components[0].components[0].components[1].defaultValue=f.doc_nombre
        newForm.components[0].components[0].components[2].defaultValue=f.doc_Ap_paterno
        newForm.components[0].components[0].components[3].defaultValue=f.doc_patente
      }



      console.log(this.state)
      this.mostrarfomrulario()
      console.log(this.state)

      //this.setState({expandida:true});


  }


  componentWillReceiveProps(nextProps){
    console.log(nextProps.formulario)
     this.ocultarfomrulario()
     
     
    //console.log(nextProps.formulario.length)
    if(nextProps.formulario.length>0){
      
      this.actualizarformularios(nextProps); 

    }
    

    
    
  }

  verFomrularioTipificacion(text) {
    console.log(this.state.ficha_estado)
    if(text=="tipificacion"){
        if(this.state.ficha_estado=="nuevo" || this.state.ficha_estado=="en gestion" || this.state.ficha_estado=="en_gestion"){
            this.setState({formulario:"seguimiento"});
        }else if(this.state.ficha_estado=="agendado"){
            this.setState({formulario:"tipificacion"});

        }
    }else if(text=="detalleLLamada"){
        if(this.state.ficha_canal=="web") {
            this.setState({formulario:"detalleLLamada"});
        }else if(this.state.ficha_canal=="telefonia"){
            this.setState({formulario:"detalletelefonia"});
        }
        
    }
  }

  

  enviargestion = (event) => {

    document.getElementById("submit").setAttribute("disabled","disabled");

    console.log(event)

     //const fecha_seguimiento="";
     //const fechas_seguimiento="";
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
        items_doc_data["ges_fecha_next"]=event.data.fechaDeAgendamiento.slice(0, 10)
        items_doc_data["ges_hora_next"]=event.data.fechaDeAgendamiento.slice(11, 18)
        items_doc_data["ges_resultado"]=event.data.select
        items_doc_data["ges_rut_asesor_piso"]=event.data.ejecutivoDePiso
        items_doc_data["ges_sucursal_agenda"]=datos_ejecutivo[0]
        items_doc_data["ges_ts"]=this.props.formulario[0].datosFormulario.caso_ts
        items_doc_data["ges_tso"]=moment().format('YYYY-MM-DDTHH:mm:ss')
        items_doc_data["ges_user"]=this.props.anexo
        
      
    }else{

        items_doc_data["ges_ciudad_agenda"]=""
        items_doc_data["ges_comentario_sv"]=event.data.comentarios
        items_doc_data["ges_comuna_agenda"]=""
        items_doc_data["ges_comentario_gestion"]=""
        items_doc_data["ges_fecha_next"]=""
        items_doc_data["ges_hora_next"]=""
        items_doc_data["ges_resultado"]=event.data.select
        items_doc_data["ges_rut_asesor_piso"]=""
        items_doc_data["ges_sucursal_agenda"]=""
        items_doc_data["ges_tso"]=moment().format('YYYY-MM-DDTHH:mm:ss')
        items_doc_data["ges_ts"]=this.props.formulario[0].datosFormulario.caso_ts
        items_doc_data["ges_user"]=this.props.anexo

    }
       
    //this.props.formulario[0].datosFormulario["comentario_sv"]=event.data.comentarios
    this.props.formulario[0].datosFormulario["doc_nu_documento"]=this.props.formulario[0].datosFormulario.doc_nu_documento
    const items_gestion_data={}
    const items_gestion_data_var= this.props.formulario[0].datosFormulario
    for(const key in items_gestion_data_var) {
        
        if(key.slice(0, 3)!="ges"){
              items_gestion_data[key]=items_gestion_data_var[key]
        }

    };

    
    const transaccion={
                        "tx":"gesSV",
                        "ts_o":moment().format('YYYY-MM-DDTHH:mm:ss'),
                        "tx_user":this.props.anexo,
                        "destino":"test",
                        "tx_version" : "0.3",
                        "origen":"face",
                        "uniqueid":this.props.uniqueid,
                        "accion":"",
                        "caso": {
                            "nro_gestion": this.state.ficha_nro_gestion,
                            "S2_id":this.state.ficha_S2_id,
                            "casoCAM":this.state.ficha_C_T_id,
                            "user":this.props.anexo,
                            "tipo":"",
                            "padre":"0",
                            "campania":"",
                            "estado":this.state.ficha_estado,
                        },
                        "gestion_data":items_gestion_data,
                        "doc_data":items_doc_data
                        }
    console.log(this.state.ficha_estado)
    console.log(this.state.data_editada)
    if(this.state.data_editada==true && this.state.ficha_estado=="nuevo"){
        if(this.state.ficha_canal=="telefonia") {
          transaccion["accion"]="gestion"
        }else if(this.state.ficha_canal=="web"){
          transaccion["accion"]="actualizacion"
        }
        
    }else if(this.state.data_editada==true && this.state.ficha_estado=="en_gestion"){
        transaccion["accion"]="actualizacion"
    }else if(this.state.data_editada==true && this.state.ficha_estado=="agendado"){
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
                             this.props.desplegarEdicion("limpiar","","")
                              this.setState({expandida:false});

                            }})
            .catch(error => console.error('Error:', error));
        

    
  }

  actualizar = (event) => {

    console.log(this.state)
    console.log(event.data)
    const actualizar=event.data
    this.setState({expandida:false});
    

  }
 
ocultarfomrulario() {

    this.setState({expandida:false});
    
}

mostrarfomrulario() {
    
    this.setState({expandida:true});
}

actualizarGestionData(event){

    if(this.props.formulario[0]){


      console.log(this.props.formulario[0])
      const campos_nuevos= event.data

      for (const i in campos_nuevos) {
            //console.log(i)
            //console.log(campos_nuevos[i])
            this.props.formulario[0].datosFormulario[i]=campos_nuevos[i];
            

      }

      if(event.changed.flags.modified){
        this.setState({data_editada:true});
      }
      
      console.log(event)
      console.log(this.props.formulario[0].datosFormulario)
    } 
 
}
 
/*<div key={key} className="form-group">
          <label for={"exampleInputEmail1"+key}>{key}</label>
          <input type={key} value={formulario[key]} className="form-control" id={"Input"+key} aria-describedby={key} placeholder={"Enter"+key} />
        </div>*/
  render(){

    //const detalle = <Form form={this.state.detalleLLamada} onSubmit={this.actualizar} />
     

/*{formulario}*/
    if(this.state.expandida==true ){

           
       
            return (

              <div id="contenedorFormularios"  className='row contenedorFormularios'>
                
                {this.state.formulario=="detalleLLamada" && <Form form={this.state.detalleLLamada} onChange={(schema) => this.actualizarGestionData(schema)} onSubmit={this.actualizar} />}
                {this.state.formulario=="detalletelefonia" && <Form form={detalletelefonia} onChange={(schema) => this.actualizarGestionData(schema)}  />}
                
                {this.state.formulario=="seguimiento" && <Form form={seguimiento} onSubmit={this.enviargestion} />}
                {this.state.formulario=="tipificacion" && <Form form={tipificacion} onSubmit={this.enviargestion} />}

                <div className="btn-group"  role="group" aria-label="Basic example">
                  <button type="button" onClick={() => this.verFomrularioTipificacion("detalleLLamada")} className="btn btn-secondary">Detalle</button>
                  <button type="button" onClick={() => this.verFomrularioTipificacion("tipificacion")} className="btn btn-secondary">Tipificar</button>
                  
                  
                  
                </div>
                
                
              </div> 
             
          ); 
        
    }else{
      return ( 
          <div className='row contenedorFormularios'></div> 
         
      ); 
    }
      
  }
}

const detalletelefonia={
    "display": "form",
    "components": [
        {
            "label": "Tabs",
            "components": [
                {
                    "label": "Datos Cliente",
                    "key": "tab2",
                    "components": [
                        {
                            "label": "Rut Cliente",
                            "allowMultipleMasks": false,
                            "showWordCount": false,
                            "showCharCount": false,
                            "tableView": true,
                            "alwaysEnabled": false,
                            "type": "textfield",
                            "input": true,
                            "key": "doc_nu_documento",
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
                            "tab": 0,
                            "widget": {
                                "type": ""
                            },
                            "properties": {},
                            "tags": [],
                            "reorder": false,
                            "inputFormat": "plain",
                            "encrypted": false,
                            "customConditional": "",
                            "logic": [],
                            "attributes": {}
                        },
                        {
                            "label": "Nombre",
                            "allowMultipleMasks": false,
                            "showWordCount": false,
                            "showCharCount": false,
                            "tableView": true,
                            "alwaysEnabled": false,
                            "type": "textfield",
                            "input": true,
                            "key": "doc_nombre",
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
                            "tab": 0,
                            "inputFormat": "plain",
                            "encrypted": false,
                            "properties": {},
                            "tags": [],
                            "customConditional": "",
                            "logic": [],
                            "attributes": {},
                            "widget": {
                                "type": ""
                            },
                            "reorder": false
                        },
                        {
                            "label": "Apellido",
                            "allowMultipleMasks": false,
                            "showWordCount": false,
                            "showCharCount": false,
                            "tableView": true,
                            "alwaysEnabled": false,
                            "type": "textfield",
                            "input": true,
                            "key": "doc_Ap_paterno",
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
                            "tab": 0,
                            "properties": {},
                            "tags": [],
                            "inputFormat": "plain",
                            "encrypted": false,
                            "customConditional": "",
                            "logic": [],
                            "attributes": {},
                            "widget": {
                                "type": ""
                            },
                            "reorder": false
                        },
                        {
                            "label": "Columns",
                            "columns": [
                                {
                                    "components": [
                                        {
                                            "label": "Patente Vehiculo",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_patente",
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
                                            "properties": {},
                                            "tags": [],
                                            "inputFormat": "plain",
                                            "encrypted": false,
                                            "customConditional": "",
                                            "logic": [],
                                            "attributes": {},
                                            "widget": {
                                                "type": ""
                                            },
                                            "reorder": false
                                        },
                                        {
                                            "label": "Código Producto",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_codigoProducto",
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
                                            "widget": {
                                                "type": ""
                                            },
                                            "inputFormat": "plain",
                                            "encrypted": false,
                                            "properties": {},
                                            "tags": [],
                                            "reorder": false,
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
                                },
                                {
                                    "components": [
                                        {
                                            "label": "Número VIN",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_vin",
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
                                            "inputFormat": "plain",
                                            "encrypted": false,
                                            "properties": {},
                                            "customConditional": "",
                                            "logic": [],
                                            "attributes": {},
                                            "widget": {
                                                "type": ""
                                            },
                                            "tags": [],
                                            "reorder": false
                                        },
                                        {
                                            "label": "Producto",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_producto",
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
                                            "widget": {
                                                "type": ""
                                            },
                                            "properties": {},
                                            "tags": [],
                                            "reorder": false,
                                            "inputFormat": "plain",
                                            "encrypted": false,
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
                            "key": "columns2",
                            "conditional": {
                                "show": "",
                                "when": "",
                                "json": ""
                            },
                            "tab": 0,
                            "reorder": false,
                            "properties": {},
                            "customConditional": "",
                            "logic": [],
                            "attributes": {}
                        }
                    ]
                },
                {
                    "label": "Buscador",
                    "key": "buscador",
                    "components": [
                        {
                            "label": "Ingrese dato",
                            "allowMultipleMasks": false,
                            "showWordCount": false,
                            "showCharCount": false,
                            "tableView": true,
                            "alwaysEnabled": false,
                            "type": "textfield",
                            "input": true,
                            "key": "ingreseDato",
                            "defaultValue": "n° VIN o Patente Vehiculo",
                            "validate": {
                                "customMessage": "",
                                "json": "",
                                "required": false,
                                "custom": "",
                                "customPrivate": false,
                                "minLength": "",
                                "maxLength": "",
                                "minWords": "",
                                "maxWords": "",
                                "pattern": ""
                            },
                            "conditional": {
                                "show": "",
                                "when": "",
                                "json": "",
                                "eq": ""
                            },
                            "tab": 1,
                            "widget": {
                                "type": "",
                                "format": "yyyy-MM-dd hh:mm a",
                                "dateFormat": "yyyy-MM-dd hh:mm a",
                                "saveAs": "text"
                            },
                            "inputFormat": "plain",
                            "encrypted": false,
                            "reorder": false,
                            "properties": {},
                            "customConditional": "",
                            "logic": [],
                            "attributes": {},
                            "placeholder": "",
                            "prefix": "",
                            "customClass": "",
                            "suffix": "",
                            "multiple": false,
                            "protected": false,
                            "unique": false,
                            "persistent": true,
                            "hidden": false,
                            "clearOnHide": true,
                            "dataGridLabel": false,
                            "labelPosition": "top",
                            "labelWidth": 30,
                            "labelMargin": 3,
                            "description": "",
                            "errorLabel": "",
                            "tooltip": "",
                            "hideLabel": false,
                            "tabindex": "",
                            "disabled": false,
                            "autofocus": false,
                            "dbIndex": false,
                            "customDefaultValue": "",
                            "calculateValue": "",
                            "allowCalculateOverride": false,
                            "refreshOn": "",
                            "clearOnRefresh": false,
                            "validateOn": "change",
                            "mask": false,
                            "inputType": "text",
                            "inputMask": "",
                            "id": "ec4r6x"
                        }
                    ]
                }
            ],
            "mask": false,
            "tableView": true,
            "alwaysEnabled": false,
            "type": "tabs",
            "input": false,
            "key": "tabs2",
            "conditional": {
                "show": "",
                "when": "",
                "json": ""
            },
            "reorder": false,
            "properties": {},
            "customConditional": "",
            "logic": [],
            "attributes": {}
        }/*,
        {
            "label": "Enviar",
            "state": "",
            "theme": "primary",
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
        }*/
    ],
    "settings": {
        "pdf": {
            "id": "1ec0f8ee-6685-5d98-a847-26f67b67d6f0",
            "src": "https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0"
        }
    }
}

const detalleLLamada={
    "display": "form",
    "components": [
        {
            "label": "Tabs",
            "components": [
                {
                    "label": "Info. Cliente",
                    "key": "tab2",
                    "components": [
                        {
                            "label": "Datos Cotización",
                            "columns": [
                                {
                                    "components": [
                                        {
                                            "label": "Rut Cliente",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_nu_documento",
                                            "defaultValue": "25034824k",
                                            "validate": {
                                                "customMessage": "",
                                                "json": "",
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false,
                                                "minLength": "",
                                                "maxLength": "",
                                                "minWords": "",
                                                "maxWords": "",
                                                "pattern": ""
                                            },
                                            "conditional": {
                                                "show": "",
                                                "when": "",
                                                "json": "",
                                                "eq": ""
                                            },
                                            "inputFormat": "plain",
                                            "encrypted": false,
                                            "properties": {},
                                            "customConditional": "",
                                            "logic": [],
                                            "widget": {
                                                "type": "",
                                                "format": "yyyy-MM-dd hh:mm a",
                                                "dateFormat": "yyyy-MM-dd hh:mm a",
                                                "saveAs": "text"
                                            },
                                            "reorder": false,
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "mask": false,
                                            "inputType": "text",
                                            "inputMask": "",
                                            "id": "emz5gs"
                                        },
                                        {
                                            "label": "Nombre",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_nombre",
                                            "defaultValue": "",
                                            "validate": {
                                                "customMessage": "",
                                                "json": "",
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false,
                                                "minLength": "",
                                                "maxLength": "",
                                                "minWords": "",
                                                "maxWords": "",
                                                "pattern": ""
                                            },
                                            "conditional": {
                                                "show": "",
                                                "when": "",
                                                "json": "",
                                                "eq": ""
                                            },
                                            "inputFormat": "plain",
                                            "encrypted": false,
                                            "properties": {},
                                            "customConditional": "",
                                            "logic": [],
                                            "widget": {
                                                "type": "",
                                                "format": "yyyy-MM-dd hh:mm a",
                                                "dateFormat": "yyyy-MM-dd hh:mm a",
                                                "saveAs": "text"
                                            },
                                            "reorder": false,
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "mask": false,
                                            "inputType": "text",
                                            "inputMask": "",
                                            "id": "eo0hfrl"
                                        },
                                        {
                                            "label": "Apellido",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_Ap_paterno",
                                            "defaultValue": "",
                                            "validate": {
                                                "customMessage": "",
                                                "json": "",
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false,
                                                "minLength": "",
                                                "maxLength": "",
                                                "minWords": "",
                                                "maxWords": "",
                                                "pattern": ""
                                            },
                                            "conditional": {
                                                "show": "",
                                                "when": "",
                                                "json": "",
                                                "eq": ""
                                            },
                                            "inputFormat": "plain",
                                            "encrypted": false,
                                            "properties": {},
                                            "customConditional": "",
                                            "logic": [],
                                            "widget": {
                                                "type": "",
                                                "format": "yyyy-MM-dd hh:mm a",
                                                "dateFormat": "yyyy-MM-dd hh:mm a",
                                                "saveAs": "text"
                                            },
                                            "reorder": false,
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "mask": false,
                                            "inputType": "text",
                                            "inputMask": "",
                                            "id": "eo0hfrl"
                                        },
                                        {
                                            "label": "Teléfono Fijo",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_nu_telefono",
                                            "defaultValue": "",
                                            "validate": {
                                                "customMessage": "",
                                                "json": "",
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false,
                                                "minLength": "",
                                                "maxLength": "",
                                                "minWords": "",
                                                "maxWords": "",
                                                "pattern": ""
                                            },
                                            "conditional": {
                                                "show": "",
                                                "when": "",
                                                "json": "",
                                                "eq": ""
                                            },
                                            "widget": {
                                                "type": "",
                                                "format": "yyyy-MM-dd hh:mm a",
                                                "dateFormat": "yyyy-MM-dd hh:mm a",
                                                "saveAs": "text"
                                            },
                                            "reorder": false,
                                            "inputFormat": "plain",
                                            "encrypted": false,
                                            "properties": {},
                                            "customConditional": "",
                                            "logic": [],
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "mask": false,
                                            "inputType": "text",
                                            "inputMask": "",
                                            "id": "e3mcn9"
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
                                    "label": "Column",
                                    "placeholder": "",
                                    "prefix": "",
                                    "customClass": "",
                                    "suffix": "",
                                    "multiple": false,
                                    "defaultValue": null,
                                    "protected": false,
                                    "unique": false,
                                    "persistent": true,
                                    "hidden": false,
                                    "clearOnHide": true,
                                    "dataGridLabel": false,
                                    "labelPosition": "top",
                                    "labelWidth": 30,
                                    "labelMargin": 3,
                                    "description": "",
                                    "errorLabel": "",
                                    "tooltip": "",
                                    "hideLabel": false,
                                    "tabindex": "",
                                    "disabled": false,
                                    "autofocus": false,
                                    "dbIndex": false,
                                    "customDefaultValue": "",
                                    "calculateValue": "",
                                    "allowCalculateOverride": false,
                                    "widget": null,
                                    "refreshOn": "",
                                    "clearOnRefresh": false,
                                    "validateOn": "change",
                                    "validate": {
                                        "required": false,
                                        "custom": "",
                                        "customPrivate": false
                                    },
                                    "conditional": {
                                        "show": null,
                                        "when": null,
                                        "eq": ""
                                    },
                                    "id": "eonla2g"
                                },
                                {
                                    "components": [
                                        {
                                            "label": "N° Cotización WEB",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_nucotizacion",
                                            "defaultValue": "",
                                            "validate": {
                                                "customMessage": "",
                                                "json": "",
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false,
                                                "minLength": "",
                                                "maxLength": "",
                                                "minWords": "",
                                                "maxWords": "",
                                                "pattern": ""
                                            },
                                            "conditional": {
                                                "show": "",
                                                "when": "",
                                                "json": "",
                                                "eq": ""
                                            },
                                            "widget": {
                                                "type": "",
                                                "format": "yyyy-MM-dd hh:mm a",
                                                "dateFormat": "yyyy-MM-dd hh:mm a",
                                                "saveAs": "text"
                                            },
                                            "reorder": false,
                                            "inputFormat": "plain",
                                            "encrypted": false,
                                            "properties": {},
                                            "customConditional": "",
                                            "logic": [],
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": true,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "mask": false,
                                            "inputType": "text",
                                            "inputMask": "",
                                            "id": "e0d8tr"
                                        },
                                        {
                                            "label": "Versión",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_version",
                                            "defaultValue": "",
                                            "validate": {
                                                "customMessage": "",
                                                "json": "",
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false,
                                                "minLength": "",
                                                "maxLength": "",
                                                "minWords": "",
                                                "maxWords": "",
                                                "pattern": ""
                                            },
                                            "conditional": {
                                                "show": "",
                                                "when": "",
                                                "json": "",
                                                "eq": ""
                                            },
                                            "widget": {
                                                "type": "",
                                                "format": "yyyy-MM-dd hh:mm a",
                                                "dateFormat": "yyyy-MM-dd hh:mm a",
                                                "saveAs": "text"
                                            },
                                            "reorder": false,
                                            "inputFormat": "plain",
                                            "encrypted": false,
                                            "properties": {},
                                            "customConditional": "",
                                            "logic": [],
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "mask": false,
                                            "inputType": "text",
                                            "inputMask": "",
                                            "id": "e2kzaxh"
                                        },
                                        {
                                            "label": "Punto de Venta",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_lugaratencion",
                                            "defaultValue": "",
                                            "validate": {
                                                "customMessage": "",
                                                "json": "",
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false,
                                                "minLength": "",
                                                "maxLength": "",
                                                "minWords": "",
                                                "maxWords": "",
                                                "pattern": ""
                                            },
                                            "conditional": {
                                                "show": "",
                                                "when": "",
                                                "json": "",
                                                "eq": ""
                                            },
                                            "widget": {
                                                "type": "",
                                                "format": "yyyy-MM-dd hh:mm a",
                                                "dateFormat": "yyyy-MM-dd hh:mm a",
                                                "saveAs": "text"
                                            },
                                            "reorder": false,
                                            "inputFormat": "plain",
                                            "encrypted": false,
                                            "properties": {},
                                            "customConditional": "",
                                            "logic": [],
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "mask": false,
                                            "inputType": "text",
                                            "inputMask": "",
                                            "id": "evthbf6"
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
                                    "label": "Column",
                                    "placeholder": "",
                                    "prefix": "",
                                    "customClass": "",
                                    "suffix": "",
                                    "multiple": false,
                                    "defaultValue": null,
                                    "protected": false,
                                    "unique": false,
                                    "persistent": true,
                                    "hidden": false,
                                    "clearOnHide": true,
                                    "dataGridLabel": false,
                                    "labelPosition": "top",
                                    "labelWidth": 30,
                                    "labelMargin": 3,
                                    "description": "",
                                    "errorLabel": "",
                                    "tooltip": "",
                                    "hideLabel": false,
                                    "tabindex": "",
                                    "disabled": false,
                                    "autofocus": false,
                                    "dbIndex": false,
                                    "customDefaultValue": "",
                                    "calculateValue": "",
                                    "allowCalculateOverride": false,
                                    "widget": null,
                                    "refreshOn": "",
                                    "clearOnRefresh": false,
                                    "validateOn": "change",
                                    "validate": {
                                        "required": false,
                                        "custom": "",
                                        "customPrivate": false
                                    },
                                    "conditional": {
                                        "show": null,
                                        "when": null,
                                        "eq": ""
                                    },
                                    "id": "es3oktj"
                                }
                            ],
                            "mask": false,
                            "tableView": false,
                            "alwaysEnabled": false,
                            "type": "columns",
                            "input": false,
                            "key": "datosCotizacion",
                            "conditional": {
                                "show": "",
                                "when": "",
                                "json": "",
                                "eq": ""
                            },
                            "tab": 0,
                            "reorder": false,
                            "properties": {},
                            "customConditional": "",
                            "logic": [],
                            "placeholder": "",
                            "prefix": "",
                            "customClass": "",
                            "suffix": "",
                            "multiple": false,
                            "defaultValue": null,
                            "protected": false,
                            "unique": false,
                            "persistent": false,
                            "hidden": false,
                            "clearOnHide": false,
                            "dataGridLabel": false,
                            "labelPosition": "top",
                            "labelWidth": 30,
                            "labelMargin": 3,
                            "description": "",
                            "errorLabel": "",
                            "tooltip": "",
                            "hideLabel": false,
                            "tabindex": "",
                            "disabled": false,
                            "autofocus": false,
                            "dbIndex": false,
                            "customDefaultValue": "",
                            "calculateValue": "",
                            "allowCalculateOverride": false,
                            "widget": null,
                            "refreshOn": "",
                            "clearOnRefresh": false,
                            "validateOn": "change",
                            "validate": {
                                "required": false,
                                "custom": "",
                                "customPrivate": false
                            },
                            "autoAdjust": false,
                            "hideOnChildrenHidden": false,
                            "id": "eggygaw"
                        },
                        {
                            "label": "Columns",
                            "columns": [
                                {
                                    "components": [
                                        {
                                            "label": "Email",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_no_correo",
                                            "defaultValue": "",
                                            "validate": {
                                                "customMessage": "",
                                                "json": "",
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false,
                                                "minLength": "",
                                                "maxLength": "",
                                                "minWords": "",
                                                "maxWords": "",
                                                "pattern": ""
                                            },
                                            "conditional": {
                                                "show": "",
                                                "when": "",
                                                "json": "",
                                                "eq": ""
                                            },
                                            "widget": {
                                                "type": "",
                                                "format": "yyyy-MM-dd hh:mm a",
                                                "dateFormat": "yyyy-MM-dd hh:mm a",
                                                "saveAs": "text"
                                            },
                                            "reorder": false,
                                            "inputFormat": "plain",
                                            "encrypted": false,
                                            "properties": {},
                                            "customConditional": "",
                                            "logic": [],
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "mask": false,
                                            "inputType": "text",
                                            "inputMask": "",
                                            "id": "e6tt1lf"
                                        }
                                    ],
                                    "width": 4,
                                    "offset": 0,
                                    "push": 0,
                                    "pull": 0,
                                    "type": "column",
                                    "input": false,
                                    "hideOnChildrenHidden": false,
                                    "key": "column",
                                    "tableView": true,
                                    "label": "Column",
                                    "placeholder": "",
                                    "prefix": "",
                                    "customClass": "",
                                    "suffix": "",
                                    "multiple": false,
                                    "defaultValue": null,
                                    "protected": false,
                                    "unique": false,
                                    "persistent": true,
                                    "hidden": false,
                                    "clearOnHide": true,
                                    "dataGridLabel": false,
                                    "labelPosition": "top",
                                    "labelWidth": 30,
                                    "labelMargin": 3,
                                    "description": "",
                                    "errorLabel": "",
                                    "tooltip": "",
                                    "hideLabel": false,
                                    "tabindex": "",
                                    "disabled": false,
                                    "autofocus": false,
                                    "dbIndex": false,
                                    "customDefaultValue": "",
                                    "calculateValue": "",
                                    "allowCalculateOverride": false,
                                    "widget": null,
                                    "refreshOn": "",
                                    "clearOnRefresh": false,
                                    "validateOn": "change",
                                    "validate": {
                                        "required": false,
                                        "custom": "",
                                        "customPrivate": false
                                    },
                                    "conditional": {
                                        "show": null,
                                        "when": null,
                                        "eq": ""
                                    },
                                    "id": "ely1inl"
                                },
                                {
                                    "components": [
                                        {
                                            "label": "Comuna",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_Comuna",
                                            "defaultValue": "",
                                            "validate": {
                                                "customMessage": "",
                                                "json": "",
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false,
                                                "minLength": "",
                                                "maxLength": "",
                                                "minWords": "",
                                                "maxWords": "",
                                                "pattern": ""
                                            },
                                            "conditional": {
                                                "show": "",
                                                "when": "",
                                                "json": "",
                                                "eq": ""
                                            },
                                            "widget": {
                                                "type": "",
                                                "format": "yyyy-MM-dd hh:mm a",
                                                "dateFormat": "yyyy-MM-dd hh:mm a",
                                                "saveAs": "text"
                                            },
                                            "reorder": false,
                                            "inputFormat": "plain",
                                            "encrypted": false,
                                            "properties": {},
                                            "customConditional": "",
                                            "logic": [],
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "mask": false,
                                            "inputType": "text",
                                            "inputMask": "",
                                            "id": "e6z6uky"
                                        }
                                    ],
                                    "width": 4,
                                    "offset": 0,
                                    "push": 0,
                                    "pull": 0,
                                    "type": "column",
                                    "input": false,
                                    "hideOnChildrenHidden": false,
                                    "key": "column",
                                    "tableView": true,
                                    "label": "Column",
                                    "placeholder": "",
                                    "prefix": "",
                                    "customClass": "",
                                    "suffix": "",
                                    "multiple": false,
                                    "defaultValue": null,
                                    "protected": false,
                                    "unique": false,
                                    "persistent": true,
                                    "hidden": false,
                                    "clearOnHide": true,
                                    "dataGridLabel": false,
                                    "labelPosition": "top",
                                    "labelWidth": 30,
                                    "labelMargin": 3,
                                    "description": "",
                                    "errorLabel": "",
                                    "tooltip": "",
                                    "hideLabel": false,
                                    "tabindex": "",
                                    "disabled": false,
                                    "autofocus": false,
                                    "dbIndex": false,
                                    "customDefaultValue": "",
                                    "calculateValue": "",
                                    "allowCalculateOverride": false,
                                    "widget": null,
                                    "refreshOn": "",
                                    "clearOnRefresh": false,
                                    "validateOn": "change",
                                    "validate": {
                                        "required": false,
                                        "custom": "",
                                        "customPrivate": false
                                    },
                                    "conditional": {
                                        "show": null,
                                        "when": null,
                                        "eq": ""
                                    },
                                    "id": "elgavas"
                                },
                                {
                                    "width": 4,
                                    "offset": 0,
                                    "push": 0,
                                    "pull": 0,
                                    "type": "column",
                                    "input": false,
                                    "hideOnChildrenHidden": false,
                                    "key": "column",
                                    "tableView": true,
                                    "label": "Column",
                                    "components": [
                                        {
                                            "label": "Dirección",
                                            "allowMultipleMasks": false,
                                            "showWordCount": false,
                                            "showCharCount": false,
                                            "tableView": true,
                                            "alwaysEnabled": false,
                                            "type": "textfield",
                                            "input": true,
                                            "key": "doc_no_direccion",
                                            "defaultValue": "",
                                            "validate": {
                                                "customMessage": "",
                                                "json": "",
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false,
                                                "minLength": "",
                                                "maxLength": "",
                                                "minWords": "",
                                                "maxWords": "",
                                                "pattern": ""
                                            },
                                            "conditional": {
                                                "show": "",
                                                "when": "",
                                                "json": "",
                                                "eq": ""
                                            },
                                            "widget": {
                                                "type": "",
                                                "format": "yyyy-MM-dd hh:mm a",
                                                "dateFormat": "yyyy-MM-dd hh:mm a",
                                                "saveAs": "text"
                                            },
                                            "reorder": false,
                                            "inputFormat": "plain",
                                            "encrypted": false,
                                            "properties": {},
                                            "customConditional": "",
                                            "logic": [],
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "mask": false,
                                            "inputType": "text",
                                            "inputMask": "",
                                            "id": "ecy9eh"
                                        }
                                    ],
                                    "placeholder": "",
                                    "prefix": "",
                                    "customClass": "",
                                    "suffix": "",
                                    "multiple": false,
                                    "defaultValue": null,
                                    "protected": false,
                                    "unique": false,
                                    "persistent": true,
                                    "hidden": false,
                                    "clearOnHide": true,
                                    "dataGridLabel": false,
                                    "labelPosition": "top",
                                    "labelWidth": 30,
                                    "labelMargin": 3,
                                    "description": "",
                                    "errorLabel": "",
                                    "tooltip": "",
                                    "hideLabel": false,
                                    "tabindex": "",
                                    "disabled": false,
                                    "autofocus": false,
                                    "dbIndex": false,
                                    "customDefaultValue": "",
                                    "calculateValue": "",
                                    "allowCalculateOverride": false,
                                    "widget": null,
                                    "refreshOn": "",
                                    "clearOnRefresh": false,
                                    "validateOn": "change",
                                    "validate": {
                                        "required": false,
                                        "custom": "",
                                        "customPrivate": false
                                    },
                                    "conditional": {
                                        "show": null,
                                        "when": null,
                                        "eq": ""
                                    },
                                    "id": "ex5r2hh"
                                }
                            ],
                            "mask": false,
                            "tableView": false,
                            "alwaysEnabled": false,
                            "type": "columns",
                            "input": false,
                            "key": "columns2",
                            "conditional": {
                                "show": "",
                                "when": "",
                                "json": "",
                                "eq": ""
                            },
                            "tab": 0,
                            "properties": {},
                            "customConditional": "",
                            "logic": [],
                            "reorder": false,
                            "placeholder": "",
                            "prefix": "",
                            "customClass": "",
                            "suffix": "",
                            "multiple": false,
                            "defaultValue": null,
                            "protected": false,
                            "unique": false,
                            "persistent": false,
                            "hidden": false,
                            "clearOnHide": false,
                            "dataGridLabel": false,
                            "labelPosition": "top",
                            "labelWidth": 30,
                            "labelMargin": 3,
                            "description": "",
                            "errorLabel": "",
                            "tooltip": "",
                            "hideLabel": false,
                            "tabindex": "",
                            "disabled": false,
                            "autofocus": false,
                            "dbIndex": false,
                            "customDefaultValue": "",
                            "calculateValue": "",
                            "allowCalculateOverride": false,
                            "widget": null,
                            "refreshOn": "",
                            "clearOnRefresh": false,
                            "validateOn": "change",
                            "validate": {
                                "required": false,
                                "custom": "",
                                "customPrivate": false
                            },
                            "autoAdjust": false,
                            "hideOnChildrenHidden": false,
                            "id": "esg5d2q"
                        }
                    ]
                },
                {
                    "label": "Info. Complementaria",
                    "key": "infoComplementaria",
                    "components": [
                        {
                            "label": "Panel",
                            "title": "Vehiculo en Parte de Pago ",
                            "collapsible": false,
                            "mask": false,
                            "tableView": false,
                            "alwaysEnabled": false,
                            "type": "panel",
                            "input": false,
                            "key": "panel2",
                            "conditional": {
                                "show": "",
                                "when": "",
                                "json": "",
                                "eq": ""
                            },
                            "components": [
                                {
                                    "label": "Columns",
                                    "columns": [
                                        {
                                            "components": [
                                                {
                                                    "label": "Patente",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Retoma_patente",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "e100o9a"
                                                },
                                                {
                                                    "label": "Versión",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Retoma_version",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "ez5ntvm"
                                                }
                                            ],
                                            "width": 4,
                                            "offset": 0,
                                            "push": 0,
                                            "pull": 0,
                                            "type": "column",
                                            "input": false,
                                            "hideOnChildrenHidden": false,
                                            "key": "column",
                                            "tableView": true,
                                            "label": "Column",
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "defaultValue": null,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "widget": null,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "validate": {
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false
                                            },
                                            "conditional": {
                                                "show": null,
                                                "when": null,
                                                "eq": ""
                                            },
                                            "id": "ea7glyp"
                                        },
                                        {
                                            "components": [
                                                {
                                                    "label": "Modelo",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Retoma_modelo",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "e3rldig"
                                                },
                                                {
                                                    "label": "Año",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Retoma_anio",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "exjhyc"
                                                }
                                            ],
                                            "width": 4,
                                            "offset": 0,
                                            "push": 0,
                                            "pull": 0,
                                            "type": "column",
                                            "input": false,
                                            "hideOnChildrenHidden": false,
                                            "key": "column",
                                            "tableView": true,
                                            "label": "Column",
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "defaultValue": null,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "widget": null,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "validate": {
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false
                                            },
                                            "conditional": {
                                                "show": null,
                                                "when": null,
                                                "eq": ""
                                            },
                                            "id": "em5aju8"
                                        },
                                        {
                                            "width": 4,
                                            "offset": 0,
                                            "push": 0,
                                            "pull": 0,
                                            "type": "column",
                                            "input": false,
                                            "hideOnChildrenHidden": false,
                                            "key": "column",
                                            "tableView": true,
                                            "label": "Column",
                                            "components": [
                                                {
                                                    "label": "Marca",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Retoma_marca",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "eu2s0vth"
                                                },
                                                {
                                                    "label": "Precio Estimado",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Retoma_valor",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "eq6wzpw"
                                                }
                                            ],
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "defaultValue": null,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "widget": null,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "validate": {
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false
                                            },
                                            "conditional": {
                                                "show": null,
                                                "when": null,
                                                "eq": ""
                                            },
                                            "id": "eu4bsv7"
                                        }
                                    ],
                                    "mask": false,
                                    "tableView": false,
                                    "alwaysEnabled": false,
                                    "type": "columns",
                                    "input": false,
                                    "key": "columns",
                                    "conditional": {
                                        "show": "",
                                        "when": "",
                                        "json": "",
                                        "eq": ""
                                    },
                                    "reorder": false,
                                    "properties": {},
                                    "customConditional": "",
                                    "logic": [],
                                    "placeholder": "",
                                    "prefix": "",
                                    "customClass": "",
                                    "suffix": "",
                                    "multiple": false,
                                    "defaultValue": null,
                                    "protected": false,
                                    "unique": false,
                                    "persistent": false,
                                    "hidden": false,
                                    "clearOnHide": false,
                                    "dataGridLabel": false,
                                    "labelPosition": "top",
                                    "labelWidth": 30,
                                    "labelMargin": 3,
                                    "description": "",
                                    "errorLabel": "",
                                    "tooltip": "",
                                    "hideLabel": false,
                                    "tabindex": "",
                                    "disabled": false,
                                    "autofocus": false,
                                    "dbIndex": false,
                                    "customDefaultValue": "",
                                    "calculateValue": "",
                                    "allowCalculateOverride": false,
                                    "widget": null,
                                    "refreshOn": "",
                                    "clearOnRefresh": false,
                                    "validateOn": "change",
                                    "validate": {
                                        "required": false,
                                        "custom": "",
                                        "customPrivate": false
                                    },
                                    "autoAdjust": false,
                                    "hideOnChildrenHidden": false,
                                    "id": "evisw5g"
                                }
                            ],
                            "tab": 1,
                            "collapsed": false,
                            "reorder": false,
                            "properties": {},
                            "customConditional": "",
                            "logic": [],
                            "placeholder": "",
                            "prefix": "",
                            "customClass": "",
                            "suffix": "",
                            "multiple": false,
                            "defaultValue": null,
                            "protected": false,
                            "unique": false,
                            "persistent": false,
                            "hidden": false,
                            "clearOnHide": false,
                            "dataGridLabel": false,
                            "labelPosition": "top",
                            "labelWidth": 30,
                            "labelMargin": 3,
                            "description": "",
                            "errorLabel": "",
                            "tooltip": "",
                            "hideLabel": false,
                            "tabindex": "",
                            "disabled": false,
                            "autofocus": false,
                            "dbIndex": false,
                            "customDefaultValue": "",
                            "calculateValue": "",
                            "allowCalculateOverride": false,
                            "widget": null,
                            "refreshOn": "",
                            "clearOnRefresh": false,
                            "validateOn": "change",
                            "validate": {
                                "required": false,
                                "custom": "",
                                "customPrivate": false
                            },
                            "theme": "default",
                            "breadcrumb": "default",
                            "lazyLoad": false,
                            "id": "effgqe"
                        },
                        {
                            "label": "Panel",
                            "title": "Crédito",
                            "collapsible": false,
                            "mask": false,
                            "tableView": false,
                            "alwaysEnabled": false,
                            "type": "panel",
                            "input": false,
                            "key": "panel3",
                            "conditional": {
                                "show": "",
                                "when": "",
                                "json": "",
                                "eq": ""
                            },
                            "components": [
                                {
                                    "label": "Columns",
                                    "columns": [
                                        {
                                            "components": [
                                                {
                                                    "label": "Tipo",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Credito_Tipo",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "e8um5t"
                                                },
                                                {
                                                    "label": "Total a Financiar",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Credito_CostoTotal_$",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "exwo7bd"
                                                },
                                                {
                                                    "label": "Saldo Credito",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Credito_Saldo",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "e84bag"
                                                }
                                            ],
                                            "width": 4,
                                            "offset": 0,
                                            "push": 0,
                                            "pull": 0,
                                            "type": "column",
                                            "input": false,
                                            "hideOnChildrenHidden": false,
                                            "key": "column",
                                            "tableView": true,
                                            "label": "Column",
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "defaultValue": null,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "widget": null,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "validate": {
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false
                                            },
                                            "conditional": {
                                                "show": null,
                                                "when": null,
                                                "eq": ""
                                            },
                                            "id": "enai22"
                                        },
                                        {
                                            "components": [
                                                {
                                                    "label": "Monto Pie",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Credito_Pie",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "ec4smnma"
                                                },
                                                {
                                                    "label": "Valor Cuota",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "cuotas",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "evgvbgc"
                                                },
                                                {
                                                    "label": "CAE",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Credito_cae",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "erbhg0w"
                                                }
                                            ],
                                            "width": 4,
                                            "offset": 0,
                                            "push": 0,
                                            "pull": 0,
                                            "type": "column",
                                            "input": false,
                                            "hideOnChildrenHidden": false,
                                            "key": "column",
                                            "tableView": true,
                                            "label": "Column",
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "defaultValue": null,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "widget": null,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "validate": {
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false
                                            },
                                            "conditional": {
                                                "show": null,
                                                "when": null,
                                                "eq": ""
                                            },
                                            "id": "e343vzq"
                                        },
                                        {
                                            "width": 4,
                                            "offset": 0,
                                            "push": 0,
                                            "pull": 0,
                                            "type": "column",
                                            "input": false,
                                            "hideOnChildrenHidden": false,
                                            "key": "column",
                                            "tableView": true,
                                            "label": "Column",
                                            "components": [
                                                {
                                                    "label": "Cuotas",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "deducible",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "etmit2j"
                                                },
                                                {
                                                    "label": "Costo Total",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "primaAnual",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "eb0wyo"
                                                }
                                            ],
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "defaultValue": null,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "widget": null,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "validate": {
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false
                                            },
                                            "conditional": {
                                                "show": null,
                                                "when": null,
                                                "eq": ""
                                            },
                                            "id": "elmmq2z"
                                        }
                                    ],
                                    "mask": false,
                                    "tableView": false,
                                    "alwaysEnabled": false,
                                    "type": "columns",
                                    "input": false,
                                    "key": "columns3",
                                    "conditional": {
                                        "show": "",
                                        "when": "",
                                        "json": "",
                                        "eq": ""
                                    },
                                    "reorder": false,
                                    "properties": {},
                                    "customConditional": "",
                                    "logic": [],
                                    "placeholder": "",
                                    "prefix": "",
                                    "customClass": "",
                                    "suffix": "",
                                    "multiple": false,
                                    "defaultValue": null,
                                    "protected": false,
                                    "unique": false,
                                    "persistent": false,
                                    "hidden": false,
                                    "clearOnHide": false,
                                    "dataGridLabel": false,
                                    "labelPosition": "top",
                                    "labelWidth": 30,
                                    "labelMargin": 3,
                                    "description": "",
                                    "errorLabel": "",
                                    "tooltip": "",
                                    "hideLabel": false,
                                    "tabindex": "",
                                    "disabled": false,
                                    "autofocus": false,
                                    "dbIndex": false,
                                    "customDefaultValue": "",
                                    "calculateValue": "",
                                    "allowCalculateOverride": false,
                                    "widget": null,
                                    "refreshOn": "",
                                    "clearOnRefresh": false,
                                    "validateOn": "change",
                                    "validate": {
                                        "required": false,
                                        "custom": "",
                                        "customPrivate": false
                                    },
                                    "autoAdjust": false,
                                    "hideOnChildrenHidden": false,
                                    "id": "e8jemz"
                                }
                            ],
                            "tab": 1,
                            "collapsed": false,
                            "reorder": false,
                            "properties": {},
                            "customConditional": "",
                            "logic": [],
                            "placeholder": "",
                            "prefix": "",
                            "customClass": "",
                            "suffix": "",
                            "multiple": false,
                            "defaultValue": null,
                            "protected": false,
                            "unique": false,
                            "persistent": false,
                            "hidden": false,
                            "clearOnHide": false,
                            "dataGridLabel": false,
                            "labelPosition": "top",
                            "labelWidth": 30,
                            "labelMargin": 3,
                            "description": "",
                            "errorLabel": "",
                            "tooltip": "",
                            "hideLabel": false,
                            "tabindex": "",
                            "disabled": false,
                            "autofocus": false,
                            "dbIndex": false,
                            "customDefaultValue": "",
                            "calculateValue": "",
                            "allowCalculateOverride": false,
                            "widget": null,
                            "refreshOn": "",
                            "clearOnRefresh": false,
                            "validateOn": "change",
                            "validate": {
                                "required": false,
                                "custom": "",
                                "customPrivate": false
                            },
                            "theme": "default",
                            "breadcrumb": "default",
                            "lazyLoad": false,
                            "id": "emr5c2"
                        },
                        {
                            "label": "Panel",
                            "title": "Seguro",
                            "collapsible": false,
                            "mask": false,
                            "tableView": false,
                            "alwaysEnabled": false,
                            "type": "panel",
                            "input": false,
                            "key": "panel4",
                            "conditional": {
                                "show": "",
                                "when": "",
                                "json": "",
                                "eq": ""
                            },
                            "components": [
                                {
                                    "label": "Columns",
                                    "columns": [
                                        {
                                            "components": [
                                                {
                                                    "label": "Deducible",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Seguro_Deducible",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "eyam9d8"
                                                }
                                            ],
                                            "width": 4,
                                            "offset": 0,
                                            "push": 0,
                                            "pull": 0,
                                            "type": "column",
                                            "input": false,
                                            "hideOnChildrenHidden": false,
                                            "key": "column",
                                            "tableView": true,
                                            "label": "Column",
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "defaultValue": null,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "widget": null,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "validate": {
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false
                                            },
                                            "conditional": {
                                                "show": null,
                                                "when": null,
                                                "eq": ""
                                            },
                                            "id": "e9ivg2e"
                                        },
                                        {
                                            "components": [
                                                {
                                                    "label": "Prima Anual",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Seguro_PrimaAnio_UF",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "eoqmvuj"
                                                }
                                            ],
                                            "width": 4,
                                            "offset": 0,
                                            "push": 0,
                                            "pull": 0,
                                            "type": "column",
                                            "input": false,
                                            "hideOnChildrenHidden": false,
                                            "key": "column",
                                            "tableView": true,
                                            "label": "Column",
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "defaultValue": null,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "widget": null,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "validate": {
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false
                                            },
                                            "conditional": {
                                                "show": null,
                                                "when": null,
                                                "eq": ""
                                            },
                                            "id": "ekstfl8"
                                        },
                                        {
                                            "width": 4,
                                            "offset": 0,
                                            "push": 0,
                                            "pull": 0,
                                            "type": "column",
                                            "input": false,
                                            "hideOnChildrenHidden": false,
                                            "key": "column",
                                            "tableView": true,
                                            "label": "Column",
                                            "components": [
                                                {
                                                    "label": "Prima Mensual",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Seguro_PrimaMes",
                                                    "defaultValue": "",
                                                    "validate": {
                                                        "customMessage": "",
                                                        "json": "",
                                                        "required": false,
                                                        "custom": "",
                                                        "customPrivate": false,
                                                        "minLength": "",
                                                        "maxLength": "",
                                                        "minWords": "",
                                                        "maxWords": "",
                                                        "pattern": ""
                                                    },
                                                    "conditional": {
                                                        "show": "",
                                                        "when": "",
                                                        "json": "",
                                                        "eq": ""
                                                    },
                                                    "widget": {
                                                        "type": "",
                                                        "format": "yyyy-MM-dd hh:mm a",
                                                        "dateFormat": "yyyy-MM-dd hh:mm a",
                                                        "saveAs": "text"
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": [],
                                                    "placeholder": "",
                                                    "prefix": "",
                                                    "customClass": "",
                                                    "suffix": "",
                                                    "multiple": false,
                                                    "protected": false,
                                                    "unique": false,
                                                    "persistent": true,
                                                    "hidden": false,
                                                    "clearOnHide": true,
                                                    "dataGridLabel": false,
                                                    "labelPosition": "top",
                                                    "labelWidth": 30,
                                                    "labelMargin": 3,
                                                    "description": "",
                                                    "errorLabel": "",
                                                    "tooltip": "",
                                                    "hideLabel": false,
                                                    "tabindex": "",
                                                    "disabled": false,
                                                    "autofocus": false,
                                                    "dbIndex": false,
                                                    "customDefaultValue": "",
                                                    "calculateValue": "",
                                                    "allowCalculateOverride": false,
                                                    "refreshOn": "",
                                                    "clearOnRefresh": false,
                                                    "validateOn": "change",
                                                    "mask": false,
                                                    "inputType": "text",
                                                    "inputMask": "",
                                                    "id": "eaxiq6j"
                                                }
                                            ],
                                            "placeholder": "",
                                            "prefix": "",
                                            "customClass": "",
                                            "suffix": "",
                                            "multiple": false,
                                            "defaultValue": null,
                                            "protected": false,
                                            "unique": false,
                                            "persistent": true,
                                            "hidden": false,
                                            "clearOnHide": true,
                                            "dataGridLabel": false,
                                            "labelPosition": "top",
                                            "labelWidth": 30,
                                            "labelMargin": 3,
                                            "description": "",
                                            "errorLabel": "",
                                            "tooltip": "",
                                            "hideLabel": false,
                                            "tabindex": "",
                                            "disabled": false,
                                            "autofocus": false,
                                            "dbIndex": false,
                                            "customDefaultValue": "",
                                            "calculateValue": "",
                                            "allowCalculateOverride": false,
                                            "widget": null,
                                            "refreshOn": "",
                                            "clearOnRefresh": false,
                                            "validateOn": "change",
                                            "validate": {
                                                "required": false,
                                                "custom": "",
                                                "customPrivate": false
                                            },
                                            "conditional": {
                                                "show": null,
                                                "when": null,
                                                "eq": ""
                                            },
                                            "id": "erlqa9c"
                                        }
                                    ],
                                    "mask": false,
                                    "tableView": false,
                                    "alwaysEnabled": false,
                                    "type": "columns",
                                    "input": false,
                                    "key": "columns4",
                                    "conditional": {
                                        "show": "",
                                        "when": "",
                                        "json": "",
                                        "eq": ""
                                    },
                                    "reorder": false,
                                    "properties": {},
                                    "customConditional": "",
                                    "logic": [],
                                    "placeholder": "",
                                    "prefix": "",
                                    "customClass": "",
                                    "suffix": "",
                                    "multiple": false,
                                    "defaultValue": null,
                                    "protected": false,
                                    "unique": false,
                                    "persistent": false,
                                    "hidden": false,
                                    "clearOnHide": false,
                                    "dataGridLabel": false,
                                    "labelPosition": "top",
                                    "labelWidth": 30,
                                    "labelMargin": 3,
                                    "description": "",
                                    "errorLabel": "",
                                    "tooltip": "",
                                    "hideLabel": false,
                                    "tabindex": "",
                                    "disabled": false,
                                    "autofocus": false,
                                    "dbIndex": false,
                                    "customDefaultValue": "",
                                    "calculateValue": "",
                                    "allowCalculateOverride": false,
                                    "widget": null,
                                    "refreshOn": "",
                                    "clearOnRefresh": false,
                                    "validateOn": "change",
                                    "validate": {
                                        "required": false,
                                        "custom": "",
                                        "customPrivate": false
                                    },
                                    "autoAdjust": false,
                                    "hideOnChildrenHidden": false,
                                    "id": "efsubsx"
                                }
                            ],
                            "tab": 1,
                            "collapsed": false,
                            "reorder": false,
                            "properties": {},
                            "customConditional": "",
                            "logic": [],
                            "placeholder": "",
                            "prefix": "",
                            "customClass": "",
                            "suffix": "",
                            "multiple": false,
                            "defaultValue": null,
                            "protected": false,
                            "unique": false,
                            "persistent": false,
                            "hidden": false,
                            "clearOnHide": false,
                            "dataGridLabel": false,
                            "labelPosition": "top",
                            "labelWidth": 30,
                            "labelMargin": 3,
                            "description": "",
                            "errorLabel": "",
                            "tooltip": "",
                            "hideLabel": false,
                            "tabindex": "",
                            "disabled": false,
                            "autofocus": false,
                            "dbIndex": false,
                            "customDefaultValue": "",
                            "calculateValue": "",
                            "allowCalculateOverride": false,
                            "widget": null,
                            "refreshOn": "",
                            "clearOnRefresh": false,
                            "validateOn": "change",
                            "validate": {
                                "required": false,
                                "custom": "",
                                "customPrivate": false
                            },
                            "theme": "default",
                            "breadcrumb": "default",
                            "lazyLoad": false,
                            "id": "ejbaxxn"
                        }
                    ]
                },
                {
                    "label": "Info. Histórica",
                    "key": "infoHistorica",
                    "components": [
                        {
                            "label": "Panel",
                            "title": "Ultima Cotización Registrada",
                            "collapsible": false,
                            "mask": false,
                            "tableView": false,
                            "alwaysEnabled": false,
                            "type": "panel",
                            "input": false,
                            "key": "panel5",
                            "conditional": {
                                "show": "",
                                "when": "",
                                "json": ""
                            },
                            "components": [
                                {
                                    "label": "Columns",
                                    "columns": [
                                        {
                                            "components": [
                                                {
                                                    "label": "N° Cotización WEB",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Reg_CotizacionWeb",
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
                                                    "widget": {
                                                        "type": ""
                                                    },
                                                    "properties": {},
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "customConditional": "",
                                                    "logic": []
                                                },
                                                {
                                                    "label": "Venta Registrada",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Reg_ventaRegistrada",
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
                                                    "widget": {
                                                        "type": ""
                                                    },
                                                    "logic": [],
                                                    "customConditional": "",
                                                    "properties": {},
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
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
                                                    "label": "Versión",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Reg_version",
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
                                                    "widget": {
                                                        "type": ""
                                                    },
                                                    "reorder": false,
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": []
                                                },
                                                {
                                                    "label": "Fecha",
                                                    "allowMultipleMasks": false,
                                                    "showWordCount": false,
                                                    "showCharCount": false,
                                                    "tableView": true,
                                                    "alwaysEnabled": false,
                                                    "type": "textfield",
                                                    "input": true,
                                                    "key": "doc_Reg_fecha",
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
                                                    "widget": {
                                                        "type": ""
                                                    },
                                                    "inputFormat": "plain",
                                                    "encrypted": false,
                                                    "reorder": false,
                                                    "properties": {},
                                                    "customConditional": "",
                                                    "logic": []
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
                                    "key": "columns5",
                                    "conditional": {
                                        "show": "",
                                        "when": "",
                                        "json": ""
                                    },
                                    "reorder": false,
                                    "properties": {},
                                    "customConditional": "",
                                    "logic": []
                                }
                            ],
                            "tab": 2,
                            "collapsed": false,
                            "reorder": false,
                            "properties": {},
                            "customConditional": "",
                            "logic": []
                        }
                    ]
                }
            ],
            "mask": false,
            "tableView": true,
            "alwaysEnabled": false,
            "type": "tabs",
            "input": false,
            "key": "tabs2",
            "conditional": {
                "show": "",
                "when": "",
                "json": ""
            },
            "reorder": false,
            "properties": {},
            "customConditional": "",
            "logic": []
        }/*,
        {
            "type": "button",
            "label": "Actualizar",
            "key": "submit",
            "disableOnInvalid": true,
            "theme": "primary",
            "input": true,
            "tableView": true
        }*/
    ],
    "settings": {
        "pdf": {
            "id": "1ec0f8ee-6685-5d98-a847-26f67b67d6f0",
            "src": "https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0"
        }
    }
}



const seguimiento= {
    "display": "form",
    "components": [
        {
            "label": "Field Set",
            "legend": "Resultado llamada",
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
                                "label": "En seguimiento",
                                "value": "en_seguimiento"
                            },
                            {
                                "label": "Sin interés",
                                "value": "sin_interes"
                            },
                            {
                                "label": "Agendamiento propio",
                                "value": "agendamiento_propio"
                            },
                            {
                                "label": "Agendamiento a tercero",
                                "value": "agendamiento_tercero"
                            },
                            {
                                "label": "Datos erróneos",
                                "value": "datos_erroneos"
                            },
                            {
                                "label": "Sin respuesta",
                                "value": "sin_respuesta"
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
                    "reorder": false
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
                                },
                                {
                                    "label": "Fecha de Agendamiento",
                                    "mask": false,
                                    "tableView": true,
                                    "alwaysEnabled": false,
                                    "type": "datetime",
                                    "input": true,
                                    "key": "fechaDeAgendamiento",
                                    "suffix": true,
                                    "defaultValue": "",
                                    "widget": {
                                        "type": "calendar",
                                        "displayInTimezone": "viewer",
                                        "submissionTimezone": "America/Santiago",
                                        "language": "en",
                                        "useLocaleSettings": false,
                                        "allowInput": true,
                                        "mode": "single",
                                        "enableTime": true,
                                        "noCalendar": false,
                                        "format": "yyyy-MM-dd hh:mm a",
                                        "defaultDate": "",
                                        "hourIncrement": 30,
                                        "minuteIncrement": 1,
                                        "time_24hr": false,
                                        "minDate": "",
                                        "maxDate": "",
                                        "icons": "fontawesome",
                                        "i18n": {
                                            "lng": "en",
                                            "resources": {
                                                "en": {
                                                    "translation": {
                                                        "complete": "Submission Complete",
                                                        "error": "Please fix the following errors before submitting.",
                                                        "required": "{{field}} is required",
                                                        "pattern": "{{field}} does not match the pattern {{pattern}}",
                                                        "minLength": "{{field}} must be longer than {{length}} characters.",
                                                        "maxLength": "{{field}} must be shorter than {{length}} characters.",
                                                        "minWords": "{{field}} must have more than {{length}} words.",
                                                        "maxWords": "{{field}} must have less than {{length}} words.",
                                                        "min": "{{field}} cannot be less than {{min}}.",
                                                        "max": "{{field}} cannot be greater than {{max}}.",
                                                        "minSelectedCount": "You must select at least {{minCount}} items to continue.",
                                                        "maxSelectedCount": "You can only select up to {{maxCount}} items to continue.",
                                                        "maxDate": "{{field}} should not contain date after {{- maxDate}}",
                                                        "minDate": "{{field}} should not contain date before {{- minDate}}",
                                                        "invalid_email": "{{field}} must be a valid email.",
                                                        "invalid_url": "{{field}} must be a valid url.",
                                                        "invalid_regex": "{{field}} does not match the pattern {{regex}}.",
                                                        "invalid_date": "{{field}} is not a valid date.",
                                                        "invalid_day": "{{field}} is not a valid day.",
                                                        "mask": "{{field}} does not match the mask.",
                                                        "stripe": "{{stripe}}",
                                                        "month": "Month",
                                                        "day": "Day",
                                                        "year": "Year",
                                                        "january": "January",
                                                        "february": "February",
                                                        "march": "March",
                                                        "april": "April",
                                                        "may": "May",
                                                        "june": "June",
                                                        "july": "July",
                                                        "august": "August",
                                                        "september": "September",
                                                        "october": "October",
                                                        "november": "November",
                                                        "december": "December",
                                                        "next": "Next",
                                                        "previous": "Previous",
                                                        "cancel": "Cancel",
                                                        "submit": "Submit Form"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "validate": {
                                        "customMessage": "",
                                        "json": "",
                                        "required": true
                                    },
                                    "conditional": {
                                        "show": "",
                                        "when": "",
                                        "json": ""
                                    },
                                    "datePicker": {
                                        "minDate": "",
                                        "maxDate": ""
                                    },
                                    "encrypted": false,
                                    "properties": {},
                                    "customConditional": "",
                                    "logic": [],
                                    "attributes": {},
                                    "timePicker": {
                                        "hourStep": 30
                                    },
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
                                },
                                {
                                    "label": "Enviar correo a Cliente",
                                    "labelPosition": "left-left",
                                    "optionsLabelPosition": "right",
                                    "values": [
                                        {
                                            "label": "",
                                            "value": "",
                                            "shortcut": ""
                                        }
                                    ],
                                    "mask": false,
                                    "tableView": true,
                                    "alwaysEnabled": false,
                                    "type": "selectboxes",
                                    "input": true,
                                    "key": "enviarCorreoACliente",
                                    "defaultValue": {
                                        "": false
                                    },
                                    "validate": {
                                        "customMessage": "",
                                        "json": ""
                                    },
                                    "conditional": {
                                        "show": "true",
                                        "when": "select",
                                        "eq": "conAgendamiento",
                                        "json": ""
                                    },
                                    "inputType": "checkbox",
                                    "customConditional": "",
                                    "encrypted": false,
                                    "minSelectedCountMessage": "",
                                    "maxSelectedCountMessage": "",
                                    "properties": {},
                                    "logic": [],
                                    "attributes": {},
                                    "labelWidth": 29,
                                    "labelMargin": 1,
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

const tipificacion= {
    "display": "form",
    "components": [
        {
            "label": "Field Set",
            "legend": "Resultado agendamiento",
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
                    "label": "Seleccione",
                    "mask": false,
                    "tableView": true,
                    "alwaysEnabled": false,
                    "type": "select",
                    "input": true,
                    "key": "select",
                    "defaultValue": "",
                    "validate": {
                        "select": false,
                        "customMessage": "",
                        "json": ""
                    },
                    "conditional": {
                        "show": "",
                        "when": "",
                        "json": ""
                    },
                    "data": {
                        "values": [
                            {
                                "label": "Cerrado con Venta",
                                "value": "cerradoconVenta"
                            },
                            {
                                "label": "Cerrado sin Venta",
                                "value": "cerradoSinVenta"
                            }
                        ]
                    },
                    "valueProperty": "value",
                    "selectThreshold": 0.3,
                    "encrypted": false,
                    "reorder": false,
                    "lazyLoad": false,
                    "selectValues": "",
                    "disableLimit": false,
                    "sort": "",
                    "reference": false,
                    "properties": {},
                    "customConditional": "",
                    "logic": [],
                    "attributes": {}
                }
            ],
            "reorder": false,
            "properties": {},
            "customConditional": "",
            "logic": [],
            "attributes": {}
        },
        {
            "type": "button",
            "label": "Submit",
            "key": "submit",
            "disableOnInvalid": true,
            "theme": "primary",
            "input": true,
            "tableView": true
        }
    ],
    "settings": {
        "pdf": {
            "id": "1ec0f8ee-6685-5d98-a847-26f67b67d6f0",
            "src": "https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0"
        }
    }
}

export default AreaEdicion;

