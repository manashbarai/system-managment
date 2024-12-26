import React from 'react';

const TimeConvert = ({ followTime }) => {
  const convertToAMPM = (time24) => {
    const [hour, minute] = time24.split(':');
    let hourInt = parseInt(hour, 10);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';

    if (hourInt === 0) {
      hourInt = 12; // 0 hour is 12 AM in 12-hour clock
    } else if (hourInt > 12) {
      hourInt -= 12; // Convert to 12-hour format if hour is greater than 12
    }

    return `${hourInt}:${minute} ${ampm}`;
  };

  const convertedTime = convertToAMPM(followTime);

  return (
    <>
      
      {convertedTime}
    </>
  );
};

export default TimeConvert;