System.register(["./create.js"], function (exports_1, context_1) {
    "use strict";
    var create_js_1, create_js_2, teste;
    var __moduleName = context_1 && context_1.id;
    function sayHello() {
        var compiler = document.getElementById("compiler")
            .value;
        var framework = document.getElementById("framework")
            .value;
        return "Hello from ".concat(compiler, " and ").concat(framework, "!");
    }
    return {
        setters: [
            function (create_js_1_1) {
                create_js_1 = create_js_1_1;
                create_js_2 = create_js_1_1;
            }
        ],
        execute: function () {
            console.log(create_js_1.name);
            teste = new create_js_2.app();
            //export class teste {
            //    constructor(_static?: any) {
            //        //super(_static);
            //        let teste = new app();
            //        teste.mostrarnatela();
            //    }
            //}
            $("#teste").click(function () {
                var a = teste.AjaxPost();
                console.log(a);
            });
        }
    };
});
//# sourceMappingURL=app.js.map