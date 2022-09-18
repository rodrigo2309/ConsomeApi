import { app } from "./create.js";

let create = new app();

$("#search").click(() => {
    create.inicio("tblTeste");
    console.log("clicado");
});

$("#searchTeste").click(() => {
    create.inicioTeste("table_id");
    console.log("clicado");
});

$("#base").click(() => {
    create.ConverteZip();
    console.log("converteZip");
});

//$(document).ready(() => {
//    teste.inicio("table_id");
//    teste.inicioTeste("tblTeste");
//});

$("#table_id" + ' tbody').on('click', '.sendWapPush', (event) => {
    //t.ExecuteCampaignSubmitActionToUrl('sending/SendWapPush', event);
    let submitItemSelected: any = null;

    let tr = $(event.currentTarget).closest('tr');
    let row = $("#table_id").DataTable().row(tr);

    submitItemSelected = $("#table_id").DataTable().row(row).data();
    create.abrirmodal(submitItemSelected.id);
});

$("#compiler").keyup(() => {
    create.abrirmodal(1);
    
});

$("#abrir").click(() => {
    create.abrirmodal(1);
});

function sayHello() {
    const compiler = (document.getElementById("compiler") as HTMLInputElement)
        .value;
    const framework = (document.getElementById("framework") as HTMLInputElement)
        .value;
    return `Hello from ${compiler} and ${framework}!`;
};