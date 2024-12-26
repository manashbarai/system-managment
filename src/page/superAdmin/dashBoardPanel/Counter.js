import React from "react";
import CountUp from "react-countup";

export default function Counter(props) {


    




  return (
    <div className="number">
      <CountUp duration={10} className="counter" end={props.number} />
      {/* <span>{title}</span> */}
    </div>
  );
}