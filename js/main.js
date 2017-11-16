//Obs 1: O Jquery deve ser colocado antes do js nativo.

$(function(){

	//////////////////////////////////CAPTURA AUTOMÁTICA DE FORMULÁRIO//////////////////////////////

	$.fn.serializeObject = function() {
		var o = Object.create(null),
		elementMapper = function(element) {
			element.name = $.camelCase(element.name);
			return element;
		},
		appendToResult = function(i, element) {
			var node = o[element.name];

			if ('undefined' != typeof node && node !== null) {
				o[element.name] = node.push ? node.push(element.value) : [node, element.value];
			} else {
				o[element.name] = element.value;
			}
		};

		$.each($.map(this.serializeArray(), elementMapper), appendToResult);
		return o;
	};

	//////////////////////////////////FIM CAPTURA AUTOMÁTICA DE FORMULÁRIO//////////////////////////////




	
	//Declaração de Variaveis.
	var $destino = $('#saida');//Aqui crio uma variavel que irá mandar pra ID no html as informações.
		

	var mustacheTemplate = $('#mustache_modelo').html();//Captura o ID da tag 'Template'.
	//Cada botão delete recebe o id dos dados que puxou e todos tem a mesma classe.
	//Obs esse Data-id é do mustache e é responsavel por pegar os iDs.


	////////////////////////////////////GET//////////////////////////
	function addDados(pedidos){
		$destino.append(Mustache.render(mustacheTemplate, pedidos));//Função looping dos dados.
	}
	
	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/ccdp/voluntarios', //URl contendo banco e tabela.
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
	$('form').submit(function(){//Quando form fo submetido essa função executa		
		var capturas = $('form').serializeObject();//Aqui minha função busca e monta um objeto com os dados colidos no FORM				
		
		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/ccdp/voluntarios',
			data: capturas,//O objeto criado leva as informações para a API
			success: function(){
				alert('Enviado');
			},
			erro:function(){
				alert('Encontrei um erro.');
			}
		})
		return false;//Retorna esse false para o submit nao seguir adiante.
	});

	/////////////////////////////DELETE///////////////////////////////////
	$destino.delegate('.remove', 'click', function(){
		var $ocultar = $(this).closest('tr');
		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/ccdp/voluntarios/' + $(this).attr('data-id'),//Obs o DELETE precisa de uma / no endereço para funcionar.			
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



//Funções para Buscar Endereço
function buscaCep() {
	function preencheCampos(json) {//Essa função vai jogar informações nas Inputs
		document.querySelector('input[id=logradouro]').value = json.logradouro;
		document.querySelector('input[id=bairro]').value = json.bairro;
		document.querySelector('input[id=complemento]').value = json.complemento;
		document.querySelector('input[id=cidade]').value = json.localidade;
		document.querySelector('input[id=estado]').value = json.uf;
	}

    let inputCep = document.querySelector('input[name=cep]');//pega o cep informado.
    let cep = inputCep.value.replace('-', '');//Trata de remover eventuais traços.
    let url = 'http://viacep.com.br/ws/' + cep + '/json';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {//Com um 200 de retorno iniciamos a função para por os valores
        	if (xhr.status = 200){
        		preencheCampos(JSON.parse(xhr.responseText));
            }else{//Em caso de Erro, vamos exibir este alert
            	alert('Houve um problema ao Conectar ao Banco do Correios');
            }
        }
    }
    xhr.send();
}