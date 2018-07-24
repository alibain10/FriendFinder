// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });
    // API POST Requests

    app.post('/api/friends', function (req, res) {
        // to compare the scores
        var newFriendScoreArray = req.body.scores;
        var scoresArray = [];
        var bestMatch = 0;
        var count = 0;
        // for current friend 
        for (var i = 0; i < friendsData.length; i++) {
            var scoresDiff = 0;
            // compare the friend with existing friend
            for (var j = 0; j < newFriendScoreArray.length; j++) {
                scoresDiff += (Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(newFriendScoreArray[j])));
            }
            // then add the json the user sent to the friendsData array 
            scoresArray.push(scoresDiff);
        }
        // find best match after comparision  with all friends
        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }
        //return data
        var yourMatch = friendsData[bestMatch];
        res.json(yourMatch);
        friendsData.push(req.body);
    });



};
