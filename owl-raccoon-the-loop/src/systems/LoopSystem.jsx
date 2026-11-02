export class LoopSystem {
    static getLoopInfo(level) {
        if (level <= 5) {
            return { cycle: 1, name: 'NORMAL', description: 'Introdução aos controles e mecânicas básicas.' };
        } else if (level <= 10) {
            return { cycle: 2, name: 'GLITCH', description: 'Distorções visuais e plataformas instáveis.' };
        } else if (level <= 15) {
            return { cycle: 3, name: 'CHAOS', description: 'Gravidade alterada e ambientes dinâmicos.' };
        } else if (level <= 20) {
            return { cycle: 4, name: 'LOST FILES', description: 'Áreas ocultas e fragmentos narrativos.' };
        } else if (level <= 25) {
            return { cycle: 5, name: 'UNKNOWN', description: 'Regras inesperadas e comportamento abstrato.' };
        } else {
            return { cycle: 6, name: 'REWIND', description: 'Combinação de mecânicas e revelações finais.' };
        }
    }
}