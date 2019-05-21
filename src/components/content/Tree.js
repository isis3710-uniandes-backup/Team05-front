import * as d3 from 'd3';

class Tree {
  constructor(divId, data) {
    console.log('new tree!');
    const width = 1600;
    const radius = width / 2;

    const tree = d3.cluster().size([2 * Math.PI, radius - 100])

    const root = tree(d3.hierarchy(data)
      .sort((a, b) => (a.height - b.height) || a.data.name.localeCompare(b.data.name)));

    const svg = d3.select(divId).append('svg')
        .style("width", "100%")
        .style("height", "100%")
        .style("padding", "10px")
        .style("box-sizing", "border-box")
        .style("font", "10px sans-serif");

    const g = svg.append("g");

    const link = g.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .enter().append("path")
        .attr("d", d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y));

    const node = g.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
      .selectAll("g")
      .data(root.descendants().reverse())
      .enter().append("g")
        .attr("transform", d => `
          rotate(${d.x * 180 / Math.PI - 90})
          translate(${d.y},0)
        `);

    node.append("circle")
        .attr("fill", d => d.children ? "#555" : "#999")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => (d.x < Math.PI) === !d.children ? 6 : -6)
        .attr("text-anchor", d => (d.x < Math.PI) === !d.children ? "start" : "end")
        .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
        .text(d => d.data.name)
      .filter(d => d.children)
      .clone(true).lower()
        .attr("stroke", "white");

    const box = g.node().getBBox();

    svg.attr("width", box.width)
        .attr("height", box.height)
        .attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
  }
}

export default Tree;