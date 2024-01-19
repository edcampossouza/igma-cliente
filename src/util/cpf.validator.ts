const regexFormatado = /^[\d]{3}.[\d]{3}.[\d]{3}-[\d]{2}$/;
const regexPlano = /^[\d]{11}$/;

/**
 *
 * @param cpf - string contendo a cadeia de digitos do cpf, opcionalmente com a máscara
 * @returns - true se a string estiver no formato correto (99999999900 ou 999.999.999-00)
 *  e a cadeia de dígitos for um cpf válido
 */
export function validaCpf(cpf: string): boolean {
  if (regexFormatado.test(cpf)) {
    cpf = cpf.replace(/[\D]/g, '');
  } else if (!regexPlano.test(cpf)) {
    return false;
  }
  const digitos: number[] = [...cpf].map((c) => parseInt(c));
  let produto = 0;
  for (let m = 10; m >= 2; m--) {
    produto += m * digitos[10 - m];
  }
  const r1 = produto % 11;
  const d1 = r1 < 2 ? 0 : 11 - r1;
  if (d1 !== digitos[9]) return false;

  produto = 0;
  for (let m = 11; m >= 2; m--) {
    produto += m * digitos[11 - m];
  }
  const r2 = produto % 11;
  const d2 = r2 < 2 ? 0 : 11 - r2;
  if (d2 !== digitos[10]) return false;

  return true;
}
