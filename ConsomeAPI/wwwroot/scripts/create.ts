export const name = "rodrigo";

export class app {
    mostrarnatela() {
        alert("acabou");
    }

    public inicio(nomeTabela:any) {
        $("#" + nomeTabela).DataTable().clear();
        $("#" + nomeTabela).DataTable().destroy();

        this.AjaxPost(this.GetColumnsDataTableDefinition(), nomeTabela); 
    }

    public inicioTeste(nomeTabela: any) {
        $('#' + nomeTabela).DataTable().clear();
        $("#" + nomeTabela).DataTable().destroy();

        this.AjaxPostTeste(this.GetColumnsDataTableDefinitionNew(), nomeTabela);
    }

    public ConverteZip() {
        $.ajax({
            url: "Home/ConverteZip", success: (foi) => {
                console.log(foi);
            }
        });
    }

    private AjaxPost(tabela: any, nomeTabela: any) {
        $.ajax({
            url: "Home/Customer",
            contentType: 'application/json',
            success: (foi) => {
                this.OnSuccessRequest(foi, tabela, nomeTabela);
            },
        });
    }

    private AjaxPostTeste(tabela: any, nomeTabela: any) {
        $.ajax({
            url: "Home/Teste",
            contentType: 'application/json',
            success: (foi) => {
                this.OnSuccessRequestTeste(foi, tabela, nomeTabela);
            },
        });
    }

    private OnSuccessRequest(success?: any, tabela?: any, nomeTabela?: any): any {
        $("#" + nomeTabela).DataTable({
            data: success.data,
            columns: tabela
        });
    }

    private OnSuccessRequestTeste(success?: any, tabela?: any, nomeTabela?: any): any {
        $("#" + nomeTabela).DataTable({
            data: success.data,
            columns: tabela
        });
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

    public abrirmodal($idPersona: any) {
        
        alert($idPersona)
        $("#exampleModal").modal("show");
    }

    public eliminar($idPersona: any) {
        alert("eliminar:" + $idPersona)
    }


}
