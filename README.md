## DC Test

### Quick start

Clone the git repo  —  git clone https://github.com/gblok/dc-test.git
mappings /public to /public_html


***

###[Demo](http://dc.diz.in.ua)

***

## Description

##### Build
* task runner: [Gulp](https://github.com/gulpjs/gulp)
* config: /gulpfile.js
* task: `gulp build`

##### HTML
* template: [Jade](https://github.com/jadejs/jade)
* src: /src/html
* config: /src/html/index.jade
* task: `gulp jade`

##### CSS
* pre-processor: Less
* src: /src/less
* config:/src/less/all.less
* task: `gulp less`

##### Flux component
* lib: [Riot.js](https://github.com/riot/riot)
* template: [Jade](https://github.com/jadejs/jade)
* src: /src/riot
* config:/src/js/api.js
* task: `gulp riot-js`
 
##### Full-Text Search
* lib: [Lunr.js](https://github.com/olivernn/lunr.js)
* config: /src/js/api.js

