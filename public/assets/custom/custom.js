// JavaScript Document
if(constantes.desarrollo=="si" || constantes.desarrollo=="no"){
		
		
		
		incremento_test=0
		document.addEventListener("keydown", function(event) {
		keycode=event.keyCode
		//console.log(keycode)
		
		if(keycode == '84'){
			if(incremento_test>=0 && incremento_test<=2){
				incremento_test++
			}
			
		}else if(keycode != '84'){
			if(incremento_test>0){
				incremento_test--
			}
			
		}
		
		if(incremento_test==3){
			$("#myModal").modal("show")
				$("#myModal").find(".modal-dialog").removeClass("modal-lg");
				$("#myModal").find(".modal-dialog").addClass("modal-sm");
				$("#myModal").find(".modal-header").html('<button type="button" class="salir" data-dismiss="modal">x</button><h4 class="modal-title">ADMIN</h4>')
				//$("#myModal").find(".modal-title").html('ADMIN');
				$("#myModal").find(".modal-body").html('<div class="col-xs-12 col-sm-12 col-md-12"><br><div class="alert alert-danger text-center"><strong>Advertencia!</strong> Solo para administradores de la app.</div></div><div class="col-xs-12 col-sm-12 col-md-12">'+
															'<div class="input-group">'+
																'<span class="input-group-addon" id="basic-addon1">Clave</span>'+
																'<input value="" id="direcion_app_pass" name="" type="password" placeholder="Ingresa Clave" class="form-control refrescar_validacion rut_form">'+
															'</div>'+
														'</div>')
				$("#myModal").find(".modal-body").append('<div class="col-xs-12 col-sm-12 col-md-12">'+
															'<div id="botones_form_baul_buscar" class="btn-group btn-group-justified" role="group" aria-label="...">'+
																'<div class="btn-group" role="group">'+
																	 '<button id="validar_cambiar" onclick="validar_direcion_app()" type="button" class="btn btn-success enviar_form_001" data-formulario="form_form_baul_buscar" data-ws="">VALIDAR</button>'+
																'</div>'+
															'</div>'+
														'</div>')
														
				$("#myModal").find(".modal-body").append('<div class="actualizar_url col-xs-12 col-sm-12 col-md-12">'+
															'<div class="input-group">'+
															'<span class="input-group-addon" id="basic-addon1">PR</span>'+
															'<input value="'+constantes.direccion_base_pr+'" id="direcion_pr" name="" type="text" placeholder="Ingresa Clave" class="form-control refrescar_validacion rut_form">'+
															'</div>'+
														'</div>'+
														'<div class="actualizar_url col-xs-12 col-sm-12 col-md-12">'+
															'<div class="input-group">'+
															'<span class="input-group-addon" id="basic-addon1">TEST</span>'+
															'<input value="'+constantes.direccion_base_de+'" id="direcion_de" name="" type="text" placeholder="Ingresa Clave" class="form-control refrescar_validacion rut_form">'+
															'</div>'+
														'</div>'+
														'<div class="actualizar_url col-xs-12 col-sm-12 col-md-12">'+
															'<div id="botones_form_baul_buscar" class="btn-group btn-group-justified" role="group" aria-label="...">'+
																'<div class="btn-group" role="group">'+
																	 '<button id="actualizar_url" onclick="actualizar_direcion_app()" type="button" class="btn btn-success enviar_form_001" data-formulario="form_form_baul_buscar" data-ws="">ACTUALIZAR URL´s</button>'+
																'</div>'+
															'</div>'+
														'</div>')
					$(".actualizar_url").hide();										
														
			
		}
		
	
	});	
	
}

function actualizar_direcion_app(){
	
	constantes.direccion_base_pr=$("#direcion_pr").val()
	constantes.direccion_base_de=$("#direcion_de").val()
	if(constantes.destino=="test"){
		constantes.direccion_base=constantes.direccion_base_de
		$("#myModal").find(".alert-danger").html('<strong> APUNTANDO A TEST<br>URL:</strong> '+constantes.direccion_base+'<br><strong>Destino:</strong> '+constantes.destino)
		
	}else if(constantes.destino==""){
		constantes.direccion_base=constantes.direccion_base_pr
		$("#myModal").find(".alert-danger").html('<strong> APUNTANDO A PRODUCTIVO<br>URL:</strong> '+constantes.direccion_base)
		
	}
	
	localStorage.setItem("constantes", JSON.stringify(constantes))
	
		
}


function validar_direcion_app(){
	
	if($("#direcion_app_pass").val()=="1q2w3e.,"){
		$(".actualizar_url").show();	
		$("#direcion_app_pass").closest(".col-xs-12").hide();
		
		
		
		
		if(constantes.destino=="test"){
				$("#validar_cambiar").html("CAMBIAR A TEST")
				constantes.destino=""
				//alert("APUNTANDO A PRODUCTIVO")
				$("#wiuv_moment").remove();
				incremento_test=0
				constantes.destino=""
				constantes.desarrollo="no"
				constantes.direccion_base=constantes.direccion_base_pr
				constantes.direccion_ws_FACE=constantes.direccion_ws_FACE_pr
				localStorage.setItem("constantes", JSON.stringify(constantes))
				$(".ver_url").remove();
				$("#myModal").find(".alert-danger").html('<strong> APUNTANDO A PRODUCTIVO<br>URL:</strong> '+constantes.direccion_base)
				//$("#myModal").find(".modal-body").append('<div class="col-xs-12 col-sm-12 col-md-12 ver_url"><br><div class="alert alert-danger text-center"><strong>URL:</strong> '+constantes.direccion_base+'</div></div>')
				
				const debugMenu = require('debug-menu');
				debugMenu.uninstall();  // activate context menu
				return false;
		}else if(constantes.destino==""){
				$("#validar_cambiar").html("CAMBIAR A PRODUCTIVO")
				constantes.destino="test"
				//alert("APUNTANDO A TEST")
				$("body").append("<div id='wiuv_moment' style='background: #18921a; position: absolute; width: 43px; height: 43px; z-index: 500; border-radius: 50%; top: 18px; left: 200px;     font-weight: bold; padding-left: 11px; padding-top: 8px; font-size: 18px; color: #FFF;'>DE</div>")
				incremento_test=0
				constantes.destino="test"
				constantes.desarrollo="si"
				constantes.direccion_base=constantes.direccion_base_de
				constantes.direccion_ws_FACE=constantes.direccion_ws_FACE_de
				localStorage.setItem("constantes", JSON.stringify(constantes))
				$(".ver_url").remove();
				$("#myModal").find(".alert-danger").html('<strong> APUNTANDO A TEST<br>URL:</strong> '+constantes.direccion_base+'<br><strong>Destino:</strong> '+constantes.destino)
				//$("#myModal").find(".modal-body").append('<div class="col-xs-12 col-sm-12 col-md-12 ver_url"><br><div class="alert alert-danger text-center"><strong>URL:</strong> '+constantes.direccion_base+'<br><strong>Destino:</strong> '+constantes.destino+'</div></div>')
				
				const debugMenu = require('debug-menu');
				debugMenu.install();  // activate context menu
				//return false;
		}
		
		
	}
	
	
}



direccion_login=constantes.direccion_base
cliente_bs=constantes.cliente;

usuario_log=""
clave_log=""

funciones_locales= function(datos, objeto){}
filtros_locales= function(colocar){} 
performans = function(){};
sistema_face=[{
						'sistema': 'FACE',
						'menu':'<li class="vinculo" id="link_kanban" data-vinculo="sistema_face/kanban/face" id="kanaban" title="Actividades"><a><i class="fas fa-sync-alt" aria-hidden="true"></i></a></li>'+
						' <li class="" id="pausa" data-vinculo="kanban/kanban" title="ir / Salid de Pausa"><a><i class="fas fa-coffee"></i></a></li>'+
						'<li class="" id="almuerzo" data-vinculo="kanban/kanban" title="ir / Volver de Alumerzo"><a><i class="fas fa-utensils"></i></a></li>'+
						'<li class="" id="cortar" data-vinculo="kanban/kanban" title="Cortar Llamado"><a><i class="fas fa-phone-slash"></i></a></li>'+
						'<li class="" id="transferir" data-vinculo="kanban/kanban" title="Transferir Llamado"><a><i class="fas fa-exchange-alt"></i></a></li>',
						
						'wsUrl': 'bsync/'}]





login =  function(){
	
	$("#id_pass").focus()
	$("#msj").html(" ")
	$("#msj_olv").html(" ")
	
	$(".ir_recuperar").on("click", function(){
		
		$("#div_recuperar").show()
		$("#div_login").hide()
		
		$("#msj").html(" ")
		$("#msj_olv").html(" ")
	})
	
	$(".ir_login").on("click", function(){
		
		$("#div_login").show()
		$("#div_recuperar").hide()
		
		$("#msj").html(" ")
		$("#msj_olv").html(" ")
	})
	
	document.addEventListener("keydown", function(event) {
		keycode=event.keyCode
		//console.log(keycode)
		if (keycode == '13') {
			$("#login").click();
		}
		  
	});
	
	if(constantes.face=="si"){
		$("#div_login").html('<span id="div_login">'+
								'<div><h1>Bienvenido</h1></div>'+
								'<div class="loader"></div>'+
								'<input type="hidden" id="agenteID" name="agenteID"  />'+
								'<input type="hidden" id="uniqueid" name="uniqueid"/> '+
								'<input type="hidden" id="idcampania" name="idcampania"/> '+
								'<input type="hidden" id="id_tarea_llamando" name="id_tarea_llamando"/> '+
								'<div><h3 id="msj" class="mensaje_usuario"></h3></div>'+
							'</span>');
		
		
		
		
		if(constantes.desarrollo=="si"){
			
			
			$("#agenteID").val(3099);
			$("#log").hide();
			$("#cuerpo").load("sistema_face/kanban/face.html", function(responseTxt, statusTxt, jqXHR){
			if(constantes.desarrollo=="si" ){
								 //console.log("ES"+constantes.desarrollo)
								$("body").append("<div id='wiuv_moment' style='background: #18921a; position: absolute; width: 43px; height: 43px; z-index: 500; border-radius: 50%; top: 18px; left: 200px;     font-weight: bold; padding-left: 11px; padding-top: 8px; font-size: 18px; color: #FFF;'>DE</div>")
								const debugMenu = require('debug-menu');
								debugMenu.install();
							}
			
			})
			localStorage.setItem("constantes", JSON.stringify(constantes))
			
			
		
		
		} else {
			Face.Initialize();
		}
		
						
						
		
	} else if(constantes.face=="no"){
	
	
		$("#login").on("click", function(){
			
			
			
			if( $("#id_pass").val()==""){
				$("#id_pass").focus()
				$("#msj").html('<div class="alert alert-danger" role="alert">Ingrese su usuario</div>')
			}else if( $("#pass").val()==""){
				$("#pass").focus()
				$("#msj").html('<div class="alert alert-danger" role="alert">Ingrese su Clave</div>')
				
			}else if ($("#id_pass").val()!="" && $("#pass").val()!=""){
				$.ajax({
						data:{ "usuario":$("#id_pass").val(),"clave":$("#pass").val(), "origen":"kanban"},
						url : direccion_login+"login",
						type : "POST",           
						dataType: 'json',
						beforeSend: function () {
							
							$( "#div_login" ).append("<div class='conter_loader'><div class='loader'></div></div>");
						},
						success: function(data){
							
							//data.menu=[]
							//data.menu.push(sistema_face)
								
							//console.log(data.menu)
							
							//return false;
							
							if(data.estatus	=="OK"){
									
										localStorage.setItem("usuario_"+cliente_bs, $("#id_pass").val())
										localStorage.setItem("menu_"+cliente_bs, JSON.stringify(data.menu))
										localStorage.setItem("token", data.token)
										$("#login").remove()
										
										genera_interfaz($("#id_pass").val(), data.menu)
										
									
							
							} else if(data.estatus=="NO OK"){
								$("#msj").html('<div class="alert alert-danger" role="alert">Datos Invalidos</div>')
							}
							
							$(".conter_loader").remove();
						},
						error: function (xhr, ajaxOptions, thrownError) {
							//$("#boton").hide();
							//<!--errorConexion(xhr,ajaxOptions);-->
						}
			
					});	
			}
			
		})
		
		$("#login_recuperacion").on("click", function(){
			
			if( $("#Email_olv").val()==""){
				$("#Email_olv").focus()
				$("#msj_olv").html('<div class="alert alert-danger" role="alert">Ingrese su correo</div>')
				
			}else if ($("#Email_olv").val()!="" ){
			
			$.ajax({
					data:{ "email":$("#Email_olv").val(),"origen":"kanban"},
					url : direccion_login+"regenera_clave",
					type : "POST",           
					dataType: 'json',
					beforeSend: function () {
						
						$( "#div_recuperar" ).append("<div class='conter_loader'><div class='loader'></div></div>");
					},
					success: function(data){
						if(data.estatus=="NO OK"){
								$("#msj_olv").html('<div class="alert alert-danger" role="alert">'+data.mensaje_error.replace(/\_/g," ")+'</div>')
						}else if(data.estatus=="OK"){
							
								//$("#ir_login").click()
								if(data.mensaje_error){
									$("#msj").html('<div class="alert alert-danger" role="alert">'+data.mensaje_error.replace(/\_/g," ")+'</div>')	
								}
								
								$("#div_login").show()
								$("#div_recuperar").hide()
						
						}
						$(".conter_loader").remove();
					},
					error: function (xhr, ajaxOptions, thrownError) {
						//$("#boton").hide();
						//<!--errorConexion(xhr,ajaxOptions);-->
					}
		
				});	
			}
			
		})
	
	}


}

function login_face(usuario){
		localStorage.clear();
		localStorage.setItem("usuario_"+cliente_bs, $("#id_pass").val())
		localStorage.setItem("menu_"+cliente_bs, JSON.stringify(sistema_face))
		localStorage.setItem("token", $("#id_pass").val())
		$("#login").remove()
		
		genera_interfaz(usuario, "")
		$("#link_kanban").click();
	
}


function myStopFunction() {
    clearInterval(myVar);
	return true;
}


function  genera_interfaz(usuario, munu){
	console.log(munu)
	//alert(localStorage.getItem("menu_"+cliente_bs))
						  usuario_log=usuario						  
						  if(typeof(JSON.parse(localStorage.getItem("menu_"+cliente_bs)))=="object"){
								//alert("002")
								usuario_multimenu=JSON.parse(localStorage.getItem("menu_"+cliente_bs))
								opciones_menu_log="";
								opciones_menu=""
								
								if(munu==""){
									$("#cuerpo").load("sistema_face/kanban/face.html")
								}else{
									
								
								$("#header").load("header.html", function(responseTxt, statusTxt, jqXHR){
									$("#cargar_opciones").html("");
									for (i in usuario_multimenu){
										//console.log(usuario_multimenu[i])
										$("#cargar_opciones").append('<span class="menu_sistema" id="menu_sistema_'+usuario_multimenu[i].sistema+'">'+usuario_multimenu[i].menu+'</span>')
										opciones_menu=opciones_menu+'<li><a><div data-wsurl="'+usuario_multimenu[i].wsUrl+'" data-sistema="'+usuario_multimenu[i].sistema+'"  class="nombre_user opcion_menu_sistema">'+usuario_multimenu[i].sistema+'</div></a></li>';
										opciones_menu_log=opciones_menu_log+'<div data-wsurl="'+usuario_multimenu[i].wsUrl+'" data-sistema="'+usuario_multimenu[i].sistema+'" class="menu_sistema_log"><div class="sistema">Sistema</div>'+usuario_multimenu[i].sistema.replace(/\_/g," ")+'</div>';
										
									}
								
									$("#log").find(".inicio").hide();
									$("#log").append("<div class='inicio_menu_log'></div>");
									$("#log").find(".inicio_menu_log").html(opciones_menu_log)
									$("#log").find(".inicio_menu_log").prepend("<div class='nombre_sistema'>&nbsp;</div>")
									//MENU DEL USUARIO
									$("#cargar_opciones").append("<li class='dropdown'>"+
																	 "<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'><i class='fa fa-user' aria-hidden='true'></i><span class='caret'></span></a>"+
																  "<ul class='dropdown-menu'>"+
																  	"<li><a><div class='nombre_user mi_perfil'>"+usuario+"</div></a></li>"+
																  	'<li role="separator" class="divider"></li>'+
																  	opciones_menu+
																	'<li role="separator" class="divider"></li>'+
																	
																	"<li><a><div class='nombre_user cerrar_sesion'>Cerrar sesión</div></a></li>"+
																  "</ul>"+
																"</li>")
								
									//NAVEGACION EN EL MENU
									$(".opcion_menu_sistema").click(function(){
									
										$(".menu_sistema").hide();
										$("#menu_sistema_"+$(this).data("sistema")).show();
										$("#menu_sistema_"+$(this).data("sistema")+"  li:first").click();
										$("#menu_sistema_"+$(this).data("sistema")+"  li:first").addClass("seleccionado");
									
										constantes.wsUrl=$(this).data("wsurl");
										direccion_ws=constantes.direccion_base+constantes.wsUrl
								
									})
								
									$(".menu_sistema_log").click(function(){
										$("#log").hide();
										$(".menu_sistema").hide();
										$("#menu_sistema_"+$(this).data("sistema")).show();
										$("#menu_sistema_"+$(this).data("sistema")+"  li:first").click();
										$("#menu_sistema_"+$(this).data("sistema")+"  li:first").addClass("seleccionado");
										
										constantes.wsUrl=$(this).data("wsurl");
										direccion_ws=constantes.direccion_base+constantes.wsUrl
									})
								
									//OPCION DE CIERRE 								
									 $(".cerrar_sesion").on("click", function(){
										eliminar_sesion(localStorage.getItem("usuario_"+cliente_bs)) 
									 })
									//NEVEGACION
									 $(".vinculo").on("click", function(){
										$("#cuerpo").html();
										vinculo=$(this).data("vinculo").split("/",1)
										nivel_sistema=vinculo[0]+"/";
										//alert(nivel_sistema)
										clearInterval(myVar);
										$("#cuerpo").load($(this).data("vinculo")+".html??13022018")
									});
									//ESTILOS DE NAVEGACION
									$(".vinculo").mousedown(function(){$(".vinculo").removeClass("seleccionado");});
									$(".vinculo").mouseup(function(){$(this).addClass("seleccionado")});
									$("#cargar_opciones  li:first").click();
								
								
									//MI PERFIL
									$(".mi_perfil").on("click", function(){
	
										user = getFormUsuario();
									
										$('#myModal').modal("show");									
										
										$("#myModal > .modal-dialog").removeClass('modal-lg');
										$("#myModal > .modal-dialog").addClass('modal-xs');
										
											
										$(".modal-body").html("<div  class='col-xs-12 col-sm-12 col-md-12' style='background: #FFF;'><div id='form_login'></div></div>");
										
										cosntruir_formularios(user, "form_login", "")
										
										$("#lista_opciones_interz").hide()
										
										
										$(".modal-title").html($(".header_formularios").find("h2").html())
										
										
										
										
										$(".header_formularios").remove()
										
										$("#botones_form_login").find(".enviar_form_001").attr("disabled",true)
										
										$("#clave, #clave_rep").keyup(function(){
											
											
											
											
											var patron=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.,])[A-Za-z\d$@$!%*?&.,]{7,15}$/
											
											
											
											if($("#clave").val()!="" && $("#clave").val()==$("#clave_rep").val() && $("#clave").val().length>=7){
												$("#botones_form_login").find(".enviar_form_001").attr("disabled",false)
												//console.log(patron.test($("#clave").val()))
											}else{
												$("#botones_form_login").find(".enviar_form_001").attr("disabled",true)
											}
										})
										
										 setTimeout (colocar_header(), 2000000); 
										
										//console.log("aqui")	
									})
								///FIN DE MENU
								})
								}
								
						  }else if(typeof(JSON.parse(localStorage.getItem("menu_"+cliente_bs)))=="string"){
						 		//alert("001")
						  		 $("#log").hide();
						  		$("#header").load("header.html", function(responseTxt, statusTxt, jqXHR){
							  		$("#cargar_opciones").html(JSON.parse(localStorage.getItem("menu_"+cliente_bs)))
							  		$("#cargar_opciones").append("<li class='dropdown'>"+
																 "<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'><i class='fa fa-user' aria-hidden='true'></i><span class='caret'></span></a>"+
																  "<ul class='dropdown-menu'>"+
																	"<li><a><div class='nombre_user '>"+usuario+"</div></a></li>"+
																	"<li><a><div class='nombre_user cerrar_sesion'>Cerrar sesión</div></a></li>"+
																  "</ul>"+
																"</li>")
																
							  	 $(".cerrar_sesion").on("click", function(){
								 	eliminar_sesion(localStorage.getItem("usuario_"+cliente_bs)) 
							  	 })
							  
							  	 $(".vinculo").on("click", function(){
								  	$("#cuerpo").html();
									clearInterval(myVar);
									$("#cuerpo").load($(this).data("vinculo")+".html??13022018")
								});
							  	$(".vinculo").mousedown(function(){$(".vinculo").removeClass("seleccionado");});
								$(".vinculo").mouseup(function(){$(this).addClass("seleccionado")});
								$("#cargar_opciones  li:first").click();
								$("#cargar_opciones  li:first").addClass("seleccionado");
						  })
						 
						  }
						 
						  if(constantes.desarrollo=="si" ){
								 //console.log("ES"+constantes.desarrollo)
								$("body").append("<div id='wiuv_moment' style='background: #18921a; position: absolute; width: 43px; height: 43px; z-index: 500; border-radius: 50%; top: 18px; left: 200px;     font-weight: bold; padding-left: 11px; padding-top: 8px; font-size: 18px; color: #FFF;'>DE</div>")
								const debugMenu = require('debug-menu');
								debugMenu.install();
							}
						  
						  $("#foooter").load("footer.html");
						 	
	
}
 
function eliminar_sesion(usuario)  {
	localStorage.clear();
	login();
	location.reload(); 	
	session.clear()
	localStorage.setItem("constantes", JSON.stringify(constantes))
}

function colocar_header(){
 $("#myModal > .modal-header").html('<button type="button" class="salir" data-dismiss="modal">x</button>'+
																	   '<h4 class="modal-titl">Actualizar Clave.</h4>')	
																	   
	//alert("fue")	
}

//ERRORES; NO OK Y DESCONOCIDO
function controlar_no_ok_desconocido_error(cursor,data){
	
	if(cursor=="NO OK"){
		
		$('#mensajes_alerta').modal("show");
		if(data.mensaje_error!=""){
			$('#mensajes_alerta').find("h1").html("!ERROR");
			$('#mensajes_alerta').find("h2").html(data.mensaje_error)
			$(".conter_loader").remove();
			$(".enviar_form_001").attr("disabled", false);
		}
		console.log(data.codigo_error);
		console.log(data.mensaje_error);	
		
	}else if(cursor=="DESCONOCIDO"){
		$('#mensajes_alerta').modal("show");
		console.log("desconocido");
		console.log(data);
		
	}else if(cursor=="ERROR"){
		$('#mensajes_alerta').modal("show");
		console.log(data);
		
	}	
	
}


function getFormUsuario(){
	
	var direccion_ws=constantes.direccion_base;
	return {
		"formulario":'Actualizar Clave',
		"contendio":[	
						
						{
							"grupo":"Datos de Usuario "+localStorage.getItem("usuario_"+cliente_bs),
							"tamanio":[12,12,12],
							"campos":[	
										
										{
											"campo":"Usuario",
											"tipo":"texto",
											"opciones":[localStorage.getItem("usuario_"+cliente_bs)],
											"obligatorio":"si",
											"nota":"usuario",
											"tamanio":[12,12,12],
											"estado":"lectura_envio",
											"id":"usuario"
										},
										{
											"campo":"Nueva Clave",
											"tipo":"password",
											"opciones":[],
											"obligatorio":"si",
											"nota":"Ingresa tu nueva clave",
											"tamanio":[12,12,12],
											"id":"clave"
										}
										,
										{
											"campo":"Repite tu Nueva Clave",
											"tipo":"password",
											"opciones":[],
											"obligatorio":"si",
											"nota":"Ingresa tu nueva clave",
											"tamanio":[12,12,12],
											"id":"clave_rep"
										},
										{
											"campo":"nota",
											"tipo":"div",
											"opciones":['<span class="label label-info">Ingresa tu nueva clave, ingrese de 7 a 15 caracteres, Mayúsculas, Minúsculas y algun caracter $@$!%*?&.,</span>'],
											"obligatorio":"no",
											"nota":"",
											"tamanio":[12,12,12],
											"id":"nota"
										}
										
									]
						}
						
		],
		"opciones":[{
			"boton":"CAMBIAR CLAVE",
			"ws":"",
			"funcion":"cambiar_clave()"
		}]
		
	};
}

user = getFormUsuario();


function cambiar_clave(){
	
	$.ajax({
				data:{ "usuario":localStorage.getItem("usuario_"+cliente_bs),"clave":$("#clave").val(),"clave_rep":$("#clave_rep").val()},
				url : direccion_login+"cambiar_clave",
				type : "POST",           
				dataType: 'json',
				beforeSend: function () {
						//console.log(div)
						$("#fomulario_form_login").append('<div class="conter_loader"><div class="loader"></div></div>');
						$(".enviar_form_001").attr("disabled", true);
					},
					success: function(data){
						
						if(data.estatus){
						
							if(data.estatus=="OK" || data.estatus=="FIN"){
								//KANBAN
								$("#myModal").modal("hide");
								
								
							}else if(data.estatus=="NO OK"){
								controlar_no_ok_desconocido_error("NO OK", data)
							}
						}else{
							controlar_no_ok_desconocido_error("DESCONOCIDO", data)		
						}
						
						
						
						
					},
					error: function (xhr, ajaxOptions, thrownError) {
						controlar_no_ok_desconocido_error("ERROR", xhr.status)
		
					}
				
				
	
			});	

}








