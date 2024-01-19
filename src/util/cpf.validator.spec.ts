import { validaCpf } from './cpf.validator';

describe('Validação de cpf', () => {
  describe('formatos inválidos', () => {
    it('deve retornar falso para formatos inválidos', () => {
      expect(validaCpf('')).toBe(false);
      expect(validaCpf('1')).toBe(false);
      expect(validaCpf('x')).toBe(false);
      expect(validaCpf('123456789000')).toBe(false);
      expect(validaCpf('123.456.789-000')).toBe(false);
      expect(validaCpf('111.444.77735')).toBe(false);
      expect(validaCpf('111.444777-35')).toBe(false);
      expect(validaCpf('123.456789-00')).toBe(false);
    });
    it('deve retornar falso para formatos inválidos, mesmo com dígitos válidos', () => {
      expect(validaCpf('111.444.77735')).toBe(false);
      expect(validaCpf('111.444777-35')).toBe(false);
      expect(validaCpf('111444.777-35')).toBe(false);
      expect(validaCpf('488.90301074')).toBe(false);
      expect(validaCpf('488.90301074')).toBe(false);
      expect(validaCpf(' 174.972.590-83')).toBe(false);
    });
  });
  describe('Dígitos invlálidos', () => {
    it('deve retornar falso para dígitos inválidos', () => {
      expect(validaCpf('488.903.010-73')).toBe(false);
      expect(validaCpf('48890301073')).toBe(false);
      expect(validaCpf('174.972.590-00')).toBe(false);
      expect(validaCpf('12345678900')).toBe(false);
      expect(validaCpf('933.214.610-11')).toBe(false);
      expect(validaCpf('111.444.777-05')).toBe(false);
    });
  });

  describe('cpfs válidos', () => {
    it('deve retornar verdadeiro para cpfs válidos', () => {
      expect(validaCpf('488.903.010-74')).toBe(true);
      expect(validaCpf('48890301074')).toBe(true);
      expect(validaCpf('174.972.590-83')).toBe(true);
      expect(validaCpf('17497259083')).toBe(true);
      expect(validaCpf('933.214.610-13')).toBe(true);
      expect(validaCpf('111.444.777-35')).toBe(true);
    });
  });
});
