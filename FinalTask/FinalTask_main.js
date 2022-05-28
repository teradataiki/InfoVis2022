let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("SSDSE-E-2022.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.label = +d.label;
            d.value = +d.value;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        

        

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: '都道府県',
            cscale: color_scale
        }, input_data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });


