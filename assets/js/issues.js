let issueContainerEl = document.querySelector("#issues-container");

let getReposIssues = (repo) => {
  console.log(repo);
  let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayIssues(data);
      });
    } else {
      alert("Something went wrong...")
    };
  });
};

getReposIssues();

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