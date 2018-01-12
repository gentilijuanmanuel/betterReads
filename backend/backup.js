//copy this script and paste it in data/db/scripts. Then, type load("/data/db/scripts/backup.js") in the mongo shell.

conn = new Mongo();
db = conn.getDB("better-reads");


//insert 11 authors

db.authors.insertMany([
    {
        name: "Georges",
        surname: "Perec",
        dateOfBirth: "07-03-1936",
        dateOfDeath: "03-03-1982",
        gender: "M",
        nationality: "Francia",
        language: "Francés",
        ocupation: "Escritor, guionista, bibliotecario",
        photo: "georges-perec.jpg"
    },
    {
        name: "Jorge Luis",
        surname: "Borges",
        dateOfBirth: "24-08-1899",
        dateOfDeath: "14-06-1986",
        gender: "M",
        nationality: "Argentina",
        language: "Español",
        ocupation: "Escritor, poeta, ensayista, traductor, crítico literario, bibliotecario, profesor, editor",
        photo: "jorge-luis-borges.jpg"
    },
    {
        name: "Julio Florencio",
        surname: "Cortázar",
        dateOfBirth: "26-08-1914",
        dateOfDeath: "12-02-1984",
        gender: "M",
        nationality: "Argentina",
        language: "Español",
        ocupation: "Escritor, profesor, traductor",
        photo: "julio-florencio-cortazar.jpg"
    },
    {
        name: "Mario Augusto",
        surname: "Bunge",
        dateOfBirth: "21-09-1919",
        dateOfDeath: "",
        gender: "M",
        nationality: "Argentina",
        language: "Español",
        ocupation: "Físico, filósofo, ensayista, sociólogo, profesor universitario y escritor",
        photo: "mario-augusto-bunge.jpg"
    },
    {
        name: "Edgar Allan",
        surname: "Poe",
        dateOfBirth: "19-01-1809",
        dateOfDeath: "07-10-1849",
        gender: "M",
        nationality: "Estados Unidos",
        language: "Inglés",
        ocupation: "Escritor, cuentista, poeta, crítico, periodista y editor",
        photo: "edgar-allan-poe.jpg"
    },
    {
        name: "Roberto",
        surname: "Bolaño",
        dateOfBirth: "28-04-1953",
        dateOfDeath: "15-07-2003",
        gender: "M",
        nationality: "Chile",
        language: "Español",
        ocupation: "Escritor y poeta",
        photo: "roberto-bolanio.jpg"
    },
    {
        name: "Ernest Miller",
        surname: "Hemingway",
        dateOfBirth: "21-07-1899",
        dateOfDeath: "02-07-1961",
        gender: "M",
        nationality: "Estados Unidos",
        language: "Inglés",
        ocupation: "Escritor y periodista",
        photo: "ernest-miller-hemingway.jpg"
    },
    {
        name: "Umberto",
        surname: "Eco",
        dateOfBirth: "05-01-1932",
        dateOfDeath: "19-02-2016",
        gender: "M",
        nationality: "Italia",
        language: "Italiano",
        ocupation: "Escritor, filósofo, profesor",
        photo: "umberto-eco.jpg"
    },
    {
        name: "Jack",
        surname: "Kerouac",
        dateOfBirth: "12-03-1922",
        dateOfDeath: "12-10-1969",
        gender: "M",
        nationality: "Estados Unidos",
        language: "Inglés",
        ocupation: "Novelista y poeta",
        photo: "jack-kerouac.jpg"
    },
    {
        name: "Martín",
        surname: "Caparrós",
        dateOfBirth: "29-05-1957",
        dateOfDeath: "-",
        gender: "M",
        nationality: "Argentina",
        language: "Español",
        ocupation: "Escritor y periodista",
        photo: "martin-caparros.jpg"
    },
    {
        name: "John Maxwell",
        surname: "Coetzee",
        dateOfBirth: "09-02-1940",
        dateOfDeath: "",
        gender: "M",
        nationality: "Sudáfrica y Australia",
        language: "Inglés",
        ocupation: "Lingüista, escritor, novelista, ensayista, traductor, libretista, guionista, profesor universitario y poeta",
        photo: "john-maxwell-coetzee.jpg"
    }
]);

//insert 11 books
db.books.insertMany([
    {
        isbn: "9788433920584",
        title: "La vida instrucciones de uso",
        author: "5a4909d0f968176678703d9d",
        description: "Se trata de la obra más ambiciosa del autor. Sin ser una novela de consumo masivo, ha sido traducida a numerosos idiomas y se considera una obra maestra1​ y de culto. En Francia es reconocida como uno de los mejores libros del siglo XX. El mismo año de su publicación, su autor recibió por esta obra el Premio Médicis.",
        image: "la-vida-instrucciones-de-uso.jpg",
        genre: "Novela"
    },
    {
        isbn: "9789875667181",
        title: "Historia de la eternidad",
        author: "5a4909d0f968176678703d9e",
        description: "En este libro de ensayos, el autor diserta con largueza acerca del tiempo y la eternidad, principalmente desde los puntos de vista platónico, cristiano y nietzscheano.",
        image: "historia-de-la-eternidad.jpg",
        genre: "Ensayo"
    },
    {
        isbn: "9788466327589",
        title: "Historia de cronopios y famas",
        author: "5a4909d0f968176678703d9f",
        description: "es una obra fantástica del escritor Julio Cortázar publicada en 1962 por el editorial Minotauro. Esta obra se caracteriza esencialmente por ser escrita a base de fragmentos, cuentos cortos y con un surrealismo que conlleva al desarrollo de la imaginación.",
        image: "historia-de-cronopios-y-famas.jpg",
        genre: "Fantástico"
    },
    {
        isbn: "9788492422593",
        title: "La ciencia, su método y su filosofía",
        author: "5a4909d0f968176678703da0",
        description: "Es una obra hecha con el fin de explicar de manera simple qué es la ciencia, cómo funciona y para qué sirve.",
        image: "la-ciencia.jpg",
        genre: "Filosofía"
    },
    {
        isbn: "9785551056782",
        title: "El escarabajo de oro",
        author: "5a4909d0f968176678703da1",
        description: "es un cuento del escritor estadounidense Edgar Allan Poe. Su lenguaje es sencillo pero con muchas alusiones a obras de otros autores, a citas de autoridad, y un criptograma.",
        image: "el-escarabajo-de-oro.jpg",
        genre: "Terror"
    },
    {
        isbn: "9781429934459",
        title: "Los detectives salvajes",
        author: "5a4909d0f968176678703da2",
        description: "Es la quinta novela del escritor chileno Roberto Bolaño, publicada en 1998. Ganó en el año 1998 el premio Herralde y en 1999 el premio Rómulo Gallegos.​ La novela ha recibido gran cantidad de elogios, tanto de escritores como de críticos especializados.",
        image: "los-detectives-salvajes.jpg",
        genre: "Novela"
    },
    {
        isbn: "9780099908401",
        title: "El viejo y el mar",
        author: "5a4909d0f968176678703da3",
        description: "Es una novela escrita por Ernest Miller Hemingway en 1951 en Cuba y publicada en 1952. Fue su último trabajo de ficción importante publicado en vida y posiblemente su obra más famosa.",
        image: "el-viejo-y-el-mar.jpg",
        genre: "Novela"
    },
    {
        isbn: "9788497592581",
        title: "El nombre de la rosa",
        author: "5a4909d0f968176678703da4",
        description: "Es una novela histórica de misterio escrita por Umberto Eco y publicada en 1980.2",
        image: "el-nombre-de-la-rosa.jpg",
        genre: "Novela"
    },
    {
        isbn: "9780848814014",
        title: "En el camino",
        author: "5a4909d0f968176678703da5",
        description: "Es una novela en parte autobiográfica escrita como un monólogo interior y está basada en los viajes que Kerouac y sus amigos hicieron por los Estados Unidos y México entre 1947 y 1950 y contribuyó a la mitificación de la ruta 66.",
        image: "en-el-camino.jpg",
        genre: "Diario de viajes"
    },
    {
        isbn: "9789875806689",
        title: "Amor y anarquía",
        author: "5a4909d0f968176678703da6",
        description: "Libro del género non-fiction, que narra la vida de Soledad Rosas, una anarquista argentina.",
        image: "amor-y-anarquia.jpg",
        genre: "No ficción"
    },
    {
        isbn: "9788497930727",
        title: "Juventud",
        author: "5a4909d0f968176678703da7",
        description: "Es una novela semi-autobiográfica que cuenta la historia de John, un joven universitario sudafricano, estudiante de matemáticas pero con ínfulas de poeta. Es el retrato del artista adolescente, sus tribulaciones, dudas, temores, deseos, el ir y venir enloquecido entre un presente doloroso e insatisfactorio y el futuro en que será reconocido por el valor de su arte.",
        image: "juventud.jpg",
        genre: "Biografía"
    }
]);

//insert 3 quotes
db.quotes.insertMany([
    {
        book: "5a492611f968176678703da8",
        description: "Es una excelente novela total, o novela de novelas. Si desean ver el potencial de Perec al máximo, no duden en leerlo.",
        user: ""
    },
    {
        book: "5a492611f968176678703daa",
        description: "Surrealismo literario en su máxima expresión. Es como leer un cuadro de Dalí. Gran libro de una de las mentes más creativas de la literatura del siglo XX.",
        user: ""
    },
    {
        book: "5a492611f968176678703dab",
        description: "Gran lectura de iniciación al fabuloso y entretenido mundo de la filosofía de la ciencia. Lectura recomendada para científicos, filósofos, ingenieros y, en general, para cualquier entusiasta de la ciencia.",
        user: ""
    }
]);