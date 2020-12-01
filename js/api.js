// declare variabel
const base_url = "https://api.football-data.org/v2/";
const api_token = "05efcd8007cc4ed8b7df6bd27246bc3a";

// use fetch method to get data
const fetch_API = url => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": api_token
    }
  })
  .then(response => {
    if (response.status !== 200) {
      console.log("Error: " + response.status);
      return Promise.reject(new Error(response.statusText))
    } else {
      return Promise.resolve(response)
    }
  })
  .then(response => response.json())
  .catch(err => {
    console.log(err)
  })
};


//get all data standings
const football_s = `${base_url}competitions/2002/standings/`;
function getAllStandings() {
  if ("caches" in window) {
    caches.match(football_s).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          console.log(" Standings : " + data);
          showStandings(data);
        })
      }
    })
  }

//status request data (response)
  fetch_API(football_s).then(data => {
    showStandings(data);
  })
  .catch(error => {
    console.log(error);
  })
}


// show data request
function showStandings(data) {
  let standings = "";
  let standingElement = document.getElementById("standingsPage");


  data.standings[0].table.forEach(function(teamStandings) {
    standings += `
      <tr>
        <td>${teamStandings.position}</td>
        <td><img src="${teamStandings.team.crestUrl.replace(/^http:\/\//i, "https://")}" width="25px" alt="badge" onerror="this.onerror=null; this.src="../images/loading.png" " /></td>
        <td>${teamStandings.team.name}</td>
        <td style="text-align: center">${teamStandings.playedGames}</td>
        <td style="text-align: center">${teamStandings.won}</td>
        <td style="text-align: center">${teamStandings.draw}</td>
        <td style="text-align: center">${teamStandings.lost}</td>
        <td style="text-align: center">${teamStandings.points}</td>
      </tr>
    `;
  });


  standingElement.innerHTML = `
    <div class="col s12">
    <table class="responsive-table">
      <thead>
        <tr style="color: #000000;">
          <th style="text-align: left">No</th>
          <th style="text-align: left">Logo</th>
          <th style="text-align: left">Team</th>
          <th style="text-align: left">Match Played</th>
          <th style="text-align: left">Won</th>
          <th style="text-align: left">Draw</th>
          <th style="text-align: left">Lost</th>
          <th style="text-align: left">Points</th>
        </tr>
      </thead>
      <tbody id="standings">${standings}</tbody>
    </table>
    </div>
  `;
}


// get all data teams
const football_t =`${base_url}/teams/`;
function getAllTeams() {
  if ("caches" in window) {
    caches.match(football_t).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          console.log(" Team : " + data);
          showTeams(data);
        })
      }
    })
  }


//status request data (response)
  fetch_API(football_t).then(data => {
    showTeams(data);
  })
  .catch(error => {
    console.log(error);
  })
}
// show data request
function showTeams(data) {
  let teams = "";
  data.teams.forEach(function(teamsPL) {
    teams += `
    <div class="row">
      <div class="col s12 m12" style="margin-top: 10px;">
        <div class="card">
        <div class="card-content">
          <span class="card-title center-align" style="color: #000000; font-weight: bold;">${teamsPL.name}</span>
          <div class="card-image">
            <img class="responsive-img" src="${teamsPL.crestUrl.replace(/^http:\/\//i, "https://")}" alt="image-team" onerror="this.onerror=null; this.src="../images/loading.png" " style="padding-top: 20px; padding-right: 30px; padding-bottom: 30px; padding-left: 30px;">
          </div>
          </div>
          <div class="card-action center-align">
            <a href="./article.html?id=${teamsPL.id}">
              Keterangan Informasi Team
            </a>
          </div>
        </div>
      </div>
    </div>
    `;
  });
  document.getElementById("teamsPage").innerHTML = teams;
}


// mengambil data team by_id
function getTeamByid() {
  return new Promise(function(resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");


    if ("caches" in window) {
      caches.match(football_t + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            console.log("Info Team: " + data);
            showInfoTeam(data);
            resolve(data);
          })
        }
      })
    }


  // status request data (response)
    fetch_API(football_t + idParam).then(data => {
      showInfoTeam(data);
      resolve(data);
    })
    .catch(error => {
      console.log(error);
    });
  });
}


// show data request
function showInfoTeam(data) {
  let infoTeams = `
  <div class="row">
    <div class="col s12 m12" style="margin-top: 10px;">
      <div class="card" style="margin-bottom: 100px;">
      <div class="card-content">
        <div class="card-image">
          <img class="responsive-img" src="${data.crestUrl.replace(/^http:\/\//i, "https://")}" alt="image-team" onerror="this.onerror=null; this.src="../images/loading.png" " style="padding-top: 20px; padding-right: 30px; padding-bottom: 20px; padding-left: 30px;">
        </div>
          <span class="card-title" style="color: #000000; font-weight: bold;">${data.name}</span>
          <table class="responsive-table striped">
            <tr>
              <th>Website</th>
              <th>Lokasi</th>
            </tr>
            <tr>
              <td>${data.website}</td>
              <td>${data.venue}</td>
            </tr>
            <tr>
              <th>Alamat</th>
              <th>Tahun Berdiri</th>
            </tr>
            <tr>
              <td>${data.address}</td>
              <td>${data.founded}</td>
            </tr>
            <tr>
              <th>Warna Tim</th>
              <th>Kontak</th>
            </tr>
            <tr>
              <td>${data.clubColors}</td>
              <td>${data.phone}</td>
            </tr>
          </table>
        </div>
        <div class="card-action center-align">
          <a href="./index.html#home" class="btn-floating waves-effect black">
            <i class="material-icons">home</i>
          </a>
        </div>
      </div>
    </div>
  </div>
  `;
  document.getElementById("body-content").innerHTML = infoTeams;
}


// get saved data
function getSavedTeam() {
  getAll().then(function(teams) {
    console.log(teams);
    let articleInfo = "";
    teams.forEach(function(team) {
      articleInfo += `
      <div class="row">
        <div class="col s12 m12" style="margin-top: 10px;">
          <div class="card">
          <div class="card-content">
            <span class="card-title center-align" style="color: #000000; font-weight: bold;">${team.name}</span>
            <div class="card-image">
              <img class="responsive-img" src="${team.crestUrl.replace(/^http:\/\//i, "https://")}" alt="image-team" onerror="this.onerror=null; this.src="../images/loading.png" " style="padding-top: 20px; padding-right: 30px; padding-bottom: 30px; padding-left: 30px;">
            </div>
            </div>
            <div class="card-action right-align">
              <a href="./article.html?id=${team.id}&saved=true">
                Keterangan Informasi Team
              </a>
            </div>
          </div>
        </div>
      </div>
      `;
    });
    document.getElementById("body-content").innerHTML = articleInfo;
  });
}


// get saved data by_id
function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");


  getById(parseInt(idParam)).then(function(team) {
    teamHTML = "";
    var teamHTML = `
    <div class="row">
      <div class="col s12 m12" style="margin-top: 10px;">
        <div class="card" style="margin-top: 30px; margin-bottom: 100px;">
        <div class="card-content">
          <span class="card-title center-align" style="color: #000000; font-weight: bold;">${team.name}</span>
          <div class="card-image">
            <img class="responsive-img" src="${team.crestUrl.replace(/^http:\/\//i, "https://")}" alt="image-team" onerror="this.onerror=null; this.src="../images/loading.png" " style="padding-top: 20px; padding-right: 30px; padding-bottom: 30px; padding-left: 30px;">
          </div>
          <table class="responsive-table striped">
            <tr>
              <th>Website</th>
              <th>Lokasi</th>
            </tr>
            <tr>
              <td>${team.website}</td>
              <td>${team.venue}</td>
            </tr>
            <tr>
              <th>Alamat</th>
              <th>Tahun Berdiri</th>
            </tr>
            <tr>
              <td>${team.address}</td>
              <td>${team.founded}</td>
            </tr>
            <tr>
              <th>Warna Tim</th>
              <th>Kontak</th>
            </tr>
            <tr>
              <td>${team.clubColors}</td>
              <td>${team.phone}</td>
            </tr>
          </table>
          </div>
          <div class="card-action center-align">
            <a href="./index.html#saved" class="btn-floating waves-effect black">
              <i class="material-icons">collections_bookmark</i>
            </a>
          </div>
        </div>
      </div>
    </div>
    `;
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}

