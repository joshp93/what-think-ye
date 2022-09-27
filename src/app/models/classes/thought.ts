export class Thought {
    id: string;
    value: string;
    colour?: string;

    constructor(id: string, value: string, colour?: string) {
        this.id = id;
        this.value = value;
        this.colour = colour;
      }
}
