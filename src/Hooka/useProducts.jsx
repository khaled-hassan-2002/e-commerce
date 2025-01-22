import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function useProducts() {


    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }

    let responceObject = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getProducts,
        retry: 4,
        retryDelay: 4000,
        refetchInterval: 100000,
        staleTime: 100000
    })

    return responceObject
}
