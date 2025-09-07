import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BRINQUEDO_INVALIDO', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'BOLA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve tratar empate - ambas pessoas podem adotar', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve respeitar limite de 3 animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('LASER,RATO,BOLA,CAIXA,NOVELO', 'RATO,BOLA', 'Rex,Bola,Bebe,Mimi');
    expect(resultado.lista[0]).toBe('Bebe - pessoa 1');
    expect(resultado.lista[1]).toBe('Bola - pessoa 1');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve tratar Loco corretamente - ordem não importa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,SKATE', 'SKATE,RATO', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve retornar lista em ordem alfabética', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'CAIXA,NOVELO', 'Bola,Rex');
    expect(resultado.lista[0]).toBe('Bola - pessoa 2');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });
});
