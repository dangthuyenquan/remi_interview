import { CanceledError } from "axios"
import { useRef } from "react"
import { useEffect, useState } from "react"

export interface UseQueryOptions<T> {
    queryFn: (props: {
        signal: AbortSignal,
        params: any[]
    }) => Promise<T>
    enabled?: boolean
    limitDuration?: number
    onError?: (error: any) => void
    onSuccess?: (res: T) => (void | T)
}

export interface UseQueryResponse<T> {
    data?: T
    loading: boolean
    error: any
}

export type PromiseStatus = 'idle' | 'pending' | 'error' | 'success'

export const useQuery = <T>({
    queryFn,
    enabled = true,
    onError,
    onSuccess,
}: UseQueryOptions<T>) => {

    const controllerRef = useRef(new AbortController())

    const [data, setData] = useState<T | undefined>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>()
    const [status, setStatus] = useState<PromiseStatus>('idle')


    useEffect(() => {
        if (enabled) {
            callService()
        }
    }, [enabled])



    const callService = async (...data: any[]) => {
        controllerRef.current.abort()
        controllerRef.current = new AbortController()

        let res
        let error

        setLoading(true)
        setStatus('pending')

        try {

            res = await queryFn({
                signal: controllerRef.current.signal,
                params: data
            })

        } catch (err) {
            console.error(err)
            error = err
        }


        if (res) {
            setLoading(false)
            setStatus('success')
            _setData(res)
            return res
        } else if (error) {
            if (error instanceof CanceledError) {

            } else {
                setLoading(false)
                _setError(error)
                setStatus('error')
                throw error
            }

        }
    }

    const _setError = (err: any) => {
        let res
        if (onError) {
            res = onError(err)
        }
        if (typeof res !== 'undefined') {
            setError(res)
        } else {
            setError(data)
        }
    }

    const _setData = (data: any) => {
        let res
        if (onSuccess) {
            let t = onSuccess(data)
            if(t) {
                res = t
            }
        }
        if (typeof res !== 'undefined') {
            setData(res)
        } else {
            setData(data)
        }

    }
    return {
        loading,
        error,
        data,
        status,
    } as UseQueryResponse<T>
}

