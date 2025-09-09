import { ANIMAIS, validarAnimal} from "./animais.js";

function checarOrdem(brinquedosDaPessoa, brinquedosDoAnimal) {
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

      try {
        validarAnimal(animal);
      } catch (error) {
        return { erro: error.message };
      }

      const pessoa1 = checarOrdem(brinquedos1,animal.brinquedosFavoritos);
      const pessoa2 = checarOrdem(brinquedos2,animal.brinquedosFavoritos);

      let decisao;
      if (pessoa1 && !pessoa2) {
        decisao = "pessoa 1";
      } else if (pessoa2 && !pessoa1) {
        decisao = "pessoa 2";
      } else {
        decisao = "abrigo";
      }

      listaFinal.push(`${nome} - ${decisao}`);
    }

    return ({ lista: listaFinal.sort() }) ;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
