
riot.tag2('search-box', '<search-form class="search-form"></search-form><snippet-list snippets="{snippets}" class="snippet-list"></snippet-list>', '', 'class="search-box"', function(opts) {
    this.snippets = []
    var reduce = []

    var index = lunr(function () {
        self = this
        $.each(opts.fields, function (i, v) {
            self.field(v);
        });
        self.ref(opts.ref)
    })

    this.init = function(){
        self = this
        $.ajax(
                {
                    traditional: false,
                    url: opts.url,
                    type: 'get',
                    dataType: 'json',
                    async: false,
                    cache: false,
                    success: function (json) {

                        reduce = json.reduce(function (acc, document) {
                            acc[document.id] = document
                            return acc
                        }, {})

                        $.each(json, function (i, v) {
                            index.add(v);
                        });
                    }
                });
    }.bind(this)

    this.search = function(q){
        data = index.search(q)
        this.response(data)
    }.bind(this)

    this.response = function(data){
        var res = []

        data.map(function (data) {
            res.push(reduce[data.ref])
            return res;
        })

        this.snippets = res
        this.update()
    }.bind(this)

    this.init()

}, '{ }');
riot.tag2('search-form', '<input type="search" required="required" name="q" placeholder="{this.parent.opts.placeholder}" class="input">', '', 'onkeyup="{request}"', function(opts) {
    this.request = function(){
        this.parent.search(this.q.value)
    }.bind(this)

}, '{ }');
riot.tag2('snippet-list', '<snippet each="{opts.snippets}" no-reorder class="snippet"></snippet>', '', '', function(opts) {
}, '{ }');
riot.tag2('snippet', '<div class="title">{this.name}</div><div class="info">{this.position}</div><div class="info">{this.nationality}</div>', '', '', function(opts) {
}, '{ }');