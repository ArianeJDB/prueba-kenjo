export interface AlbumsDTO {
        _id: string;
        title: string;
        artistId?: string;
        coverUrl: string;
        year: number;
        genre: string;
}