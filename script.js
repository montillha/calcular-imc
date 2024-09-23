function adicionarPessoa() {
    let nome = document.querySelector("input[name='nome']");
    let peso = document.querySelector("input[name='peso']");
    let altura = document.querySelector("input[name='altura']");

    let pesoFormatado = parseFloat(peso.value).toFixed(2);
    let alturaFormatada = parseFloat(altura.value).toFixed(2);

    if (alturaFormatada <= 0 || pesoFormatado <= 0 ||nome.value=="") {
        alertaModal("Confira se o nome, peso e altura são válidos!!!");
    } else {
        let tbody = document.querySelector("tbody");
        let tr = document.createElement("tr");

        let tdNome = document.createElement("td");
        tdNome.innerText = nome.value;
        tr.appendChild(tdNome);

        let tdPeso = document.createElement("td");

        tdPeso.innerText = pesoFormatado;
        tr.appendChild(tdPeso);

        let tdAltura = document.createElement("td");
    
        tdAltura.innerText = alturaFormatada;
        tr.appendChild(tdAltura);

        let tdIMC = document.createElement("td");
        let IMC = (pesoFormatado / (alturaFormatada * alturaFormatada)).toFixed(2);
        tdIMC.innerText = IMC;
        tr.appendChild(tdIMC);

        let tdStatus = document.createElement("td");
        let status = statusIMC(IMC);
        tdStatus.innerText = status;
        tr.appendChild(tdStatus);

        let tdopcoes = document.createElement("td");

        //btn +Peso
        let btnAumentar = document.createElement("button");
        btnAumentar.innerText = "+Peso";
        btnAumentar.classList.add("btn", "btn-success");
        btnAumentar.addEventListener("click", aumentarPeso);

        //btn -Peso
        let btnDiminuir = document.createElement("button");
        btnDiminuir.innerText = "-Peso";
        btnDiminuir.classList.add("btn", "btn-warning");
        btnDiminuir.addEventListener("click", diminuirPeso);

        //btn Remover
        let btnRemover = document.createElement("button");
        btnRemover.innerText = "Remover";
        btnRemover.classList.add("btn", "btn-danger");
        btnRemover.addEventListener("click", removerPessoa);

        tdopcoes.appendChild(btnAumentar);
        tdopcoes.appendChild(btnDiminuir);
        tdopcoes.appendChild(btnRemover);

        tr.appendChild(tdopcoes);
        tbody.append(tr);

    }
    nome.value="";
    peso.value=0;
    altura.value=0;
}

function aumentarPeso(e) {
    let btn = e.target;
    let tdBtn = btn.parentElement;
    let tr = tdBtn.parentElement;
    let tds = tr.querySelectorAll("td");

    //arrumando peso
    let tdPeso = tds[1];
    let novoPeso = (parseFloat(tdPeso.innerText) + 0.5).toFixed(2);
    tdPeso.innerText = novoPeso;

    //arrumando IMC
    let altura = parseFloat(tds[2].innerText);
    let tdIMC = tds[3];
    let novoIMC = (novoPeso / (altura * altura)).toFixed(2);
    tdIMC.innerText = novoIMC;

    //arrrumando Status:
    let tdStatus = tds[4];
    let status = statusIMC(novoIMC);
    tdStatus.innerText = status;

}

function diminuirPeso(e) {

    let btn = e.target;
    let tdBtn = btn.parentElement;
    let tr = tdBtn.parentElement;
    let tds = tr.querySelectorAll("td");

    //arrumando peso
    let tdPeso = tds[1];
    let novoPeso = (parseFloat(tdPeso.innerText) - 0.5).toFixed(2);
    if (novoPeso < 0) {
        alertaModal("Peso não pode ser menor que 0!!!");
    } else {

        //arrumando peso
        tdPeso.innerText = novoPeso;

        //arrumando IMC
        let altura = parseFloat(tds[2].innerText);
        let tdIMC = tds[3];
        let novoIMC = (novoPeso / (altura * altura)).toFixed(2);
        tdIMC.innerText = novoIMC;
        //arrrumando Status:
        let tdStatus = tds[4];
        let status = statusIMC(novoIMC);
        tdStatus.innerText = status;
    }

}

function removerPessoa(e) {
    let btn = e.target;
    let tdBtn = btn.parentElement;
    let tr = tdBtn.parentElement;
    tr.remove();
}
function removerMaiorIMC() {
    let trs = document.querySelectorAll("tr");
    if (trs.length > 1) {

        let maior = trs[1]; 
        let maiorIMC = parseFloat(maior.querySelectorAll("td")[3].innerText);
        for (let i = 1; i < trs.length; i++) { 
            let tds = trs[i].querySelectorAll("td");
            let IMC = parseFloat(tds[3].innerText);

            if (IMC > maiorIMC) {
                maior = trs[i];
                maiorIMC = IMC;
            }
        }
   
        maior.remove(); 

    }else{
        alertaModal("Não há pessoas para remover!")
    }

}
function removerMenorIMC() {
    let trs = document.querySelectorAll("tr");
    if (trs.length > 1) {
        let menor = trs[1]; 
        let menorIMC = parseFloat(menor.querySelectorAll("td")[3].innerText);
        for (let i = 1; i < trs.length; i++) { 
            let tds = trs[i].querySelectorAll("td");
            let IMC = parseFloat(tds[3].innerText);

            if (IMC < menorIMC) {
                menor = trs[i];
                menorIMC = IMC;
            }
        }
        menor.remove(); 

    }else{
        alertaModal("Não há pessoas para remover!")
    }

}
function statusIMC(imc) {
    if (imc < 18.5) {
        return "Magreza";

    } else if ( imc <= 24.9) {
        return "Saudável";
    } else if (imc <= 29.9) {
        return "Sobrepeso";
    } else if ( imc <= 34.9) {
        return "Obesidade I";
    } else if (imc <= 39.9) {
        return "Obesidade II";
    } else {
        return "Obesidade III";
    }


}
function alertaModal(mensagem) {
    let msgModal = new bootstrap.Modal(document.querySelector('#messageModal'));
    document.querySelector('#messageModalP').innerText = mensagem;
    msgModal.show();
}

var btnEnviar = document.querySelector("#AdicionarPessoa");
btnEnviar.addEventListener("click", function(event) {
    event.preventDefault();
    adicionarPessoa();
 
});

var btnRemoverMaiorIMC = document.querySelector("#RemoverMaiorIMC");
btnRemoverMaiorIMC.addEventListener("click", removerMaiorIMC);

var btnRemoverMenorIMC = document.querySelector("#RemoverMenorIMC");
btnRemoverMenorIMC.addEventListener("click", removerMenorIMC);



