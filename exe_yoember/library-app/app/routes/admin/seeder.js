import Ember from 'ember';
import Faker from 'faker';

export default Ember.Route.extend({
    model() {
        // RSVP tries to download all the requested models and only returns if all are retrieved successfully
        return Ember.RSVP.hash({
            libraries: this.store.findAll('library'),
            books: this.store.findAll('book'),
            authors: this.store.findAll('author')
        });
    },

    setupController(controller, model) {
        // split the model into their own controller property
        controller.set('libraries', model.libraries);
        controller.set('books', model.books);
        controller.set('authors', model.authors);
    },

    actions: {
        generateLibraries(volume) {
            const counter = parseInt(volume);

            for (let i = 0; i < counter; i++) {
                const isTheLast = i === counter-1;
                this._saveRandomLibrary(isTheLast);
            }
        },

        deleteLibraries() {
            this._destroyAll(this.get('libraries'));

            // Data down via seeder-block to fader-label that we ready to show the label
            this.set('libDelDone', true);
        },

        generateBooksAndAuthors(volume) {
            const counter = parseInt(volume);

            for (let i = 0; i < counter; i++) {
                const isTheLast = i === counter-1;
                const newAuthor = this._saveRandomAuthor(isTheLast);

                this._generateSomeBooks(newAuthor);
            }
        },

        deleteBooksAndAuthors() {
            this._destroyAll(this.get('books'));
            this._destroyAll(this.get('authors'));

            // Data down via seeder-block to fader-label that we ready to show the label
            this.set('authDelDone', true);
        }
    },

    // Private methods

    _saveRandomLibrary(isLast) {
        const randomLibrary = this.store.createRecord('library').randomize();

        randomLibrary.save().then(() => {
        if (isLast) {

            // Data down via seeder-block to fader-label that we ready to show the label
            this.set('libDone', true);
        }
        });
    },

    _saveRandomAuthor(isLast) {
        const newAuthor = this.store.createRecord('author').randomize();
        newAuthor.save().then(() => {
            if (isLast) {

            // Data down via seeder-block to fader-label that we ready to show the label
            this.set('authDone', true);
            }
        }
        );
        return newAuthor;
    },

    _generateSomeBooks(author) {
        const bookCounter = Faker.random.number(10);

        for (let j = 0; j < bookCounter; j++) {
        const library = this._selectRandomLibrary();
        this.store.createRecord('book')
            .randomize(author, library)
            .save();
        author.save();
        library.save();
        }
    },

    _selectRandomLibrary() {
        const libraries = this.controller.get('libraries');
        const librariesCounter = libraries.get('length');

        // Create a new array from ids
        const libraryIds = libraries.map(lib => lib.get('id'));

        // Randomly pick one id from the libraryIds array and return the library
        const randomNumber = Faker.random.number(librariesCounter-1);
        const randomLibrary = libraries.findBy('id', libraryIds[randomNumber]);

        return randomLibrary;
    },

    _destroyAll(records) {
        records.forEach(
        item => item.destroyRecord()
        );
    }
});
