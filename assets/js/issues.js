let issueContainerEl = document.querySelector("#issues-container");
let limitWarningEl = document.querySelector("#limit-warning")
let repoNameEl = document.querySelector("#repo-name")

let getRepoName  = () => {
  let queryString = document.location.search;
  repoName = queryString.split("=")[1];
  console.log(repoName);
  getReposIssues(repoName);
  repoNameEl.textContent = repoName;
}

let getReposIssues = (repo) => {
  let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);

        // check if api has paginated issues
        if (response.headers.get("Link")) {
          displayWarning(repo)
        }
      });
    } else {
      alert("Something went wrong...")
    };
  });
};

let displayWarning = function (repo) {
  // add text to warning container
  limitWarningEl.textContent = "To see more than 30 issues, visit ";
  var linkEl = document.createElement("a");
  linkEl.textContent = "See More Issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  // append to warning container
  limitWarningEl.appendChild(linkEl);
};

let displayIssues = (issues) => {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues. WOOHOO"
    return;
  }
  for (i = 0; i < issues.length; i++) {
    // create anchor link
    var issueEl = document.createElement('a');

    // add classes to link
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    // add issue name
    let titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;
    issueEl.appendChild(titleEl)

    // type of issue element
    let typeEl = document.createElement("span");

    // check if issue or pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)"
    } else {
      typeEl.textContent = "(Issue)";
    };

    issueEl.appendChild(typeEl)
    issueContainerEl.appendChild(issueEl)
  };
};


getRepoName();