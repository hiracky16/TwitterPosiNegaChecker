import {
  postSentiment
} from './CotohaClient'

window.addEventListener("load", main, false);

function main() {
  const jsInitCheckTimer = setInterval(jsLoaded, 1000);

  function jsLoaded() {
    let articles = document.querySelectorAll("div[lang='ja'] > span")
    if (articles.length > 0) {
      clearInterval(jsInitCheckTimer);
      // articles = Array.prototype.slice.call(articles, 0, 1)
      Array.prototype.forEach.call(articles, async (article) => {
        const res = await postSentiment(article.innerText)
        const sentiment = res.result.sentiment
        switch (sentiment) {
          case 'Positive':
            article.style.color = 'red'
            break
          case 'Negative':
            article.style.color = 'blue'
            break
          default:
            article.style.color = 'green'
            break
        }
      })
    }
  }
}