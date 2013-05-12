function drawMorrisGraph() {
	Morris.Bar({
	  element: 'samesame-morris',
	  data: dataset.stems,
	  xkey: 'stem',
	  ykeys: ['count'],
	  labels: ['Count'],
	  barColors: ['blue'],
	  hideHover: 'auto'
	});
}