/**
 * VoterController
 * aenderso@ford.com
 */

/* eslint-disable no-undef */

module.exports = {

  remove: (req, res) => {
    Voter.destroy({ id: req.params.id }).exec((err) => {
      if (err) {
        return res.json(err);
      }
      return res.json({
        message: 'Voter has been deleted.',
      });
    });
  },
  isvoter: (req, res) => {
    Voter.count({ id: req.param('id') }).exec((err, found) => {
      if (found === 1) {
        res.json({status: true});
      } else {
        res.json({status: false});
      }
    });
  },
  hasvoted: (req, res) => {
    Vote.find({ voter: req.param('voter'), team: req.param('team') }).exec((err, team) => {
      if (team.length > 0) {
        return res.json({status: true});
      } else {
        return res.json({status: false});
      }
    });
  },
};
