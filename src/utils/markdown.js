let marked = require('marked');
marked.setOptions({
  langPrefix: 'language-',
})

export default {
  baseUrl() {
    let baseUrl = 'https://api.notes.tebe.ch/media/'
    if (process.env.NODE_ENV == 'development') {
      baseUrl = 'http://localhost:9999/media/'
    }
    return baseUrl
  },
  parse(content) {
    let html = marked(content);
    html = html.replace(new RegExp('src="/media/', 'g'), 'class="img-fluid" src="' + this.baseUrl());
    return html
  }
}
