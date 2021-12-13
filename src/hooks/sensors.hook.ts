import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ResponseModel } from '../models'
import { AirConditionerHookModel, AirConditionerRequestBodyModel } from '../models/sensors.models'
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
      setValue: React.Dispatch<React.SetStateAction<T>>
      setLoading: React.Dispatch<React.SetStateAction<boolean>>
      setError: React.Dispatch<React.SetStateAction<ResponseModel|boolean>>
      getData: (response: { data: any }) => T
    },
    opts: {
      delay?: number,
      dependencies?: any[]
    } = {}
  ) => {
    opts.delay = opts.delay || 60000
    opts.dependencies = opts.dependencies || []

    const fetch = () => {
      fn.setLoading(true)
      fn.setError(false)
      axios
        .get(args.endpoint, args.opts || {})
        .then(r => fn.setValue(fn.getData(r)))
        .catch(err => {
          const {status, data: { detail: message }} = err.response
          fn.setError({ status, message })
        })
        .finally(() => fn.setLoading(false))
    }

    useEffect(() => {
      fetch()
      const timer = setInterval(fetch, opts.delay)
      return () => clearInterval(timer)
    }, opts.dependencies)
  }

const postApi =
  (
    args: {
      endpoint: string
      body?: any
      opts?: any
    },
    fn: {
      callback?: () => any
      resolve: () => void
      reject: (reason?: any) => void
    }
  ) => {
    axios
      .post(args.endpoint, args.body || {}, args.opts || {})
      .then(fn.resolve)
      .catch(fn.reject)
      .finally(() => {
        if (fn.callback) {
          fn.callback()
        }
      })
  }

export const useSensors = {
  temperature: (id: number) => {
    const [temperature, setTemperature] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ResponseModel|boolean>(false)

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

    return { temperature, loading, error, name: `Sensor de Temperatura ${id}` }
  },

  airConditioner: (): AirConditionerHookModel => {
    const [on, setOn] = useState(false)
    const [onEmpty, setOnEmpty] = useState(false)
    const [temperature, setTemperature] = useState(-1)
    const [maxTemperature, setMaxTemperature] = useState(-1)
    const [minTemperature, setMinTemperature] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ResponseModel|boolean>(false)

    const [refresh, setRefresh] = useState(false)

    const setAirConditioner = (r: any) => {
      setOn(r.ONL)
      setOnEmpty(r.ONL_VAZIO)
      setTemperature(r.TEMPERATURA)
      setMaxTemperature(r.T_MAX)
      setMinTemperature(r.T_MIN)
    }

    const isTemperatureValid = (type: string, value: number): boolean => {
      let isValid

      if (type === 'max') {
        isValid = value >= 17 && value <= 23
      } else if (type === 'min') {
        isValid = value >= 16 && value <= 22
      } else {
        isValid = value >= 16 && value <= 23
      }

      return isValid
    }

    useApi<number>(
      { endpoint: getRoute(Endpoints.airConditionerGet) },
      {
        setValue: setAirConditioner,
        setLoading,
        setError,
        getData: r => r.data,
      },
      { dependencies: [refresh] }
    )

    const post = (body: AirConditionerRequestBodyModel) => (
      new Promise<void>((resolve, reject) => {
        postApi(
          { endpoint: Endpoints.airConditionerPost, body },
          {
            resolve: () => {
              resolve()
              setRefresh(!refresh)
            },
            reject,
          }
        )
      })
    )

    return {
      temperature,
      maxTemperature,
      minTemperature,
      loading,
      error,
      on,
      onEmpty,
      isTemperatureValid,
      post,
      name: 'Ar-condicionado',
    }
  },

  humidity: (id: number) => {
    const [humidity, setHumidity] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ResponseModel|boolean>(false)

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

    return { humidity, loading, error, name: `Sensor de Umidade ${id}` }
  },

  movement: () => {
    const [movement, setMovement] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ResponseModel|boolean>(false)

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

    return { movement, loading, error, name: 'Sensor de Movimento' }
  },

  luminosity: () => {
    const [luminosity, setLuminosity] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ResponseModel|boolean>(false)

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

    return { luminosity, loading, error, name: 'Sensor de Luz' }
  },
}
