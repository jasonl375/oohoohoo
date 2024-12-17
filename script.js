async function getData() {
  const response = await fetch("satData.csv");
  const data = await response.text();
  const rows = data.split("\n").slice(1, 5); 

  let schoolNames = [];
  let means = [];
  let colors = [];

  rows.forEach((elem) => {
      const row = elem.split(",");

      const reading = parseInt(row[3], 10);
      const math = parseInt(row[4], 10);
      const writing = parseInt(row[5], 10);

      if (!isNaN(reading) && !isNaN(math) && !isNaN(writing)) {
          schoolNames.push(row[1].trim()); 
          const mean = ((reading + math + writing) / 3).toFixed(2); 
          means.push(mean);
          colors.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`); 
      }
  });

  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: schoolNames,
          datasets: [{
              label: 'average SAT score across all sections',
              data: means,
              backgroundColor: colors,
              borderColor: 'rgba(85, 60, 170, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

getData();
