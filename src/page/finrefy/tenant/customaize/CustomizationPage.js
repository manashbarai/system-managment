import React, { useEffect, useMemo, useState } from 'react';
import './CustomizationPage.css';
import axios from 'axios';
import { DataStorage } from '../../../../context/useCotext';
import Loader from '../../../../component/Loder/Loader';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CustomizationPage = (props) => {
    const { isLoading, superTeams, getAllSuperTeam } = DataStorage()
    const headers = useMemo(() => ({
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    }), [])
    const [changesStatus, setChangesStatus] = useState("status")
    const [showingFieldNameChange, setShowingFieldNameChange] = useState("")
    const [showingFieldNameChangeName, setShowingFieldNameChangeName] = useState("")
    const idUniqueNumber = [1, 2, 3, 4, 5, 6, 7]
    const [editStatus, setEditStatus] = useState({})
    const [logoUrl, setLogoUrl] = useState("")
    const [previousSort, setPreviousSort] = useState()
    const [fromEditField, setFromEditField] = useState({
        id: "",
        color1: "",
        color2: "",
        deg: "",
        status: "",
        sort: '',
        callingStatus: "",

    })
    const [showingField, setShowingField] = useState([])
    const [addField, setAddField] = useState(false)
    const [addFieldName, setAddFieldName] = useState("")


    const handleChange = (e) => {

        const { name, value } = e.target;
        setFromEditField((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const [sorting, setSorting] = useState([])
    const [id, setId] = useState([])

    useEffect(() => {
        let sorting;
        let id;
        if (changesStatus === 'status') {
            sorting = props.superTeam && props.superTeam.companyStatus.map(({ sort }) => sort)
            id = props.superTeam && props.superTeam.companyStatus.map(({ id }) => id)

        } else {
            sorting = props.superTeam && props.superTeam.companyCallingStatus.map(({ sort }) => sort)
            id = props.superTeam && props.superTeam.companyCallingStatus.map(({ id }) => id)
        }

        setId(id)
        setSorting(sorting)
        setFromEditField({
            id: "",
            color1: "",
            color2: "",
            deg: "",
            status: "",
            sort: '',
            callingStatus: "",
        })
        setEditStatus({})
        setShowingField(props.superTeam.showingField)
    }, [changesStatus, props.superTeam, showingField, superTeams])


    const updateDataShowingField = async (data) => {

        try {
            const showingFields = {
                showingField: data
            }
            try {
                const addNewField = await axios.put(`${process.env.REACT_APP_API}superAdminTeam/status/${props.superTeam._id}`, showingFields, { headers })

            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>

            <div style={{ paddingLeft: "30px" }} className='mt-5 px-4mt-5 px-4 '>
                <h3 className='border rounded p-2'>Customize on : {props.superTeam.teamName} Team <span className='fs-6 float-end gap-2 flex-c'>   <button className='border p-2' onClick={() => {
                    changesStatus === "status" ? setChangesStatus("callingStatus") : setChangesStatus("status");
                    setEditStatus({})
                    setFromEditField({
                        id: "",
                        color1: "",
                        color2: "",
                        deg: "",
                        status: "",
                        sort: "",
                        callingStatus: ""
                    });
                }


                }  >{changesStatus === "status" ? "Customizes CallingStatus" : "Customizes Status"}   </button>
                </span></h3>

                <div className='  pb-4'>

                    <div className='Main bg-body '>
                        <div className='d-flex  gap-2'>
                            {changesStatus === 'status' ? <>
                                {props.superTeam.companyStatus.sort((a, b) => parseInt(a.sort) - parseInt(b.sort)).map((status, index) => {
                                    return <div style={{
                                        background: `linear-gradient(${status.color})`,
                                        borderRadius: '10px',
                                        minWidth: "110px",

                                        flex: '1',

                                    }} className=' Box1 position-relative flex-1'>
                                        <div className='NumberBox'>
                                            <h3 className='Number'>(0)</h3>
                                        </div>
                                        <div className=''>
                                            <h3 className='Content'>{status.status} </h3>
                                            <span className='d-flex EditIcon flex-column gap-1 m-1'>


                                                <button className='  border-0  bg-transparent ' style={{ color: 'white' }} onClick={() => {
                                                    setEditStatus(status)
                                                    setPreviousSort()
                                                    setPreviousSort(parseInt(status.sort))
                                                    setFromEditField((prev) => {

                                                        let clearedFields = {};


                                                        if (status) {

                                                            clearedFields = {
                                                                id: status.id,
                                                                color1: status.color.split(",")[1].trim().split(" ")[0],
                                                                color2: status.color.split(",")[2].trim().split(" ")[0],
                                                                deg: status.color.split(",")[0],
                                                                sort: parseInt(status.sort),
                                                                status: status.status !== undefined ? status.status : prev.status,
                                                            };
                                                        }


                                                        return clearedFields;
                                                    });
                                                }} >  <img style={{ width: "70%", height: "70%" }} className='' src="../../../images/edit.svg" alt="" /> </button>

                                                <button className='bg-transparent border-0 ' onClick={async () => {


                                                    let companyStatusUpdateData;
                                                    if (changesStatus === 'status') {


                                                        const index = props.superTeam.companyStatus.findIndex(company => company.id === status.id);
                                                        props.superTeam.companyStatus.splice(index, 1);




                                                        const data = { companyStatus: props.superTeam.companyStatus }

                                                        const updatedstatus = await axios.put(`${process.env.REACT_APP_API}superAdminTeam/status/${props.superTeam._id}`, data, { headers })
                                                        if (updatedstatus.status === 200) {


                                                            getAllSuperTeam(`${process.env.REACT_APP_API}superAdminTeam`)

                                                        }

                                                    }








                                                }}  >  <img style={{ width: "100%", height: "70%" }} className='border-0' src="../../../images/delete.svg" alt="" /> </button>
                                            </span>
                                        </div>
                                    </div>
                                })}
                            </> : <>
                                {props.superTeam.companyCallingStatus.sort((a, b) => a.sort - b.sort).map((status, index) => {
                                    return <div style={{
                                        background: `linear-gradient(${status.color})`,
                                        borderRadius: '10px',
                                        minWidth: "110px",
                                        height:"auto",
                                        flex: '1',

                                    }} className=' Box1 position-relative flex-1'>
                                        <div className='NumberBox'>
                                            <h3 className='Number'>(0)</h3>
                                        </div>
                                        <div className=''>
                                            <h3 className='Content'>{status.callingStatus} </h3>
                                            <span className='d-flex EditIcon flex-column gap-1 m-1  position-absolute top-0 h-100'>
                                                <button className=' border-0 bg-transparent' style={{ color: 'white' }} onClick={() => {
                                                    setEditStatus(status)
                                                    console.log("status", status);
                                                    setFromEditField((prev) => {
                                                        setPreviousSort()
                                                        setPreviousSort(status.sort)
                                                        let clearedFields = {};


                                                        if (status) {

                                                            clearedFields = {
                                                                id: status.id,
                                                                color1: status.color.split(",")[1].trim().split(" ")[0],
                                                                color2: status.color.split(",")[2].trim().split(" ")[0],
                                                                deg: status.color.split(",")[0],
                                                                sort: parseInt(status.sort),
                                                                callingStatus: status.callingStatus !== undefined ? status.callingStatus : prev.callingStatus,
                                                            };
                                                        }


                                                        return clearedFields;
                                                    });

                                                }} ><img style={{ width: "70%", height: "70%" }} className='' src="../../../images/edit.svg" alt="" /> </button>


                                               





                                                <button className='bg-transparent border-0 btn-info' style={{ color: 'white' }} onClick={async () => {
                                                    try {

                                                        const index = props.superTeam.companyCallingStatus.findIndex(company => company.id === status.id);
                                                        props.superTeam.companyCallingStatus.splice(index, 1);

                                                        const data = { companyCallingStatus: props.superTeam.companyCallingStatus }

                                                        const updatedstatus = await axios.put(`${process.env.REACT_APP_API}superAdminTeam/status/${props.superTeam._id}`, data, { headers })
                                                        if (updatedstatus.status === 200) {


                                                            getAllSuperTeam(`${process.env.REACT_APP_API}superAdminTeam`)

                                                        }

                                                    } catch (error) {
                                                        console.log(error);
                                                    }
                                                }} ><img style={{ width: "70%", height: "70%" }} className='' src="../../../images/delete.svg" alt="" /> </button>
                                            </span>
                                        </div>
                                    </div>
                                })}
                            </>}





                            <button className='btn Box3' onClick={() => {
                                const restOfUniqueNumber = idUniqueNumber.filter(e => !id.includes(e));
                                if (restOfUniqueNumber.length === 0) alert("You Not set More then 7 status")

                                if (changesStatus === "status") {

                                    setEditStatus((prev) => {
                                        // Initialize clearedFields object
                                        let clearedFields = {};
                                        setPreviousSort()
                                        setPreviousSort(sorting[sorting.length - 1] + 1)
                                        // Add the new values if 'status' exists

                                        // Update the clearedFields object
                                        clearedFields = {
                                            id: restOfUniqueNumber[0],
                                            color1: "#fff",
                                            color2: "#5f8a49",
                                            deg: "180deg",
                                            sort: sorting[sorting.length - 1] + 1,
                                            status: ""
                                        };


                                        // Return the updated clearedFields object
                                        return clearedFields;
                                    })
                                    setFromEditField((prev) => {

                                        let clearedFields = {};


                                        clearedFields = {
                                            id: restOfUniqueNumber[0],
                                            color1: "#fff",
                                            color2: "#5f8a49",
                                            deg: "180deg",
                                            sort: sorting[sorting.length - 1] + 1,
                                            status: "Status"
                                        };



                                        return clearedFields;
                                    })
                                } else {
                                    setPreviousSort()
                                    setPreviousSort(parseInt(sorting.length) + 1)
                                    setEditStatus((prev) => {

                                        let clearedFields = {};



                                        clearedFields = {
                                            id: restOfUniqueNumber[0],
                                            color1: "#fff",
                                            color2: "#5f8a49",
                                            deg: "180deg",
                                            sort: sorting[sorting.length - 1] + 1,
                                            callingStatus: "",
                                        };


                                        // Return the updated clearedFields object
                                        return clearedFields;
                                    })
                                    setFromEditField((prev) => {
                                        // Initialize clearedFields object
                                        let clearedFields = {};

                                        // Add the new values if 'status' exists

                                        clearedFields = {
                                            id: restOfUniqueNumber[0],
                                            color1: "#fff",
                                            color2: "#5f8a49",
                                            deg: "180deg",
                                            sort: 3,
                                            callingStatus: "Calling Status",
                                        };


                                        // Return the updated clearedFields object
                                        return clearedFields;
                                    })
                                };
                            }}  >
                                <div className='NumberBox3'>
                                    <h3 className='Number'>(+)</h3>
                                </div>
                                <div className='ContentContainer'>
                                    <h3 className='Content'>Add Field</h3>
                                </div>
                            </button>
                        </div>




{/* mmmmmm */}

{editStatus.id !== undefined && <div>


<div className='mt-5 Heading px-3'>
    <h1 className='headIng text-capitalize'>Customize {changesStatus}</h1>
    <div className='Buttons'>
        <button className='btn Apply' onClick={async () => {
            alert("Before changing any thing make sure you have download Reports once you delete or change status you lose this status according reports For this particular superAdmin team ")

            let data;
            if (changesStatus === 'status') {
                data = {
                    id: fromEditField.id,
                    color: `${fromEditField.deg},${fromEditField.color1} 0%,${fromEditField.color2} 100%`,
                    status: fromEditField.status,
                    sort: fromEditField.sort,

                }
            } else {
                data = {
                    id: fromEditField.id,
                    color: `${fromEditField.deg},${fromEditField.color1} 0%,${fromEditField.color2} 100%`,
                    callingStatus: fromEditField.callingStatus,
                    sort: fromEditField.sort,

                }
            }





            let companyStatus = changesStatus === 'status' ? props.superTeam.companyStatus : props.superTeam.companyCallingStatus;
            if (changesStatus === 'callingStatus') {
                companyStatus = companyStatus.map(item => ({
                    ...item,
                    sort: Number(item.sort)
                }));
            }
            const findIndex = companyStatus.findIndex(e => e.id === fromEditField.id);



            if (findIndex === -1) {

                let duplicateSortElem = companyStatus.find(sort => sort.sort === fromEditField.sort);


                let newDuplicateElem;
                if (duplicateSortElem) {
                    newDuplicateElem = { ...duplicateSortElem, sort: previousSort };

                    const findIndex1 = companyStatus.findIndex(e => e.id === newDuplicateElem.id);

                    if (findIndex1) {

                        companyStatus.splice(findIndex1, 1, newDuplicateElem)

                    }
                }

                companyStatus.push(data)




            } else {
                let duplicateSortElem = companyStatus.find(sort => sort.sort === fromEditField.sort);

                let newDuplicateElem;
                if (duplicateSortElem) {
                    newDuplicateElem = { ...duplicateSortElem, sort: previousSort };

                }


                const findIndex1 = companyStatus.findIndex(e => e.id === newDuplicateElem.id);
                companyStatus.splice(findIndex1, 1, newDuplicateElem)
                const findIndex2 = companyStatus.findIndex(e => e.id === data.id);


                companyStatus.splice(findIndex2, 1, data)



            }

            let companyStatusUpdateData;
            if (changesStatus === 'status') {
                companyStatusUpdateData = {
                    companyStatus: companyStatus
                }
            } else {
                companyStatusUpdateData = {
                    companyCallingStatus: companyStatus
                }
            }






            try {

                const updatedstatus = await axios.put(`${process.env.REACT_APP_API}superAdminTeam/status/${props.superTeam._id}`, companyStatusUpdateData, { headers })


                if (updatedstatus.status === 200) {


                    getAllSuperTeam(`${process.env.REACT_APP_API}superAdminTeam`)

                }

            } catch (error) {
                console.log(error);
            }

        }}  >Apply Changes</button>

    </div>

</div>

<div className='mt-5 EditPanel px-3'>
    <div style={{
        background: `linear-gradient(${fromEditField.deg}, ${fromEditField.color1} 0%, ${fromEditField.color2} 100%)`,

        borderRadius: '10px',
        width: "150px",
        height: "130px"
    }} className='d-flex align-items-center flex-column justify-content-center '>
        <div style={{ backgroundImage: `linear-gradient(to bottom, ${fromEditField.color1}, #fff)`, padding: '5px 8px' }} className='rounded'>
            <h3 className='Number'>(0)</h3>
        </div>
        <h3 className='Content'>{fromEditField.status ? fromEditField.status : fromEditField.callingStatus}  </h3>
        <div className='ContentContainer'>
        </div>
    </div>

    <div className='InputArea d-flex gap-3'>
        <div>

            <label>Status Name </label>
            <input className='Status px-3' type='text' placeholder='' value={changesStatus === "status" ? fromEditField.status : fromEditField.callingStatus} name={changesStatus === "status" ? "status" : "callingStatus"} onChange={handleChange} />
            <div className='Editdetail'>
                <div className='mt-3 InputArea1'>
                    <label>Choose Color 1</label>
                    <input className='Colorpicker ' value={fromEditField.color1} name="color1" type='color' onChange={handleChange} />
                </div>
                <div className='mt-3 InputArea1'>
                    <label>Choose Color 2</label>
                    <input className='Colorpicker' value={fromEditField.color2} name="color2" type='color' onChange={handleChange} />
                </div>
                <div className='mt-3 InputArea1'>
                    <label>Rotate Your Color</label>
                    <input
                        className='Colorpicker w-25 g'
                        value={(parseInt(fromEditField.deg.split("deg")[0]) % 360 + 360) % 360}
                        name="deg"
                        type='number'
                        onChange={(e) => {
                            let value = parseInt(e.target.value) % 360;
                            value = (value + 360) % 360;
                            handleChange(e);
                            setFromEditField((prev) => ({
                                ...prev,
                                deg: value + 'deg',
                            }));
                        }}
                    />
                </div>
                {props.superTeam.companyStatus.find(statusId => statusId.id === fromEditField.id) && <div className='mt-3 Order' name="sort" onChange={(e) => {

                    setFromEditField((prev) => ({
                        ...prev,
                        sort: parseInt(e.target.value),
                    }));
                }}>
                    <label>Sequence</label>

                    <select className='Number12'>

                        <option value='1'> {fromEditField.sort} </option>
                        {sorting.map((e) => {
                            return <option value={e}>{e} </option>
                        })}


                    </select>
                </div>}
            </div>
        </div>









    </div>

</div>
</div>}












                    </div>

                    
                    <div className='mt-5 Line'></div>
                    <div className='px-3'>

                        <div className='mt-5 d-flex justify-content-between'>
                            <h4>Add/Edit Fields For Display Showing</h4>
                            {/* <button className='btn btn-dark' onClick={updateDataShowingField}  >Apply Changes</button> */}
                        </div>
                        <div className='mt-4 Edit flex-wrap d-flex'>
                            {showingField.map((showingFields, index) => {
                                return <button className='btn btn-secondary Name position-relative text-capitalize' disabled={index <= 3} >

                                    {showingFieldNameChange === showingFields ? <><input type="text" onChange={(e) => {
                                        setShowingFieldNameChangeName(e.target.value)
                                    }} /> <button className='btn btn-dark' onClick={() => {
                                        setShowingField(showingField.splice(index, 1, showingFieldNameChangeName.toLocaleLowerCase()))
                                        const updatedData = showingField

                                        updateDataShowingField(updatedData)


                                    }}> ok</button> </> : <> {showingFields} </>}




                                    {index >= 4 && <> <span className='m-0 p-0  d-flex  SS_Close'>





                                        <button className='p-0 m-0 rounded-pill border-0 ' onClick={() => {

                                            setShowingField(showingField.splice(index, 1))
                                            updateDataShowingField(showingField)


                                        }}><img style={{ width: "100%", height: "100%" }} className='border rounded-pill' src="../../../images/delete.svg" alt="" /> </button>  </span>

                                        <span className='  m-0 p-0  d-flex SS_Close1'>

                                            <button className='p-0 m-0  border-0 bg-transparent' onClick={() => {


                                                setShowingFieldNameChange(showingFields)
                                            }}  > <img style={{ width: "100%", height: "100%" }} className='border rounded-pill' src="../../../images/edit.svg" alt="" />  </button>



                                        </span>

                                    </>}   </button>
                            })}

                            {addField === true ? <div className='position-relative'>
                                <input type="text" placeholder='Field Name' onChange={(e) => {

                                    setAddFieldName(e.target.value)
                                }} />
                                <button className='position-absolute top-0 end-0 btn btn-dark' onClick={() => {

                                    setShowingField(prevState => [...prevState, addFieldName]);

                                    const updatedData = showingField;
                                    const addingUpdateData = updatedData.push(addFieldName.toLocaleLowerCase())

                                    updateDataShowingField(updatedData)

                                }}  > Add </button>


                            </div> : <button className='btn btn-secondary Name' onClick={() => {

                                setAddField(true)
                            }} >+ Add fields</button>}


                        </div>
                    </div>
                    <hr />
                    <div className='px-3'>

                        <div className='mt-5 '>
                            <h4>Mandatory Fields</h4>
                        </div>
                        <div className='mt-4 Edit '>
                            {props.superTeam.mandatoryField.map((showingField, index) => {
                                return <button className='btn btn-secondary Name text-capitalize' disabled={index <= 2} >{showingField}</button>
                            })}



                        </div>
                    </div>
                    <div className='mt-5 Line'></div>
                    <div className='mt-5 Business'>
                        <div className='Logo'>
                            <h4>Add Business Logo Link</h4>
                            <input type="img" src={logoUrl} onChange={(e) => { setLogoUrl(e.target.value) }} />
                        </div>


                        <button className='mt-5 '>
                            {logoUrl !== "" ? <div style={{ width: "120px", height: "60px" }} className=' border-2'> <img style={{ width: "100%", height: "100%" }} src={logoUrl} alt={"logoUrl"} /></div> :
                                <div style={{ width: "120px", height: "60px" }} className=''>
                                    <h3 className='Content11'>+</h3>
                                </div>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomizationPage;
