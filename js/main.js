
document.getElementById('formulario').addEventListener('submit', cadastrarprodutosconsumidos);

function cadastrarprodutosconsumidos(e){

    var numeroquarto = document.getElementById('numeroquarto').value;
    var produtoconsumido = document.getElementById('produtoconsumido').value;
    var quantidadeconsumido = document.getElementById('quantidadeconsumido').value;
    var time = new Date();

    if(!numeroquarto || !produtoconsumido || !quantidadeconsumido){
        alert("Por favor, preencha os campos em branco!");
        return false;
    }

    produto = {
        numerodoquarto: numeroquarto, 
        tipoproduto: produtoconsumido,
        quantidadeproduto: quantidadeconsumido,
        hora: time.getHours(),
        minutos: time.getMinutes()
    }
    
    // console.log(produto);
        
    
        
    if(localStorage.getItem('nota') === null){
        var nota = [];
        nota.push(produto);
        localStorage.setItem('nota', JSON.stringify(nota));
        
    }else{
        var nota = JSON.parse(localStorage.getItem('nota'));
        nota.push(produto);
        localStorage.setItem('nota', JSON.stringify(nota));
    }
    
    document.getElementById('formulario').reset();

    mostraNota();
   
    console.log(produto)
    e.preventDefault();
}

function enviarDados() {

    $.ajax({
        type: "POST",
        url: "https://sistemahotel.hstech.digital/api/webapp",
        data: JSON.parse(localStorage.getItem('nota')),
        beforeSend: function(xhr) {
        },
        success: function(data) {
            console.log(data);
        },
        error: function() {
            console.log("EITA, DEU PAU");
        },
        dataType: 'json'
    });
    
}

function limparDados() {
    localStorage.removeItem('nota');

    mostraNota();
}

function removeDado(numerodoquarto){
	var nota = JSON.parse(localStorage.getItem('nota'));
	console.log(nota);

	 for(var i = 0 ; i < nota.length; i++){
		if(nota[i].numerodoquarto == numerodoquarto){
			nota.splice(i, 1);
		}
	}

	localStorage.setItem('nota', JSON.stringify(nota));

	mostraNota();
}

function mostraNota(){
    var nota = JSON.parse(localStorage.getItem('nota'));
    var notaresultado = document.getElementById('resultados');

    notaresultado.innerHTML = '';

    for(var i = 0; i < nota.length; i++){
        var numerodoquarto = nota[i].numerodoquarto;
        var tipoproduto = nota[i].tipoproduto;
        var quantidadeproduto = nota[i].quantidadeproduto;
        var hora = nota[i].hora;
        var minutos = nota[i].minutos;

        notaresultado.innerHTML += '<tr><td>' + numerodoquarto +
                                '</td><td>' + tipoproduto +
                                '</td><td>' + quantidadeproduto +
                                '</td><td>' + hora + ':' + minutos + '</td>' +
                                '<td><button onclick="removeDado(\''+ numerodoquarto +'\')" class="btn btn-danger">Remover</button></td>'+
                                '</tr>';
    }
}

