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

  update_total_points: (req, res) => {
    Team.update({}, { total_points: req.param('tp') }).exec((err, team) => {
      return res.json(team);
    });
  },

  api: (req, res) => {
    Team.find({}).populate('vote').exec((err, teams) => {
      teams.forEach((team) => {
        team.vote_count = team.vote.length;
      });
      res.json(teams);
    });
  }

};
