import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Poc2 from "./Poc2";

const POC = (props) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);

  const fetchData = async () => {
    try {
      const url = `http://localhost:8000/api/v1/classify/leads/xcxxcx?userRole=1&status=3&page=${count}&limit=10&myLead=false&todaysFollowUp=false&aboutStatus=status`;
      const res = await axios.get(url);
      setData([...data, ...res.data.leads]);
      setCount(count + 1); // Increment count for next page
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on initial render

  return (
    <div>
      <InfiniteScroll
        dataLength={data.length} // This is important to render the next data
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {props.data &&
          props.data.map((e, i) => {
            return (
              <div className="bg-info p-5 my-4 w-100" key={e._id}>
               <Poc2  id={e._id} name={e.userRole} />
              </div>
            );
          })}
      </InfiniteScroll>
    </div>
  );
};

export default POC;
