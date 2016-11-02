import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'span',
    classNames: ['search-bar'],

    // isValid: Ember.computed.gte('value.length', 3),
    // isDisabled: Ember.computed.not('isValid'),
    isDisabled: Ember.computed.empty('value'),

    actions: {
        // filterByName(value){
        //     if(value){
        //         // all names in db are in lowercase so we need to transform the string sent by the user
        //         value = value.toLowerCase();
        //         console.log(value);
        //         this.transitionTo('libraries', {queryParams: {search: value}});
        //     } else {
        //         this.controller.set('value', '');
        //         // define search on undefined to delete the query and list all data
        //         this.transitionTo('libraries', {queryParams: {search: undefined}});
        //     }
        // }
    }
});
