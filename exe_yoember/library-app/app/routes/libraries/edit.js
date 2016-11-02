import Ember from 'ember';

export default Ember.Route.extend({
    // connect to the model with the id passed in the url by the "params" var
    model(params) {
        // download the record in function of the id
        // get request to /api/libraries/{id}
        return this.store.findRecord('library', params.library_id);
    },
    setupController(controller, model){
        this._super(controller, model);
        controller.set('title', 'Edit library');
        controller.set('buttonLabel', 'Save changes');
    },
    renderTemplate(){
        this.render('libraries/form');
    },
    actions : {
        // get the updated model thx to newLibrary
        saveLibrary(editedLibrary) {
            // save the new updated model
            // patch request to /api/libraries/{id}
            editedLibrary.save().then(() => this.transitionTo('libraries'));
        },
        // when switching page
        willTransition(transition) {
            let model = this.controller.get('model');
            // if the user don't save the form before leaving the page (thx to the Ember Model's hasDirtyAttributes)
            if(model.get('hasDirtyAttributes')) {
                let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

                // if the user say yes
                if(confirmation) {
                    // switch page
                    model.rollbackAttributes();
                } else {
                    // use the parameter passed to the function to stop the transition
                    transition.abort();
                }
            }
        }
    }
});
