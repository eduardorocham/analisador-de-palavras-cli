import * as fs from 'fs';

import { TreeNode } from './TreeNode';

export class HierarchyLoader {
    private hierarchy: TreeNode;

    constructor(filePath: string) {
        this.hierarchy = this.loadHierarchy(filePath);
    }

    // Converte a string JSON para um objeto javascript real
    private loadHierarchy(filePath: string): TreeNode {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }

    public getHierarchy(): TreeNode {
        return this.hierarchy;
    }
}
