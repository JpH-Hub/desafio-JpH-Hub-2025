class Animal {
  constructor(nome, tipo, brinquedosFavoritos) {
    this.nome = nome;
    this.tipo = tipo;
    this.brinquedosFavoritos = brinquedosFavoritos;
  }
}

function validarAnimal(animal, nome, animais) {
   if (!animal) {
     throw new Error("Animal inválido"); 
    }

    let duplicados = 0;
    for (let i of animais){
      if (i === nome){
        duplicados++;
      }
    }
    if (duplicados > 1){
      throw new Error("Animal inválido"); 
    }
}


const ANIMAIS = [
  new Animal("Rex", "cão", ["RATO", "BOLA"]),
  new Animal("Mimi", "gato", ["BOLA", "LASER"]),
  new Animal("Fofo", "gato", ["BOLA", "RATO", "LASER"]),
  new Animal("Zero", "gato", ["RATO", "BOLA"]),
  new Animal("Bola", "cão", ["CAIXA", "NOVELO"]),
  new Animal("Bebe", "cão", ["LASER", "RATO", "BOLA"]),
  new Animal("Loco", "jabuti", ["SKATE", "RATO"])
];


export { Animal, ANIMAIS, validarAnimal };