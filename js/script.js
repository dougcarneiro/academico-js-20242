const pessoas = [
    {
        "nome": "Mel",
        "idade": 15,
        "cpf": 1234567890
     },
    {
        "nome": "Jujuba",
        "idade": 10,
        "cpf": 2345678901
    },
     {
        "nome": "Eliane",
        "idade": 26,
        "cpf": 3456789012
     }
];

const tablePessoasElement = document.createElement("table");
const tablePessoasHeaderRow = document.createElement("tr");

const tablePessoasNomeRowElement = document.createElement("th");
tablePessoasNomeRowElement.textContent = "Nome";
const tablePessoasIdadeRowElement = document.createElement("th");
tablePessoasIdadeRowElement.textContent = "Idade";
const tablePessoasCpfRowElement = document.createElement("th");
tablePessoasCpfRowElement.textContent = "CPF";

const tablePessoasRemoverRowElement = document.createElement("th");

tablePessoasHeaderRow.appendChild(tablePessoasNomeRowElement);
tablePessoasHeaderRow.appendChild(tablePessoasIdadeRowElement);
tablePessoasHeaderRow.appendChild(tablePessoasCpfRowElement);

tablePessoasHeaderRow.appendChild(tablePessoasRemoverRowElement);


tablePessoasElement.appendChild(tablePessoasHeaderRow);

document.body.appendChild(tablePessoasElement);

for (let pessoa of pessoas) {
    inserirPessoaNaTabela(pessoa);
}

function inserirPessoaNaTabela(pessoa) {
    const pessoaRowElement = document.createElement("tr");

    const pessoaNomeElement = document.createElement("th");
    pessoaNomeElement.textContent = pessoa.nome;
    editEventListener(pessoaNomeElement);

    const pessoaIdadeElement = document.createElement("th");
    pessoaIdadeElement.textContent = pessoa.idade;
    editEventListener(pessoaIdadeElement, "age");

    const pessoaCpfElement = document.createElement("th");
    pessoaCpfElement.textContent = pessoa.cpf;
    editEventListener(pessoaCpfElement, "cpf");

    const botaoRemoverElement = document.createElement('button');
    botaoRemoverElement.textContent = 'X';
    botaoRemoverElement.addEventListener('click', (event) => {
        pessoaRowElement.remove();
    })

    pessoaRowElement.appendChild(pessoaNomeElement);
    pessoaRowElement.appendChild(pessoaIdadeElement);
    pessoaRowElement.appendChild(pessoaCpfElement);
    pessoaRowElement.appendChild(botaoRemoverElement);

    tablePessoasElement.appendChild(pessoaRowElement);
}

function inserirPessoa() {
    if (document.querySelector('#form-error-msg')) {
        document.querySelector('#form-error-msg').remove();
    }
    const inputNomeElement = document.querySelector('#nome');
    const inputIdadeElement = document.querySelector('#idade');
    const inputCpfElement = document.querySelector('#cpf');

    const pessoa = {
        "nome": inputNomeElement.value,
        "idade": inputIdadeElement.value,
        "cpf": inputCpfElement.value
    }

    if (!pessoa.nome || !pessoa.idade || !pessoa.cpf) {
        const errorMessage = document.createElement("span");
        errorMessage.textContent = "Por favor, preencha todos os campos.";
        errorMessage.classList.add("error-message");
        errorMessage.id = "form-error-msg";
        document.querySelector('#input-form').insertBefore(
                errorMessage, document.querySelector("#button-div"));
        return;
    }

    inserirPessoaNaTabela(pessoa);

    inputNomeElement.value = "";
    inputIdadeElement.value = "";
    inputCpfElement.value = "";
}

function editEventListener(element, field="name") {
    element.addEventListener('click', (event) => {
        if (element.textContent !== "") {
            const input = document.createElement("input");
            input.maxLength = field === "name" ? 30 : (field === "cpf" ? 11 : 3);
            if (field !== "name") {
                insertOnlyNumber(input);
            } else {
                trimOnBlur(input);
            }
            input.value = element.textContent;
            const oldContent = element.textContent;
            element.textContent = "";
            element.appendChild(input);
            input.addEventListener('blur', (event) => {
                element.textContent = (input.value !== "") ? input.value : oldContent
                input.remove();
            })
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    element.textContent = (input.value !== "") ? input.value : oldContent
                    input.remove();
                }
            })
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    element.textContent = oldContent;
                    input.remove();
                }
            })
        }
    })
}


function insertOnlyNumber(element) {
    element.addEventListener('input', (event) => {
        const valor = event.target.value;
        event.target.value = valor.replace(/[^0-9]/g, '');
    })
}

function trimOnBlur(element) {
    element.addEventListener('blur', (event) => {
        element.value = element.value.trim();
    })
}


insertOnlyNumber(document.querySelector("#idade"));
insertOnlyNumber(document.querySelector("#cpf"));
trimOnBlur(document.querySelector("#nome"));