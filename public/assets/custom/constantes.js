
if(localStorage.getItem("constantes")){
	//console.log(JSON.parse(localStorage.getItem("constantes")));
	//AQUI TOMA LA ULTIMA CONSTANTE QUE QUEDO
	 constantes =  JSON.parse(localStorage.getItem("constantes"));
	
	
}else{
	 constantes = { 
		cliente:"bs_face",
		//DESARROLLO
		face:"si",
		direccion_ws_FACE:"https://s2test.openpartner.cl/",
		direccion_ws_FACE_pr:"https://s2test.openpartner.cl/",
		direccion_ws_FACE_de:"https://s2test.openpartner.cl/",
		
		direccion_base:"https://s2test.openpartner.cl/",
		direccion_base_pr:"https://s2test.openpartner.cl/",
		direccion_base_de:"https://s2test.openpartner.cl/",
		wsUrl:"",
		desarrollo:"si",
		destino:"test"
	
	
	};
	localStorage.setItem("constantes", JSON.stringify(constantes))
	
}




