class AbrigoAnimais {
  constructor() {
    // Dados dos animais conforme especificação
    this.animais = {
      'Rex': { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      'Mimi': { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      'Fofo': { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      'Zero': { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      'Bola': { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      'Bebe': { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      'Loco': { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };
    
    // Brinquedos válidos
    this.brinquedosValidos = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'];
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      // Parsear entradas
      const brinquedos1 = this.parsearBrinquedos(brinquedosPessoa1);
      const brinquedos2 = this.parsearBrinquedos(brinquedosPessoa2);
      const animais = this.parsearAnimais(ordemAnimais);

      // Validar entradas
      const validacao = this.validarEntradas(brinquedos1, brinquedos2, animais);
      if (validacao.erro) {
        return validacao;
      }

      // Processar matching
      const resultado = this.processarMatching(brinquedos1, brinquedos2, animais);
      
      return { lista: resultado };
    } catch (error) {
      return { erro: 'Erro interno' };
    }
  }

  parsearBrinquedos(brinquedosStr) {
    return brinquedosStr.split(',').map(b => b.trim());
  }

  parsearAnimais(animaisStr) {
    return animaisStr.split(',').map(a => a.trim());
  }

  validarEntradas(brinquedos1, brinquedos2, animais) {
    // Validar brinquedos da pessoa 1
    const validacao1 = this.validarBrinquedos(brinquedos1);
    if (validacao1.erro) return validacao1;

    // Validar brinquedos da pessoa 2
    const validacao2 = this.validarBrinquedos(brinquedos2);
    if (validacao2.erro) return validacao2;

    // Validar animais
    const validacaoAnimais = this.validarAnimais(animais);
    if (validacaoAnimais.erro) return validacaoAnimais;

    return { sucesso: true };
  }

  validarBrinquedos(brinquedos) {
    // Verificar se há brinquedos duplicados
    const unicos = new Set(brinquedos);
    if (unicos.size !== brinquedos.length) {
      return { erro: 'Brinquedo inválido' };
    }

    // Verificar se todos os brinquedos são válidos
    for (const brinquedo of brinquedos) {
      if (!this.brinquedosValidos.includes(brinquedo)) {
        return { erro: 'Brinquedo inválido' };
      }
    }

    return { sucesso: true };
  }

  validarAnimais(animais) {
    // Verificar se há animais duplicados
    const unicos = new Set(animais);
    if (unicos.size !== animais.length) {
      return { erro: 'Animal inválido' };
    }

    // Verificar se todos os animais existem
    for (const animal of animais) {
      if (!this.animais[animal]) {
        return { erro: 'Animal inválido' };
      }
    }

    return { sucesso: true };
  }

  processarMatching(brinquedos1, brinquedos2, animais) {
    const resultado = [];
    const contadores = { pessoa1: 0, pessoa2: 0 };

    for (const animal of animais) {
      const dadosAnimal = this.animais[animal];
      const candidatos = [];

      // Verificar pessoa 1
      if (this.podeAdotar(brinquedos1, dadosAnimal, contadores.pessoa1)) {
        candidatos.push('pessoa1');
      }

      // Verificar pessoa 2
      if (this.podeAdotar(brinquedos2, dadosAnimal, contadores.pessoa2)) {
        candidatos.push('pessoa2');
      }

      // Determinar resultado
      if (candidatos.length === 0) {
        resultado.push(`${animal} - abrigo`);
      } else if (candidatos.length === 1) {
        const pessoa = candidatos[0];
        resultado.push(`${animal} - ${pessoa === 'pessoa1' ? 'pessoa 1' : 'pessoa 2'}`);
        contadores[pessoa]++;
      } else {
        // Empate - ninguém fica com o animal
        resultado.push(`${animal} - abrigo`);
      }
    }

    return resultado.sort();
  }

  podeAdotar(brinquedos, dadosAnimal, animaisJaAdotados) {
    // Verificar limite de 3 animais
    if (animaisJaAdotados >= 3) {
      return false;
    }

    // Caso especial do Loco
    if (dadosAnimal.tipo === 'jabuti') {
      return this.podeAdotarLoco(brinquedos, dadosAnimal);
    }

    // Verificar se tem todos os brinquedos na ordem correta
    return this.temBrinquedosNaOrdem(brinquedos, dadosAnimal.brinquedos);
  }

  podeAdotarLoco(brinquedos, dadosAnimal) {
    // Loco precisa ter todos os brinquedos (ordem não importa)
    // Mas precisa ter outro animal como companhia (regra especial)
    for (const brinquedo of dadosAnimal.brinquedos) {
      if (!brinquedos.includes(brinquedo)) {
        return false;
      }
    }
    return true;
  }

  temBrinquedosNaOrdem(brinquedos, brinquedosDesejados) {
    let indiceDesejado = 0;

    for (const brinquedo of brinquedos) {
      if (brinquedo === brinquedosDesejados[indiceDesejado]) {
        indiceDesejado++;
        if (indiceDesejado === brinquedosDesejados.length) {
          return true;
        }
      }
    }

    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
