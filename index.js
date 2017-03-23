
const repName = 'MartinCrane/javascript-fetch-lab'

// fetch('https://api.github.com/user/repos', {
//   headers: {
//     Authorization: `token ${token}`
//   }
// }).then(res => res.json()).then(json => console.log(json))

function getIssues() {
  fetch(`https://api.github.com/repos/${repName}/issues`, {
    method: 'get',
    headers: {
      Authorization: `token ${getToken()}`,
    }
  }).then(res => res.json()).then(json => showIssues(json))
}

function showIssues(json) {

  let templateGet = document.getElementById("issues-template").innerHTML
  let template = Handlebars.compile(templateGet)
  let repoList = template(json)
  document.getElementById("issues").innerHTML = repoList
}

function createIssue() {
  let issue = document.getElementById("title").value
  let body = document.getElementById("body").value
  let postData = {
    title: `${issue}`,
    body: `${body}`
  };
  fetch(`https://api.github.com/repos/${repName}/issues`, {
    method: 'post',
    body: JSON.stringify(postData),
    headers: {
      Authorization: `token ${getToken()}`,

    }
  }).then(res => res.json().
  then(res => getIssues(res)));

}

function showResults(json) {

  let templateGet = document.getElementById("repo-template").innerHTML
  let template = Handlebars.compile(templateGet)
  let repoList = template(json)
  document.getElementById("results").innerHTML = repoList

}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  const me = 'MartinCrane'
  fetch(`https://api.github.com/repos/${repo}/forks`, {
    method: 'post',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).
  then(json => showResults(json));
}

function getToken() {

  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ''
}
