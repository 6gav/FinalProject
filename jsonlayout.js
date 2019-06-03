var game = {
    //Queried for by player before joining, used to update game
    gameID: 1000,
    //Who created the game, the only one that can actually start the game
    hostID: 9999,
    //Does the game continue to update?
    running: false,
    players: [
        //Player
        {
            userID: 1234,
            //What gets shown in lobby list
            displayName: 'Gavin',
            //Actual character created by player
            char: {
                //format of cell objects that are compressed in b64
                //name|maxHealth|visionRange|head|chest|legs|face|body
                name: 'Hunag',
                //Cellular position
                position: {
                    x: 0,
                    y: 1
                },
                //How much health does it have and how much can it have?
                health: 10,
                maxHealth: 10,
                //Does it continue to breathe?
                alive: true,
                //How far can it see (Measured in cells)
                visionRange: 15,
                weapon: {
                    //How far can this thing hit from? (Measured in cells)
                    range: 3,
                    //How much does it do at 100% power?
                    damage: 3,
                    //How much does it affect how the chracter moves
                    weight: 10,
                    //How likely is this thing to hit? (Measured in percent, n% chance to hit)
                    accuracy: 90
                },
                apparel: {
                    //What protects each individual piece (Hits will select hit part at random, chracters will aim for head, but have a chance of not hitting head)
                    head: 0,
                    chest: 10,
                    legs: 10,
                }
            }
        },
    ]

}
