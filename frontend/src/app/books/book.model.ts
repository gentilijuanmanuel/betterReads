export class Book {
    public isbn: string;
    public title: string;
    public author: {
        name: string;
        surname: string;
    };
    public description: string;
    public image: string;
    public genre: string;
    public quotes: [{
        quote: string;
    }];
    public reviews: [{
        stars: number;
        comment: string;
        user: string;
    }];

    constructor (isbn: string, title: string, author: {name: string, surname: string}, description: string, image: string, genre: string, quotes: [{ quote: string }], reviews: [{ stars: number, comment: string, user: string }]) {
        this.isbn = isbn;
        this.title = title;
        this.author.name = author.name;
        this.author.surname = author.surname;
        this.description = description;
        this.image = image;
        this.genre = genre;
        this.quotes = quotes;
        this.reviews = reviews;
    }
}