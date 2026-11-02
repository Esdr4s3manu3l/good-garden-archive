export class GameRegistry {
    static initRegistry(registry) {
        registry.set('score', 0);
        registry.set('currentLevel', 1);
        registry.set('selectedChar', 'owl');
        registry.set('loopCycle', 1);
        registry.set('soundVolume', 0.8);
    }
}