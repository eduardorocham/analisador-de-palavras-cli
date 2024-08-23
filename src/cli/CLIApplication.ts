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
            .description('Analyze a phrase and count words at a specific depth')
            .option('--depth <n>', 'Depth level to analyze', parseInt)
            .option('--verbose', 'Display detailed metrics')
            .argument('<phrase>', 'Phrase to analyze')
            .action((phrase, options) => {
                const startLoad = Date.now();
                const hierarchy = this.hierarchyLoader.getHierarchy();
                const loadTime = Date.now() - startLoad;

                const startAnalyze = Date.now();
                const result = this.analyzer.analyze(phrase, options.depth);
                const analyzeTime = Date.now() - startAnalyze;

                console.log('Analysis result:', result);

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