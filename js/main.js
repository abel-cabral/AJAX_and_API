//Obs 1: O Jquery deve ser colocado antes do js nativo.

$(function(){

	var $destino = $('#saida');//Aqui crio uma variavel que irá mandar pra ID no html as informações.

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
});