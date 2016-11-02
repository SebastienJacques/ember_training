import Ember from 'ember';

const MAX_VALUE = 10;

export default Ember.Component.extend({
    // init the number writed by the user in the form
    counter: null,
    // true if the user enter a value smaller than the max value
    isCounterValid: Ember.computed.lte('counter', MAX_VALUE),
    // text of the placeholder of the input
    placeholder: `Maximum ${MAX_VALUE}`,
    // set to true when the creation/delete is done
    createReady: false,
    deleteReady: false,

    actions: {
        generateAction() {
            // if the number writed by the user is not more than the max value
            if(this.get('isCounterValid')) {
                this.sendAction('generateAction', this.get('counter'));
            }
        },
        deleteAction() {
            this.sendAction('deleteAction');
        }
    }
});
