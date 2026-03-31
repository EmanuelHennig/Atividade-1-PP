import { parentPort } from 'worker_threads';
import * as fs from 'fs';

parentPort?.on('message', (caminhoArquivo: string) => {
    try {
        const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');

        const termosencontrados = conteudo.toLowerCase().match(/\b(\w+)\b/g) || [];

        const termosUnicos = Array.from(new Set(termosencontrados));

        parentPort?.postMessage({
            sucesso: true,
            caminho: caminhoArquivo,
            termos: termosUnicos
        });
    } catch (erro) {
        parentPort?.postMessage({ sucesso: false, erro });
    }
});