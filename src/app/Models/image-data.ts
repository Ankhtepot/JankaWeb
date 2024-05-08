export class ImageData {
    public height: number;
    public width: number;

    constructor(
        public description: string,
        public imageUrl: string,
        public miniatureUrl?: string,
    ) {
    }
}
