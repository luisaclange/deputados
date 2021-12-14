//Variáveis
let urlAuthToken = 'https://dadosabertos.camara.leg.br/api/v2';
let authToken;
var campoResposta = document.getElementById('campoResposta');
var selectPartido = document.getElementById('partido');
var selectEstado = document.getElementById('estado');
var itemDeputado = document.getElementsByClassName('.item');
var nomeDeputado = document.getElementById('nomeDeputado');
var jsonlistDeputado;
var jsonlistDados;


//Requests
function requestDeputado() {
    //Sera utilizado uma conexao assincrona
    let request = new XMLHttpRequest();
    let urlAuthTokenaux = urlAuthToken + '/deputados';
    request.open('GET', urlAuthTokenaux, true); //Sincrona coloca 'false'
    request.setRequestHeader('Accept', 'application/json'); //solicita um json
    request.onload = function (e) { //retorna se tiver algum erro
        if (this.readyState === 4) { //se a conexao esta ativa
            if (request.status === 200) { //conectou com sucesso
                jsonlistDeputado = request.response;
                menuPartido();
                retornaDeputado1();
                menuEstado();
            } else {
                alert('Erro ao receber os dados: ' + request.statusText);
            };
        };
    };
    request.onerror = function () {
        alert('Erro: ' + this.statusText);
    };

    request.responseType = 'json'; //retorne um json
    request.send(null);
}

function requestDados(int) {
    //Sera utilizado uma conexao assincrona
    let request = new XMLHttpRequest();
    let urlAuthTokenaux = urlAuthToken + '/deputados/' + jsonlistDeputado.dados[int].id + '/despesas';
    request.open('GET', urlAuthTokenaux, true); //Sincrona coloca 'false'
    request.setRequestHeader('Accept', 'application/json'); //solicita um json
    request.onload = function (e) { //retorna se tiver algum erro
        if (this.readyState === 4) { //se a conexao esta ativa
            if (request.status === 200) { //conectou com sucesso
                jsonlistDados = request.response;
                dadosDeputado(int);
            } else {
                alert('Erro ao receber os dados: ' + request.statusText);
            };
        };
    };
    request.onerror = function () {
        alert('Erro: ' + this.statusText);
    };
    request.responseType = 'json'; //retorne um json
    request.send(null);
}



//Funções de retorno no menu
function menuPartido() {
    selectPartido.innerHTML = '';
    selectPartido.innerHTML += '<option value="1">Selecione o partido</option>';
    var partidos = [];
    var aux = 0;
    var check = true;
    for (let index = 0; index < jsonlistDeputado.dados.length; index++) {
        check = true;
        for (let i = 0; i < partidos.length; i++) {
            if (jsonlistDeputado.dados[index].siglaPartido === partidos[i]) {
                check = false;
                break;
            }
        }
        if (check===true) {
            partidos[aux] = jsonlistDeputado.dados[index].siglaPartido;
            aux++;
            selectPartido.innerHTML += '<option value="' + (index + 2) + '">' + jsonlistDeputado.dados[index].siglaPartido + '</option>'; 
        }
    }
}

function menuEstado() {
    selectEstado.innerHTML = '';
    selectEstado.innerHTML += '<option value="1">UF</option>';
    var estado = [];
    var aux = 0;
    var check = true;
    for (let index = 0; index < jsonlistDeputado.dados.length; index++) {
        check = true;
        for (let i = 0; i < estado.length; i++) {
            if (jsonlistDeputado.dados[index].siglaUf === estado[i]) {
                check = false;
                break;
            }
        }
        if (check===true) {
            estado[aux] = jsonlistDeputado.dados[index].siglaUf;
            aux++;
            selectEstado.innerHTML += '<option value="' + (index + 2) + '">' + jsonlistDeputado.dados[index].siglaUf + '</option>'; 
        }
    }
}

//Retorno de deputados
function retornaDeputado1() {
    campoResposta.innerHTML = '';
    var check = true;
    for (let index = 0; index < jsonlistDeputado.dados.length; index++) {
        
        if (selectPartido.options[selectPartido.selectedIndex].text == jsonlistDeputado.dados[index].siglaPartido || selectPartido.options[selectPartido.selectedIndex].text === "Selecione o partido") {
            if (check === true) {
                campoResposta.innerHTML = '<hr>';
                check = false;
            }
            campoResposta.innerHTML += "<div class='item' onclick='requestDados("+index+")' ><div class='subitem1'  >"+jsonlistDeputado.dados[index].siglaPartido+"</div><div class='subitem2'>"+jsonlistDeputado.dados[index].nome+"</div></div><hr>";
       }
    }
}

function retornaDeputado2(texto) {
    campoResposta.innerHTML = ' ';
    var check = true;
    for (let index = 0; index < jsonlistDeputado.dados.length; index++) {
        if (jsonlistDeputado.dados[index].nome.toUpperCase().search(texto.toUpperCase()) !== -1) {
            if (check === true) {
                campoResposta.innerHTML = '<hr>';
                check = false;
            }
            campoResposta.innerHTML += "<div class='item' onclick='dadosDeputado("+index+")' ><div class='subitem1'  >"+jsonlistDeputado.dados[index].siglaPartido+"</div><div class='subitem2'>"+jsonlistDeputado.dados[index].nome+"</div></div><hr>";
       }
    }
}

function retornaDeputado3() {
    campoResposta.innerHTML = '';
    var check = true;
    for (let index = 0; index < jsonlistDeputado.dados.length; index++) {   
        if (selectEstado.options[selectEstado.selectedIndex].text == jsonlistDeputado.dados[index].siglaUf) {
            if (check === true) {
                campoResposta.innerHTML = '<hr>';
                check = false;
            }
            campoResposta.innerHTML += "<div class='item' onclick='requestDados("+index+")' ><div class='subitem1'  >"+jsonlistDeputado.dados[index].siglaPartido+"</div><div class='subitem2'>"+jsonlistDeputado.dados[index].nome+"</div></div><hr>";
       }
    }
}


//Dados do deputado
function dadosDeputado(int) {
    let dados;
    let total = 0;
    dados = '<div id="informacoes">';
    dados += '<div class="foto"><img src="'+jsonlistDeputado.dados[int].urlFoto+'" style="height:300px"></div>'
    dados += '<div class="texto">';
    dados += 'Nome:   '+jsonlistDeputado.dados[int].nome + '<br>';
    dados += 'Partido: '+jsonlistDeputado.dados[int].siglaPartido + '<br>';
    dados += 'Estado: '+jsonlistDeputado.dados[int].siglaUf + '<br>';
    for (let index = 0; index < jsonlistDados.dados.length; index++) {
        total += jsonlistDados.dados[index].valorDocumento;
    }
    dados += 'Gastos (2021):   R$'+total.toFixed(2)+'<br>';
    dados += '<button id="voltar" onclick = "escolha()">Voltar</button>'; 
    dados += '<button id="relatorio" onclick = "gerarRelatorio()">Gerar Relatório</button>';
    dados += '</div></div>'; 
    campoResposta.innerHTML = dados;
}

function gerarRelatorio() {
    var informacoes = document.getElementById("informacoes");
    var dados = '';
    dados += '<table class="relatorio"><tr><th>Data</th><th>Tipo de Despesa</th><th>Nome do Fornecedor</th><th>Valor do documento</th></tr>';
    for (let index = 0; index < jsonlistDados.dados.length; index++) {
        dados += '<tr><th>'+jsonlistDados.dados[index].dataDocumento+'</th>';
        dados += '<th>'+jsonlistDados.dados[index].tipoDespesa+'</th>';
        dados += '<th>'+jsonlistDados.dados[index].nomeFornecedor+'</th>';
        dados += '<th> R$'+jsonlistDados.dados[index].valorDocumento.toFixed(2)+'</th></tr>';
    }
    dados += '</table>';
    informacoes.innerHTML += dados;
}

//Voltar à página inicial
function escolha() {
    if (nomeDeputado.value == ""&&selectEstado.options[selectEstado.selectedIndex].text == 'UF') {
        retornaDeputado1();
    }
    else if (selectEstado.options[selectEstado.selectedIndex].text == 'UF'&&selectPartido.options[selectPartido.selectedIndex].text == 'Selecione o partido') {
        retornaDeputado2(nomeDeputado.value);
    } else {
        retornaDeputado3();
    }
}

//Eventos
window.onload = function(){
    requestDeputado();
}

selectPartido.onchange = function(){
    //window.scrollTo(0,selectPartido.scrollTop);
    nomeDeputado.value = '';
    selectEstado.options[selectEstado.selectedIndex].text = 'UF';
    retornaDeputado1();
}

selectEstado.onchange = function(){
    nomeDeputado.value = '';
    selectPartido.options[selectPartido.selectedIndex].text = 'Selecione o partido';
    retornaDeputado3();
}

nomeDeputado.onkeyup = function(e) {
    if (e.keyCode == 13||e.which == 13) {
        selectPartido.options[selectPartido.selectedIndex].text = 'Selecione o partido';
        selectEstado.options[selectEstado.selectedIndex].text = 'UF';
        retornaDeputado2(nomeDeputado.value);
    }
}

nomeDeputado.onblur = function() {
    if (nomeDeputado.value == "") retornaDeputado1();
}


    




