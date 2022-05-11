d3.csv("https://teradataiki.github.io/InfoVis2022/W08/data2.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:30, right:30, bottom:50, left:30},
            xtics:10,
            yticks:10,
            xlabel: 'xlabel',
            title: 'title',
        };

        let linechart_plot = new LinechartPlot( config, data );
        kinechart_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class LinechartPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:20},
            xticks: config.xticks || 10,
            yticks: config.yticks || 10,
            xlabel: config.xlabel || '',
            title: config.title || '',
            r:config.r||5,
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

           
            self.chart = self.svg.append('g')
                .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
    
            self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
            self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
    
            self.xscale = d3.scaleLinear()
                .domain([0, d3.max(self.data, d => d.x)])
                .range([0, self.inner_width]);
    
            self.yscale = d3.scaleBand()
                .domain(self.data.map(d => d.y))
                .range([self.inner_height,0]);
               
    
            self.xaxis = d3.axisBottom(self.xscale)
                .ticks(5);
                
    
            self.yaxis = d3.axisLeft(self.yscale)
                .ticks(0)
                .tickSizeOuter(0);
    
            self.xaxis_group = self.chart.append('g')
                .attr('transform', `translate(0, ${self.inner_height})`)
                .call(self.xaxis);
    
            self.yaxis_group = self.chart.append('g')
                .call(self.yaxis);
    
            self.axis_group = self.svg.append('g')
            self.title_group = self.svg.append('g')
    }

    update() {
        let self = this;

       

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale(d.x))
            .attr("cy", d => self.yscale(d.y))
            .attr("r", d => self.config.r);
      


        self.title_group.append('text')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top - 10)
            .attr('font-size', '10pt')
            .text(self.config.title);

       
    }
}
