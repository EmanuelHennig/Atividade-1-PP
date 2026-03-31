import * as fs from 'fs';
import * as path from 'path';

export function listarArquivos(diretorio: string, lista: string[] = []): string[] {
    const itens = fs.readdirSync(diretorio);

    for (const item of itens) {
        const caminhoCompleto = path.join(diretorio, item);
        const info = fs.statSync(caminhoCompleto);

        if (info.isDirectory()) {
            listarArquivos(caminhoCompleto, lista);
        } else if (info.isFile()) {
            lista.push(caminhoCompleto);
        }
    }

    return lista;
}