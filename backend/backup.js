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
        photo: "georges-perec.jpg",
        books: [
            "5a70ac2ebd64408e8d3c7a45"
        ],
        quotes: [
            {
                quote: "Busco a un tiempo lo eterno y lo efímero.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "'Vivo en el planeta tierra' ¿Tendré un día la oportunidad de decírselo a alguien?",
                user: "Ana Malucchi"
            }
        ],
        reviews: [
            {
                stars: 5,
                comment: "Autor único en su especie.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 3,
                comment: "Sus libros son extremadamente creativos.",
                user: "Ana Malucchi"
            }
        ]
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
        photo: "jorge-luis-borges.jpg",
        books: [
            "5a70ac2ebd64408e8d3c7a46"
        ],
        quotes: [
            {
                quote: "He cometido el peor pecado que uno puede cometer. No he sido feliz.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Somos nuestra memoria, somos ese quimérico museo de formas inconstantes, ese montón de espejos rotos.",
                user: "Julián Poma"
            }
        ],
        reviews: [
            {
                stars: 5,
                comment: "Una biblioteca andante.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 5,
                comment: "Muy volado, pero respetable.",
                user: "Ana Malucchi"
            }
        ]
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
        photo: "julio-florencio-cortazar.jpg",
        books: [
            "5a70ac2ebd64408e8d3c7a47"
        ],
        quotes: [
            {
                quote: "Lo que me gusta de tu cuerpo es el sexo. Lo que me gusta de tu sexo es la boca. Lo que me gusta de tu boca es la lengua. Lo que me gusta de tu lengua es la palabra.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "¡Música! Melancólico alimento para los que vivimos de amor",
                user: "Ana Malucchi"
            }
        ],
        reviews: [
            {
                stars: 3,
                comment: "Sus cuentos son un reto para la imaginación y desafían los límites de la creatividad.",
                user: "Julián Poma"
            },
            {
                stars: 5,
                comment: "Desde Los Reyes hasta Los autonautas de la Cosmopista, un genio.",
                user: "Juan Manuel Gentili"
            }
        ]
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
        photo: "mario-augusto-bunge.jpg",
        books: [
            "5a70ac2ebd64408e8d3c7a48"
        ],
        quotes: [
            {
                quote: "Disfruta de la vida y ayuda a otros a vivir una vida digna de ser disfrutada.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Las pseudociencias son como las pesadillas: se desvanecen cuando se las examina a la luz de la ciencia.",
                user: "Juan Manuel Gentili"
            }
        ],
        reviews: [
            {
                stars: 5,
                comment: "Muy prolijo como pensador. Su coherencia es destacable.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 3,
                comment: "Me introdujo en el mundo de las ciencias.",
                user: "Julián Poma"
            }
        ]
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
        photo: "edgar-allan-poe.jpg",
        books: [
            "5a70ac2ebd64408e8d3c7a49"
        ],
        quotes: [
            {
                quote: "Los que sueñan de día son conscientes de muchas cosas que escapan a los que sueñan sólo de noche.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Me volví loco, con largos intervalos de horrible cordura.",
                user: "Julián Poma"
            }
        ],
        reviews: [
            {
                stars: 4,
                comment: "Una pluma destacada de la literatura del siglo XIX.",
                user: "Ana Malucchi"
            },
            {
                stars: 4,
                comment: "El fundador del género policial. Una joya.",
                user: "Julián Poma"
            }
        ]
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
        photo: "roberto-bolanio.jpg",
        books: [
            "5a70ac2ebd64408e8d3c7a4a"
        ],
        quotes: [
            {
                quote: "Todos los escritores, incluso los más mediocres, los más falsos, los peores del mundo, han sentido la sombra de ese éxtasis de la creación.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Yo no me siento el mejor narrador chileno, ni siquiera me preocupa eso. A mí lo único que me interesa en el momento de escribir es hacerlo con una mínima decencia, que no me avergüence al cabo de un tiempo de lo que he escrito, no lanzar palabras al vacío.",
                user: "Julián Poma"
            }
        ],
        reviews: [
            {
                stars: 5,
                comment: "Un escritor salvaje.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 2,
                comment: "Escribía escuchando heavy metal con auriculares. Eso explica todo.",
                user: "Julián Poma"
            }
        ]
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
        photo: "ernest-miller-hemingway.jpg",
        books: [
            "5a70ac2ebd64408e8d3c7a4b"
        ],
        quotes: [
            {
                quote: "Nunca confundas movimiento con acción.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "La felicidad es la cosa más rara que conozco en la gente inteligente.",
                user: "Julián Poma"
            }
        ],
        reviews: [
            {
                stars: 5,
                comment: "Con El viejo y el agua comencé un interminable camino: el de la beuna literatura.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 3,
                comment: "Una vida maravillosa. Una obra igual.",
                user: "Ana Malucchi"
            }
        ]
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
        photo: "umberto-eco.jpg",
        books: [
            "5a70ac2ebd64408e8d3c7a4c"
        ],
        quotes: [
            {
                quote: "Adoro a los gatos. Son de las pocas criaturas que no se dejan explotar por sus dueños.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "El drama de internet es que ha promovido al tonto del pueblo como el portador de la verdad.",
                user: "Julián Poma"
            }
        ],
        reviews: [
            {
                stars: 3,
                comment: "Gran pensador. Gran erudito de estos tiempos.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 5,
                comment: "Excelente en todos sus libros.",
                user: "Ana Malucchi"
            }
        ]
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
        photo: "jack-kerouac.jpg",
        books: [
            "5a70ac2ebd64408e8d3c7a4d"
        ],
        quotes: [
            {
                quote: "Enamórate de tu existencia.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "La vida es un país extranjero.",
                user: "Juan Manuel Gentili"
            }
        ],
        reviews: [
            {
                stars: 3,
                comment: "No fue un intelectual, pero su vida en sí se convirtió en una obra. A él le debemos la generación beat.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 4,
                comment: "Me inspira mucho su vida.",
                user: "Julián Poma"
            }
        ]
    },
    {
        name: "Martín",
        surname: "Caparrós",
        dateOfBirth: "29-05-1957",
        dateOfDeath: "",
        gender: "M",
        nationality: "Argentina",
        language: "Español",
        ocupation: "Escritor y periodista",
        photo: "martin-caparros.jpg",
        books: [
            "5a70ac2ebd64408e8d3c7a4e"
        ],
        quotes: [
            {
                quote: "¿Para qué sirve la literatura sino para producir más literatura que a su vez sea consumida como literatura para que a su vez produzca más literatura?",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Estoy a punto de desarrollar una hipótesis sobre la cual sólo hay que leer los principios, porque son los sectores de los libros en los que los autores más han trabajado.",
                user: "Julián Poma"
            }
        ],
        reviews: [
            {
                stars: 4,
                comment: "Impecable. De lo mejor de la literatura argentina contemporánea.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 2,
                comment: "Muy zurdo.",
                user: "Julián Poma"
            }
        ]
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
        photo: "john-maxwell-coetzee.jpg",
        books: [
            "5a70ac2ebd64408e8d3c7a4f"
        ],
        quotes: [
            {
                quote: "El destino reparte cartas y tu juegas la mano que te ha tocado. No gimoteas, no te quejas",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Amor: eso que el corazón ansía dolorosamente",
                user: "Ana Malucchi"
            }
        ],
        reviews: [
            {
                stars: 4,
                comment: "Nadie como él sabe retratar mejor el sufrimiento humano. Merecido Nobel.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 5,
                comment: "Sin palabras.",
                user: "Julián Poma"
            }
        ]
    }
]);



//insert 11 books
db.books.insertMany([
    {
        isbn: "9788433920584",
        title: "La vida instrucciones de uso",
        author: {
            name: "Georges",
            surname: "Perec"
        },
        description: "Se trata de la obra más ambiciosa del autor. Sin ser una novela de consumo masivo, ha sido traducida a numerosos idiomas y se considera una obra maestra1​ y de culto. En Francia es reconocida como uno de los mejores libros del siglo XX. El mismo año de su publicación, su autor recibió por esta obra el Premio Médicis.",
        image: "la-vida-instrucciones-de-uso.jpg",
        genre: "Novela",
        quotes: [
            {
                quote: "Nueve elevado a la nueve elevado a la nueve, que es el número mayor que se puede escribir usando sólo tres cifras, tendría, si se escribiera entero, trescientos sesenta y nueve millones de cifras; a razón de una cifra por segundo, se tardaría once años en escribirlo; y calculando dos cifras por centímetro, tendría mil ochocientos kilómetros de largo.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Una pregunta que se hacía a sí mismo -¿qué hacer?-, una respuesta que se iba esbozando: nada.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Había en aquella mirada que lo evitaba algo mucho más violento que el vacío, algo que no era orgullo u odio, sino más bien pánico, algo así como una esperanza insensata, una llamada de socorro, una señal de naufragio.",
                user: "Julián Poma"
            }
        ],
        reviews: [
            {
                stars: 5,
                comment: "El universo entero resumido en un libro. O en una casa. Prueba fidedigna del afán de totalidad de Perec.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 3,
                comment: "Muy buena novela. Me interesaron mucho los juegos matemáticos propios de un miembro de la Oulipo.",
                user: "Julián Poma"
            }
        ]
    },
    {
        isbn: "9789875667181",
        title: "Historia de la eternidad",
        author: {
            name: "Jorge Luis",
            surname: "Borges"
        },
        description: "En este libro de ensayos, el autor diserta con largueza acerca del tiempo y la eternidad, principalmente desde los puntos de vista platónico, cristiano y nietzscheano.",
        image: "historia-de-la-eternidad.jpg",
        genre: "Ensayo",
        quotes: [
            {
                quote: "Nadie pierde el pasado ni el provenir, pues a nadie pueden quitarle lo que no tiene.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Para los griegos era imposible un nombre sustantivo sin alguna corporeidad.",
                user: "Julián Poma"
            }
        ],
        reviews: [
            {
                stars: 4,
                comment: "Borges en modo ensayo: una pluma exquisita.",
                user: "Juan Manuel Gentili"
            }
        ]
    },
    {
        isbn: "9788466327589",
        title: "Historia de cronopios y famas",
        author: {
            name: "Julio Florencio",
            surname: "Cortázar"
        },
        description: "Es una obra fantástica del escritor Julio Cortázar publicada en 1962 por el editorial Minotauro. Esta obra se caracteriza esencialmente por ser escrita a base de fragmentos, cuentos cortos y con un surrealismo que conlleva al desarrollo de la imaginación.",
        image: "historia-de-cronopios-y-famas.jpg",
        genre: "Fantástico",
        quotes: [
            {
                quote: "Pasa que los cronopios no quieren tener hijos, porque lo primero que hace un cronopio recién nacido es insultar groseramente a su padre, en quien oscuramente ve la acumulación de desdichas que un día serán suyas.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Cuando los cronopios cantan sus canciones preferidas, se entusiasman de tal manera que con frecuencia se dejan atropellar por camiones y ciclistas, se caen por la ventana, y pierden lo que llevaban en los bolsillos, y hasta la cuenta de los días.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Un cronopio pequeñito buscaba la llave de la puerta de calle en la mesa de luz, la mesa de luz en el dormitorio, el dormitorio en la casa, la casa en la calle. Aquí se detenía el cronopio, pues para salir a la calle precisaba la llave de la puerta.",
                user: "Julián Poma"
            }
        ],
        reviews: [
            {
                stars: 5,
                comment: "Uno de los mejores libros surrealistas que leí en mi vida. Un verdadero viaje por la mente de este prolífico autor.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 3,
                comment: "A Julio le debo mi adolescencia. Genio. Cronopio.",
                user: "Ana Malucchi"
            }
        ]
    },
    {
        isbn: "9788492422593",
        title: "La ciencia, su método y su filosofía",
        author: {
            name: "Mario Augusto",
            surname: "Bunge"
        },
        description: "Es una obra hecha con el fin de explicar de manera simple qué es la ciencia, cómo funciona y para qué sirve.",
        image: "la-ciencia.jpg",
        genre: "Filosofía",
        quotes: [
            {
                quote: "Los enunciados de las ciencias fácticas se refieren, en su mayoría, a entes extracientíficos: a sucesos y procesos.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Son demasiados los argumentos filosóficos que se ajustan al siguiente molde: 'X está equivocado, porque lo que dice contradice lo que escribió el Maestro Y'.",
                user: "Ana Malucchi"
            },
            {
                quote: "No existen respuestas definitivas, y ello simplemente porque no existen preguntas finales.",
                user: "Julián Poma"
            }
        ],
        reviews: [
            {
                stars: 4,
                comment: "Este libro es una lectura indispensable para cualquiera que desee dedicarse a la ciencia o conocer cómo ésta se desarrolla.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 3,
                comment: "Uno de los libros más famosos del gran Bunge.",
                user: "Ana Malucchi"
            }
        ]
    },
    {
        isbn: "9785551056782",
        title: "El escarabajo de oro",
        author: {
            name: "Edgar Allan",
            surname: "Poe"
        },
        description: "es un cuento del escritor estadounidense Edgar Allan Poe. Su lenguaje es sencillo pero con muchas alusiones a obras de otros autores, a citas de autoridad, y un criptograma.",
        image: "el-escarabajo-de-oro.jpg",
        genre: "Terror",
        quotes: [
            {
                quote: "¡Es la cosa más encantadora de la creación! —¿El qué? ¿El amanecer? —¡Qué disparate! ¡No! ¡El escarabajo!",
                user: "Juan Manuel Gentili"
            }
        ],
        reviews: [
            {
                stars: 4,
                comment: "Cuento terrorífico de un autor igualmente terrorífico.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 1,
                comment: "Prefiero a Stephen King.",
                user: "Julián Poma"
            }
        ]
    },
    {
        isbn: "9781429934459",
        title: "Los detectives salvajes",
        author: {
            name: "Roberto",
            surname: "Bolaño"
        },
        description: "Es la quinta novela del escritor chileno Roberto Bolaño, publicada en 1998. Ganó en el año 1998 el premio Herralde y en 1999 el premio Rómulo Gallegos.​ La novela ha recibido gran cantidad de elogios, tanto de escritores como de críticos especializados.",
        image: "los-detectives-salvajes.jpg",
        genre: "Novela",
        quotes: [
            {
                quote: "Hay momentos para recitar poesías y hay momentos para boxear.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Todos los libros del mundo están esperando a que los lea.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Una risa que me empujaba a salir huyendo de su lado y que al mismo tiempo me proporcionaba la certeza de que no existía ningún lugar adonde pudiera huir.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Hay una literatura para cuando estás aburrido. Abunda. Hay una literatura para cuando estás calmado. Esta es la mejor literatura, creo yo. También hay una literatura para cuando estás triste. Y hay una literatura para cuando estás alegre. Hay una literatura para cuando estás ávido de conocimiento. Y hay una literatura para cuando estás desesperado. Esta ultima es la que quisieron hacer Ulises Lima y Belano.",
                user: "Juan Manuel Gentili"
            }
        ],
        reviews: [
            {
                stars: 5,
                comment: "Novela total. Increíble. Traspasa todos los límites imaginables.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 3,
                comment: "Me la recomendó mi hijo. Me gustó mucho.",
                user: "Ana Malucchi"
            }
        ]
    },
    {
        isbn: "9780099908401",
        title: "El viejo y el mar",
        author: {
            name: "Ernest Miller",
            surname: "Hemingway"
        },
        description: "Es una novela escrita por Ernest Miller Hemingway en 1951 en Cuba y publicada en 1952. Fue su último trabajo de ficción importante publicado en vida y posiblemente su obra más famosa.",
        image: "el-viejo-y-el-mar.jpg",
        genre: "Novela",
        quotes: [
            {
                quote: "-Yo siempre encuentro quien me preste dos pesos y medio. -Creo que yo también. Pero trato de no pedir prestado. Primero pides prestado; luego pides limosna.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Todo en él era viejo a excepción de los ojos, del mismo color del mar, alegres y sin derrotas.",
                user: "Julián Poma"
            },
            {
                quote: "El hombre no está hecho para la derrota. Un hombre puede ser destruido, pero no derrotado.",
                user: "Juan Manuel Gentili"
            }
        ],
        reviews: [
            {
                stars: 5,
                comment: "Oda a la perseverancia.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 4,
                comment: "Excelente novela.",
                user: "Julián Poma"
            }
        ]
    },
    {
        isbn: "9788497592581",
        title: "El nombre de la rosa",
        author: {
            name: "Umberto",
            surname: "Eco"
        },
        description: "Es una novela histórica de misterio escrita por Umberto Eco y publicada en 1980.",
        image: "el-nombre-de-la-rosa.jpg",
        genre: "Novela",
        quotes: [
            {
                quote: "Dentro de poco me reuniré con mi principio, y ya no creo que éste sea el Dios de gloria del que me hablaron los abades de mi orden, ni el de júbilo, como creían los franciscanos de aquella época, y quizá ni siquiera sea el Dios de piedad.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "No hay progreso, no hay revolución de las épocas en las vicisitudes del saber, sino, a lo sumo, permanente y sublime recapitulación.",
                user: "Ana Malucchi"
            },
            {
                quote: "Creo que, como los baños, la risa es una buena medicina para curar los humores y otras afecciones del cuerpo, sobre todo la melancolía.",
                user: "Julián Poma"
            }
        ],
        reviews: [
            {
                stars: 4,
                comment: "Excelente pantallazo de la vida en la Edad Media.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 3,
                comment: "Tanto el libro como la película son excepcionales.",
                user: "Julián Poma"
            }
        ]
    },
    {
        isbn: "9780848814014",
        title: "En el camino",
        author: {
            name: "Jack",
            surname: "Kerouac"
        },
        description: "Es una novela en parte autobiográfica escrita como un monólogo interior y está basada en los viajes que Kerouac y sus amigos hicieron por los Estados Unidos y México entre 1947 y 1950 y contribuyó a la mitificación de la ruta 66.",
        image: "en-el-camino.jpg",
        genre: "Diario de viajes",
        quotes: [
            {
                quote: "No sabia a donde ir excepto a todas partes.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Estaba contento de nuevo. Lo único que necesitaba era un volante entre las manos y cuatro ruedas sobre la carretera.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "Todavía nos quedaba mucho camino. Pero no nos importaba: la carretera es la vida.",
                user: "Ana Malucchi"
            }
        ],
        reviews: [
            {
                stars: 4,
                comment: "El diario de viaje más emocionante. Kerouac inmortalizó la generación beat.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 3,
                comment: "Una ecografía de Estados Unidos de la mano de un loco de remate, de un soñador.",
                user: "Julián Poma"
            }
        ]
    },
    {
        isbn: "9789875806689",
        title: "Amor y anarquía",
        author: {
            name: "Martín",
            surname: "Caparrós"
        },
        description: "Libro del género non-fiction, que narra la vida de Soledad Rosas, una anarquista argentina.",
        image: "amor-y-anarquia.jpg",
        genre: "No ficción",
        quotes: [
            {
                quote: "Me preguntaba cómo se arma una vida. ¿Con qué pequeños datos y grandes decisiones se va trazando ese retrato que, alguna vez, será lo que quede de esos años? ¿Piensan los hombres, las mujeres en el dibujo de sus propias biografías cuando toman ciertas decisiones, determinadas vías? ¿O sus vidas más que nada les suceden, se transforman en su historia cuando ya son historia, cuando no hay mucho que se pueda cambiar salvo el relato? Me preguntaba: ¿quién arma cada vida?",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "¿Qué transforma las vidas? ¿Qué hace que de pronto todo cambie? Minucias, supongamos: un viejo barbudo que dice que vayan a tal parte porque acaba de recordar que justo allí, la mirada de un chico que hace temblar las piernas de una chica, la espera de una palabra que no llega si otra la reemplaza, la lluvia que te cambia los plantes poco antes y entonces sin ella nunca te habrías cruzado con aquel, un libro que te destella con sus tapas rojas, el coche que dobla donde no debiera, el terror de que nada está trazado: la sucesión de los azares, las tentativas laboriosas de darles un sentido, la tontería, la cobardía de precisar que tengan un sentido. Las decisiones que se toman, después de los azares. Más azares.",
                user: "Juan Manuel Gentili"
            }
        ],
        reviews: [
            {
                stars: 4,
                comment: "Uno de los mejores non-fiction que arrojó la literatura argentina.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 3,
                comment: "Desgarradora historia. Real.",
                user: "Ana Malucchi"
            }
        ]
    },
    {
        isbn: "9788497930727",
        title: "Juventud",
        author: {
            name: "John Maxwell",
            surname: "Coetzee"
        },
        description: "Es una novela semi-autobiográfica que cuenta la historia de John, un joven universitario sudafricano, estudiante de matemáticas pero con ínfulas de poeta. Es el retrato del artista adolescente, sus tribulaciones, dudas, temores, deseos, el ir y venir enloquecido entre un presente doloroso e insatisfactorio y el futuro en que será reconocido por el valor de su arte.",
        image: "juventud.jpg",
        genre: "Biografía",
        quotes: [
            {
                quote: "Está demostrando algo: que todo hombre es una isla.",
                user: "Juan Manuel Gentili"
            },
            {
                quote: "¿Qué es verdad: la felicidad, la infelicidad o un punto medio entre una y la otra?",
                user: "Ana Malucchi"
            }
        ],
        reviews: [
            {
                stars: 5,
                comment: "La iniciación de una estrella literaria, contada por él mismo.",
                user: "Juan Manuel Gentili"
            },
            {
                stars: 3,
                comment: "Novela por demás de triste.",
                user: "Ana Malucchi"
            }
        ]
    }
]);
