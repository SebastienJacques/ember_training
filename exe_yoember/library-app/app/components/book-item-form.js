import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        selectAuthor(){
            console.log(this.author_id);
        }
    }
});
