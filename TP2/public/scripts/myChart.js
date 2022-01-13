
const nbValues = 12;
const defaultValue = 1;
const MIN_VALUE = 0;
const MAX_VALUE = 10;

const allLabels = new Array(nbValues).fill(defaultValue).map( (_,i) => String.fromCharCode('A'.charCodeAt(0)+i));
//const allLabels = ['J','F','M','A','M','J','J','A','S','O','N','D'];

// l'objet Chart
let myChart;

let dataSet = new Array(nbValues).fill(defaultValue);

const setup = () => {
  const ctxt = document.getElementById('myChart').getContext('2d');

  myChart = new Chart(ctxt, {
    type: 'bar',
    data: {
        labels: allLabels,
        datasets: [{
            label : `mes ${nbValues} dernières données`,
            data :  dataSet,//need to edit this data array
            backgroundColor: 'rgba(128,255,128,0.5)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
              min: MIN_VALUE,
              max: MAX_VALUE
            }
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', setup);
///////////////////// 

// création de la socket (connection client server)
const socket = io();

const updateChart = (nb) => {
  myChart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
    dataset.data.unshift(nb);
  });
  myChart.update();
}

socket.on('updateChart', nb => { 
  document.getElementById("nb").innerText=`${nb}`;
  updateChart(nb);
  }
);



