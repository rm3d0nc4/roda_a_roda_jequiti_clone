
class Roulette {
    items: Array<number> = [
        0, -1, 50, 100, 300, 200, 400, 500, 1000,
        0, -1, 50, 100, 200, 300, 400, 500, 1000,
    ];

    spin(): number {
        let valor: number = Math.random() * (0 - this.items.length) + 0;
        return this.items[valor];
    }
}