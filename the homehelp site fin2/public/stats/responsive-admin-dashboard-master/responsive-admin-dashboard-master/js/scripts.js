 // FUNCTION AVERAGE
async function fetchData(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    return await response.json();
  } else {
    alert('Erreur lors de la récupération des données.');
    return null;
  }
}

function calculateAverage(drawings, level) {
  const levelDrawings = drawings.filter(d => d.dessin_niveau === level);
  if (levelDrawings.length === 0) return null;

  let total = 0;
  for (let i = 0; i < levelDrawings.length; i++) {
    total += levelDrawings[i].dessin_pourcentage;
  }
  return total / levelDrawings.length;
}

function calculateOverallAverage(drawings) {
  if (drawings.length === 0) return null;
  let total = 0;
  for (let i = 0; i < drawings.length; i++) {
    total += drawings[i].dessin_pourcentage;
  }
  return total / drawings.length;
}

function calculateTop5(drawings) {
  const sortedDrawings = drawings.sort((a, b) => b.dessin_pourcentage - a.dessin_pourcentage);
  const top5Drawings = sortedDrawings.slice(0, 5);
  return top5Drawings;
}

function prepareChartData(drawings) {
  const sortedDrawings = drawings.sort((a, b) => new Date(a.dessin_date) - new Date(b.dessin_date));
  const dates = sortedDrawings.map(d => new Date(d.dessin_date).toLocaleDateString());
  const percentages = sortedDrawings.map(d => d.dessin_pourcentage);

  return { dates, percentages };
}

function lastScore(data){
  if(data.length === 0) {
    return null;
  }
  return data[data.length - 1].dessin_pourcentage;
}

async function displayAverages() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id');
  const url = 'http://172.20.10.9:3000/dessin/' + userId;
  const data = await fetchData(url);

  if (data) {
    const average1 = calculateAverage(data, 1);
    const average2 = calculateAverage(data, 2);
    const average3 = calculateAverage(data, 3);
    const overallAverage = lastScore(data);

    document.getElementById('average-score1').textContent = average1 !== null ? average1.toFixed(2) : 'Pas de test passé';
    document.getElementById('average-score2').textContent = average2 !== null ? average2.toFixed(2) : 'Pas de test passé';
    document.getElementById('average-score3').textContent = average3 !== null ? average3.toFixed(2) : 'Pas de test passé';
    document.getElementById('average-score-all').textContent = overallAverage !== null ? overallAverage.toFixed(2) : 'Pas de test passé';

    // Calculate top 5 drawings
    const top5Drawings = calculateTop5(data);
    const top5Categories = top5Drawings.map(d => `${d.dessin_nom}\nNiveau ${d.dessin_niveau}\n${new Date(d.dessin_date).toLocaleDateString()}`);
    const top5Percentages = top5Drawings.map(d => d.dessin_pourcentage);

    // Update the bar chart
    updateBarChart(top5Categories, top5Percentages);

    // Prepare data for the area chart
    const { dates, percentages } = prepareChartData(data);
    updateAreaChart(dates, percentages);

  }
}


// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

// ---------- CHARTS ----------

// BAR CHART
function updateBarChart(names, percentages) {
  const barChartOptions = {
    series: [
      {
        data: percentages,
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ['#246dec', '#cc3c43', '#367952', '#f5b74f', '#4f35a1'],
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: '40%',
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: names,
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          whiteSpace: 'pre-line', // Use pre-line to handle line breaks
        },
      },
    },
    yaxis: {
      title: {
        text: 'Score',
      },
      min: 0,
      max: 100,
    },
  };

  const barChart = new ApexCharts(
    document.querySelector('#bar-chart'),
    barChartOptions
  );
  barChart.render();
}


// AREA CHART
function updateAreaChart(dates, scores) {
  const areaChartOptions = {
    series: [
      {
        name: 'Scores des Dessins',
        data: scores,
      },
    ],
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: true,
      },
    },
    colors: ['#246dec'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    labels: dates,
    markers: {
      size: 0,
    },
    yaxis: {
      title: {
        text: 'Score',
      },
      min: 0,
      max: 100,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const areaChart = new ApexCharts(
    document.querySelector('#area-chart'),
    areaChartOptions
  );
  areaChart.render();
}


function redirectWithId(str) {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id');

  const redirectUrl = `${str}.html?id=${userId}`;
  console.log(redirectUrl);
  window.location.href = redirectUrl;
}

// Call the function to display the averages
displayAverages();

async function redirectAtAccueil() {
  const url = 'http://172.20.10.9:3000/user'; // URL de l'API, à changer selon votre configuration
  const response = await fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  });

  if (response.ok) {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('id');
      const users = await response.json();
      const user = users.find(u => u.user_id == userId);

      if (user) {
          window.location.href = `http://localhost:3001/Accueil.html?nom=${encodeURIComponent(user.user_name)}&prenom=${encodeURIComponent(user.user_prenom)}&id=${encodeURIComponent(user.user_id)}`;
      } else {
          alert('Erreur : email ou mot de passe incorrect.');
      }
  } else {
      alert('Erreur lors de la récupération des données de user.');
  }
}

