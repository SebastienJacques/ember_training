import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        // GET request to /api/invitations
        return this.store.createRecord('invitation');
    },
    // define a controller with informations used in the view
    setupController: function(controller, model) {
        // preserve the default behavior of the route deleted by the setupController implement
        this._super(controller, model);

        // define some var to use inside the view
        controller.set('headerMessage', 'Coming Soon');
        controller.set('responseMessage', '');
    },
    actions: {
        saveInvitation(newInvitation) {
            console.log('Saving new invitation...');
            newInvitation.save()
                .then((response) => {
                    console.log(response);
                    // console.log('New Invitation Saved !');
                    // set up a responseMessage property
                    this.controller.set('responseMessage', `Thank you! We've just saved your email address: ${newInvitation.get('email')}`);
                }, (response)=>{
                    if(response.errors[0].status === 400){
                        this.controller.set('errorMessage', 'Your email is already registered');
                    }
                });
        }
    }
});
