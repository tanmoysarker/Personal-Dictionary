import axios from 'axios';

export default axios.create({
    baseURL: 'https://owlbot.info/api/v4/dictionary/'
})
