$(document).ready(function () {
    configurarMascaras();
    configurarEventos();

    function configurarMascaras() {
        // Máscara de CPF/CNPJ
        $('#cpfCnpj').on('input', function () {
            aplicarMascaraCpfCnpj($(this).val());
        });

        // Bandeira no telefone e máscara
        const inputTelefone = document.querySelector("#telefone");
        const iti = window.intlTelInput(inputTelefone, {
            initialCountry: "br",
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });
        $('#telefone').inputmask('(99) 99999-9999', { placeholder: '_' });
    }

    function configurarEventos() {
        // Busca de endereço ao apertar Enter no campo CEP
        $('#cep').on('keypress', function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                buscarEnderecoPeloCep();
            }
        });
        $('#cadastrar').on('click', validarFormulario);
    }

    function buscarEnderecoPeloCep() {
        const cep = $('#cep').val().replace(/\D/g, '');
        if (cep.length === 8) {
            $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (dados) {
                if (!("erro" in dados)) {
                    $('#endereco').val(dados.logradouro || '');
                    $('#bairro').val(dados.bairro || '');
                    $('#cidade').val(dados.localidade || '');
                    $('#estado').val(dados.uf || '');
                } else {
                    alert("CEP não encontrado.");
                }
            }).fail(function () {
                alert("Erro ao buscar o CEP.");
            });
        } else {
            alert('Digite um CEP válido.');
        }
    }

    function validarFormulario() {
        const cpfCnpjValido = validarCpfCnpj($('#cpfCnpj').val());
        const telefoneValido = validarTelefone($('#telefone').val());

        if (cpfCnpjValido && telefoneValido) {
            alert('Cadastro realizado com sucesso!');
        } else {
            alert('Por favor, verifique os dados informados.');
        }
    }

    function aplicarMascaraCpfCnpj(valor) {
        valor = valor.replace(/\D/g, '');
        if (valor.length <= 11) {
            $('#cpfCnpj').inputmask('999.999.999-99');
        } else {
            $('#cpfCnpj').inputmask('99.999.999/9999-99');
        }
    }

    function validarTelefone(telefone) {
        const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
        return regexTelefone.test(telefone);
    }
});