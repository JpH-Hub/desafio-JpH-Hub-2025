import * as fs from 'fs';
import { AbrigoAnimais } from "./abrigo-animais.js";

let entrada = fs.readFileSync('input.txt', 'utf-8');
let semQuebraLinha = entrada.replace(/[\r\n]/g, '');
let semAspas = semQuebraLinha.replaceAll("'", ""); 
let resultado = semAspas.split(';');

const abrigo = new AbrigoAnimais()
const listaFinal = abrigo.encontraPessoas(resultado[0], resultado[1], resultado[2]);




console.log( listaFinal );


