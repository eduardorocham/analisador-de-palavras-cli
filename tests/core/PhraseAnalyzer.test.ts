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

    it('Testa o método analyze e deve encontrar uma correspondência no nível de especifidade buscado', () => {
        const result = phraseAnalyzer.analyze('Eu amo papagaios', 2);
        expect(result).toBe('Aves = 1');
    });

    it('Testa o método analyze e deve encontrar duas correspondências no nível de especifidade buscado', () => {
        const result = phraseAnalyzer.analyze('Eu vi leões e canários', 3);
        expect(result).toBe('Felinos = 1; Pássaros = 1');
    });

    it('Testa o método analyze e não deve possuir correspondência, pois não há filho no nível e nem o nível possui os termos', () => {
        const result = phraseAnalyzer.analyze('Eu gosto de sorvete', 2);
        expect(result)
            .toBe('Na frase não existe nenhum filho do nível 2 e nem o nível 2 possui os termos especificados');
    });
});

it('Analisa um texto de mais de 5000 caracteres', () => {
    const hierarchy: TreeNode = {
        "Natureza": {
            "Animais": {
                "Mamíferos": {
                    "Carnívoros": {
                        "Felinos": ["Leões", "Tigres", "Jaguares", "Leopardos", "Guepardos", "Pumas"],
                        "Canídeos": ["Lobos", "Raposas", "Cães", "Chacais"],
                        "Ursídeos": ["Ursos", "Pandas"]
                    },
                    "Herbívoros": {
                        "Equídeos": ["Cavalos", "Zebras", "Asnos"],
                        "Bovídeos": ["Bois", "Búfalos", "Antílopes", "Cabras", "Ovelhas"],
                        "Roedores": ["Ratos", "Esquilos", "Castores", "Capivaras"]
                    },
                    "Onívoros": {
                        "Suínos": ["Porcos", "Javalis"],
                        "Ursídeos": ["Ursos"]
                    },
                    "Primatas": ["Gorilas", "Chimpanzés", "Orangotangos", "Bonobos", "Macacos"],
                    "Cetáceos": ["Baleias", "Golfinhos", "Narvais", "Orcas"]
                },
                "Aves": {
                    "Rapinas": ["Águias", "Falcões", "Corujas", "Milhafres", "Gaviões"],
                    "Pássaros": ["Canários", "Papagaios", "Pardais", "Rouxinóis", "Andorinhas"],
                    "Aquáticas": ["Patos", "Gansos", "Cisnes", "Pelicanos"],
                    "Corvídeos": ["Corvos", "Gralhas", "Pega"]
                },
                "Répteis": {
                    "Crocodilianos": ["Crocodilos", "Jacarés"],
                    "Lagartos": ["Camaleões", "Iguanas", "Varanos"],
                    "Serpentes": ["Cobras", "Jararacas", "Pítons", "Corais"],
                    "Quelônios": ["Tartarugas", "Cágados", "Jabutis"]
                },
                "Anfíbios": {
                    "Rãs": ["Rãs", "Pererecas"],
                    "Sapos": ["Sapos", "Cururus"],
                    "Salamandras": ["Salamandras", "Tritões"],
                    "Cecílias": ["Cecílias"]
                },
                "Peixes": {
                    "Cartilaginosos": ["Tubaroes", "Raias"],
                    "Ósseos": ["Salmões", "Atuns", "Badejos", "Carpas"],
                    "Ciclídeos": ["Tilápias", "Acarás"]
                },
                "Invertebrados": {
                    "Insetos": {
                        "Coleópteros": ["Besouros", "Joaninhas"],
                        "Lepidópteros": ["Borboletas", "Mariposas"]
                    },
                    "Aracnídeos": ["Aranhas", "Escorpiões"],
                    "Crustáceos": ["Caranguejos", "Lagostas", "Camarões"],
                    "Moluscos": ["Polvos", "Lulas", "Caracóis"]
                }
            },
            "Plantas": {
                "Árvores": {
                    "Coníferas": ["Pinheiros", "Cedros", "Abetos"],
                    "Decíduas": ["Carvalhos", "Maples", "Bétulas"]
                },
                "Flores": {
                    "Ornamentais": ["Rosas", "Tulipas", "Girassóis"],
                    "Silvestres": ["Margaridas", "Papoulas", "Violetas"]
                },
                "Gramíneas": ["Trigo", "Cevada", "Milho", "Arroz"]
            }
        },
        "Objetos": {
            "Veículos": {
                "Terrestres": ["Carros", "Caminhões", "Motos", "Ônibus", "Bicicletas"],
                "Aquáticos": ["Barcos", "Navios", "Submarinos", "Canoas"],
                "Aéreos": ["Aviões", "Helicópteros", "Planadores", "Dirigíveis"]
            },
            "Eletrodomésticos": ["Geladeiras", "Fogões", "Máquinas de Lavar", "Microondas"],
            "Móveis": ["Camas", "Sofás", "Mesas", "Cadeiras", "Estantes"],
            "Ferramentas": ["Martelos", "Chaves de Fenda", "Serras", "Alicates"]
        },
        "Profissões": {
            "Saúde": ["Médicos", "Enfermeiros", "Dentistas", "Fisioterapeutas"],
            "Educação": ["Professores", "Pesquisadores", "Bibliotecários"],
            "Engenharia": ["Engenheiros Civis", "Engenheiros Mecânicos", "Engenheiros de Software"],
            "Artes": ["Artistas Plásticos", "Músicos", "Atores", "Escritores"]
        },
        "Tecnologia": {
            "Computadores": ["Laptops", "Desktops", "Servidores", "Tablets"],
            "Telecomunicações": ["Smartphones", "Modems", "Roteadores", "Antenas"],
            "Componentes": ["Processadores", "Memórias RAM", "Discos Rígidos", "Placas de Vídeo"],
            "Software": ["Sistemas Operacionais", "Aplicativos", "Jogos", "Banco de Dados"]
        }
    }

    const text = 'A natureza é um reino vasto e diversificado que abrange uma infinidade de animais e plantas, cada um desempenhando um papel crucial no equilíbrio ecológico. No reino dos animais, podemos observar uma grande variedade de mamíferos, que são divididos em várias categorias, como carnívoros, herbívoros, onívoros, primatas e cetáceos. Os carnívoros são conhecidos por sua dieta predominantemente de carne. Dentro desse grupo, os felinos são predadores notáveis, com espécies como leões, tigres, jaguares, leopardos, guepardos e pumas. Eles são conhecidos por suas habilidades de caça e pela sua força impressionante. Canídeos como lobos, raposas, cães e chacais também são predadores, mas com uma dieta que pode incluir uma mistura de carne e outros alimentos. Ursídeos, que incluem ursos e pandas, são geralmente conhecidos por sua alimentação variada, mas com uma forte tendência para a dieta de plantas e pequenos animais. Os herbívoros, por outro lado, alimentam-se principalmente de plantas. Os equídeos, como cavalos, zebras e asnos, são grandes herbívoros que desempenham papéis importantes em seus ecossistemas, ajudando a manter o equilíbrio da vegetação. Bovídeos, incluindo bois, búfalos, antílopes, cabras e ovelhas, também são herbívoros importantes que contribuem para o controle da vegetação e a dispersão de sementes. Roedores como ratos, esquilos, castores e capivaras são menores, mas desempenham papéis importantes na construção de habitats e na dispersão de sementes. Dentro dos onívoros, temos os suínos, como porcos e javalis, que são conhecidos por sua dieta variada e por seu impacto no ambiente. Ursídeos, como os ursos, também são onívoros e têm uma dieta que inclui tanto plantas quanto animais. Os primatas são conhecidos por sua inteligência e complexidade social. Espécies como gorilas, chimpanzés, orangotangos, bonobos e macacos exibem comportamentos sociais sofisticados e habilidades cognitivas avançadas. Já os cetáceos, que incluem baleias, golfinhos, narvais e orcas, são mamíferos marinhos com capacidades de comunicação e inteligência impressionantes. As aves são um grupo igualmente diversificado. As rapinas, como águia, falcão, coruja, milhafre e gavião, são conhecidas por suas habilidades de caça e visão aguçada. Pássaros como canários, papagaios, pardais, rouxinóis e andorinhas trazem cores vibrantes e sons melódicos ao ambiente. As aves aquáticas, como patos, gansos, cisnes e pelicanos, são adaptadas para viver em corpos d’água e desempenham papéis importantes nos ecossistemas aquáticos. Corvídeos, como corvos, gralhas e pega, são conhecidos por sua inteligência e comportamento social. Os répteis e anfíbios também fazem parte deste vasto reino. Crocodilianos, como crocodilos e jacarés, são predadores de topo em seus habitats aquáticos. Lagartos, como camaleões, iguana e varano, exibem uma ampla gama de adaptações para sobrevivência, enquanto serpentes, como cobras, jararacas, pítons e corais, são conhecidas por suas habilidades de caça e camuflagem. Quelônios, como tartarugas, cágados e jabutis, são adaptados para viver em ambientes variados, desde oceanos até habitats terrestres. Os anfíbios incluem rãs, como rãs e pererecas, que são conhecidas por sua capacidade de viver tanto na água quanto na terra. Sapos, como sapos e cururus, são outros exemplos de anfíbios com adaptações semelhantes. Salamandras, como salamandras e tritões, e cecílias, como cecílias, completam este grupo diversificado. No mundo dos peixes, encontramos cartilaginosos como tubarões e raias, que são predadores formidáveis nos oceanos. Os óseos, como salmões, atuns, badejos e carpas, incluem uma variedade de peixes com diferentes adaptações e comportamentos. Ciclídeos, como tilápias e acarás, são peixes conhecidos por sua diversidade e importância econômica. Os invertebrados são um grupo enorme que inclui insetos, como besouros, joaninhas, borboletas e mariposas. Aracnídeos, como aranhas e escorpiões, e crustáceos, como caranguejos, lagostas e camarões, são exemplos de invertebrados com habilidades únicas e papéis ecológicos importantes. Moluscos, como polvos, lulas e caracóis, também têm uma grande variedade de formas e funções no ambiente. Além da natureza, temos uma vasta gama de objetos que são parte do nosso cotidiano. Os veículos incluem terrestres, como carros, caminhões, motos, ônibus e bicicletas, que são essenciais para o transporte e mobilidade. Veículos aquáticos, como barcos, navios, submarinos e canoas, são fundamentais para a navegação e exploração de ambientes aquáticos. Os veículos aéreos, como aviões, helicópteros, planadores e dirigíveis, permitem o transporte aéreo e a exploração do céu. Os eletrodomésticos incluem geladeiras, fogões, máquinas de lavar e micro-ondas, que são indispensáveis para a vida moderna e facilitam muitas tarefas diárias. Os móveis, como camas, sofás, mesas, cadeiras e estantes, são essenciais para criar ambientes confortáveis e funcionais. As ferramentas, como martelos, chaves de fenda, serras e alicates, são fundamentais para a construção e manutenção. No campo das profissões, há uma enorme diversidade de carreiras e especializações. Na área da saúde, encontramos médicos, enfermeiros, dentistas e fisioterapeutas, que trabalham para manter e melhorar a saúde das pessoas. Na educação, professores, pesquisadores e bibliotecários são responsáveis por ensinar, pesquisar e preservar o conhecimento. Na engenharia, engenheiros civis, engenheiros mecânicos e engenheiros de software projetam e constroem estruturas, sistemas e tecnologias. No campo das artes, artistas plásticos, músicos, atores e escritores criam e interpretam obras que enriquecem a cultura e a sociedade. A tecnologia também desempenha um papel crucial na vida moderna. Os computadores, incluindo laptops, desktops, servidores e tablets, são ferramentas essenciais para o trabalho e o lazer. Na telecomunicações, smartphones, modems, roteadores e antenas permitem a comunicação global. Os componentes de computadores, como processadores, memórias RAM, discos rígidos e placas de vídeo, são essenciais para o funcionamento de dispositivos tecnológicos. O software, incluindo sistemas operacionais, aplicativos, jogos e banco de dados, fornece as funcionalidades necessárias para operar e utilizar a tecnologia moderna. Essa vasta gama de categorias e subcategorias ilustra a complexidade e a diversidade do mundo ao nosso redor, desde a natureza até os objetos e profissões que moldam a nossa vida cotidiana. Ao explorar essas áreas, podemos ganhar uma compreensão mais profunda do mundo e das várias maneiras como interagimos com ele.'

    const phraseAnalyzer = new PhraseAnalyzer(hierarchy);
    const result = phraseAnalyzer.analyze(text, 4);

    expect(result)
        .toBe('Carnívoros = 4; Herbívoros = 4; Onívoros = 2; Primatas = 2; Cetáceos = 1; Pássaros = 2; Aquáticas = 1; Corvídeos = 1; Crocodilianos = 1; Serpentes = 1; Quelônios = 1; Rãs = 1; Sapos = 1; Salamandras = 1; Ósseos = 1; Ciclídeos = 1; Insetos = 1; Aracnídeos = 1; Crustáceos = 1; Moluscos = 1');
})