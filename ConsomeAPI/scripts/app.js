import { app } from "./create.js";
let create = new app();
$("#toChargeCharacterWithAPI").click(() => {
    create.LoadTable("tblApi");
    console.log("clicado");
});
$("#toChargeTableUserWithoutAPI").click(() => {
    create.LoadTable("tblNoApi");
    console.log("clicado");
});
$("#compressDescompress").click(() => {
    create.ConverteZip();
    console.log("converteZip");
});
//$(document).ready(() => {
//    teste.inicio("table_id");
//    teste.inicioTeste("tblTeste");
//});
$("#tblNoApi" + ' tbody').on('click', '.sendWapPush', (event) => {
    let submitItemSelected = null;
    let tr = $(event.currentTarget).closest('tr');
    let row = $("#tblNoApi").DataTable().row(tr);
    submitItemSelected = $("#tblNoApi").DataTable().row(row).data();
    create.abrirmodal(submitItemSelected.id, null);
});
//$("#compiler").keyup(() => {
//    //create.abrirmodal(1);
//});
$("#chamaModal").click(() => {
    let evento = () => {
        create.LoadTable("tblNoApi");
    };
    create.abrirmodal(1, evento);
});
$("#closeToChargeTbl").click(() => {
    create.fecharmodal(1);
});
function sayHello() {
    const compiler = document.getElementById("compiler")
        .value;
    const framework = document.getElementById("framework")
        .value;
    return `Hello from ${compiler} and ${framework}!`;
}
;
//# sourceMappingURL=app.js.map