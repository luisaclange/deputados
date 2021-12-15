//Variáveis
var campoResposta = document.getElementById('campoResposta');
var selectPartido = document.getElementById('partido');
var selectEstado = document.getElementById('estado');
var itemDeputado = document.getElementsByClassName('.item');
var nomeDeputado = document.getElementById('nomeDeputado');
var pesquisar = document.getElementById('pesquisar');
var relatorio = document.getElementById("relatorio");
var ano = document.getElementById('ano');
var url;
var jsonlistDeputado;
var jsonlistDados;
var jsonlistPartido;
var jsonlistDespesa1;
var jsonlistDespesa2;
var jsonlistDespesa3;
var jsonlistDespesa4;

function requestPartido() {
    //Sera utilizado uma conexao assincrona
    let request = new XMLHttpRequest();
    let urlAuthToken = 'https://dadosabertos.camara.leg.br/api/v2/partidos?itens=50&ordem=ASC&ordenarPor=sigla';
    request.open('GET', urlAuthToken, true); //Sincrona coloca 'false'
    request.setRequestHeader('Accept', 'application/json'); //solicita um json
    request.onload = function () { //retorna se tiver algum erro
        if (this.readyState === 4) { //se a conexao esta ativa
            if (request.status === 200) { //conectou com sucesso
                jsonlistPartido = request.response;
                menuPartido();
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

function requestDeputado() {
    //Sera utilizado uma conexao assincrona
    let request = new XMLHttpRequest();
    let check = 0;
    let urlAuthTokenaux = 'https://dadosabertos.camara.leg.br/api/v2/deputados?';
    if (selectPartido.options[selectPartido.selectedIndex].text != 'Selecione o partido') {
        urlAuthTokenaux += 'siglaPartido=' + selectPartido.options[selectPartido.selectedIndex].text;
        check++;
    }
    if (selectEstado.options[selectEstado.selectedIndex].text != 'UF') {
        if (check > 0) urlAuthTokenaux += '&';
        urlAuthTokenaux += 'siglaUf=' + selectEstado.options[selectEstado.selectedIndex].text;
        check++;
    }
    if (check > 0) urlAuthTokenaux += '&';
    urlAuthTokenaux += 'itens=500&dataInicio=' + ano.options[ano.selectedIndex].text + '-12-31&dataFim=' + (parseInt(ano.options[ano.selectedIndex].text) + 3) + '-01-01&ordem=ASC&ordenarPor=nome';
    request.open('GET', urlAuthTokenaux, true); //Sincrona coloca 'false'
    request.setRequestHeader('Accept', 'application/json'); //solicita um json
    request.onload = function (e) { //retorna se tiver algum erro
        if (this.readyState === 4) { //se a conexao esta ativa
            if (request.status === 200) { //conectou com sucesso
                jsonlistDeputado = request.response;
                if (nomeDeputado.value == '') {
                    retornaDeputado();
                } else {
                    retornaDeputadoNome(nomeDeputado.value);
                }
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
    url = 'https://dadosabertos.camara.leg.br/api/v2/deputados/' + jsonlistDeputado.dados[int].id;
    //urlAuthTokenaux += 'ano='+ano.options[ano.selectedIndex].text+'&ano='+(parseInt(ano.options[ano.selectedIndex].text) + 1)+'&ano='+(parseInt(ano.options[ano.selectedIndex].text) + 2)+'&ano='+(parseInt(ano.options[ano.selectedIndex].text) + 3)+'&itens=1000&ordem=ASC';
    request.open('GET', url, true); //Sincrona coloca 'false'
    request.setRequestHeader('Accept', 'application/json'); //solicita um json
    request.onload = function (e) { //retorna se tiver algum erro
        if (this.readyState === 4) { //se a conexao esta ativa
            if (request.status === 200) { //conectou com sucesso
                jsonlistDados = request.response;
                let ano_analise = parseInt(ano.options[ano.selectedIndex].text);
                requestDespesa1(ano_analise);
                requestDespesa2(ano_analise+1);
                requestDespesa3(ano_analise+2);
                requestDespesa4(ano_analise+3);
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

function requestDespesa1(ano_analise) {
    //Sera utilizado uma conexao assincrona
    let rel;
    let request = new XMLHttpRequest();
    let urlAuthTokenaux = url + '/despesas?ano=' + ano_analise + '&itens=1000&ordem=ASC';
    request.open('GET', urlAuthTokenaux, true); //Sincrona coloca 'false'
    request.setRequestHeader('Accept', 'application/json'); //solicita um json
    request.onload = function (e) { //retorna se tiver algum erro
        if (this.readyState === 4) { //se a conexao esta ativa
            if (request.status === 200) { //conectou com sucesso
                jsonlistDespesa1 = request.response;
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

function requestDespesa2(ano_analise) {
    //Sera utilizado uma conexao assincrona
    let rel;
    let request = new XMLHttpRequest();
    let urlAuthTokenaux = url + '/despesas?ano=' + ano_analise + '&itens=1000&ordem=ASC';
    request.open('GET', urlAuthTokenaux, true); //Sincrona coloca 'false'
    request.setRequestHeader('Accept', 'application/json'); //solicita um json
    request.onload = function (e) { //retorna se tiver algum erro
        if (this.readyState === 4) { //se a conexao esta ativa
            if (request.status === 200) { //conectou com sucesso
                jsonlistDespesa2 = request.response;
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

function requestDespesa3(ano_analise) {
    //Sera utilizado uma conexao assincrona
    let rel;
    let request = new XMLHttpRequest();
    let urlAuthTokenaux = url + '/despesas?ano=' + ano_analise + '&itens=1000&ordem=ASC';
    request.open('GET', urlAuthTokenaux, true); //Sincrona coloca 'false'
    request.setRequestHeader('Accept', 'application/json'); //solicita um json
    request.onload = function (e) { //retorna se tiver algum erro
        if (this.readyState === 4) { //se a conexao esta ativa
            if (request.status === 200) { //conectou com sucesso
                jsonlistDespesa3 = request.response;
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

function requestDespesa4(ano_analise) {
    //Sera utilizado uma conexao assincrona
    let rel;
    let request = new XMLHttpRequest();
    let urlAuthTokenaux = url + '/despesas?ano=' + ano_analise + '&itens=1000&ordem=ASC';
    request.open('GET', urlAuthTokenaux, true); //Sincrona coloca 'false'
    request.setRequestHeader('Accept', 'application/json'); //solicita um json
    request.onload = function (e) { //retorna se tiver algum erro
        if (this.readyState === 4) { //se a conexao esta ativa
            if (request.status === 200) { //conectou com sucesso
                jsonlistDespesa4 = request.response;
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

function retornaDeputado() {
    campoResposta.innerHTML = '';
    var check = true;
    for (let index = 0; index < jsonlistDeputado.dados.length; index++) {
        if (check === true) {
            campoResposta.innerHTML = '<hr>';
            check = false;
        }
        campoResposta.innerHTML += "<div class='item' onclick='dadosDeputado(" + index + ")' onmouseover='gambiarra()'><div class='subitem1'  >" + jsonlistDeputado.dados[index].siglaPartido + "</div><div class='subitem2'>" + jsonlistDeputado.dados[index].nome + "</div><div class='subitem3'>" + jsonlistDeputado.dados[index].siglaUf + "</div></div><hr>";
    }
}

function retornaDeputadoNome(texto) {
    campoResposta.innerHTML = ' ';
    var check = true;
    for (let index = 0; index < jsonlistDeputado.dados.length; index++) {
        if (jsonlistDeputado.dados[index].nome.toUpperCase().search(texto.toUpperCase()) !== -1) {
            if (check === true) {
                campoResposta.innerHTML = '<hr>';
                check = false;
            }
            campoResposta.innerHTML += "<div class='item' onclick='requestDados(" + index + ")' onmouseover='gambiarra()' ><div class='subitem1'  >" + jsonlistDeputado.dados[index].siglaPartido + "</div><div class='subitem2'>" + jsonlistDeputado.dados[index].nome + "</div><div class='subitem3'>" + jsonlistDeputado.dados[index].siglaUf + "</div></div><hr>";
        }
    }
}

function gambiarra(e) {
    e.target.previousSibling.previousSibling.style.backgroundColor = 'forestgreen';
}

function dadosDeputado(int) {
    let dados;
    requestDados(int);
    let rel;
    let total = 0;
    dados = "<hr style=\"background-color: grey;\"><div class='item2'><div class='subitem1'>" + jsonlistDeputado.dados[int].siglaPartido + "</div><div class='subitem2'>" + jsonlistDeputado.dados[int].nome + "</div><div class='subitem3'>" + jsonlistDeputado.dados[int].siglaUf + "</div></div><hr style=\"background-color: grey;\">";
    dados += '<div id="informacoes">';
    dados += '<div id="acima">';
    dados += '<div class="foto"><img src="' + jsonlistDeputado.dados[int].urlFoto + '" style="height:300px"></div>'
    dados += '<div class="texto">';
    dados += 'Nome parlamentar:   ' + jsonlistDeputado.dados[int].nome + '<br>';
    dados += 'Partido: ' + jsonlistDeputado.dados[int].siglaPartido + '<br>';
    dados += 'Estado: ' + jsonlistDeputado.dados[int].siglaUf + '<br>';
    dados += 'Email: ' + jsonlistDeputado.dados[int].email + '<br><br>';
    relatorio.style.display = 'none';
    dados += '<div class="botoes">';
    dados += '<button id="voltar" onclick = "voltar()">Voltar</button>';
    dados += '<button id="mais" onclick = "mostrarmais()">Mostrar mais resultados</button>';
    dados += '</div></div></div></div>';
    campoResposta.innerHTML = dados;
}

function mostrarmais() {
    let dados = '';
    let rel;
    let total = 0;
    dados = "<hr style=\"background-color: grey;\"><div class='item2'>Mostrar mais resultados</div><hr style=\"background-color: grey;\">";
    rel = "<hr style=\"background-color: grey;\"><div class='item2'>Relatório de Gastos</div><hr style=\"background-color: grey;\">";
    rel += '<div style="display: flex; align-items: center; flex-direction: column;">';
    rel += '<table class="tabela"><tr style="background-image: linear-gradient(to right, forestgreen, chartreuse);">';
    rel += '<div class="relatorio_cabecalho"><th style="width:100px">Data</th><th>Tipo de Despesa</th><th>Nome do Fornecedor</th><th>Valor do documento</th></div></tr>';
    for (let index = 0; index < jsonlistDespesa1.dados.length; index++) {
        total += jsonlistDespesa1.dados[index].valorDocumento;
        rel += '<tr><td >' + jsonlistDespesa1.dados[index].dataDocumento + '</td>';
        rel += '<td>' + jsonlistDespesa1.dados[index].tipoDespesa + '</td>';
        rel += '<td>' + jsonlistDespesa1.dados[index].nomeFornecedor + '</td>';
        rel += '<td> R$' + jsonlistDespesa1.dados[index].valorDocumento.toFixed(2) + '</td></tr>';
    }
    for (let index = 0; index < jsonlistDespesa2.dados.length; index++) {
        total += jsonlistDespesa2.dados[index].valorDocumento;
        rel += '<tr><td >' + jsonlistDespesa2.dados[index].dataDocumento + '</td>';
        rel += '<td>' + jsonlistDespesa2.dados[index].tipoDespesa + '</td>';
        rel += '<td>' + jsonlistDespesa2.dados[index].nomeFornecedor + '</td>';
        rel += '<td> R$' + jsonlistDespesa2.dados[index].valorDocumento.toFixed(2) + '</td></tr>';
    }
    for (let index = 0; index < jsonlistDespesa3.dados.length; index++) {
        total += jsonlistDespesa3.dados[index].valorDocumento;
        rel += '<tr><td >' + jsonlistDespesa3.dados[index].dataDocumento + '</td>';
        rel += '<td>' + jsonlistDespesa3.dados[index].tipoDespesa + '</td>';
        rel += '<td>' + jsonlistDespesa3.dados[index].nomeFornecedor + '</td>';
        rel += '<td> R$' + jsonlistDespesa3.dados[index].valorDocumento.toFixed(2) + '</td></tr>';
    }
    for (let index = 0; index < jsonlistDespesa4.dados.length; index++) {
        total += jsonlistDespesa4.dados[index].valorDocumento;
        rel += '<tr><td >' + jsonlistDespesa4.dados[index].dataDocumento + '</td>';
        rel += '<td>' + jsonlistDespesa4.dados[index].tipoDespesa + '</td>';
        rel += '<td>' + jsonlistDespesa4.dados[index].nomeFornecedor + '</td>';
        rel += '<td> R$' + jsonlistDespesa4.dados[index].valorDocumento.toFixed(2) + '</td></tr>';
    }
    rel += '</table></div>';
    relatorio.style.display = 'none';
    relatorio.innerHTML = rel;
    dados += '<div class="maisinfo">';
    dados += '<div>';    
    dados += 'Nome social:   ' + jsonlistDados.dados.nomeCivil + '<br>';
    dados += 'CPF: ' +jsonlistDados.dados.cpf + '<br>';
    dados += 'Data de nascimento: ' +jsonlistDados.dados.dataNascimento + '<br>';
    dados += 'Data de falecimento: ' +jsonlistDados.dados.dataFalecimento + '<br>';
    dados += 'Escolaridade: ' +jsonlistDados.dados.escolaridade + '<br>';
    dados += 'Municipio de nascimento: ' +jsonlistDados.dados.municipioNascimento + '<br>';
    dados += 'Estado de nascimento: ' +jsonlistDados.dados.ufNascimento + '<br>';
    dados += 'Sexo: ' +jsonlistDados.dados.sexo + '<br>';
    dados += '</div><div>';
    dados += 'Situação: ' + jsonlistDados.dados.ultimoStatus.situacao + '<br>';
    dados += 'Condição eleitoral: ' +jsonlistDados.dados.ultimoStatus.condicaoEleitoral + '<br>';
    dados += 'Data: ' +jsonlistDados.dados.ultimoStatus.data + '<br>';
    dados += 'Descrição do status: ' +jsonlistDados.dados.ultimoStatus.descricaoStatus + '<br>';
    dados += 'Mandato: ' +ano.options[ano.selectedIndex].text+ ' - '+(parseInt(ano.options[ano.selectedIndex].text)+3)+ '<br>';
    dados += 'Gastos: R$ ' + total.toFixed(2) + '<br>';
    dados += '<div class="botoes">';
    dados += '<button id="relatorio" onclick="mostrarRelatorio()" style="width:300px">Gerar Relatório de Gastos</button></div></div></div>';
    campoResposta.innerHTML += dados;
}

function mostrarRelatorio() {
    relatorio.style.display = 'flex';
}

function voltar() {
    relatorio.innerHTML = '';
    requestDeputado();
}

/*function gerarRelatorio() {
    var dados = '';
    for (let index = 0; index < jsonlistDespesa.dados.length; index++) {
        dados += '<tr><td>' + jsonlistDespesa.dados[index].dataDocumento + '</td>';
        dados += '<td>' + jsonlistDespesa.dados[index].tipoDespesa + '</td>';
        dados += '<td>' + jsonlistDespesa.dados[index].nomeFornecedor + '</td>';
        dados += '<td> R$' + jsonlistDespesa.dados[index].valorDocumento.toFixed(2) + '</td></tr>';
    }
    relatorio_corpo.innerHTML += dados;
}*/


function menuAno() {
    for (let index = 0; (2019 - index) > 1945; index++) {
        ano.innerHTML += '<option value="' + (index + 1) + '">' + (2019 - (index * 4)) + '</option>';
    }
}

function menuPartido() {
    selectPartido.innerHTML = '';
    selectPartido.innerHTML += '<option value="1">Selecione o partido</option>';
    for (let index = 0; index < jsonlistPartido.dados.length; index++) {
        selectPartido.innerHTML += '<option value="' + (index + 2) + '">' + jsonlistPartido.dados[index].sigla + '</option>';
    }
}

function menuEstado() {
    selectEstado.innerHTML = '';
    selectEstado.innerHTML += '<option value="1">UF</option>';
    selectEstado.innerHTML += '<option value="2">AC</option>';
    selectEstado.innerHTML += '<option value="3">AL</option>';
    selectEstado.innerHTML += '<option value="4">AP</option>';
    selectEstado.innerHTML += '<option value="5">AM</option>';
    selectEstado.innerHTML += '<option value="6">BA</option>';
    selectEstado.innerHTML += '<option value="7">CE</option>';
    selectEstado.innerHTML += '<option value="8">DF</option>';
    selectEstado.innerHTML += '<option value="9">ES</option>';
    selectEstado.innerHTML += '<option value="10">GO</option>';
    selectEstado.innerHTML += '<option value="11">MA</option>';
    selectEstado.innerHTML += '<option value="12">MT</option>';
    selectEstado.innerHTML += '<option value="13">MS</option>';
    selectEstado.innerHTML += '<option value="14">MG</option>';
    selectEstado.innerHTML += '<option value="15">PA</option>';
    selectEstado.innerHTML += '<option value="16">PB</option>';
    selectEstado.innerHTML += '<option value="17">PR</option>';
    selectEstado.innerHTML += '<option value="18">PE</option>';
    selectEstado.innerHTML += '<option value="19">PI</option>';
    selectEstado.innerHTML += '<option value="20">RJ</option>';
    selectEstado.innerHTML += '<option value="21">RN</option>';
    selectEstado.innerHTML += '<option value="22">RS</option>';
    selectEstado.innerHTML += '<option value="23">RO</option>';
    selectEstado.innerHTML += '<option value="24">RR</option>';
    selectEstado.innerHTML += '<option value="25">SC</option>';
    selectEstado.innerHTML += '<option value="26">SP</option>';
    selectEstado.innerHTML += '<option value="27">SE</option>';
    selectEstado.innerHTML += '<option value="28">TO</option>';
}

function inicio() {
    var texto = "<div class='inicio'>";
    texto += "<h1>Bem vindo à consulta de deputados</h1>";
    texto += "<p>Aqui você encontra dados sobre os seus candidatos.</p>";
    texto += "<p>Selecione os filtros de pesquisa e encontre o que deseja!</p>";
    texto += "</div>";
    campoResposta.innerHTML = texto;
}

ano.onchange = function () {
    relatorio.style.display = 'none';
    requestDeputado();
}
selectPartido.onchange = function () {
    relatorio.style.display = 'none';
    requestDeputado();
}

selectEstado.onchange = function () {
    relatorio.style.display = 'none';
    requestDeputado();
}

nomeDeputado.onkeyup = function (e) {
    relatorio.style.display = 'none';
    if (e.keyCode == 13 || e.which == 13) {
        requestDeputado();
    }
}

nomeDeputado.onblur = function () {
    relatorio.style.display = 'none';
    requestDeputado();
}

pesquisar.onclick = function () {
    relatorio.style.display = 'none';
    requestDeputado();
}

window.onload = function () {
    relatorio.style.display = 'none';
    menuAno();
    requestPartido();
    menuEstado();
    inicio();
}





