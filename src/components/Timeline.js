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
          "_source": ["caso_ts", "ges_ts", "ges_resultado", "ges_comentario_sv"],
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
                const hits=response.data.hits.hits.reverse()


                console.log(hits)
                this.setState({timelinedata:hits});

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
         var str = timeline._source.caso_ts;
         //var res = str.split(".");
         //var fecha = res[0];

         //var str2 = fecha;
         var res = timeline._source.caso_ts.split("T");
         fecha = res[0]

         console.log(fecha)
        

          return <div className="registro"  key={timeline._id}>
                    <div className="fecha">
                        {fecha.length==10 && this.state.tipoFicha=="telefonia" && moment.unix(fecha).format("DD-MM-YYYY")}
                        {fecha.length==13 && this.state.tipoFicha=="telefonia" && moment.unix(fecha/1000).format("DD-MM-YYYY")}
                        {this.state.tipoFicha=="telefonia" && " "+moment.unix(fecha/1000).format("HH:MM")}

                        {this.state.tipoFicha=="web" && moment(fecha).format("DD-MM-YYYY")}
                        {this.state.tipoFicha=="web" && " "+moment(fecha).format("HH:MM")}
                    
                    </div>
                    <div className="marcano"></div>
                    <div className="actividad">
                        <div className="tag">Inicio</div>
                        
                    </div>
                  </div>
       
      }else{
        console.log("B "+index)
        var fecha = timeline._source.caso_ts;
        //
        /*var res = str.split(".");
        var fecha = res[0];

        var str2 = fecha;
        var res2 = str2.split("T");
        fecha = res2[0]+' '+res2[1];

        console.log(fecha)
        console.log(timeline._source.ges_resultado.replace("_"," "))
        */


        return <div className="registro" key={timeline._id}>
                    <div className="fecha"><div>
                        {fecha.length==10 && this.state.tipoFicha=="telefonia" && moment.unix(fecha).format("DD-MM-YYYY")}
                        {fecha.length==13 && this.state.tipoFicha=="telefonia" && moment.unix(fecha/1000).format("DD-MM-YYYY")}
                        {this.state.tipoFicha=="telefonia" && " "+moment.unix(fecha/1000).format("HH:MM")}

                        {this.state.tipoFicha=="web" && moment(fecha).format("DD-MM-YYYY")}
                        {this.state.tipoFicha=="web" && " "+moment(fecha).format("HH:MM")}
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




