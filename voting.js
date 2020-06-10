function voting() {
  Chart.pluginService.register({
    beforeRender: function (chart) {
      if (chart.config.options.showAllTooltips) {
        // create an array of tooltips
        // we can't use the chart tooltip because there is only one tooltip per chart
        chart.pluginTooltips = [];
        chart.config.data.datasets.forEach(function (dataset, i) {
          chart.getDatasetMeta(i).data.forEach(function (sector, j) {
            chart.pluginTooltips.push(new Chart.Tooltip({
              _chart: chart.chart,
              _chartInstance: chart,
              _data: chart.data,
              _options: chart.options.tooltips,
              _active: [sector]
            }, chart));
          });
        });

        // turn off normal tooltips
        chart.options.tooltips.enabled = false;
      }
    },
    afterDraw: function (chart, easing) {
      if (chart.config.options.showAllTooltips) {
        // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
        if (!chart.allTooltipsOnce) {
          if (easing !== 1)
            return;
          chart.allTooltipsOnce = true;
        }

        // turn on tooltips
        chart.options.tooltips.enabled = true;
        Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
          tooltip.initialize();
          tooltip.update();
          // we don't actually need this since we are not animating tooltips
          tooltip.pivot();
          tooltip.transition(easing).draw();
        });
        chart.options.tooltips.enabled = false;
      }
    }
  });

  // Setup the real graph
  var ctx = document.getElementById('myChart').getContext('2d');

  // Adjust canvas to window size
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  var chartData = [0]; // Keep global for later update

  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for a vote sum
    data: {
      labels: ['Submitted Votes'],
      datasets: [{
        backgroundColor: ['#7AC143'],
        borderColor: ['#7AC143'],
        data: chartData
      }]
    },

    options: {
      showAllTooltips: true,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 40
          }
        }]
      }
    }
  });

  // Fetch JSON data and update the graph
  function updateChart() {
    // Check for first tooltip rendering, only update afterwards
    if (!chart.allTooltipsOnce) return;

    // Prepare request
    var requestURL = 'https://vote.esn-germany.de/results';
    var request = new XMLHttpRequest({
      mozSystem: true
    });

    // Callback function
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var jsonData = JSON.parse(request.responseText);
        
        // Update graph
        // chartData[0] = jsonData;
        chartData[0] = 5;
        // console.log(jsonData);
        
        chart.update();
      }
    }

    // Send
    request.open('GET', requestURL);
    request.send();
  }

  // Activate auto update of graph data
  var intervalHandler = setInterval(updateChart, 1000);
  // };
}