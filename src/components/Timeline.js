import React, { Component } from 'react';
import './Timeline.css';  
import moment from 'moment';


class Timelines extends Component {


  constructor(props) {
    super(props);
    this.state = {
      timelinedata: [],
      tipoFicha:"",
      uniqueid:""
    }
      //this.handleSubmit = this.handleSubmit.bind(this)
  }
// RECIBO EL MENSAJE
  componentDidMount () {


   
  }

  componentWillReceiveProps(nextProps){
   

    if(nextProps.edicion.length>=1){

        console.log(nextProps.edicion[0].ficha)
        const uid=nextProps.edicion[0].ficha.caso_ES
        this.state.uniqueid=uid
        this.state.tipoFicha=nextProps.edicion[0].ficha.canal
        console.log(this.state.tipoFicha)
        this.handleSubmit()
    }else{
      this.setState({timelinedata:[]});
    }
    
  }
// ENVÃO MENSAJE AL SERVIDOR
  handleSubmit() {
    
    let uid = this.state.uniqueid //event.target.value
    console.log(this.state.uniqueid)
    console.log(uid)

    const tx=JSON.stringify({
          "tx"    : "anyQ",
          "index" : "gm_webleads_full_0.3",
          "query" :{
                    "sort" : [
                              { "ges_ts": { "order" : "desc"}
                    }
                    ],
          "_source": ["caso_ts_ult_ges", "ges_ts", "ges_resultado", "ges_comentario_sv"],
          "query": {
          "bool": {
            "should": [
              {
                "term": {
                  "caso_S2_id.keyword": uid
                }
              }
            ]
          }
        }
      }
      })


     fetch("https://bscore.openpartner.cl/gdm", {
                "method": "POST",
                "headers": {
                "content-type": "text/plain"
                },
                "body": tx
              })
              .then(res => res.json())
              .then(response => {
                console.log(response.data.hits.hits)
                //const hits=response.data.hits.hits.reverse()
                 const hits=response.data.hits.hits;

                 const new_hist={};
                

                 hits.forEach(function(key) {
                  new_hist[moment(key._source.caso_ts_ult_ges).format("X")] = key;
                  
                });

                const new_new_hist=[];
                for (const i in new_hist) {
                  new_new_hist.push(new_hist[i])

                }
                console.log(hits)
                console.log(new_hist)
                console.log(new_new_hist)
                this.setState({timelinedata:new_new_hist.reverse()});

              })

      // acÃ¡ guardo el estado
     // this.setState({...this.state.uniqueid, uid})
      //console.log(this.state.uniqueid)
      
  }

  render() {
   
    // acÃ¡ actualizo el componente y recorro el estado com map


    const timelinedata = this.state.timelinedata.map((timeline, index) => {
      console.log(timeline._source);
      let comentario;
      let estilo;
      let fecha;
      let hora;
      
      if(timeline._source.ges_comentario_sv == "" || timeline._source.ges_comentario_sv == undefined ){
        comentario=""
        estilo="no"
      }
      else{
        comentario=timeline._source.ges_comentario_sv;
         estilo=""
      }

      if(!timeline._source.ges_resultado){
        console.log("A "+index)
         // esta es la primera gestion
         if(this.state.tipoFicha=="telefonia"){

         }else if(this.state.tipoFicha=="web"){
           //var str = timeline._source.caso_ts_ult_ges;
           //var res = timeline._source.caso_ts_ult_ges.split("T");
           fecha = moment(timeline._source.caso_ts_ult_ges).format("DD-MM-YYYY")
           hora = timeline._source.caso_ts_ult_ges.split("T")
         }
         
        /*{fecha.length==10 && this.state.tipoFicha=="telefonia" && moment.unix(fecha).format("DD-MM-YYYY")}
                        {fecha.length==13 && this.state.tipoFicha=="telefonia" && moment.unix(fecha/1000).format("DD-MM-YYYY")}
                        {this.state.tipoFicha=="telefonia" && " "+moment.unix(fecha/1000).format("HH:MM")}*/

          return <div className="registro"  key={timeline._id}>
                    <div className="fecha">
                        

                        {this.state.tipoFicha=="web" && fecha}
                        {this.state.tipoFicha=="web" && " "+hora[1].slice(0,5)}
                    
                    </div>
                    <div className="marcano"></div>
                    <div className="actividad">
                        <div className="tag">Inicio</div>
                        
                    </div>
                  </div>
       
      }else{
        console.log("B "+index)
        
        
        fecha = moment(timeline._source.caso_ts_ult_ges).format("DD-MM-YYYY")
        hora = timeline._source.caso_ts_ult_ges.split("T")


        return <div className="registro" key={timeline._id}>
                    <div className="fecha"><div>
                        {fecha}
                        {" "}
                        {hora[1].slice(0,5)}
                    </div></div>
                    <div className="marca"><div className="linea"></div></div>
                    <div className="actividad">
                        
                        <div className="tag">{timeline._source.ges_resultado.replace("_"," ")}</div>
                        
                    </div>
                    <div className={"newcoment "+estilo} >
                        <div className=""> {comentario}</div>
                    </div>

                   
              </div>
               
      }
      
      
    });
    
    // el return devuelve el conenido <div className="comentario"> {comentario}</div>

    if(this.state.timelinedata.length>0){
      return(
            <div className="lineamanual">
              {timelinedata} 
            </div>
      )
    }else{
      return(<div className="lineamanual"></div>)
    }





  }
}

export default Timelines;




