import { useQuery } from "react-query"
import axios from 'axios'

const fetchCoins = (api)=>{
    return axios.get(api)
} 

export const UseGetCointData = ( api, querykey)=>{

    return useQuery(
        querykey,
        ()=>fetchCoins(api),

        {
            select:(data)=>{
                
                if(querykey[0]==='historic-data') return data&& data.data.prices
                return data && data.data
            },
            staleTime:3000000
            
        }

    )
}