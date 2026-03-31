import { Worker } from 'worker_threads';
import * as fs from 'fs';
import { listarArquivos } from './utils/scanner.js';
const DIRETORIO_PARA_BUSCA = './meus_documentos';
const ARQUIVO_INDICE = './indice.json';
const NUM_THREADS = 4;
let indice = {};
if (fs.existsSync(ARQUIVO_INDICE)) {
    indice = JSON.parse(fs.readFileSync(ARQUIVO_INDICE, 'utf-8'));
}
async function iniciarIndexacao() {
    console.log("🔍 Iniciando busca de arquivos (DFS)...");
    const arquivos = listarArquivos(DIRETORIO_PARA_BUSCA);
    console.log(`📄 Encontrados ${arquivos.length} arquivos.`);
    let arquivosProcessados = 0;
    return new Promise((resolve) => {
        for (let i = 0; i < NUM_THREADS; i++) {
            const worker = new Worker(new URL('./worker.js', import.meta.url));
            const enviarProximoArquivo = () => {
                if (arquivos.length > 0) {
                    const prox = arquivos.pop();
                    worker.postMessage(prox);
                }
                else {
                    worker.terminate();
                }
            };
            worker.on('message', (resultado) => {
                if (resultado.sucesso) {
                    resultado.termos.forEach((termo) => {
                        if (!indice[termo]) {
                            indice[termo] = [resultado.caminho];
                        }
                        else if (!indice[termo].includes(resultado.caminho)) {
                            indice[termo].push(resultado.caminho);
                        }
                    });
                }
                arquivosProcessados++;
                if (arquivosProcessados === arquivos.length + arquivosProcessados) {
                    salvarIndice();
                    resolve(true);
                }
                else {
                    enviarProximoArquivo();
                }
            });
            enviarProximoArquivo();
        }
    });
}
function salvarIndice() {
    fs.writeFileSync(ARQUIVO_INDICE, JSON.stringify(indice, null, 2));
    console.log(`✅ Índice salvo com sucesso em ${ARQUIVO_INDICE}`);
}
iniciarIndexacao();
