import React, { Component } from 'react';
import './Search.css';



class Search extends Component {
  //
  constructor(props) {
    super(props);
    this.state = {  
       subFiltros: [],
    }
  }
  componentDidMount(nextProps) {
    this.componentWillReceiveProps(nextProps);
  }

  componentWillReceiveProps(nextProps){
    //console.log(nextProps)
    this.actualizarSubFiltros(nextProps)
  }

  handleChange(event) {
    //console.log(event.target.value);

    
  }

  actualizarSubFiltros(procesomanual){
    console.log(this.props.procesomanual)
    procesomanual=this.props.procesomanual
    const subFiltros=[]
    procesomanual.forEach(function(a, index_a) {
        
        
        
        a.canales.forEach(function(b, index_b) {
          subFiltros.push({padre:a.tag,tag:b.tag, catidad:b.cantidad, ver:b.ver, tipo:true})
          if(b.tipificacion){
            b.tipificacion.forEach(function(c, index_c) {
                  subFiltros.push({padre:b.tag,tag:c.tag, catidad:c.cantidad, ver:c.ver, tipo:false})
            })
          }
        })
    })
    this.setState({subFiltros: subFiltros});
    console.log(subFiltros)

  }

actualizarSearch = (event) => {

      this.props.searchFiltro(event.target.value);

}


  
    render(){
      
      //FILTROS

      const filtropadre= this.props.filtro
      const filtro = this.state.subFiltros

      //TAGS VISUALES //
      const filtro_fichas = filtro.map(number => {if( filtropadre.indexOf(number.padre)==-1){
          return(<span className={number.tipo ? 'padre' : 'hijo'}>
                    <span key={number.tag} onClick={() => this.props.filtroFichas(number.tag)} className={number.ver ? 'badge badge-dark' : 'badge badge-dark off'}>
                      {number.tag}&nbsp;
                      <span className="badge badge-light">{number.catidad}</span>
                    </span>
                </span>
          )

      
      }}        
      );

      
      return ( 
          <div id="search">
            <div >
              <div className="col-auto">
                <div className="input-group mb-2">
                  <input onChange={this.actualizarSearch} type="text" className="form-control"  placeholder="Buscar" />
                  <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="marcas">{filtro_fichas}</div>
        </div> 
         
      ); 
  }
}



export default Search;

