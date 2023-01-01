/* A biblioteca "fs" é nativa do Node e permite que a linguagem de programação interaja com o sistema de arquivos do computador. */

import fs from "fs";
import chalk from "chalk";

function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map((captura) => ({ [captura[1]]: captura[2] }));
  return resultados.length !== 0 ? resultados : "não há links no arquivo";
}

function trataErro(erro) {
  console.log(erro);
  /* Se um erro acontecer, essa mensagem será enviada. */

  throw new Error(chalk.red(erro.code, "não há arquivo no diretório"));
}

/* A palavra-chave "await" diz que o JS tem que resolver o retorno, e, após isso, enviar os dados desse retorno para a variável "texto", que seria o retorno dessa promise, contendo o texto do arquivo. */

async function pegaArquivo(caminhoDoArquivo) {
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    return extraiLinks(texto);
  } catch (erro) {
    trataErro(erro);
  }
}

export default pegaArquivo;
