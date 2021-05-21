import axios from 'axios';

const Instance = axios.create({
    baseURL:'https://react-burger-builder-f25d8-default-rtdb.firebaseio.com/'
})
export default Instance;