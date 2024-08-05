<script lang="ts">
	import { select, scaleLinear, line } from 'd3';
	import { hex } from 'generate-random-color'
	let containerRef: SVGElement | null = $state(null);
	const margin = { top: 20, right: 10, bottom: 60, left: 10 };
	const width = 760 - margin.left - margin.right;
	const height = 450 - margin.top - margin.bottom;

	let { data }: { data: Record<string, Record<string, number>> } = $props();

	//converting data point to coordinates
	const capitalize = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const radius = 200;
	const ticks = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
	const cordForAngle = (angle: number, len: number) => {
		let x = Math.cos(angle) * len;
		let y = Math.sin(angle) * len;

		return { x: x, y: y };
	};
	$effect(() => {
		const attributes = Object.keys(data[Object.keys(data)[0]]);
		const svg = select(containerRef)
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
			.attr('fill', 'gray');
		//round axis
		for (let i = 0; i < attributes.length; i++) {
			const slice = Math.PI / 2 + (2 * Math.PI * i) / attributes.length;
			const key = attributes[i];

			//axis values
			const { x, y } = cordForAngle(slice, radius);

			svg.append('line')
				.attr('x2', x + width / 2)
				.attr('y2', y + height / 2)
				.attr('x1', width / 2)
				.attr('y1', height / 2)
				.attr('stroke', 'white')
				.attr('stroke-width', 1.5)
				.style('opacity', '0.1');

			svg.append('text')
				.attr('x', x + width / 2)
				.attr('y', y + height / 2)
				.text(capitalize(key))
				.style('text-anchor', (d) =>
					i === 0 ? 'end' : i === 1 ? 'end' : i === 2 ? 'end' : i === 2 ? 'end' : null
				)
				.attr('dx', (d) =>
					i === 0
						? '0.7em'
						: i === 1
							? '-0.7em'
							: i === 2
								? '-0.5em'
								: i === 3
									? '0.3em'
									: '0.6em'
				)
				.attr('dy', (d) =>
					i === 0
						? '1.3em'
						: i === 1
							? '0.4em'
							: i === 2
								? '-0.5em'
								: i === 3
									? '-0.5em'
									: '0.4em'
				)
				.attr('fill', 'white');
		}
		const radAxis = scaleLinear().domain([0.1, 1.0]).range([0, radius]);
		//circle labels
		ticks.forEach((el) => {
			svg.append('text')
				.attr('x', width / 2)
				.attr('y', height / 2 - radAxis(el) - 0.85)
				.text(el)
				.attr('fill', 'white')
				.attr('stroke', 'none')
				.attr('opacity', '0.5')
				.style('text-anchor', 'middle')
				.style('font-size', '0.825rem');
		});
		ticks.forEach((el) => {
			svg.append('circle')
				.attr('cx', width / 2)
				.attr('cy', height / 2)
				.attr('fill', 'none')
				.attr('stroke', 'gray')
				.attr('stroke-width', 1.0)
				.attr('r', radAxis(el));
		});
		const getCoordPath = (dataPoint: (typeof data)[keyof typeof data]) => {
			let coord = [];
			for (let i = 0; i < attributes.length; i++) {
				let attr = attributes[i];
				let angle = Math.PI / 2 + (2 * Math.PI * i) / attributes.length;
				coord.push(cordForAngle(angle, radAxis(dataPoint[attr])));
			}
			return coord;
		};
		//line generator
		let lineGen = line()
			.x((d) => d.x)
			.y((d) => d.y);

		//drawing path
		Object.keys(data).forEach((studentName, i) => {
			const report = data[studentName];
			// const reportKeys = Object.keys(data[studentName]);
			const cord = getCoordPath(report);
			const color = hex();
			console.log(color);
			//spider chart
			const spiderChart = svg.append('path')
				.datum(cord)
				.attr('class', "areapath")
				.attr('id',`spider-chart-${studentName}`)
				.attr('d', lineGen)
				.attr('stroke-width', 1.5)
				.attr('stroke', 'none')
				.attr('fill', () => color)
				.attr('opacity', 0.1)
				.attr('transform', `translate(${width / 2}, ${height / 2})`);

			svg.append('circle')
				.attr('cx', width / 2 + 250)
				.attr('cy', (height / 2 + (150 + i * 35)))
				.attr('r', 10)
				.style('fill', color)
				.style('opacity', '0.5');

			svg.append('text')
				.attr('y', height / 2 + (150 + i * 35))
				.attr('x', width / 2 + 280)
				.html(studentName)
				.on('mouseover', () => {
					spiderChart.attr('class', 'areapath opacity-50');
				})
				.on('mouseout', () => {
					spiderChart.attr('class', 'areapath');
				})
				.style('stroke', 'none')
				.style('fill', 'white');
		});
	});
</script>

<svg viewBox={`0 0 ${width + 100} ${height + 100}`} bind:this={containerRef}> </svg>

<style>
	:global(.areapath):hover {
		opacity: 0.5;
	}
</style>
