import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Endpoints, enviroment, getRoute } from '../utils'

// tODO: const incrementTemperature = (): any => {}

const paramsMock = {
  params: {
    zip: '94040,us',
    appid: enviroment.key,
    units: 'metric',
  },
}

const useApi =
  <T>(
    args: { endpoint: string; opts: any },
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
        .get(args.endpoint, args.opts)
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
  temperature: () => {
    const [temperature, setTemperature] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useApi<number>(
      {
        endpoint: getRoute(Endpoints.roomTemperature),
        opts: paramsMock,
      },
      {
        setValue: setTemperature,
        setLoading,
        setError,
        getData: r => r.data.main.feels_like,
      }
    )

    return { temperature, loading, error }
  },

  airConditioner: () => {
    const [temperature, setTemperature] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useApi<number>(
      {
        endpoint: getRoute(Endpoints.airConditionerTemperature),
        opts: paramsMock,
      },
      {
        setValue: setTemperature,
        setLoading,
        setError,
        getData: r => r.data.main.temp,
      }
    )

    return { temperature, loading, error }
  },

  humidity: () => {
    const [humidity, setHumidity] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useApi<number>(
      {
        endpoint: getRoute(Endpoints.humidity),
        opts: paramsMock,
      },
      {
        setValue: setHumidity,
        setLoading,
        setError,
        getData: r => r.data.main.humidity,
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
        opts: paramsMock,
      },
      {
        setValue: setMovement,
        setLoading,
        setError,
        getData: () => Math.random() > 0.5,
      }
    )

    return { movement, loading, error }
  },

  luminosity: () => {
    const [luminosity, setLuminosity] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useApi<number>(
      {
        endpoint: getRoute(Endpoints.luminosity),
        opts: paramsMock,
      },
      {
        setValue: setLuminosity,
        setLoading,
        setError,
        getData: r => r.data.clouds.all,
      }
    )

    return { luminosity, loading, error }
  },
}
