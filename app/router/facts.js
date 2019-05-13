const engine = require('./role.js')
// const databas = require('./fromdatabase.js')



engine.createRule();

let facts = [
    {
        volt: 30
    },
    {
        personalFoulCount: 2,
        gameDuration: 40
    },
    {
        personalFoulCount: 3,
        gameDuration: 40
    },
    {
        personalFoulCount: 4,
        gameDuration: 40
    },
    {
        personalFoulCount: 7,
        gameDuration: 40
    }
]



engine.getEngine(facts)

