import { TreeNode } from './TreeNode';

export class PhraseAnalyzer {
    private hierarchy: TreeNode;

    constructor(hierarchy: TreeNode) {
        this.hierarchy = hierarchy;
    }

    private isWordInTreeAtAnyLevel(node: TreeNode | string[], searchWord: string): boolean {
        const lowerCaseWord = searchWord.toLowerCase();
        if (Array.isArray(node)) {
            return node.some(item => item.toLowerCase() === lowerCaseWord);
        }
    
        if (typeof node === 'object') {
            for (const key in node) {
                const result = this.isWordInTreeAtAnyLevel(node[key] as TreeNode, searchWord);
                if (result) {
                    return true;
                }
            }
        }
        return false;
    } 
    
    private getSubtreeAtLevel(node: TreeNode, targetLevel: number): TreeNode {
        // Descer na árvore até atingir o nível desejado
        if (targetLevel === 1) {
            return node; // Retornar o conteúdo inteiro do nível desejado
        }
    
        const subtree: TreeNode = {};
        for (const key in node) {
            if (typeof node[key] === 'object') {
                // Continuar descendo até o nível desejado
                const subNode = this.getSubtreeAtLevel(node[key] as TreeNode, targetLevel - 1);
                Object.assign(subtree, subNode);
            }
        }
        return subtree;
    }

    private findWordDepth(node: TreeNode, searchWord: string, depth: number = 0): number | null {
        const lowerCaseWord = searchWord.toLowerCase();

        for (const key in node) {
            const lowerCaseKey = key.toLowerCase();

            // Se é uma chave ou palavra do array de uma chave existente, retorna a o depth
            if (lowerCaseKey === lowerCaseWord ||
                (Array.isArray(node[key]) && node[key].some(item => item.toLowerCase() === lowerCaseWord))) {
                return depth;
            }

            // Verificação de subárvores
            if (typeof node[key] === 'object') {
                const result = this.findWordDepth(node[key] as TreeNode, searchWord, depth + 1);
                if (result !== null) {
                    return result;
                }
            }
        }
        return null;
    }

    public analyze(phrase: string, targetDepth: number): string {
        const subtreeAtLevel = this.getSubtreeAtLevel(this.hierarchy, targetDepth)

        // Separa a frase em palavras usando espaços em branco
        const words = phrase.split(/\s+/);
        const levelWordCount: { [key: string]: number } = {};

        for (let key in subtreeAtLevel) {
            words.forEach(word => {
                const hasWord = this.isWordInTreeAtAnyLevel(subtreeAtLevel[key], word);
                if (hasWord) {
                    // Contagem de palavras
                    if (levelWordCount[key]) {
                        // Já encontrada
                        levelWordCount[key] += 1;
                    } else {
                        // Primeira vez
                        levelWordCount[key] = 1;
                    }
                }
            });
        }

        const outputString = Object.entries(levelWordCount)
            .map(([key, value]) => `${key} = ${value}`)
            .join('; ') + ';';

        return outputString;
    }
}
