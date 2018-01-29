export class Author {
    public name: string;
    public surname: string;
    public dateOfBirth: string;
    public dateOfDeath: string;
    public gender: string;
    public nationality: string;
    public language: string;
    public ocupation: string;
    public photo: string;
    public books: number[];

    constructor (name: string, surname: string, dateOfBirth: string, dateOfDeath: string, gender: string, nationality: string, language: string, ocupation: string, photo: string, books: number[]) {
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.dateOfDeath = dateOfDeath;
        this.gender = gender;
        this.nationality = nationality;
        this.language = language;
        this.ocupation = ocupation;
        this.photo = photo;
        this.books = books;
    }
}