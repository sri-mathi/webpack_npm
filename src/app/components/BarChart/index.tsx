import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface DataPoint {
  category: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, width = 500, height = 300 }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) ?? 0])
      .nice()
      .range([innerHeight, 0]); 

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    chart
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`) 
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-30)")
      .style("text-anchor", "end");

    chart.append("g").call(d3.axisLeft(yScale));

    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.category)!)
      .attr("y", (d) => yScale(d.value)) 
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.value)) 
      .attr("fill", "steelblue");
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

interface BarChartComponentProps {
  tableData: { x: string[]; y: number[] };
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ tableData }) => {

  const sampleData = tableData.x.map((category, index) => ({
    category,
    value: tableData.y[index],
  }));

  return <BarChart data={sampleData} />;
};

export default BarChartComponent;
