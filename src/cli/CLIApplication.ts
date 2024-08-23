import { Command } from 'commander';
import { HierarchyLoader } from '../core/HierarchyLoader';
import { PhraseAnalyzer } from '../core/PhraseAnalyzer';

export class CLIApplication {
    private hierarchyLoader: HierarchyLoader;
    private analyzer: PhraseAnalyzer;

    constructor(hierarchyPath: string) {
        this.hierarchyLoader = new HierarchyLoader(hierarchyPath);
        this.analyzer = new PhraseAnalyzer(this.hierarchyLoader.getHierarchy());
    }

    public run(): void {
        const program = new Command();

        program
            .command('analyze')
            .description('Analisa uma frase e conta palavras em um nível de profundidade específico')
            .option('--depth <n>', 'Nível de profundiade', parseInt)
            .option('--verbose', 'Exibe métricas de tempo')
            .argument('<phrase>', 'Frase para analisar')
            .action((phrase, options) => {
                const loadTime = this.hierarchyLoader.getLoadTime()

                const startAnalyze = Date.now();
                const result = this.analyzer.analyze(phrase, options.depth);
                const analyzeTime = Date.now() - startAnalyze;

                console.log(result);

                if (options.verbose) {
                    console.table([
                        { Metric: 'Tempo de carregamento dos parâmetros', Time: `${loadTime}ms` },
                        { Metric: 'Tempo de verificação da frase', Time: `${analyzeTime}ms` }
                    ]);
                }
            });

        program.parse(process.argv);
    }
}