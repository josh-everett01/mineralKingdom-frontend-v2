import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5177' // your .NET API
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default axios