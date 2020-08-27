import jwt_decode from 'jwt-decode'

const auth = {
    isAuthenticated(){
        if (typeof window == 'undefined') return false;
        if (localStorage.getItem('jwtToe=ken')){
            const data = localStorage.getItem('jwtToken');
            return jwt_decode(data);
        }else return false;
    },
};

export default auth;
