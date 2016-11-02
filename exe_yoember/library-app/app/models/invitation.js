import DS from 'ember-data';
import Ember from 'ember';

// linked to the server with the route /api/invitations thx to the adapter which define the base route to /api
export default DS.Model.extend({
  email: DS.attr('string'),

  // if the email is not a valid one, isValid is false
  isValid: Ember.computed.match('email', /^.+@.+\..+$/),
  // isDisabled need to be true if isValid is false
  isDisabled: Ember.computed.not('isValid')
});

// generated with the command
// ember g model invitation email:string