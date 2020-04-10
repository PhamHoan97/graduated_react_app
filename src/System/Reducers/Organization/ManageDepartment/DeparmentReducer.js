import * as types from '../../../Constants/Orgranization/ActionTypes'

var initialState = {
    department : [
        {
            id:1,
            name:"Sales",
            field:"Online Product"
        },
        {
            id:2,
            name:"Marketing",
            field:"Sell Product"
        },
        {
            id:3,
            name:"IT",
            field:"Creative Product"
        },
        {
            id:4,
            name:"IT1",
            field:"Creative Product1"
        }
    ],
    idEditDepartment:0
}

function departmentReducer(state = initialState, action) {
    switch (action.type) {
        case types.DETAIL_DEPARMENT:
            var idDepartment = action.idDepartment;
            return {...state,idEditDepartment:idDepartment}
        default:
            return state
    }
}

export default departmentReducer;