export const name = "rodrigo";
export class app {
    mostrarnatela() {
        alert("acabou");
    }
    inicio(nomeTabela) {
        $("#" + nomeTabela).DataTable().clear();
        $("#" + nomeTabela).DataTable().destroy();
        this.AjaxPost(this.GetColumnsDataTableDefinition(), nomeTabela);
    }
    inicioTeste(nomeTabela) {
        $('#' + nomeTabela).DataTable().clear();
        $("#" + nomeTabela).DataTable().destroy();
        this.AjaxPostTeste(this.GetColumnsDataTableDefinitionNew(), nomeTabela);
    }
    ConverteZip() {
        $.ajax({
            url: "Home/ConverteZip", success: (foi) => {
                console.log(foi);
            }
        });
    }
    AjaxPost(tabela, nomeTabela) {
        $.ajax({
            url: "Home/Customer",
            contentType: 'application/json',
            success: (foi) => {
                this.OnSuccessRequest(foi, tabela, nomeTabela);
            },
        });
    }
    AjaxPostTeste(tabela, nomeTabela) {
        $.ajax({
            url: "Home/Teste",
            contentType: 'application/json',
            success: (foi) => {
                this.OnSuccessRequestTeste(foi, tabela, nomeTabela);
            },
        });
    }
    OnSuccessRequest(success, tabela, nomeTabela) {
        $("#" + nomeTabela).DataTable({
            data: success.data,
            columns: tabela
        });
    }
    OnSuccessRequestTeste(success, tabela, nomeTabela) {
        $("#" + nomeTabela).DataTable({
            data: success.data,
            columns: tabela
        });
    }
    GetColumnsDataTableDefinition() {
        return [
            { targets: 0, data: "id", visible: true },
            { targets: 1, data: "name" },
            { targets: 2, data: "enable" },
        ];
    }
    GetColumnsDataTableDefinitionNew() {
        return [
            { targets: 0, data: "id", visible: true },
            { targets: 1, data: "name" },
            { targets: 2, data: "enable" },
            {
                data: "id",
                targets: 3,
                render: (data) => {
                    //'<a href="#" class="sendWapPush" >Enviar</a>';
                    data = "<button id='abrir' class='sendWapPush btn btn-primary btn-sm' type='button' onclick='abrirmodal(" + data + ")'><i class='fas fa-pen'></i></button>" +
                        "<button class='sendWapPush btn btn-danger btn-sm ml-2' type='button' onclick='eliminar(" + data + ")'><i class='fas fa-trash'></i></button>";
                    return data;
                },
                "orderable": false, "searchabler": false, "width": "150px"
            }
        ];
    }
    abrirmodal($idPersona) {
        alert($idPersona);
        $("#exampleModal").modal("show");
    }
    eliminar($idPersona) {
        alert("eliminar:" + $idPersona);
    }
}
//# sourceMappingURL=create.js.map