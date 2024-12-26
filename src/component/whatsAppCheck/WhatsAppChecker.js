import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WpLogo from "./whatsapp-symbol-logo-svgrepo-com.svg"
const WhatsAppChecker = ({ phoneNumber }) => {
  const [hasWhatsAppAccount, setHasWhatsAppAccount] = useState(false);

  useEffect(() => {
    const checkWhatsAppAccount = async () => {
      try {
        const response = await axios.get(
          `https://api.chat-api.com/phone_exist?token=YOUR_API_KEY&phone=${phoneNumber}`
        );

        setHasWhatsAppAccount(response.data.exists);
      } catch (error) {
        console.error('Error checking WhatsApp account:', error);
      }
    };

    checkWhatsAppAccount();
  }, [phoneNumber]);

  return (
    <>
      {hasWhatsAppAccount && <img src="whatsapp-logo.png" alt="WhatsApp Logo" />}
      <p>{hasWhatsAppAccount ? <> <img style={{width:"20px",height:"20px",objectFit:"contain"}} src={WpLogo} alt="" /> </> : ''}</p>
    </>
  );
};

export default WhatsAppChecker;
