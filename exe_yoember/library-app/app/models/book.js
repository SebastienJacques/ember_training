import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  releaseyear: DS.attr(),
  author: DS.attr()
});
