function getBarStore () {
    return {
        beverages : {
            beer: {
                color: 'rgba(255, 200, 11, 0.85);',
                topColor: '#f6edd3',
                foam: '#f6f5f2'
            },
            champagne: {
                color: '#f6edd3',
                topColor: '#fff9e9',
            },
            cocktail: {
                color: '#bd2c00',
                topColor: '#772309',
                foam: '#f47215'
            },
        },
        glasses : {
            pint: {
                sound: 'beer.mp3',
                height: 300,
            },
            chalice: {
                sound: 'chalice.mp3',
                height: 200,
            },
            glass: {
                sound: 'cup.mp3',
                height: 100,
            },
        },
    }
}

module.exports = getBarStore;