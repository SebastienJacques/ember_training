import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        // GET request to /api/contacts
        return this.store.createRecord('contact');
    },

    actions: {
        saveMessage(newMessage) {
            newMessage.save().then(()=> {
                this.controller.set('responseMessage', true);
            });
        },
        willTransition() {
            this.controller.get('model').rollbackAttributes();
            this.controller.set('responseMessage', false);
        }
    }
});
