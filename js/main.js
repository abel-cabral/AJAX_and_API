//Obs 1: O Jquery deve ser colocado antes do js nativo.

$(function(){

	//Declaração de Variaveis.
	var $destino = $('#saida');//Aqui crio uma variavel que irá mandar pra ID no html as informações.
	var $name = $('#name'), $email = $('#email'), $password = $('#pass');//Variaveis do Formulário.  

	$.ajax({
		type: 'GET', //Tipo de Requisição, normalmente puxa dados.
		url: 'http://rest.learncode.academy/api/johnbob/friend', //URl contendo banco e tabela.
		success:function(destino){//Nome da tabela no parametro da função			
			$.each(destino, function(i,caminho){//caminho é o parametro que equivale a tabela. Pode ser qualquer nome.
				$destino.append(//append fará um looping, enquanto tiver informação ele vai listar.
					'<tr><td>'+caminho.id+'</td>'+
					'<td>'+caminho.name+'</td>'+
					'<td>'+caminho.drink+'</td></tr>'
					);
			  //Variavel
			});
		},//Caso o Ajax não conecte emito um alerta ao usuário.
		error:function(){
			alert("Não foi possível conectar à API, tenta novamente.");
		}
	});

	$('#enviar').on('click', function(){//Jquery para rodar função ao clicar no botao enviar
		var carteiro = {//Crio um objeto com as informações
			nome: $name.val(),//val captura o valor da variavel no html
			email: $email.val(),
			senha: $password.val(),
		};

		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/johnbob/abel',
			data: carteiro,//aqui mosto que o objeto levara as informações
			success: function(){
				alert('Enviado');
			},
			erro:function(){
				alert('Encontrei um erro.');
			}
		})
	});


});