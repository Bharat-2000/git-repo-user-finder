const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
let form = document.getElementById('form');
const search = document.getElementById('search');

async function getUser(username){
    const response = await fetch(APIURL + username);
    const data = await response.json();

    createUserCard(data);
    getRepos(username);
}

// getUser("jai570");

async function getRepos(username){
    const response = await fetch(APIURL + username + "/repos");
    const data = await response.json();

    addReposCard(data);
}


function createUserCard(user){
    // const card = document.createElement('div');
    // card.classList.add('card');

    const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Public Repos</strong></li>
                </ul>
                <div id="repos" class="repos"></div>
            </div>
        </div> 
    `;
    main.innerHTML = card;
}

function addReposCard(repos){
    const reposElement = document.getElementById('repos');
    // console.log(repos);
    repos
        .sort((a,b)=> b.stragazers_count - a.stragazers_count)
        .slice(0, 10)
        .forEach((repo) =>{
            const repoElement_new = document.createElement('a');
            repoElement_new.classList.add("repo");

            repoElement_new.href = repo.html_url;
            repoElement_new.target = "_blank";
            repoElement_new.innerText = repo.name;

            reposElement.appendChild(repoElement_new);
        });
};


form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const user = search.value;

    if(user){
        getUser(user);

        search.value = "";
    }
});