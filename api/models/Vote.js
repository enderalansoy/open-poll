/**
 * Vote.js
 * aenderso@ford.com
 */

module.exports = {

  connection: 'mongo',
  schema: true,

  attributes: {
    criteria1: {
      type: 'float',
      required: true,
    },
    criteria2: {
      type: 'float',
      required: true,
    },
    criteria3: {
      type: 'float',
      required: true,
    },
    criteria4: {
      type: 'float',
      required: true,
    },
    team: {
      model: 'team',
      required: true,
    },
    voter: {
      model: 'voter',
      required: true,
    },
  },

};
  
  