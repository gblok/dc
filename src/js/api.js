function cl($v) {
    console.log($v)
}

var searchBox = {
    placeholder: 'Search on players',
    url: '/data/players.json',
    fields: [
        'name',
        'position',
        'nationality'],
    ref: 'id'
};


riot.mount('search-box', searchBox);
searchBox = riot.observable();









