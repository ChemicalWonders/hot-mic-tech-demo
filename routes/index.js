var express = require('express');
var request = require('request-promise');
var ChatRoom = require('../public/javascripts/chatRoom');
var router = express.Router();

function getVideoURL() {
  let url = 'https://hotmic-interview.herokuapp.com/videos/';
  return response = request(url, (error, response, body) => {
    if (error) console.error('error:', error); // Print the error if one occurred
    return body;

  });
}

function putDataInDataStruct(data) {
  let parsedResponse = JSON.parse(data)[0]; // Need to get the first object in the array
  let chatRoom = new ChatRoom(parsedResponse['chatroom'], parsedResponse['name'], parsedResponse['url']);
  return chatRoom;
}

function renderIndexPage(res, chatRoom) {
  res.render('index', { title: chatRoom.name, url: chatRoom.url });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  getVideoURL()
  .then(data => putDataInDataStruct(data))
  .then(data => renderIndexPage(res, data))
  .catch(error => console.error(error));
  
});

module.exports = router;
