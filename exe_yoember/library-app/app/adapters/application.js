import DS from 'ember-data';

let options = {
    namespace: 'api',
    host: 'http://localhost:3000'
};
export default DS.JSONAPIAdapter.extend(options);
