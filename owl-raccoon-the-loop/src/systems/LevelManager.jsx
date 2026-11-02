export class LevelManager {
    constructor(scene, level = 1) {
        this.scene = scene;
        this.currentLevel = level;
        this.score = 0;
        this.collectibles = [];
        this.initLevelData();
    }

    initLevelData() {
        this.collectibles = [
            { id: `l${this.currentLevel}_c1`, type: 'coin', x: 120, y: 100, collected: false },
            { id: `l${this.currentLevel}_c2`, type: 'coin', x: 200, y: 70, collected: false },
            { id: `l${this.currentLevel}_f1`, type: 'film_roll', x: 280, y: 50, collected: false }
        ];
    }

    getCollectibles() {
        return this.collectibles;
    }

    collectItem(id) {
        const item = this.collectibles.find(i => i.id === id);
        if (item && !item.collected) {
            item.collected = true;
            if (item.type === 'coin') this.score += 100;
            if (item.type === 'film_roll') this.score += 500;
            return this.score;
        }
        return this.score;
    }

    getCurrentScore() {
        return this.score;
    }
}