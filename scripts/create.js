System.register([], function (exports_1, context_1) {
    "use strict";
    var name, app;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("name", name = "rodrigo");
            app = /** @class */ (function () {
                function app() {
                }
                app.prototype.mostrarnatela = function () {
                    alert("acabou");
                };
                app.prototype.sucesso = function (sucesso) {
                    console.log(sucesso);
                    var a = sucesso[0];
                    //$("#framework").val(a.name);
                    //$("#tblTeste").DataTable().row(row).data();
                    var table = $("#tblTeste").DataTable({
                        data: sucesso.data,
                        columns: null,
                        scrollX: true,
                        destroy: true,
                        processing: true,
                        serverSide: false,
                        autoWidth: false,
                        deferRender: true,
                        renderer: 'bootstrap',
                        searching: false,
                        lengthChange: false,
                        info: true,
                        paging: false,
                        pagingType: "full_numbers",
                        ordering: false,
                        pageLength: 10,
                        language: null, //this.LanguageDataTable
                        //select: {
                        //    style: selectType,
                        //}
                    });
                    return a.name;
                };
                app.prototype.AjaxPost = function () {
                    //url, param, eventOnSuccess?, eventOnError?, redirectUrl?, nameComponentShowLoading?: string
                    //let loading: Intranet2Loading;
                    var _this = this;
                    //if ((nameComponentShowLoading) && (nameComponentShowLoading != "")) {
                    //    loading = new Intranet2Loading(Intranet2LoadingType.LOCAL, $('#' + nameComponentShowLoading));
                    //} else {
                    //    loading = new Intranet2Loading();
                    //}
                    $.ajax({
                        url: "Home/Customer",
                        contentType: 'application/json',
                        type: 'POST',
                        data: null,
                        beforeSend: null,
                        success: function (success) {
                            //return success;
                            _this.sucesso(success);
                        },
                        //success: (success) => {
                        //    this.OnSuccessRequest(success, eventOnSuccess, redirectUrl);
                        //},
                        error: null,
                        //error: (error) => {
                        //    this.OnErrorRequest(error, eventOnError);
                        //},
                        complete: null
                        //complete: () => {
                        //    loading.hide();
                        //    this.ShowMessagesFromAjaxRequests(this);
                        //}
                    });
                };
                return app;
            }());
            exports_1("app", app);
        }
    };
});
//# sourceMappingURL=create.js.map