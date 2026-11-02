export class LoreSystem {
    static secrets = [
        {
            id: 'secret_085',
            title: 'Arquivo #085: Coordenadas de Origem',
            description: 'Um registro analógico corrompido que menciona pontos de encontro e frequências de rádio alternativas.',
            unlocked: false,
            relatedChar: 'owl'
        },
        {
            id: 'secret_good_garden',
            title: 'Good Garden Archive',
            description: 'Notas de estúdio e gravações fragmentadas encontradas nas paredes virtuais do ciclo de glitch.',
            unlocked: false,
            relatedChar: 'raccoon'
        }
    ];

    static getSecrets() {
        return this.secrets;
    }

    static unlockSecret(id) {
        const secret = this.secrets.find(s => s.id === id);
        if (secret && !secret.unlocked) {
            secret.unlocked = true;
            return true;
        }
        return false;
    }
}