Number.prototype.m_formatter = function() {
    return this > 999999 ? (this / 1000000).toFixed(1) + 'M' : this
};
let stockTicker = function(){
    return {
        stockFullName: 'SW Limited.',
        stockShortName: 'ASX:SFW',
        price: {
            current: 2.320,
            open: 2.230,
            low: 2.215,
            high: 2.325,
            cap: 93765011,
            ratio: 20.10,
            dividend: 1.67
        },
        chartData: {
            labels: ['10:00','','','','12:00','','','','2:00','','','','4:00'],
            data: [2.23,2.215,2.22,2.25,2.245,2.27,2.28,2.29,2.3,2.29,2.325,2.325,2.32],
        },
        renderChart: function(){
            let c = false;

            Chart.helpers.each(Chart.instances, function(instance) {
                if (instance.chart.canvas.id == 'chart') {
                    c = instance;
                }
            });

            if(c) {
                c.destroy();
            }

            let ctx = document.getElementById('chart').getContext('2d');

            let chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: this.chartData.labels,
                    datasets: [
                        {
                            label: '',
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            borderColor: "rgba(255, 255, 255, 1)",
                            pointBackgroundColor: "rgba(255, 255, 255, 1)",
                            data: this.chartData.data,
                        },
                    ],
                },
                layout: {
                    padding: {
                        right: 10
                    }
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: "rgba(255, 255, 255, 1)",
                            },
                            gridLines: {
                                display: false,
                            },
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: "rgba(255, 255, 255, 1)",
                            },
                            gridLines: {
                                color: "rgba(255, 255, 255, .2)",
                                borderDash: [5, 5],
                                zeroLineColor: "rgba(255, 255, 255, .2)",
                                zeroLineBorderDash: [5, 5]
                            },
                        }]
                    }
                }
            });
        }
    }
}