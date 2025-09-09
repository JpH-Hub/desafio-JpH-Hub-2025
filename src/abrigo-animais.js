import { ANIMAIS } from "./animais.js";

function temBrinquedosNaOrdem(brinquedosDaPessoa, brinquedosDoAnimal) {
  let i = 0;
  for (let brinquedo of brinquedosDaPessoa) {
    if (brinquedo === brinquedosDoAnimal[i]) {
      i++;
      if (i === brinquedosDoAnimal.length) {
        return true;
      }
    }
  }
  return false;
}

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1 = brinquedosPessoa1.split(",");
    const brinquedos2 = brinquedosPessoa2.split(",");
    const animais = ordemAnimais.split(",");

    const listaFinal = [];

    for (let nome of animais) {
      const animal = ANIMAIS.find((a) => a.nome === nome);

      if (!animal) {
        return { erro: "Animal inválido" };
      }

      const pessoa1 = temBrinquedosNaOrdem(
        brinquedos1,
        animal.brinquedosFavoritos
      );
      const pessoa2 = temBrinquedosNaOrdem(
        brinquedos2,
        animal.brinquedosFavoritos
      );

      let resultado; // nome melhor
      if (pessoa1 && !pessoa2) {
        resultado = "pessoa 1";
      } else if (pessoa2 && !pessoa1) {
        resultado = "pessoa 2";
      } else {
        resultado = "abrigo";
      }

      listaFinal.push(`${nome} - ${resultado}`);
    }

    return { lista: listaFinal.sort() };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
