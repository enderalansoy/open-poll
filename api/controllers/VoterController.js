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

};
