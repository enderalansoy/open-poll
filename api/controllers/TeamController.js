/**
 * TeamController
 * aenderso@ford.com
 */

/* eslint-disable no-undef */

module.exports = {
  new: (req, res) => {
    Team.create(req.allParams()).exec((err, team) => {
      if (err) {
        return res.json(err);
      }
      return res.json(team);
    });
  },

  remove: (req, res) => {
    Team.destroy({ id: req.params.id }).exec((err) => {
      if (err) {
        return res.json(err);
      }
      return res.json({
        message: 'Team has been deleted.',
      });
    });
  },

  clear: (req, res) => {
    Team.destroy({}).exec((err) => {
      if (err) {
        return res.json(err);
      }
      return res.json({
        message: 'Team model is cleared.',
      });
    });
  },

};
