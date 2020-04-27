const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const Movies = require('../models/movie');
const Directors = require('../models/director');

const directorsJson = [
    { "name": "Quentin Tarantino", "age": 55 }, // "5ea42208e7179a4ee710c1d7"
    { "name": "Michael Radford", "age": 72 }, // "5ea42381e7179a4ee710c240"
    { "name": "James McTeigue", "age": 51 }, // "5ea423b3e7179a4ee710c248"
    { "name": "Guy Ritchie", "age": 50 }, // "5ea423e3e7179a4ee710c24b"
];


const moviesJson = [
    { "name": "Pulp Fiction", "genre": "Crime", "directorId": "5ea42208e7179a4ee710c1d7" },
    { "name": "1984", "genre": "Sci-Fi", "directorId": "5ea42381e7179a4ee710c240" },
    { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "5ea423b3e7179a4ee710c248" },
    { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "5ea423e3e7179a4ee710c24b" },
    { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "5ea42208e7179a4ee710c1d7" },
    { "name": "The Hateful Eight", "genre": "Crime", "directorId": "5ea42208e7179a4ee710c1d7" },
    { "name": "Inglourious Basterds", "genre": "Crime", "directorId": "5ea42208e7179a4ee710c1d7" },
    { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "5ea423e3e7179a4ee710c24b" },
];

const movies = [
    { id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '101' },
    { id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2emcdjarm' },
    { id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '34' },
    { id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '43' },
    { id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '101' },
    { id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: '101' },
    { id: '7', name: 'Inglourious Basterds', genre: 'Crime', directorId: '101' },
    { id: '7', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '43' },
];

const directors = [
    { id: '101', name: 'Quentin Tarantino', age: 55 },
    { id: '2emcdjarm', name: 'Michael Radford', age: 72 },
    { id: '34', name: 'James McTeigue', age: 51 },
    { id: '43', name: 'Guy Ritchie', age: 50 },
];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        director: { type: DirectorType, resolve(parent, args) {
                // return directors.find(director => director.id === parent.directorId)
                return Directors.findById(parent.directorId)
            } },
    }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return movies.filter(movie => movie.directorId === parent.id)
                return Movies.find({ directorId: parent.id })
            }
        }
    }),
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                const { name, age } = args;
                const director = new Directors({
                    name, age
                });

                return director.save();
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                directorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                const { name, genre, directorId } = args;
                const movie = new Movies({
                    name, genre, directorId
                });
                return movie.save();
            },
        },
        deleteDirector: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Directors.findByIdAndRemove(args.id)
            }
        },
        deleteMovie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Movies.findByIdAndRemove(args.id)
            }
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                const { name, age } = args;
                return Directors.findByIdAndUpdate(args.id, { $set: { name, age } }, { new: true})
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                directorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                const { name, genre, directorId } = args;
                return Movies.findByIdAndUpdate(args.id, { $set: { name, genre, directorId } }, { new: true})
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return movies.find(movie => movie.id === args.id)
                return Movies.findById(args.id)
            },
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return directors.find(director => director.id === args.id)
                return Directors.findById(args.id)
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return movies
                return Movies.find({})
            },
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                // return directors
                return Directors.find({})
            },
        },
    }
});

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});

module.exports = schema;
