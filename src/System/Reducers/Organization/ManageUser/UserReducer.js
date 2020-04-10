import * as types from '../../../Constants/Orgranization/ActionTypes'

var initialState = {
    user: [
        {
            id:1,
            name:"Sales",
            email:"nhatvan023@gmail.com",
            position:"Manager",
            department:"Maketing"
        },
        {
            id:2,
            name:"Sales2",
            email:"nhatvan023@gmail.com",
            position:"Manager",
            department:"Maketing"
        },
        {
            id:3,
            name:"Sales3",
            email:"nhatvan023@gmail.com",
            position:"Manager",
            department:"Maketing"
        },
        {
            id:4,
            name:"Sales4",
            email:"nhatvan023@gmail.com",
            position:"Manager",
            department:"Maketing"
        }
    ],
    idEditUser:0
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.DETAIL_USER:
            var idUser = action.idUser;
            return {...state,idUser:idUser}
        default:
            return state
    }
}

export default userReducer;