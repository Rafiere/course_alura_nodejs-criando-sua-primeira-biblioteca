import pegaArquivo from "./index.js";
import fs from "fs";
import chalk from "chalk";

/* Estamos obtendo os parâmetros que foram passados por argumento ao executarmos esse arquivo através do Node. */

const caminho = process.argv;

function imprimeLista(resultado, identificador = "") {
  console.log(
    chalk.yellow("lista de links"),
    chalk.black.bgGreen(identificador),
    resultado
  );
}

async function processaTexto(argumentos) {
  const caminho = argumentos[2];

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      console.log("arquivo ou diretório não existe");
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArquivo(argumentos[2]);
    imprimeLista(resultado);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeDeArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
      imprimeLista(lista, nomeDeArquivo);
    });
  }
}

processaTexto(caminho);
