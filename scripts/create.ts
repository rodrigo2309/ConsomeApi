export const name = "rodrigo";

export class app {
    mostrarnatela() {
        alert("acabou");
    }

    public sucesso(sucesso: any) {
        console.log(sucesso);
        let a = sucesso[0];
        //$("#framework").val(a.name);
        //$("#tblTeste").DataTable().row(row).data();

        var table = $("#tblTeste").DataTable({
            data: sucesso.data,
            columns: null, //columns
            scrollX: true,
            destroy: true,
            processing: true,
            serverSide: false,
            autoWidth: false,
            deferRender: true,
            renderer: 'bootstrap',
            searching: false ,//hasSearching
            lengthChange: false,
            info: true,
            paging: false, //hasPaging
            pagingType: "full_numbers",
            ordering: false,
            pageLength: 10,
            language: null, //this.LanguageDataTable
            //select: {
            //    style: selectType,
            //}
        });

        return a.name;
    }

    public AjaxPost() {
        //url, param, eventOnSuccess?, eventOnError?, redirectUrl?, nameComponentShowLoading?: string
        //let loading: Intranet2Loading;

        //if ((nameComponentShowLoading) && (nameComponentShowLoading != "")) {
        //    loading = new Intranet2Loading(Intranet2LoadingType.LOCAL, $('#' + nameComponentShowLoading));
        //} else {
        //    loading = new Intranet2Loading();
        //}

        $.ajax({
            url: "Home/Customer",
            contentType: 'application/json',
            type: 'POST',
            data: null , /*JSON.stringify(param)*/
            beforeSend: null, //() => loading.show()
            success: (success) => {
                //return success;
                this.sucesso(success)
            },
            //success: (success) => {
            //    this.OnSuccessRequest(success, eventOnSuccess, redirectUrl);
            //},
            error: null,
            //error: (error) => {
            //    this.OnErrorRequest(error, eventOnError);
            //},
            complete:null
            //complete: () => {
            //    loading.hide();
            //    this.ShowMessagesFromAjaxRequests(this);
            //}
        });

        
    }
}
