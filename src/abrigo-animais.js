import { ANIMAIS, validarAnimal } from "./animais.js";

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

function casoEspecial(brinquedosPessoa, brinquedosDoLoco) {
  let i = 0;
  for (let brinquedo of brinquedosPessoa) {
    for (let brinquedoLoco of brinquedosDoLoco) {
      if (brinquedo === brinquedoLoco) {
        i++;
      }
    }
  }
    if (i === brinquedosDoLoco.length){
      return true;
    }
    return false;
}

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1 = brinquedosPessoa1.split(",");
    const brinquedos2 = brinquedosPessoa2.split(",");
    const animais = ordemAnimais.split(",");
    const listaFinal = [];

    let contadorPessoa1 = 0;
    let contadorPessoa2 = 0;

    for (let nome of animais) {
      const animal = ANIMAIS.find((a) => a.nome === nome);
      let decisao;

      try {
        validarAnimal(animal, nome, animais);   
      } catch (error) {
        return { erro: error.message };
      }

      if (animal.nome === "Loco") {
        let pessoaCasoEspecial1 = casoEspecial(brinquedos1, animal.brinquedosFavoritos);
        let pessoaCasoEspecial2 = casoEspecial(brinquedos2, animal.brinquedosFavoritos);


        if (pessoaCasoEspecial1 && contadorPessoa1 > 0) {
          pessoaCasoEspecial1 = true;
        } else {
          pessoaCasoEspecial1 = false;
        }

         if (pessoaCasoEspecial2 && contadorPessoa2 > 0) {
          pessoaCasoEspecial2 = true;
        } else {
          pessoaCasoEspecial2 = false;
        }

  
        if (pessoaCasoEspecial1 && !pessoaCasoEspecial2 && contadorPessoa1 < 3) {
          decisao = "pessoa 1";
          contadorPessoa1++;
        } else if (pessoaCasoEspecial2 && !pessoaCasoEspecial1 && contadorPessoa1 < 3) {
          decisao = "pessoa 2";
          contadorPessoa2;
        } else {
          decisao = "abrigo";
        }
      } else {
        const pessoa1 = checarOrdem(brinquedos1, animal.brinquedosFavoritos);
        const pessoa2 = checarOrdem(brinquedos2, animal.brinquedosFavoritos);

        if (pessoa1 && !pessoa2 && contadorPessoa1 < 3) {
          decisao = "pessoa 1";
          contadorPessoa1++;
        } else if (pessoa2 && !pessoa1 && contadorPessoa1 < 3) {
          decisao = "pessoa 2";
          contadorPessoa2++;
        } else {
          decisao = "abrigo";
        }
      }

      if (contadorPessoa1 >= 1) [];

      listaFinal.push(`${nome} - ${decisao}`);
    }
    return { lista: listaFinal.sort() };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
