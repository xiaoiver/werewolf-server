var Game = require('../models/game');

module.exports = function (router) {
  router.route('/games')
    .get(function (req, res) {
      Game.find(function (err, games) {
        if (err) {
          res.send(err);
        }
        res.json({
            success : true,     //请求成功标识
            errorCode : '',       //响应码,
            errorMsg : '',
            result: games
        });
      });
    })
    .post(function (req, res) {
      var game = new Game();
      game.baseInfo = req.body.baseInfo;
      game.cast = req.body.cast;
      game.gallery = req.body.gallery;

      game.save(function (err, g) {
        if (err) {
          res.send(err);
        }
        res.json({
            success : true,
            errorCode : '',
            errorMsg : '',
            result: {
              _id: g._id
            }
        });
      });
    });

  router.route('/games/:game_id')
    .get(function (req, res) {
      Game.findById(req.params.game_id, function (err, game) {
        if (err)
          res.send(err);
        res.json({
            success : true,
            errorCode : '',
            errorMsg : '',
            result: game
        });
      });
    })
    .put(function(req, res) {
      Game.findById(req.params.game_id, function (err, game) {
        if (err)
          res.send(err);

        game.name = req.body.name;  // update the bears info

        game.save(function(err) {
          if (err)
            res.send(err);

          res.json({ message: 'Game updated!' });
        });
      });
    })
    .delete(function (req, res) {
      Game.remove({
        _id: req.params.game_id
      }, function (err, bear) {
        if (err)
          res.send(err);

        res.json({ message: 'Successfully deleted' });
      });
    });
};
