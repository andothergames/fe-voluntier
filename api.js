import axios from 'axios'

const voluntierApi = axios.create({
    baseURL: "http://localhost:9090/api"
})

export const getListings = () => {
    return voluntierApi.get('/listings').then(({data}) => {
        return data.articles
    })
}

