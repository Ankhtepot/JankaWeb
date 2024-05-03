export class ImageData {
    public height: number;
    public width: number;

    constructor(
        public description: string,
        public miniatureUrl: string,
        public imageUrl: string,
    ) {
    }
}
