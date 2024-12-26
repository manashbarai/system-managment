// import axios from 'axios';

// const getLocation = async () => {
//   try {
//     return new Promise((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;

//         // Replace 'YOUR_OPENCAGE_API_KEY' with your actual API key
//         const apiKey = 'YOUR_OPENCAGE_API_KEY';
//         const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

//         const response = await axios.get(apiUrl);
//         const city = response.data.results[0].components.city;

//         resolve(city);
//       }, (error) => {
//         reject(error);
//       });
//     });
//   } catch (error) {
//     console.error('Error getting location:', error);
//     throw error;
//   }
// };

// export default getLocation;

import { useState, useEffect } from "react";
import axios from "axios";

function Location() {
  //creating IP state
  const [ip, setIP] = useState("");

  //creating function to load ip address from the API
  // const getData = async () => {
  //   const res = await axios.get("https://geolocation-db.com/json/");
  //   console.log(res.data);
  //   setIP(res.data.IPv4);
  // };

  // Updated Code

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    return res.data
   
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  return (
    <div className="App">
      <h2>Your IP Address is</h2>
      <h4>{ip}</h4>
    </div>
  );
}

export default Location;