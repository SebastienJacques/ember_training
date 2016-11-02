import Ember from 'ember';

export default Ember.Component.extend({
    // define the tag of the component
    tagName: 'span',
    // and the classes for the tag thx to some custom scss
    classNames: ['label label-success label-fade'],
    // add the class label-show when isShowing is true
    classNameBindings: ['isShowing:label-show'],

    isShowing: false,
    // when the value of isShowing change (is set to true)
    isShowingChanged: Ember.observer('isShowing', function() {
        // set the value to false after 3sec
        Ember.run.later(() => this.set('isShowing', false), 3000);
    })
});
