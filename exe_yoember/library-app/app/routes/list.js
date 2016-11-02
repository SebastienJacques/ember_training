import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        search: {refreshModel: true}
    },

    model(params){
        return Ember.RSVP.hash({
            params: params,
            libraries: this.store.query('library', {search: params.search}),
            invitations : this.store.query('invitation', {search: params.search}),
            contacts: this.store.query('contact', {search: params.search}),
            books: this.store.query('book', {search: params.search}),
            authors: this.store.query('author', {search: params.search})
        });
    },
    setupController(controller, model){
        this._super(controller, model);
        Ember.set(controller, 'search_therms', model.params.search);
    }
});
