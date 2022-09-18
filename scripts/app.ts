import { name } from "./create.js";
import { app } from "./create.js";


console.log(name);

let teste = new app();

//export class teste {
//    constructor(_static?: any) {
//        //super(_static);

//        let teste = new app();

//        teste.mostrarnatela();
//    }

//}

$("#teste").click(() => {
    let a = teste.AjaxPost();
    console.log(a);
});




function sayHello() {
    const compiler = (document.getElementById("compiler") as HTMLInputElement)
        .value;
    const framework = (document.getElementById("framework") as HTMLInputElement)
        .value;
    return `Hello from ${compiler} and ${framework}!`;
}