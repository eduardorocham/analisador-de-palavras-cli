import { PhraseAnalyzer } from '../../src/core/PhraseAnalyzer';
import { TreeNode } from '../../src/core/TreeNode';

describe('Testes dos métodos da classe PhraseAnalyzer', () => {
    let phraseAnalyzer: PhraseAnalyzer;

    const hierarchy: TreeNode = {
        Animais: {
            'Mamíferos': {
                Felinos: ['Leões', 'Tigres']
            },
            Aves: {
                'Pássaros': ['Papagaios', 'Canários'],
            },
        },
    };

    beforeEach(() => {
        phraseAnalyzer = new PhraseAnalyzer(hierarchy);
    });

    it('Deve encontrar uma correspondência no nível de especifidade buscado', () => {
        const result = phraseAnalyzer.analyze('Eu amo papagaios', 2);
        expect(result).toBe('Aves = 1;');
    });

    it('Deve encontrar duas correspondências no nível de especifidade buscado', () => {
        const result = phraseAnalyzer.analyze('Eu vi leões e canários', 3);
        expect(result).toBe('Felinos = 1; Pássaros = 1;');
    });

    it('Deve retornar um resultado vazio quando nenhuma palavra for encontrada em nenhum nível', () => {
        const result = phraseAnalyzer.analyze('Eu gosto de sorvete', 2);
        expect(result).toBe('');
    });
});
