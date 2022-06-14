var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

let getUsersRepos = function (user) {
  // format github api url 
  let apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to GitHub");
    });
};


let userFormEl = document.getElementById("user-form");

// requested username
let nameInputEl = document.getElementById("username")

// search for user repo form
let formSubmitHandler = function (event) {
  event.preventDefault();
  let username = nameInputEl.value.trim();
  if (username) {
    getUsersRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a Github username")
  }
  console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);

// display repos
let displayRepos = (repos, searchTerm) => {
  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  console.log(repos);
  console.log(searchTerm);
  // clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = "";

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    // opens html page with listed repo issues
    repoEl.setAttribute("href" , "./single-repo.html?repo=" + repoName)

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container 
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);
    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  };
};
