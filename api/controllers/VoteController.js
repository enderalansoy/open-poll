/**
 * VoteController
 * aenderso@ford.com
 */

/* eslint-disable no-undef */

module.exports = {

  new: (req, res) => {
    let voteTotal = 0;
    Vote.create(req.allParams()).exec((err, vote) => {
      if (err) {
        return res.json(err);
      }
      voteTotal = vote.criteria1 + vote.criteria2 + vote.criteria3 + vote.criteria4 + vote.criteria5 + vote.criteria6 + 
      vote.criteria7 + vote.criteria8;
      console.log(voteTotal);
      Team.find({ id: req.param('team') }).exec((err, team) => {
        console.log(team);
        Team.update({ id: req.param('team') }, { total_points: team[0].total_points + voteTotal }).exec((err, t) => {
          if (err) return res.json(err);
          return res.json(t);
        });
      });
    });
  },

  remove: (req, res) => {
    Vote.destroy({ id: req.params.id }).exec((err, vote) => {
      if (err) {
        return res.json(err);
      }
      return res.json({
        message: 'Vote has been deleted.',
      });
    });
  },

  clear: (req, res) => {
    Vote.destroy({}).exec((err) => {
      if (err) return res.json(err);
      Team.update({}, { total_points: 0 }).exec((err, t) => {
        if (err) return res.json(err);
      });
      return res.json('All votes have been deleted');
    });
  },

  remove: (req, res) => {
    Vote.destroy({ id: req.params.id }).exec((err) => {
      if (err) {
        return res.json(err);
      }
      return res.json({
        message: 'Vote has been deleted.',
      });
    });
  },

};
