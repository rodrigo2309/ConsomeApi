export const name = "rodrigo";
export class app {
    mostrarnatela() {
        alert("acabou");
    }
    LoadTable(nomeTabela) {
        $("#" + nomeTabela).DataTable().clear();
        $("#" + nomeTabela).DataTable().destroy();
        let table = this.GetColumnsDataTableDefinition();
        if (nomeTabela == "tblNoApi") {
            table = this.GetColumnsDataTableDefinitionNew();
        }
        this.AjaxPost(table, nomeTabela);
    }
    ConverteZip() {
        $.ajax({
            url: "Home/ConverteZip", success: (foi) => {
                console.log(foi);
            }
        });
    }
    AjaxPost(tabela, nomeTabela) {
        let url = "Home/CustomerWithAPI";
        if (nomeTabela == "tblNoApi") {
            url = "Home/UserWithoutApi";
        }
        $.ajax({
            url: url,
            contentType: 'application/json',
            success: (foi) => {
                this.OnSuccessRequest(foi, tabela, nomeTabela);
            },
        });
    }
    OnSuccessRequest(success, tabela, nomeTabela) {
        if (success == "404") {
            alert("Api desligada");
        }
        else {
            $("#" + nomeTabela).DataTable({
                data: success.data,
                columns: tabela
            });
        }
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
    abrirmodal($idPersona, evento) {
        this.Evento = evento;
        $("#tblNoApi").DataTable().clear();
        $("#tblNoApi").DataTable().destroy();
        $("#exampleModal").modal("show");
    }
    fecharmodal($idPersona) {
        $("#exampleModal").modal("hide");
        this.Evento();
    }
    eliminar($idPersona) {
        alert("eliminar:" + $idPersona);
    }
}
//# sourceMappingURL=create.js.map