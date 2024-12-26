const UseReducer = (state, action) => {

    switch (action.type) {
        case 'LOADING':

            return {
                ...state,
                isLoading: true
            }

        case 'TODAY':
            sessionStorage.setItem('followUpdate', action.payload)
            return {
                ...state,
                isLoading: false,
                todayDate: action.payload,

                isError: false
            }
        case 'LEADS_LIMIT':


            sessionStorage.setItem('leadsLimit', action.payload[0].leadLimit ? action.payload[0].leadLimit : 10)
            return {
                ...state,
                isLoading: false,
                leads_Limit: action.payload !== undefined ? action.payload : [],

                isError: false
            }
        case 'TOTAL_LEAD':

            return {
                ...state,
                isLoading: false,
                totalLead: action.payload[0].count,

                isError: false
            }

        case 'STATUS_ACCORDING_LEAD':

            return {
                ...state,
                isLoading: false,
                classificationAccordingtoStatus: action.payload,

                isError: false
            }
        case 'STATUS_WITH_COUNT':

            return {
                ...state,
                isLoading: false,
                statusWithCount: action.payload,
                isError: false
            }
        case 'STATUS_WITH_COUNT_MONTH':

            return {
                ...state,
                isLoading: false,
                totalStatusWithMonth: action.payload,
                isError: false
            }
        case 'TOTAL_THREE_COUNT':

            return {
                ...state,
                isLoading: false,
                totalLeadsCount: action.payload,
                isError: false
            }

        
        case 'TEAM':

            return {
                ...state,
                isLoading: false,
                team: action.payload,
                isError: false
            }
        case 'SUPER_TEAMS':

            return {
                ...state,
                isLoading: false,
                superTeams: action.payload,
                isError: false
            }
        case 'MY_SUPER_TEAM':

            return {
                ...state,
                isLoading: false,
                mySuperTeam: action.payload,
                isError: false
            }
        case 'MY_TEAM':

            return {
                ...state,
                isLoading: false,
                myTeams: action.payload,
                isError: false
            }

        case 'RAZORPAY':

            return {
                ...state,
                isLoading: false,
                razorpay: action.payload,
                isError: false
            }
        case 'STATE':

            return {
                ...state,
                isLoading: false,
                allState: action.payload,
                isError: false
            }

        case 'LIVEFEED':

            return {
                ...state,
                isLoading: false,
                liveFeed: action.payload,
                isError: false
            }
        case 'SUPER_ADMIN_LEAD':

            return {
                ...state,
                isLoading: false,
                superAdminLead: action.payload,
                isError: false
            }
        case 'USERS':
            let allUsers = action.payload.filter(e => e.userRole !== localStorage.getItem("crm_userRole"))

            return {
                ...state,
                isLoading: false,
                allUser: allUsers.filter(e => e.userRole !== '4'),
                allAdmin: action.payload.filter(e => e.userRole === '2'),
                normalUser: action.payload.filter(e => e.userRole === '3'),
                allNormalUser: action.payload.filter(e => e.userRole === '5'),
                blockUser: action.payload.filter(e => e.userRole === '4'),
                isError: false
            }
        case 'USER':

            return {
                ...state,
                isLoading: false,

                myProfile: action.payload,
                isError: false
            }
        case 'STATUS':

            localStorage.setItem('statuses', JSON.stringify(action.payload))
            return {
                ...state,
                isLoading: false,
                status: action.payload,
                isError: false
            }
        case 'CALLINGSTATUS':

            localStorage.setItem('callingStatus', JSON.stringify(action.payload))
            return {
                ...state,
                isLoading: false,
                callingStatus: action.payload,
                isError: false
            }

        case 'API_KEY':


            return {
                ...state,
                isLoading: false,
                apiKeyAndSecretKey: action.payload,
                isError: false
            }
        case 'PLAN':


            return {
                ...state,
                isLoading: false,
                plan: action.payload,
                isError: false
            }
        case 'API_ERROR':
            if (action.payload.response.status === 401) {
                // const match = action.payload.response.data;
                // alert(match.split('Error:')[1].split('<br>')[0]);
                localStorage.clear()
                sessionStorage.clear()
                window.location.reload();
                window.location.href = "/login";

            }


            return {
                ...state,
                isError: true

            }

        default:
            return state;
    }






}


export default UseReducer;