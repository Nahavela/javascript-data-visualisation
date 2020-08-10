// Insert graph1, graph2, graph3
function insertGraph (contentName, tableName, graphName) {
  let content = document.getElementById (contentName);
  let table = document.getElementById (tableName);
  let graph = document.createElement ('canvas');
  content.insertBefore (graph, table);
  graph.setAttribute ('id', graphName);
  graph.style.border = 'solid 2px black';
}

insertGraph ('mw-content-text', 'table1', 'graph1');
insertGraph ('mw-content-text', 'table2', 'graph2');
insertGraph ('content', 'bodyContent', 'graph3');

// Transform table data to arrays graph1
function table_to_array (table1) {
  myData = document.getElementById (table1).rows;
  //console.log(myData)ettoyer tout utiliser de l'anglais uniquement, pas mettre donnne 1 2 3 x y ,
  let myList = [];
  for (i = 0; i < myData.length; i++) {
    el = myData[i].children;
    myEl = [];
    for (j = 0; j < el.length; j++) {
      myEl.push (el[j].innerText.replace (',', '.'));
    }
    myList.push (myEl);
  }
  return myList;
}

table_to_array ('table1');
table_to_array ('table2');

// années graph1
let anneesGraph1 = table_to_array ('table1').slice ();
let anneeGraph1 = anneesGraph1[1];
let removedItems = anneeGraph1.splice (0, 2);

// chiffres graph1
let chiffresGraph1 = table_to_array ('table1').slice ();
let elementsSsupprime = chiffresGraph1.splice (0, 2);
let pays = [];
let chiffres = [];
let chiffreUnique = [];

for (i = 0; i < chiffresGraph1.length; i++) {
  pays.push (chiffresGraph1[i].splice (0, 2));
}

let a = 0;
while (a < chiffresGraph1.length) {
  for (o = 0; o < 11; o++) {
    chiffresGraph1[a][o] = parseFloat (chiffresGraph1[a][o]);
  }
  a++;
}

// random colors graph1
function random_rgba () {
  let o = Math.round, r = Math.random, s = 255;
  return (
    'rgba(' +
    o (r () * s) +
    ',' +
    o (r () * s) +
    ',' +
    o (r () * s) +
    ',' +
    r ().toFixed (1) +
    ')'
  );
}

// datas graph1
let datas = [];
let obj;
for (i = 0; i < chiffresGraph1.length; i++) {
  obj = {
    label: pays[i],
    data: chiffresGraph1[i],
    backgroundColor: random_rgba (),
    borderWidth: 1,
  };
  datas.push (obj);
}

function makeGraph1 (graphName, labelName, dataName) {
  // graph1
  let ctx = document.getElementById (graphName).getContext ('2d');

  let myChart = new Chart (ctx, {
    type: 'bar',
    data: {
      labels: labelName,
      datasets: dataName,
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

// années graph2 + remove n° and country
let anneesGraph2 = table_to_array ('table2').slice ();
let anneeGraph2 = anneesGraph2[0];
let removedItems2 = anneeGraph2.splice (0, 2);

// chiffres graph2
let chiffresGraph2 = table_to_array ('table2').slice ();
let elementsSsupprime2 = chiffresGraph2.splice (0, 1);
let pays2 = [];
let chiffres2 = [];
let numero = [];

for (i = 0; i < chiffresGraph2.length; i++) {
  numero.push (chiffresGraph2[i].splice (0, 1));
  pays2.push (chiffresGraph2[i].splice (0, 1));
}

let e = 0;
while (e < chiffresGraph2.length) {
  for (f = 0; f < 2; f++) {
    chiffresGraph2[e][f] = parseFloat (chiffresGraph2[e][f]);
  }

  e++;
}

// datas

let datas21 = [];
let datas22 = [];
for (i = 0; i < chiffresGraph2.length; i++) {
  datas21.push (chiffresGraph2[i][0]);
  datas22.push (chiffresGraph2[i][1]);
}
let datas2 = [];
let obj21;
let obj22;

obj21 = {
  label: anneeGraph2[0],
  data: datas21,
  backgroundColor: random_rgba (),
  borderWidth: 1,
};
obj22 = {
  label: anneeGraph2[1],
  data: datas22,
  backgroundColor: random_rgba (),
  borderWidth: 1,
};
datas2.push (obj21);
datas2.push (obj22);

makeGraph1 ('graph1', anneeGraph1, datas);
makeGraph1 ('graph2', pays2, datas2);

let donneesx = [];
let donneesy = [];
let plusUn = 10;
let plusUn2 = 0;
// graph3

async function makeGraph () {
  let donnee = await fetch (
    'https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json'
  );
  let donnees = await donnee.json ();

  for (i = 0; i < donnees.length; i++) {
    donneesy.push (donnees[i][1]);
    if (plusUn2 == 0) {
      donneesx.push (donnees[i][0]);
    } else if (plusUn2 > 0 && i == donnees.length - 1) {
      donneesx.push (donnees[donnees.length - 1][0] + plusUn2);
    }
  }

  let donneesy2 = donneesy.slice (0, plusUn);
  let donneesx2 = donneesx.slice (0, plusUn);
  plusUn++;
  plusUn2++;

  let ctx3 = document.getElementById ('graph3').getContext ('2d');

  let myChart3 = new Chart (ctx3, {
    type: 'line',
    data: {
      labels: donneesx2,
      datasets: [
        {
          label: '# of Votes',
          data: donneesy2,
          borderColor: ['rgba(252, 214, 113, 1)'],
          fill: false,
          borderWidth: 1,
        },
      ],
    },
    options: {
      animation: {
        duration: 0,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
setInterval (makeGraph, 1000);
