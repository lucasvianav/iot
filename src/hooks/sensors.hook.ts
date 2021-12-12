import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Endpoints, getRoute } from '../utils'

const params = {
  params: {
    limit: 1,
    offset: 0,
  },
}

const useApi =
  <T>(
    args: { endpoint: string; opts?: any },
    fn: {
      setValue: React.Dispatch<React.SetStateAction<T>>;
      setLoading: React.Dispatch<React.SetStateAction<boolean>>;
      setError: React.Dispatch<React.SetStateAction<boolean>>;
      getData: (response: { data: any }) => T;
    },
    delay = 300000
  ) => {
    const fetch = () => {
      axios
        .get(args.endpoint, args.opts || {})
        .then(r => {
          fn.setValue(fn.getData(r))
          fn.setLoading(false)
        })
        .catch(() => {
          fn.setError(true)
          fn.setLoading(false)
        })
    }

    if (delay) {
      useEffect(() => {
        fetch()
        const timer = setInterval(fetch, delay)
        return () => clearInterval(timer)
      }, [])
    }

    else {
      fetch()
    }
  }

const postApi =
  (
    args: {
      endpoint: string
      body?: any
      opts?: any
    },
    fn: {
      callback: () => any
      setLoading: React.Dispatch<React.SetStateAction<boolean>>
      setError: React.Dispatch<React.SetStateAction<boolean>>
    }
  ) => {
    axios
      .post(args.endpoint, args.body || {}, args.opts || {})
      .then(() => {
        fn.setLoading(false)
      })
      .catch(() => {
        fn.setError(true)
        fn.setLoading(false)
      })
      .finally(fn.callback)
  }

export const useSensors = {
  temperature: (id: number) => {
    const [temperature, setTemperature] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useApi<number>(
      {
        endpoint: getRoute(Endpoints.roomTemperature, id.toString()),
        opts: params,
      },
      {
        setValue: setTemperature,
        setLoading,
        setError,
        getData: r => r.data[0].VALOR,
      }
    )

    return { temperature, loading, error }
  },

  airConditioner: () => {
    const [on, setOn] = useState(false)
    const [onEmpty, setOnEmpty] = useState(false)
    const [temperature, setTemperature] = useState(-1)
    const [maxTemperature, setMaxTemperature] = useState(-1)
    const [minTemperature, setMinTemperature] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const setAirConditioner = (r: any) => {
      setOn(r.ONL)
      setOnEmpty(r.ONL_VAZIO)
      setTemperature(r.TEMPERATURA)
      setMaxTemperature(r.T_MAX)
      setMinTemperature(r.T_MIN)
    }

    const fn = {
      setError,
      setLoading,
      callback: () => useApi<number>(
        { endpoint: getRoute(Endpoints.airConditionerInfo) },
        {
          setValue: setAirConditioner,
          setLoading,
          setError,
          getData: r => r.data,
        },
        0
      ),
    }

    const api = (endpoint: Endpoints, value: boolean|number) => postApi(
      { endpoint: getRoute(endpoint, value.toString()) }, fn
    )

    useApi<number>(
      { endpoint: getRoute(Endpoints.airConditionerInfo) },
      {
        setValue: setAirConditioner,
        setLoading,
        setError,
        getData: r => r.data,
      }
    )

    return {
      temperature, maxTemperature, minTemperature, loading, error, on, onEmpty,
      toggle: () => api(Endpoints.airConditionerToggle, !on),
      toggleEmpty: () => api(Endpoints.airConditionerToggleEmpty, !onEmpty),
      setMax: (t: number) => api(Endpoints.airConditionerMaxTemperature, t),
      setMin: (t: number) => api(Endpoints.airConditionerMinTemperature, t),
      set: (t: number) => api(Endpoints.airConditionerTemperature, t),
    }
  },

  humidity: (id: number) => {
    const [humidity, setHumidity] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useApi<number>(
      {
        endpoint: getRoute(Endpoints.humidity, id.toString()),
        opts: params,
      },
      {
        setValue: setHumidity,
        setLoading,
        setError,
        getData: r => r.data[0].VALOR,
      }
    )

    return { humidity, loading, error }
  },

  movement: () => {
    const [movement, setMovement] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useApi<boolean>(
      {
        endpoint: getRoute(Endpoints.movement),
        opts: params,
      },
      {
        setValue: setMovement,
        setLoading,
        setError,
        getData: r => r.data[0].TEMPO,
      }
    )

    return { movement, loading, error }
  },

  luminosity: () => {
    const [luminosity, setLuminosity] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useApi<boolean>(
      {
        endpoint: getRoute(Endpoints.luminosity),
        opts: params,
      },
      {
        setValue: setLuminosity,
        setLoading,
        setError,
        getData: r => r.data[0].VALOR,
      }
    )

    return { luminosity, loading, error }
  },
}
