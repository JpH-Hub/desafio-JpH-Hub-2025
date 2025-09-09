import * as fs from 'fs';
import { AbrigoAnimais } from "./abrigo-animais.js";

let input = fs.readFileSync('input.txt', 'utf-8');
let res = input.replace(/[\r\n]/g, '');
let split = res.replaceAll("'", ""); 
let splitResult = split.split(';');

const resultado = new AbrigoAnimais()
const output = resultado.encontraPessoas(splitResult[0], splitResult[1], splitResult[2]);




console.log(output);


