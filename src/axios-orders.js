import axios from 'axios';

const instance=axios.create({
    baseURL:'https://burger-3fd53-default-rtdb.firebaseio.com/'
});

export default instance;