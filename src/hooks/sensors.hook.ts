import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { ResponseModel } from '../models'
import { AirConditionerHookModel, AirConditionerRequestBodyModel, AirConditionerResponseBodyModel, HumiditySensorHookModel, LuminositySensorHookModel, MovementSensorHookModel, TemperatureSensorHookModel } from '../models/sensors.models'
import { Endpoints, getRoute } from '../utils'

/** Query parameters for the sensors' requests. */
const params = {
  params: {
    limit: 1,
    offset: 0,
  },
}

/** Receives the error object and parses it's status and message. */
const parseError = (err: any): ResponseModel => {
  const status = err?.response?.status || '???'
  const message = err?.response?.data?.detail || 'Erro desconhecido.'

  return { status, message }
}

/**
* Set up a recurring GET request.
*
* @param args.endpoint
* @param args.opts request options, like for `axios`
* @param fn.setValue
* @param fn.setLoading
* @param fn.setError
* @param fn.getData function to parse the desired data from the request's response
* @param opts.delay how long one request should be spaced from the other (in ms, default `60000`)
* @param opts.dependencies state variable that'll trigger a re-fetch ahead of time when their values change (default `[]`)
* @typeParam T type of the desired value
*/
const useApi =
  <T>(
    args: { endpoint: string; opts?: any },
    fn: {
      setValue: React.Dispatch<React.SetStateAction<T>>|((arg: T) => void)
      setLoading: React.Dispatch<React.SetStateAction<boolean>>
      setError: React.Dispatch<React.SetStateAction<ResponseModel|boolean>>
      getData: (response: AxiosResponse) => T
    },
    opts: {
      delay?: number,
      dependencies?: any[]
    } = {}
  ) => {
    opts.delay = opts.delay || 60000
    opts.dependencies = opts.dependencies || []

    /** Make the request, parse the response and set all related values. */
    const fetch = () => {
      fn.setLoading(true)
      fn.setError(false)
      axios
        .get(args.endpoint, args.opts || {})
        .then(r => fn.setValue(fn.getData(r)))
        .catch(err => fn.setError(parseError(err)))
        .finally(() => fn.setLoading(false))
    }

    // sets the recurrent call for `fetch`
    useEffect(() => {
      fetch()
      const timer = setInterval(fetch, opts.delay)
      return () => clearInterval(timer)
    }, opts.dependencies)
  }

/**
* Makes a POST request. Should be called inside a promise.
*
* @param args.endpoint
* @param args.body the request's body (won't be modified)
* @param args.opts request options, like for `axios`
* @param fn.callback will be called whenever the request is finished (either succeeds or fails)
* @param fn.resolve resolve the promise
* @param fn.reject reject the promise
*/
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
      reject: (error: ResponseModel) => void
    }
  ) => {
    axios
      .post(args.endpoint, args.body || {}, args.opts || {})
      .then(fn.resolve)
      .catch(err => fn.reject(parseError(err)))
      .finally(() => {
        if (fn.callback) {
          fn.callback()
        }
      })
  }

export const useSensors = {
  temperature: (id: number): TemperatureSensorHookModel => {
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
    const [commandTimeout, setCommandTimeout] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ResponseModel|boolean>(false)

    // variable that'll be used to re-fetch the air-conditioner's
    // data whenever the settings are updated
    const [refresh, setRefresh] = useState(false)

    /**
     * Set alm of the air conditioner's settings based on the response received
     * from the API.
     *
     * @param r the request's reponse data
     */
    const setAirConditioner = (r: AirConditionerResponseBodyModel) => {
      setOn(r.ONL)
      setOnEmpty(r.ONL_VAZIO)
      setTemperature(r.TEMPERATURA)
      setMaxTemperature(r.T_MAX)
      setMinTemperature(r.T_MIN)
      setCommandTimeout(r.T_CMD)
    }

    useApi<AirConditionerResponseBodyModel>(
      { endpoint: getRoute(Endpoints.airConditionerGet) },
      {
        setValue: setAirConditioner,
        setLoading,
        setError,
        getData: r => r.data,
      },
      { dependencies: [refresh] } // re-fetch whenever `refresh`'s value changes
    )

    /**
    * Sends a request to the API to update the air conditioner's settings. Doesn't
    * change `this.loading` and `this.error` values. Triggers the fetching again.
    *
    * @param body the POST HTTP request's body, should contain only edited properties
    * @returns promise that'll be resolved if the request is successful and rejected otherwise
    */
    const update = (body: AirConditionerRequestBodyModel) => (
      new Promise<ResponseModel>((resolve, reject) => {
        postApi(
          { endpoint: getRoute(Endpoints.airConditionerPost), body },
          {
            resolve: () => {
              resolve({ status: 200, message: '' })

              // changes the variables value to trigger a re-fetch
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
      commandTimeout,
      update,
      name: 'Ar-condicionado',
    }
  },

  humidity: (id: number): HumiditySensorHookModel => {
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

  movement: (): MovementSensorHookModel => {
    const [movement, setMovement] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ResponseModel|boolean>(false)
    const [fetched, setFetched] = useState(new Date())

    useApi<boolean>(
      {
        endpoint: getRoute(Endpoints.movement),
        opts: params,
      },
      {
        setValue: setMovement,
        setLoading,
        setError,
        getData: r => {
          const lastMovement = new Date(r.data[0].TEMPO.replace('Z', ''))
          const detected = lastMovement > fetched
          setFetched(new Date())
          return detected
        },
      }
    )

    return { movement, loading, error, name: 'Sensor de Movimento' }
  },

  luminosity: (): LuminositySensorHookModel => {
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
