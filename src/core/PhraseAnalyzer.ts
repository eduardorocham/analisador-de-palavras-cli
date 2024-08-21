import { TreeNode } from './TreeNode';

export class PhraseAnalyzer {
    private hierarchy: TreeNode;

    constructor(hierarchy: TreeNode) {
        this.hierarchy = hierarchy;
    }

    private findWordAtLevelTree(tree: TreeNode, word: string): boolean {
        const lowerCaseWord = word.toLowerCase();
        for (const key in tree) {
            // const lowerCaseKey = key.toLowerCase();

            if (Array.isArray(tree[key]) && tree[key].some(item => item.toLowerCase() === lowerCaseWord)) {
                return true;
            }

            if (typeof tree[key] === 'object') {
                const result = this.findWordAtLevelTree(tree[key] as TreeNode, word);
                if (result !== null) {
                    return true;
                }
            }
        }
        return false;
    }

    private getKeysByLevel(tree: TreeNode, level: number): [] | string[] {
        if (level === 0) {
            return Object.keys(tree);
        }

        const keys: string[] = [];
        for (const key in tree) {
            if (typeof tree[key] === 'object') {
                const subKeys = this.getKeysByLevel(tree[key] as TreeNode, level - 1);
                if (subKeys.length > 0) {
                    keys.push(...subKeys);
                }
            }
        }
        return keys;
    }

    private findDepth(tree: TreeNode, word: string, depth: number = 0): number | null {
        const lowerCaseWord = word.toLowerCase();

        for (const key in tree) {
            const lowerCaseKey = key.toLowerCase();

            // Se é uma chave ou palavra do array de uma chave existente, retorna a o depth
            if (lowerCaseKey === lowerCaseWord ||
                (Array.isArray(tree[key]) && tree[key].some(item => item.toLowerCase() === lowerCaseWord))) {
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
            // Há depth e a palavra está no dept procurado
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
