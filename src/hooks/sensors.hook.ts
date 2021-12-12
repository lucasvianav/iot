import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Endpoints, getRoute } from '../utils'

const params = {
  params: {
    limit: 1,
    offset: 0,
  },
}

const useApiGet =
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

    useEffect(() => {
      fetch()
      const timer = setInterval(fetch, delay)
      return () => clearInterval(timer)
    }, [])
  }

export const useSensors = {
  temperature: (id: number) => {
    const [temperature, setTemperature] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useApiGet<number>(
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

    const refreshData = () => useApiGet<number>(
      { endpoint: getRoute(Endpoints.airConditionerTemperature) },
      {
        setValue: setAirConditioner,
        setLoading,
        setError,
        getData: r => r.data,
      }
    )
    refreshData()

    return {
      temperature, maxTemperature, minTemperature, loading, error, on, onEmpty,
      toggleEmpty: () => setOnEmpty(!onEmpty),
      toggle: () => setOn(!on),
      upMax: () => temperature < 26 ? setMaxTemperature(temperature + 1) : null,
      downMax: () => temperature > 11 ? setMaxTemperature(temperature - 1) : null,
      upMin: () => temperature < 26 ? setMinTemperature(temperature + 1) : null,
      downMin: () => temperature > 11 ? setMinTemperature(temperature - 1) : null,
      up: () => temperature < 26 ? setTemperature(temperature + 1) : null,
      down: () => temperature > 11 ? setTemperature(temperature - 1) : null,
    }
  },

  humidity: (id: number) => {
    const [humidity, setHumidity] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useApiGet<number>(
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

    useApiGet<boolean>(
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

    useApiGet<boolean>(
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
