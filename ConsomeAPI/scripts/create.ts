export const name = "rodrigo";

export class app {
    private Evento: any;

    mostrarnatela() {
        alert("acabou");
    }

    public LoadTable(nomeTabela:any) {
        $("#" + nomeTabela).DataTable().clear();
        $("#" + nomeTabela).DataTable().destroy();

        let table = this.GetColumnsDataTableDefinition();

        if (nomeTabela == "tblNoApi") {
            table = this.GetColumnsDataTableDefinitionNew();
        }

        this.AjaxPost(table, nomeTabela); 
    }

    public ConverteZip() {
        $.ajax({
            url: "Home/ConverteZip", success: (foi) => {
                console.log(foi);
            }
        });
    }

    private AjaxPost(tabela: any, nomeTabela: any) {
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

    private OnSuccessRequest(success?: any, tabela?: any, nomeTabela?: any): any {
        if (success == "404") {
            alert("Api desligada");
        } else {
            $("#" + nomeTabela).DataTable({
                data: success.data,
                columns: tabela
            });
        }

    }

    protected GetColumnsDataTableDefinition(): any[] {
        return [
            { targets: 0, data: "id", visible: true },
            { targets: 1, data: "name" },
            { targets: 2, data: "enable" },
        ];
    }

    protected GetColumnsDataTableDefinitionNew(): any[] {
        return [
            { targets: 0, data: "id", visible: true },
            { targets: 1, data: "name" },
            { targets: 2, data: "enable" },
            {
                data: "id",
                targets: 3,
                render: (data: any) => {
                    //'<a href="#" class="sendWapPush" >Enviar</a>';
                    data = "<button id='abrir' class='sendWapPush btn btn-primary btn-sm' type='button' onclick='abrirmodal(" + data + ")'><i class='fas fa-pen'></i></button>" +
                        "<button class='sendWapPush btn btn-danger btn-sm ml-2' type='button' onclick='eliminar(" + data + ")'><i class='fas fa-trash'></i></button>";

                    return data;
                },
                "orderable": false, "searchabler": false, "width": "150px"
               
            }
        ];
    }

    public abrirmodal($idPersona: any,evento: any) {
        this.Evento = evento;
        $("#tblNoApi").DataTable().clear();
        $("#tblNoApi").DataTable().destroy();
        $("#exampleModal").modal("show");
    }

    public fecharmodal($idPersona: any) {
        $("#exampleModal").modal("hide");
        this.Evento();
    }

    public eliminar($idPersona: any) {
        alert("eliminar:" + $idPersona)
    }


}
