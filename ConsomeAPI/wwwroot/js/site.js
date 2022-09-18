// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
//$(function () {
//    $(".pesquisa").click(function () {
//        var nome = $(".nome").val();
//        //document.getElementById("n").style.visibility = 'hidden';
//        $("#modal").load("/Home/Character?nome=" + nome, function () {
//            //    $("#modal").modal();
//        })
//    });
//})

function clearFields() {
    $(".pesquisa").click(function () {
        var nome = $(".nome").val();
        //document.getElementById("n").style.visibility = 'hidden';
        //@Html.Action("Character", "Home");
        //$("#modal").load("/Home/Character?nome=" + nome, function () {
        //    //    $("#modal").modal();
        //})
    });
}