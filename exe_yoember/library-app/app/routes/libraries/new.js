import Ember from 'ember';

export default Ember.Route.extend({
    // create a new record that will be the model
    model() {
        // GET request to /api/libraries
        return this.store.createRecord('library');
    },
    // define some values to use in the view/template and define the model
    setupController: function(controller, model) {
        this._super(controller, model);
        controller.set('title', 'Create a new library');
        controller.set('buttonLabel', 'Create');
    },
    // render a different template than /libraries/news to have a common "form" template with differents values
    renderTemplate(){
        this.render('libraries/form');
    },
    actions: {
        // get the parameter which contain data to store
        saveLibrary(newLibrary) {
            console.log('Saving new Library...');
            newLibrary.save()
                .then((response) => {
                    console.log(response);
                    // console.log('New library Saved !');
                    // redirect to libraries home page and define a message to show to the user
                    this.transitionTo('libraries', {queryParams: {responseMessage: 'New library Saved !'}});
                }, (response) => {
                    // console.log(response.errors[0].status);
                    if(response.errors[0].status === 400){
                        this.controller.set('errorMessage', 'There is already a library at this address.');
                    }
                });
        },
        // built-in action that is called when we leave the page
        willTransition() {
            // clean the model to delete informations when we leave the page without saving informations
            this.controller.get('model').rollbackAttributes();
        }
    }
});