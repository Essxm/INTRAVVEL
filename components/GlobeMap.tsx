import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';

const GlobeMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 500;
    const height = 500;
    const sensitivity = 75;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("max-width", "100%")
      .style("height", "auto");
      
    svg.selectAll("*").remove();

    // Define projection
    const projection = d3.geoOrthographic()
      .scale(230)
      .center([0, 0])
      .rotate([0, -30])
      .translate([width / 2, height / 2]);

    const initialScale = projection.scale();
    let path = d3.geoPath().projection(projection);

    // Glow effect
    const defs = svg.append("defs");
    const filter = defs.append("filter").attr("id", "glow");
    filter.append("feGaussianBlur").attr("stdDeviation", "5").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Globe Water
    const globe = svg.append("circle")
      .attr("fill", "#003B73")
      .attr("stroke", "#000")
      .attr("stroke-width", "0.2")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", initialScale);

    // Load GeoJSON data
    // Using a lightweight hosted topojson file for demo purposes
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((data: any) => {
        const countries = feature(data, data.objects.countries);

        const mapGroup = svg.append("g");

        mapGroup.selectAll("path")
          .data((countries as any).features)
          .enter().append("path")
          .attr("d", path as any)
          .attr("fill", "#59A5D8")
          .attr("stroke", "#003B73")
          .attr("stroke-width", 0.5)
          .style("opacity", 0.8)
          .on("mouseover", function() {
            d3.select(this).attr("fill", "#D6A419").style("cursor", "pointer");
          })
          .on("mouseout", function() {
            d3.select(this).attr("fill", "#59A5D8");
          });

        // Auto rotation
        d3.timer((elapsed) => {
          const rotate = projection.rotate();
          const k = sensitivity / projection.scale();
          projection.rotate([rotate[0] + 1 * k, rotate[1]]);
          path = d3.geoPath().projection(projection);
          mapGroup.selectAll("path").attr("d", path as any);
        });
      })
      .catch(err => console.log("Error loading map data", err));

  }, []);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="absolute z-0 opacity-20 bg-blue-500 blur-3xl w-64 h-64 rounded-full"></div>
      <svg ref={svgRef} className="relative z-10 drop-shadow-2xl"></svg>
    </div>
  );
};

export default GlobeMap;