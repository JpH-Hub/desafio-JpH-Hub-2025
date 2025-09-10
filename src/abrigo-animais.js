import { ANIMAIS, validarAnimal, validarBrinquedos } from "./animais.js";

function verificarAdocao(brinquedosDaPessoa, brinquedosDoAnimal) {
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

function casoEspecialLoco(brinquedosPessoa, brinquedosDoLoco) {
  let i = 0;
  for (let brinquedo of brinquedosPessoa) {
    for (let brinquedoLoco of brinquedosDoLoco) {
      if (brinquedo === brinquedoLoco) {
        i++;
      }
    }
  }
  if (i === brinquedosDoLoco.length) {
    return true;
  }
  return false;
}

function decidirAdocao(condicaoPessoa1, condicaoPessoa2, contador1, contador2) {
  let decisao;

  if (condicaoPessoa1 && !condicaoPessoa2 && contador1 < 3) {
    decisao = "pessoa 1";
    contador1++;
  } else if (condicaoPessoa2 && !condicaoPessoa1 && contador2 < 3) {
    decisao = "pessoa 2";
    contador2++;
  } else {
    decisao = "abrigo";
  }

  return { decisao, contador1, contador2 };
}

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1 = brinquedosPessoa1.split(",");
    const brinquedos2 = brinquedosPessoa2.split(",");
    const animais = ordemAnimais.split(",");
    const listaFinal = [];

    let contadorPessoa1 = 0;
    let contadorPessoa2 = 0;
    let temCompanhia = false;

    let gatoPessoa1 = false;
    let gatoPessoa2 = false;

    for (let nome of animais) {
      const animal = ANIMAIS.find((a) => a.nome === nome);
      let decisao;

      try {
        validarAnimal(animal, nome, animais);
      } catch (error) {
        return { erro: "Animal inválido" };
      }

      try {
        validarBrinquedos(brinquedosPessoa1);
        validarBrinquedos(brinquedosPessoa2);
      } catch (error) {
        return { erro: "Brinquedo inválido" };
      }

      if (animal.nome === "Loco") {
        if (!temCompanhia) {
          decisao = "abrigo";
        } else {
          let pessoaCasoEspecial1 = casoEspecialLoco(brinquedos1, animal.brinquedosFavoritos);
          let pessoaCasoEspecial2 = casoEspecialLoco(brinquedos2, animal.brinquedosFavoritos);

          const resultado = decidirAdocao(
            pessoaCasoEspecial1,
            pessoaCasoEspecial2,
            contadorPessoa1,
            contadorPessoa2
          );

          decisao = resultado.decisao;
          contadorPessoa1 = resultado.contador1;
          contadorPessoa2 = resultado.contador2;
        }
      } else {
        const pessoa1 = verificarAdocao(brinquedos1, animal.brinquedosFavoritos);
        const pessoa2 = verificarAdocao(brinquedos2, animal.brinquedosFavoritos);

        const resultado = decidirAdocao(
          pessoa1,
          pessoa2,
          contadorPessoa1,
          contadorPessoa2
        );

        decisao = resultado.decisao;
        contadorPessoa1 = resultado.contador1;
        contadorPessoa2 = resultado.contador2;
      }

      
      if (animal.tipo === "gato") {
        if (decisao === "pessoa 1") {
          if (gatoPessoa1) {
            decisao = "abrigo"; 
          } else {
            gatoPessoa1 = true;
          }
        } else if (decisao === "pessoa 2") {
          if (gatoPessoa2) {
            decisao = "abrigo";
          } else {
            gatoPessoa2 = true;
          }
        }
      }

      if (decisao !== "abrigo") {
        temCompanhia = true;
      }
      listaFinal.push(`${nome} - ${decisao}`);
    }
    return { lista: listaFinal.sort() };
  }
}


export { AbrigoAnimais as AbrigoAnimais };
