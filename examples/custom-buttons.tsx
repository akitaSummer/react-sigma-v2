import { faTime, rng } from "./utils/random";
import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { UndirectedGraph } from "graphology";
import erdosRenyi from "graphology-generators/random/erdos-renyi";
import circularLayout from "graphology-layout/circular";
import { BsArrowsFullscreen, BsFullscreenExit, BsZoomIn, BsZoomOut, BsPauseFill, BsFillPlayFill } from "react-icons/bs";
import { BiRadioCircleMarked } from "react-icons/bi";
import faker from "faker";

import {
  ControlsContainer,
  ForceAtlasControl,
  useLoadGraph,
  SearchControl,
  SigmaContainer,
  ZoomControl,
  FullScreenControl,
} from "../src/index";
import "../src/assets/index.scss";

interface MyCustomGraphProps {
  children?: ReactNode;
}

export const MyCustomGraph: React.FC<MyCustomGraphProps> = ({ children }) => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    // Create the graph
    const graph = erdosRenyi(UndirectedGraph, { order: 100, probability: 0.1, rng });
    circularLayout.assign(graph);
    graph.nodes().forEach(node => {
      graph.mergeNodeAttributes(node, {
        label: faker.name.findName(),
        size: Math.max(4, Math.random() * 10),
      });
    });
    loadGraph(graph);
  }, []);

  return <>{children}</>;
};

ReactDOM.render(
  <React.StrictMode>
    <SigmaContainer>
      <MyCustomGraph />
      <ControlsContainer position={"bottom-right"} style={{ backgroundColor: "red" }}>
        <ZoomControl
          customZoomIn={<BsZoomIn />}
          customZoomOut={<BsZoomOut />}
          customZoomCenter={<BiRadioCircleMarked />}
        />
        <ForceAtlasControl
          autoRunFor={faTime || 2000}
          customStartLayout={<BsFillPlayFill />}
          customStopLayout={<BsPauseFill />}
        />
        <FullScreenControl customEnterFullScreen={<BsArrowsFullscreen />} customExitFullScreen={<BsFullscreenExit />} />
      </ControlsContainer>
      <ControlsContainer position={"top-right"}>
        <SearchControl />
      </ControlsContainer>
    </SigmaContainer>
  </React.StrictMode>,
  document.getElementById("root"),
);