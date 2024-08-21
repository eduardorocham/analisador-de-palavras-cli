import { TreeNode } from './TreeNode';

export class PhraseAnalyzer {
    private hierarchy: TreeNode;

    constructor(hierarchy: TreeNode) {
        this.hierarchy = hierarchy;
    }

    private findDepth(tree: TreeNode, word: string, depth: number = 0): number | null {
        for (const key in tree) {
            if (key === word || (Array.isArray(tree[key]) && tree[key].includes(word))) {
                return depth;
            }
            // Verificação de subárvores
            if (typeof tree[key] === 'object') {
                const result = this.findDepth(tree[key] as TreeNode, word, depth + 1);
                if (result !== null) {
                    return result;
                }
            }
        }
        return null;
    }

    public analyze(phrase: string, targetDepth: number): { [key: string]: number } {
        // Separa a frase em palavras usando espaços em branco
        const words = phrase.split(/\s+/);
        const result: { [key: string]: number } = {};

        words.forEach(word => {
            const depth = this.findDepth(this.hierarchy, word);
            if (depth !== null && depth === targetDepth) {
                // Contagem de palavras

                if (result[word]) {
                    // Já encontrada
                    result[word] += 1;
                } else {
                    // Primeira vez
                    result[word] = 1;
                }
            }
        });

        return result;
    }
}
