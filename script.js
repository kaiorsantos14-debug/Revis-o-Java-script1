var alunos = [], estoque = [], tarefas = [], frequencia = [];
function guardar(nome, dados) {
localStorage.setItem(nome, JSON.stringify(dados));
}
function salvar() {
guardar("alunos", alunos);
guardar("estoque", estoque);
guardar("tarefas", tarefas);
guardar("frequencia", frequencia);
}
if (localStorage.getItem("alunos")) alunos = JSON.parse(localStorage.getItem("alunos"));
if (localStorage.getItem("estoque")) estoque = JSON.parse(localStorage.getItem("estoque"));
if (localStorage.getItem("tarefas")) tarefas = JSON.parse(localStorage.getItem("tarefas"));
if (localStorage.getItem("frequencia")) frequencia = JSON.parse(localStorage.getItem("frequencia"));
function calcularMedia() {
var media = (Number(nota1.value) + Number(nota2.value) + Number(nota3.value)) / 3;
resultadoMedia.innerHTML = nomeNota.value + " - " + media.toFixed(1) + (media >= 7 ? " Aprovado" : media >= 5 ? " Recuperação" : " Reprovado");
}
function tabuada() {
resultadoTabuada.innerHTML = "";
for (var numeroAtual = 1; numeroAtual <= 10; numeroAtual++) resultadoTabuada.innerHTML += numero.value + " x " + numeroAtual + " = " + numero.value * numeroAtual + "<br>";
}
function limparTabuada() { resultadoTabuada.innerHTML = ""; }
function calcularDesconto() {
var total = preco.value * quantidade.value;
var descontoFinal = total * desconto.value / 100;
resultadoDesconto.innerHTML = produto.value + "<br>Desconto: R$ " + descontoFinal.toFixed(2) + "<br>Total: R$ " + (total - descontoFinal).toFixed(2);
}
function cadastrarAluno() {
var repetido = false;
alunos.forEach(function(aluno) { if (aluno.matricula == matriculaAluno.value) repetido = true; });
if (repetido) return alert("Matrícula já existe");
alunos.push({nome:nomeAluno.value, idade:idadeAluno.value, curso:cursoAluno.value, matricula:matriculaAluno.value, nota:Number(notaAluno.value), frequencia:Number(freqAluno.value)});
salvar(); mostrarAlunos(); atualizarSelects(); resumo();
}
function mostrarAlunos() {
listaAlunos.innerHTML = "";
alunos.forEach(function(aluno, numero) { listaAlunos.innerHTML += "<p>" + aluno.nome + " - " + aluno.curso + " <button onclick='apagarAluno(" + numero + ")'>Apagar</button></p>"; });
}
function apagarAluno(numero) {
alunos.splice(numero, 1); salvar(); mostrarAlunos(); atualizarSelects(); resumo();
}
function pesquisarAluno() {
resultadoPesquisa.innerHTML = "";
alunos.forEach(function(aluno) {
if (aluno.nome.includes(pesquisa.value)) resultadoPesquisa.innerHTML += "<p>" + aluno.nome + "</p>";
else if (aluno.curso.includes(pesquisa.value)) resultadoPesquisa.innerHTML += "<p>" + aluno.nome + "</p>";
});
if (resultadoPesquisa.innerHTML == "") resultadoPesquisa.innerHTML = "Não encontrado";
}
function cadastrarEstoque() {
estoque.push({nome:nomeProduto.value, codigo:codigoProduto.value, qtd:Number(qtdProduto.value), preco:Number(valorProduto.value)});
salvar(); mostrarEstoque(); atualizarSelects();
}
function mostrarEstoque() {
listaEstoque.innerHTML = ""; var total = 0;
estoque.forEach(function(produto) { listaEstoque.innerHTML += "<p>" + produto.nome + " - " + produto.qtd + "</p>"; total += produto.qtd * produto.preco; });
valorEstoque.innerHTML = "Total: R$ " + total.toFixed(2);
}
function entradaEstoque() {
var produto = estoque[produtoEstoque.value];
if (produto) { produto.qtd += Number(movimento.value); salvar(); mostrarEstoque(); }
}
function saidaEstoque() {
var produto = estoque[produtoEstoque.value];
if (produto) { if (movimento.value <= produto.qtd) { produto.qtd -= Number(movimento.value); salvar(); mostrarEstoque(); } else alert("Quantidade inválida"); }
}
function atualizarSelects() {
alunoFrequencia.innerHTML = ""; produtoEstoque.innerHTML = ""; filtroCurso.innerHTML = "<option>Todos</option>";
alunos.forEach(function(aluno) { alunoFrequencia.innerHTML += "<option value='" + aluno.matricula + "'>" + aluno.nome + "</option>"; filtroCurso.innerHTML += "<option>" + aluno.curso + "</option>"; });
estoque.forEach(function(produto, numero) { produtoEstoque.innerHTML += "<option value='" + numero + "'>" + produto.nome + "</option>"; });
}
function registrarFrequencia() {
frequencia.push({matricula:alunoFrequencia.value, data:dataFrequencia.value, tipo:tipoFrequencia.value}); salvar(); mostrarFrequencia();
}
function mostrarFrequencia() {
listaFrequencia.innerHTML = "";
frequencia.forEach(function(falta) { listaFrequencia.innerHTML += "<p>" + falta.matricula + " - " + falta.data + " - " + falta.tipo + "</p>"; });
}
function adicionarTarefa() {
tarefas.push({titulo:tituloTarefa.value, descricao:descricaoTarefa.value, prioridade:prioridadeTarefa.value, data:dataTarefa.value, status:"Pendente"});
salvar(); mostrarTarefas();
}
function mostrarTarefas() {
listaTarefas.innerHTML = "";
tarefas.forEach(function(tarefa, numero) {
if (filtroTarefa.value == "Todas") listaTarefas.innerHTML += "<p>" + tarefa.titulo + " - " + tarefa.status + " <button onclick='concluirTarefa(" + numero + ")'>Concluir</button> <button onclick='apagarTarefa(" + numero + ")'>Apagar</button></p>";
else if (filtroTarefa.value == tarefa.status) listaTarefas.innerHTML += "<p>" + tarefa.titulo + " - " + tarefa.status + " <button onclick='concluirTarefa(" + numero + ")'>Concluir</button> <button onclick='apagarTarefa(" + numero + ")'>Apagar</button></p>";
});
infoTarefas.innerHTML = "Total: " + tarefas.length;
}
function concluirTarefa(numero) { tarefas[numero].status = "Concluída"; salvar(); mostrarTarefas(); }
function apagarTarefa(numero) { tarefas.splice(numero, 1); salvar(); mostrarTarefas(); }
function resumo() {
var aprovados = 0, recuperacao = 0, reprovados = 0;
alunos.forEach(function(aluno) {
if (filtroCurso.value == "Todos") {
if (aluno.nota >= 7) aprovados++;
else if (aluno.nota >= 5) recuperacao++;
else reprovados++;
} else if (aluno.curso == filtroCurso.value) {
if (aluno.nota >= 7) aprovados++;
else if (aluno.nota >= 5) recuperacao++;
else reprovados++;
}
});
painel.innerHTML = "Aprovados: " + aprovados + "<br>Recuperação: " + recuperacao + "<br>Reprovados: " + reprovados;
}
function imprimir() { print(); }
mostrarAlunos(); mostrarEstoque(); mostrarFrequencia(); mostrarTarefas(); atualizarSelects(); resumo();