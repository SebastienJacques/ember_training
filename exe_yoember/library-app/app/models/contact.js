import DS from 'ember-data';
import Ember from'ember';

export default DS.Model.extend({
  email: DS.attr('string'),
  message: DS.attr('string'),

  // form validation
  isEmailValid: Ember.computed.match('email', /^.+@.+\..+$/),
  isMsgValid: Ember.computed.gte('message.length', 5),
  
  isValid: Ember.computed.and('isEmailValid', 'isMsgValid'),
  // for the 'send' button
  isDisabled: Ember.computed.not('isValid'),
});
