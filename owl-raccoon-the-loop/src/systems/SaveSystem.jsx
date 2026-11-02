const SAVE_KEY = 'owl_raccoon_save_v1';

export class SaveSystem {
    static loadGame() {
        try {
            const rawData = localStorage.getItem(SAVE_KEY);
            if (!rawData) {
                return this.getDefaultSave();
            }
            const data = JSON.parse(rawData);
            if (!data.version || !data.secretsDiscovered) {
                return this.getDefaultSave();
            }
            return data;
        } catch (e) {
            console.warn('Erro ao carregar dados salvos. A restaurar padrão.', e);
            return this.getDefaultSave();
        }
    }

    static saveGame(data) {
        try {
            const current = this.loadGame();
            const updated = { ...current, ...data };
            localStorage.setItem(SAVE_KEY, JSON.stringify(updated));
        } catch (e) {
            console.error('Falha ao gravar dados no LocalStorage:', e);
        }
    }

    static getDefaultSave() {
        return {
            version: '0.1.0',
            currentLevel: 1,
            maxLevelUnlocked: 1,
            selectedChar: 'owl',
            score: 0,
            secretsDiscovered: [],
            settings: {
                soundVolume: 0.8,
                crtFilter: true
            }
        };
    }
}