/**
 * VoteController
 * aenderso@ford.com
 */

/* eslint-disable no-undef */

module.exports = {

  new: (req, res) => {
    Vote.create(req.allParams()).exec((err, vote) => {
      if (err) {
        return res.json(err);
      }
      return res.json(vote);
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
