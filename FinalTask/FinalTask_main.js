d3.csv("https://teradataiki.github.io/InfoVis2022/FinalTask/SSDSE-E-2022.csv")
    .then( data => {
        data.forEach( (d,i) => {
          d.population = +d.population, 
          d.JapanesePopulation =+d.JapanesePopulation,
          d.PopulationUnder15YearsOld =+d.PopulationUnder15YearsOld,
          d.NumberOfKindergartens =+d.NumberOfKindergartens,
          d.NumberOfElementarySchools=+d.NumberOfElementarySchools,
          d.NumberOfSecondarySchools=+d.NumberOfSecondarySchools,
          d.index = i;  });

        const barchart = new BarChart({ 
            parent: '#drawing_region_barchart',
            width: 600,
            height: 600,
            margin: {top:10, right:50, bottom:50, left:100},
            xlabel: 'xlabel',
            ylabel: 'ylabel',
            title: "title",
            }, data);
        
        const scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 600,
            height: 600,
            margin: {top:10, right:10, bottom:50, left:100},
            xlabel: 'Sepal length [cm]',
            ylabel: 'Sepal width [cm]',
            }, data );
        
        d3.select('#original')
          .on('click', d => {
            data.sort((a, b) => a.index - b.index);
            barchart.update();
        });
        
        d3.select('#reverse')
        .on('click', d => {
            data.reverse();
            barchart.update();
        });
    
        d3.select('#ascend')
        .on('click', d => {
            const BarData = document.getElementById('BarValue');
            const num = BarData.selectedIndex;
            const str = BarData.options[num].value;
            //データの追加
              if(num == 1){
              data.sort((a, b) => a.population - b.population)
              }else if (num == 2){
                data.sort((a, b) => a.JapanesePopulation - b.JapanesePopulation)
              }else if (num == 3){
                data.sort((a, b) => a.PopulationUnder15YearsOld - b.PopulationUnder15YearsOld)
              }else if (num == 4){
                data.sort((a, b) => a.NumberOfKindergartens	 - b.NumberOfKindergartens	)
              }else if (num == 5){
                data.sort((a, b) => a.NumberOfElementarySchools	 - b.NumberOfElementarySchools	)
              }else if (num == 6){
                data.sort((a, b) => a.NumberOfSecondarySchools - b.NumberOfSecondarySchools)
              }
              barchart.update();
        });

        d3.select('#descend')
        .on('click', d => {
            const BarData = document.getElementById('BarValue');
            const num = BarData.selectedIndex;
            const str = BarData.options[num].value;
            //データの追加
              if(num == 1){
              data.sort((a, b) => b.population - a.population)
              }else if (num == 2){
              data.sort((a, b) => b.JapanesePopulation - a.JapanesePopulation)
              }else if (num == 3){
              data.sort((a, b) => b.PopulationUnder15YearsOld - a.PopulationUnder15YearsOld)
              }else if (num == 4){
              data.sort((a, b) => b.NumberOfKindergartens	 - a.NumberOfKindergartens	)
              }else if (num == 5){
              data.sort((a, b) => b.NumberOfElementarySchools	 - a.NumberOfElementarySchools	)
              }else if (num == 6){
              data.sort((a, b) => b.NumberOfSecondarySchools - a.NumberOfSecondarySchools)
              }
              barchart.update();
        });

        d3.select('#Decision1')
        .on('click', d => {
            const BarData = document.getElementById('BarValue');
            const num = BarData.selectedIndex;
            const str = BarData.options[num].value;
            barchart.update()
            document.getElementById("span1").textContent = str;   
        });

        d3.select('#Decision2')
        .on('click', d => {
            const HorizontalData = document.getElementById('HorizontalValue');
            const Horizontalnum = HorizontalData.selectedIndex;
            const Horizontalstr = HorizontalData.options[Horizontalnum].value;
            scatter_plot.update();
            document.getElementById("span2").textContent = Horizontalstr; 
        });

        d3.select('#Decision3')
        .on('click', d => {
            const VerticalData = document.getElementById('VerticalValue');
            const Verticalnum = VerticalData.selectedIndex;
            const Verticalstr = VerticalData.options[Verticalnum].value;
            scatter_plot.update();
            document.getElementById("span3").textContent = Verticalstr; 
        });
    })
    .catch( error => {
        console.log( error );
    });


