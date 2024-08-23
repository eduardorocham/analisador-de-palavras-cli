import * as fs from 'fs';
import { HierarchyLoader } from '../../src/core/HierarchyLoader';
import { TreeNode } from '../../src/core/TreeNode';

jest.mock('fs');

describe('Testes da classe HierarchyLoader', () => {
    let hierarchyLoader: HierarchyLoader;

    const mockData = JSON.stringify({
        "Tecnologia": {
            "Dispositivos": {
                "Móveis": [
                    "Smartphones",
                    "Tablets"
                ],
                "Computadores": [
                    "Laptops",
                    "Desktops"
                ]
            },
            "Software": {
                "Aplicativos": [
                    "Navegadores",
                    "Editores de Texto"
                ],
                "Sistemas Operacionais": [
                    "Windows",
                    "Linux"
                ]
            }
        }
    });

    beforeEach(() => {
        // Altera o comportamente da função para sempre retornar o mock
        (fs.readFileSync as jest.Mock).mockReturnValue(mockData);
        hierarchyLoader = new HierarchyLoader('path/file.json');
    });

    it('Deve ler um arquivo json e retornar a hierarquia', () => {
        const hierarchy: TreeNode = hierarchyLoader.getHierarchy();

        expect(hierarchy).toEqual({
            "Tecnologia": {
                "Dispositivos": {
                    "Móveis": [
                        "Smartphones",
                        "Tablets"
                    ],
                    "Computadores": [
                        "Laptops",
                        "Desktops"
                    ]
                },
                "Software": {
                    "Aplicativos": [
                        "Navegadores",
                        "Editores de Texto"
                    ],
                    "Sistemas Operacionais": [
                        "Windows",
                        "Linux"
                    ]
                }
            }
        });
    });
});
