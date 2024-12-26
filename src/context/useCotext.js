import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import reducer from '../reducer/useReducer'
const AppContext = createContext();
// const URL = `${process.env.REACT_APP_API}leads`;
const USERS = `${process.env.REACT_APP_API}allUser`;
const allCompanyProfile = `${process.env.REACT_APP_API}company/all`
const USER = `${process.env.REACT_APP_API}user/${localStorage.getItem('crm_id')}`;
const companyProfile = `${process.env.REACT_APP_API}company/${localStorage.getItem('crm_companyId')}`;

// const STATUS_WITH_COUNT_MONTH = `${process.env.REACT_APP_API}statusGetWithCount}`
const TEAM = `${process.env.REACT_APP_API}team/superAdmin/${localStorage.getItem('crm_id')}`;
const MY_TEAM = `${process.env.REACT_APP_API}team/${localStorage.getItem('crm_id')}`;


// const ALL_STATE = `${process.env.REACT_APP_API}states`;

const TOTAL_THREE_COUNT = `${process.env.REACT_APP_API}totalLeadsCount/accordingStatus`

const RAZORPAY = `${process.env.REACT_APP_API}apiKey`

const LEADS_LIMIT = `${process.env.REACT_APP_API}leadsLimit`

const initialState = {
    isLoading: false,
    isError: false,
    allLeads: [],
    myLeads: [],
    allUser: [],
    allNormalUser: [],
    blockUser: [],
    allAdmin: [],
    normalUser: [],
    receiveLeads: [],
    myProfile: {},
    myTeams: {},
    mySuperTeam: {},
    leads_Limit: [],
    status: [],
    SuperAdminAssignedLeads: [],
    team: [],
    superTeams: [],
    liveFeed: [],
    callingStatus: [],
    allState: [],
    todayDate: "",
    leadLimit: [],
    razorpay: [],
    classificationAccordingtoStatus: [],
    superAdminLead: [],
    useReducer: [],
    totalLead: "",
    totalLeadsCount: [],

    totalStatusWithMonth: [],
    apiKeyAndSecretKey: [],
    plan: []

}



const AppProvider = ({ children }) => {



    const todaysStartAndEndMonth = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const startOfMonth = new Date(year, month, 1).getTime();
        const endOfMonth = new Date(year, month + 1, 0).getTime();

        return { startOfMonth, endOfMonth };
    };

    const { startOfMonth, endOfMonth } = todaysStartAndEndMonth();


    const headers = useMemo(() => ({
        Authorization: `${localStorage.getItem("crm_token")}`,
        'Content-Type': 'application/json',
    }), [])

    const [state, dispatch] = useReducer(reducer, initialState)
    const getLeadLimit = useCallback(async (url) => {



        dispatch({ type: "LOADING" })
        try {
            const leadsLimit = await axios.get(url, { headers })
            const limit = leadsLimit.data;


            dispatch({ type: "LEADS_LIMIT", payload: limit })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }

    }, [headers])
    const getAllUser = useCallback(async (url) => {
        dispatch({ type: "LOADING" })
        try {
            const res = await axios.get(url, { headers })
            const user = await res.data;
            console.log("res.data", res.data);

            dispatch({ type: "USERS", payload: user })
        } catch (error) {

            dispatch({ type: "API_ERROR", payload: error })
        }
    }, [headers])

    const getSuperAdminLeads = async (url) => {
        dispatch({ type: "LOADING" })
        try {

            const res = await axios.get(url)
            const leads = await res.data;

            dispatch({ type: "SUPER_ADMIN_LEAD", payload: leads })
        } catch (error) {
            if (error.response.status === 401) {

                localStorage.clear()
                window.location.reload()

            }
            dispatch({ type: "API_ERROR", payload: error })
        }
    }
    const getUser = useCallback(async (url) => {
        dispatch({ type: "LOADING" })
        try {
            let res;
            let user;
            if (localStorage.getItem("crm_id")) {
                res = await axios.get(url, { headers })
                user = await res.data;
            }


            dispatch({ type: "USER", payload: user })
        } catch (error) {
            if (error.response.status === 401) {

                localStorage.clear()
                window.location.reload()
                // window.location.href('./login')
            }
            dispatch({ type: "API_ERROR", payload: error })
        }
    }, [headers])
    const getStatus = useCallback(async (url) => {
        dispatch({ type: "LOADING" })
        try {
            let res = await axios.get(url, { headers })
            let data = await res.data

            dispatch({ type: "STATUS", payload: data })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }, [headers])
    const getCallingStatus = useCallback(async (url) => {
        dispatch({ type: "LOADING" })
        try {
            let res = await axios.get(url, { headers })
            let data = await res.data

            dispatch({ type: "CALLINGSTATUS", payload: data })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }, [headers])
    const getAllTeam = useCallback(async (url) => {
        dispatch({ type: "LOADING" })
        try {
            let team = await axios.get(url, { headers })
            const teamRes = await team.data

            dispatch({ type: "TEAM", payload: teamRes })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }, [headers])
    const getAllSuperTeam = useCallback(async (url) => {
       
        dispatch({ type: "LOADING" })
        try {
            let team = await axios.get(url, { headers })
            const teamRes = await team.data
          
            dispatch({ type: "SUPER_TEAMS", payload: teamRes })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }, [headers])
    const getMyTeam = useCallback(async (url) => {

        dispatch({ type: "LOADING" })
        try {
            let team = await axios.get(url, { headers })
            const teamRes = await team.data

            dispatch({ type: "MY_TEAM", payload: teamRes })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }, [headers])
    const getMySuperTeam = useCallback(async (url) => {

        dispatch({ type: "LOADING" })
        try {
            let team = await axios.get(url, { headers })
            const teamRes = await team.data
            localStorage.setItem('superTeam',teamRes._id)
            dispatch({ type: "MY_SUPER_TEAM", payload: teamRes })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }, [headers])


    const updateStatusOfLead = async (url, data) => {
        dispatch({ type: "LOADING" })
        try {

            await axios.put(url, data, { headers })


        } catch (error) {
            if (error.response.status === 401) {

                localStorage.clear()
                window.location.reload()

            }
            dispatch({ type: "API_ERROR", payload: error })
        }
    }
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        dispatch({ type: "TODAY", payload: formattedDate })
    }
    const getrazorpay = useCallback(async (url) => {
        dispatch({ type: "LOADING" })
        try {
            let payment = await axios.get(url, { headers })
            const razorPay = await payment.data

            dispatch({ type: "RAZORPAY", payload: razorPay })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }, [headers])


    const getLeadAccordingStatus = useCallback(async (url) => {


        sessionStorage.setItem("leadApi", url)


        dispatch({ type: "LOADING" })
        try {
            const leadAccordingToStatus = await axios.get(url, { headers })
            const statusData = leadAccordingToStatus.data.leads;
            sessionStorage.setItem('totalLeadCount', leadAccordingToStatus.data.count)

            dispatch({ type: "STATUS_ACCORDING_LEAD", payload: statusData })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }

    }, [headers])
    const statusWithCounts = useCallback(async (url) => {
        sessionStorage.setItem('countStatus', url)


        dispatch({ type: "LOADING" })
        try {
            const leadAccordingToStatus = await axios.get(url, { headers })

            const statusData = leadAccordingToStatus.data;

            dispatch({ type: "STATUS_WITH_COUNT", payload: statusData })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }

    }, [headers])


    const getStatusWithCountWithCount = useCallback(async (url) => {


        dispatch({ type: "LOADING" })
        try {
            const totalLead = await axios.get(url, { headers })
            const totalLeadCount = await totalLead.data;

            dispatch({ type: "STATUS_WITH_COUNT_MONTH", payload: totalLeadCount })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }, [headers])
    const totalLeadsCounts = useCallback(async (url) => {


        dispatch({ type: "LOADING" })
        try {
            const totalLead = await axios.get(url, { headers })
            const totalLeadCount = await totalLead.data;

            dispatch({ type: "TOTAL_THREE_COUNT", payload: totalLeadCount })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }, [headers])
    const getApiKey = useCallback(async (url) => {


        dispatch({ type: "LOADING" })
        try {
            const totalLead = await axios.get(url, { headers })
            const totalLeadCount = await totalLead.data;

            dispatch({ type: "API_KEY", payload: totalLeadCount })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }, [headers])



    const getPlan = useCallback(async (url) => {


        dispatch({ type: "LOADING" })
        try {
            const totalLead = await axios.get(url, { headers })
            const companyPlan = await totalLead.data;

            dispatch({ type: "PLAN", payload: companyPlan })
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }, [headers])



    useEffect(() => {
        todaysStartAndEndMonth()
        if (localStorage.getItem('crm_userRole') && localStorage.getItem('crm_userRole') !== undefined) {
            getUser(USER)
            getMySuperTeam(`${process.env.REACT_APP_API}superAdminTeam/${localStorage.getItem('crm_id')}`)
            getTodayDate()
            if (localStorage.getItem('crm_userRole') === '1') {

                getAllUser(USERS)
                getAllTeam(TEAM)
                getApiKey(`${process.env.REACT_APP_API}payment`)

            } else if (localStorage.getItem('crm_userRole') === '2') {
                getMyTeam(MY_TEAM)

                getAllUser(USERS)
            } else if (localStorage.getItem('crm_userRole') === '3') {

            }
            getStatus(`${process.env.REACT_APP_API}statusGet/${localStorage.getItem('superTeam')}`)


            getrazorpay(RAZORPAY)


            getLeadLimit(LEADS_LIMIT)

            totalLeadsCounts(TOTAL_THREE_COUNT)
            getCallingStatus(`${process.env.REACT_APP_API}callingStatus/${localStorage.getItem('superTeam')}`)
            getStatusWithCountWithCount(`${process.env.REACT_APP_API}statusGetWithCount/?monthStart=${startOfMonth && startOfMonth}&monthEnd=${endOfMonth && endOfMonth}&userRole=${localStorage.getItem('crm_userRole')}&superTeamId=${localStorage.getItem('superTeam')}`)

        }
        if (localStorage.getItem('crm_companyRole') && localStorage.getItem('crm_companyRole') !== undefined) {

            getAllUser(USERS)
            getUser(companyProfile)
            getStatus(`${process.env.REACT_APP_API}companyStatus`)
            getPlan(`${process.env.REACT_APP_API}company/plan`)
            getAllTeam(`${process.env.REACT_APP_API}superAdminTeam`)
            if (localStorage.getItem('crm_companyRole') === '2') {
                getAllSuperTeam(`${process.env.REACT_APP_API}superAdminTeam`)
            }
        }
    }, [getLeadAccordingStatus, getAllTeam, getAllUser, getApiKey, getCallingStatus, getLeadLimit, getMyTeam, getStatus, getStatusWithCountWithCount, getUser, getrazorpay, statusWithCounts, totalLeadsCounts, endOfMonth, startOfMonth])





    return <AppContext.Provider value={{ ...state, getAllUser, getAllTeam, getUser, updateStatusOfLead, getSuperAdminLeads, getLeadAccordingStatus, statusWithCounts, getLeadLimit, getStatus, getStatusWithCountWithCount, totalLeadsCounts, getApiKey,getAllSuperTeam}}>
        {children}
    </AppContext.Provider>

}

//custom hook

const DataStorage = () => {
    return useContext(AppContext)
}


export { AppProvider, AppContext, DataStorage }