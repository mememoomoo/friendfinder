const friends = require("../data/friends")

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        let userData = req.body;
        let userScore = userData.scores;
        let userName = userData.name;
        let bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        }
        let totalDifference;

        for (let i = 0; i < friends.length; i++) {
            const friend = friends[i];
            totalDifference = 0;

            for (let j = 0; j < friend.scores.length; j++) {
                const score = friend.scores[j];
                totalDifference += Math.abs(parseInt(userScore[j]) - parseInt(score))
            }

            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = friend.name;
                bestMatch.photo = friend.photo;
                bestMatch.friendDifference = totalDifference
            }
        }

        friends.push(userData);

        res.json(bestMatch);
    });
}