import axios from 'axios';
import React, { useState } from 'react';
import { DataStorage } from '../../context/useCotext';

const SuperAdminApiKeySetting = () => {
    const {apiKeyAndSecretKey,getApiKey}=DataStorage()
    console.log(apiKeyAndSecretKey);
    const [apiKey, setApiKey] = useState({
        keyId:apiKeyAndSecretKey[0].key_id && apiKeyAndSecretKey[0].key_id,
        secretKey:apiKeyAndSecretKey[0].key_secret && apiKeyAndSecretKey[0].key_secret
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApiKey({ ...apiKey, [name]: value });
    };

    const handleLogValues =async() => {
        const data={
            key_id:apiKey.keyId,
            key_secret:apiKey.secretKey
        }
        const headers = {
            Authorization: `${localStorage.getItem("crm_token")}`,
            'Content-Type': 'application/json',
        };
    
        try { 

            const resp= await axios.post(`${process.env.REACT_APP_API}apiKey`,data,{headers})
            if (resp.status===200) {
                alert("Api key submit")
                getApiKey(`${process.env.REACT_APP_API}payment`)
            }
        } catch (error) {
            
        }

       
    };

    return (
        <div className='container py-5'>
            <h2 className='text-center'>Api Key Setting</h2>
            <div className='py-5 m-auto col-md-7'>
                <div>

                    <label>Key Id</label>
                    <input
                        type="text"
                        placeholder='Key Id'
                        className='col-md-12 form-control'
                        name='keyId'
                        value={apiKey.keyId}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='mt-2'>

                    <label>Secret Key</label>
                    <input
                        type="text"
                        placeholder='Secret Key'
                        className='col-md-12 form-control'
                        name='secretKey'
                        value={apiKey.secretKey}
                        onChange={handleInputChange}
                    />
                </div>
                <button className='btn border px-4 my-3' onClick={handleLogValues}>Submit</button>
            </div>
        </div>
    );
};

export default SuperAdminApiKeySetting;
