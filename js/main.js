//Obs 1: O Jquery deve ser colocado antes do js nativo.

$(function(){

	////////////////////////////////////GET//////////////////////////
	//Declaração de Variaveis.
	var $destino = $('#saida');//Aqui crio uma variavel que irá mandar pra ID no html as informações.
	var $name = $('#name'), $email = $('#email'), $password = $('#pass');//Variaveis do Formulário.  

	var mustacheTemplate = '<tr><td>{{id}}</td><td>{{name}}</td><td>{{drink}}</td>'+
	'<td><button class="btn btn-danger remove" data-id="{{id}}">DELETE</button></td></tr>';//minha estrutura por linha html
	//Cada botão delete recebe o id dos dados que puxou e todos tem a mesma classe.
	//Obs esse Data-id é do mustache e é responsavel por pegar os iDs.

	function addDados(pedidos){
		$destino.append(Mustache.render(mustacheTemplate, pedidos));//Função looping dos dados.
	}
	
	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/johnbob/friend', //URl contendo banco e tabela.
		success:function(destino){//Nome da tabela no parametro da função			
			$.each(destino, function(i,caminho){//caminho é o parametro que equivale a tabela. Pode ser qualquer nome.
				addDados(this);//this está se referindo a caminho
			});
		},//Caso o Ajax não conecte emito um alerta ao usuário.
		error:function(){
			alert("Não foi possível conectar à API, tenta novamente.");
		}
	});

	/////////////////////////////POST////////////////////////////////
	$('#enviar').on('click', function(){//Jquery para rodar função ao clicar no botao enviar
		var carteiro = {//Crio um objeto com as informações
			nome: $name.val(),//val captura o valor da variavel no html
			email: $email.val(),
			senha: $password.val(),
			sexo: 'masculino',
			idade: '25',
			curso: 'Segurança Pública',
			autorizacao: '3',
		};

		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/johnbob/friend',
			data: carteiro,//aqui mosto que o objeto levara as informações
			success: function(){
				alert('Enviado');
			},
			erro:function(){
				alert('Encontrei um erro.');
			}
		})
	});

	/////////////////////////////DELETE///////////////////////////////////
	$destino.delegate('.remove', 'click', function(){
		var $ocultar = $(this).closest('tr');
		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/johnbob/friend/' + $(this).attr('data-id'),
			success: function(){
				$ocultar.fadeOut(300, function(){//Aqui adcionamos um efeito para suavisar a animação
				$ocultar.remove();//Oculta o Elemento
				alert('Deletado com sucesso');
			});
			},
			erro: function(){
				alert('Ops;');
			}
		});
	});

	//////////////////////////PUT/////////////////////////////////////

});