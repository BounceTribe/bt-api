'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _createNotification = require('./createNotification');

var _createNotification2 = _interopRequireDefault(_createNotification);

var _emails = require('./emails');

var _emails2 = _interopRequireDefault(_emails);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _spotifyWebApiNode = require('spotify-web-api-node');

var _spotifyWebApiNode2 = _interopRequireDefault(_spotifyWebApiNode);

var _updateAuth = require('./updateAuth0');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setPass({newPass:'chicken', auth0UserId:'auth0|5a056486b6be6057b283c62d'}).then(res => console.log('response:', RES))
// testQuery('holesinaarrel@gmail.com').then(res => console.log('response:', RES))
// makeResourceServer()
// getClientGrant()

var app = (0, _express2.default)();

var port = process.env.PORT || 5000;

app.set('port', port);

app.use((0, _cors2.default)());

app.use(_bodyParser2.default.json());

var spotify = new _spotifyWebApiNode2.default({
  clientId: '6b96fc2eae0c494fb5b02514b70c436f',
  clientSecret: process.env.spotifySecret
});

var expiration = Date.now();

function refreshCredentials() {
  return new Promise(function (resolve, reject) {
    spotify.clientCredentialsGrant().then(function (resp) {
      spotify.setAccessToken(resp.body['access_token']);
      expiration = Date.now() + 3000000;
      resolve();
    }, function (error) {
      console.log("error", error);
    });
  });
}

function searchArtists(query) {
  return new Promise(function (resolve, reject) {
    spotify.searchArtists(query).then(function (resp) {
      var options = resp.body.artists.items.map(function (artist) {
        return {
          value: {
            spotifyId: artist.id,
            imageUrl: artist.images.length > 0 ? artist.images[0].url : '',
            influenceId: false,
            id: false
          },
          label: artist.name
        };
      });
      resolve({ options: options });
    }, function (error) {
      console.log("error", error);
    });
  });
}

app.use('/artists', function (req, res, next) {
  var query = req.body.query;

  if (expiration <= Date.now()) {
    refreshCredentials().then(function () {
      searchArtists(query).then(function (options) {
        return res.send(options);
      });
    });
  } else {
    searchArtists(query).then(function (options) {
      return res.send(options);
    });
  }
});

app.use('/email', function (req, res, next) {
  var _req$body$query = req.body.query,
      toEmail = _req$body$query.toEmail,
      byHandle = _req$body$query.byHandle,
      byId = _req$body$query.byId;

  var type = 'INVITATION_RECEIVED';
  var urlCode = '';
  console.log('email Invitiation to:', toEmail);
  (0, _emails2.default)({ toEmail: toEmail, byHandle: byHandle, type: type, byId: byId, urlCode: urlCode });
  res.send();
});

app.use('/changepassword', function (req, res, next) {
  console.log('body', req.body);
  var _req$body$query2 = req.body.query,
      auth0UserId = _req$body$query2.auth0UserId,
      newPass = _req$body$query2.newPass;

  console.log('sending pass', auth0UserId, newPass);
  (0, _updateAuth.setPass)(req.body.query).then(function (auth0res) {
    console.log('auth0res', auth0res);
    res.send(auth0res);
  });
});

app.use('/notifications/:type', function (req, res, next) {
  var data = req.body.data;
  var type = req.params.type;

  var byId = void 0,
      forId = void 0,
      toEmail = void 0,
      byHandle = void 0,
      sessionId = void 0,
      inviteId = void 0,
      projectTitle = void 0,
      forHandle = void 0;
  var emailNotification = false;
  var sendNotification = true;
  var extra = '';
  var urlCode = '';

  switch (type) {
    case 'FRIENDS':
      {
        var node = data.FriendRequest.node;

        console.log('friend request node', node);
        if (node.accepted) {
          type = "FRIEND_REQUEST_ACCEPTED";
          byId = node.recipient.id;
          byHandle = node.recipient.handle;
          forHandle = node.actor.handle;
          forId = node.actor.id;
          toEmail = node.actor.email;
          if (!node.actor.doNotEmailTA) emailNotification = true;
        } else {
          type = "FRIEND_REQUEST";
          inviteId = node.id;
          byId = node.actor.id;
          byHandle = node.actor.handle;
          forId = node.recipient.id;
          forHandle = node.recipient.handle;
          toEmail = node.recipient.email;
          if (!node.recipient.doNotEmailTR) emailNotification = true;
        }
        break;
      }
    case 'COMMENT':
      {
        type = 'PROJECT_FEEDBACK_RECEIVED';
        var _node = data.Comment.node;

        console.log('COMMENT NODE', _node);
        toEmail = _node.project.creator.email;
        forHandle = _node.project.creator.handle;
        forId = _node.project.creator.id;
        byHandle = _node.author.handle;
        byId = _node.author.id;
        extra = 'projectId: "' + _node.project.id + '"';
        projectTitle = _node.project.title;
        var existingComment = _node.project.comments.filter(function (comment) {
          return comment.author.id === byId;
        });
        console.log('existingComment', existingComment[0]);
        if (!_node.project.creator.doNotEmailPR /*&& existingComment.length > 1*/) emailNotification = true;
        break;
      }
    case 'BOUNCED':
      {
        var _node2 = data.Bounce.node;
        var creator = _node2.project.creator;

        byId = _node2.bouncer.id;
        forId = creator.id;
        toEmail = creator.email;
        forHandle = creator.handle;
        byHandle = _node2.bouncer.handle;
        extra = 'projectId: "' + _node2.project.id + '"';
        type = 'BOUNCED';
        if (!creator.doNotEmailPB) emailNotification = true;

        // if bounce deleted?
        // if (existingComment.length > 1) {
        //   emailNotification = false
        //   sendNotification = false
        // }
        break;
      }
    default:
      {}
  }

  if (sendNotification) {
    (0, _createNotification2.default)({
      byId: byId,
      forId: forId,
      type: type,
      inviteId: inviteId,
      extra: extra
    });
  }

  if (emailNotification) {
    (0, _emails2.default)({
      toEmail: toEmail,
      byHandle: byHandle,
      type: type,
      projectTitle: projectTitle,
      sessionId: sessionId,
      forHandle: forHandle,
      byId: byId,
      inviteId: inviteId,
      urlCode: urlCode
    });
  }
  next();
});
// sendEmail({type: "BOUNCED",
//   forHandle: 'subliminal_lime',
//   toEmail: "holesinabarrel@gmail.com",
//   byHandle: "someoneelse",
//   projectTitle: "tree heart"})
var server = app.listen(app.get('port'), function () {
  console.log('Server is running at port ' + app.get('port'));
});