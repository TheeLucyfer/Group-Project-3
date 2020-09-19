import axios from "axios"

export default {

    savePosition: function(posData){

        return axios.post("/" + posData.email, posData)

    },

    deletePosition: function(posData){

        return axios.post("/" + posData.email, posData)

    }



}