import axios from 'axios'
import { useEffect, useState } from 'react'
import { Endpoints, enviroment } from '../utils'

// TODO: const incrementTemperature = (): any => {}

const paramsMock = {
  params: {
    zip: '94040,us',
    appid: enviroment.key,
    units: 'metric',
  },
}

export const useRoomTemperature = () => {
  const [temperature, setTemperature] = useState(-1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const endpoint = enviroment.backendURL + Endpoints.roomTemperature

  const fetchTemperature = () => {
    axios
      .get(endpoint, paramsMock)
      .then(r => {
        setTemperature(r.data.main.feels_like)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchTemperature()
    const timer = setInterval(fetchTemperature, 300000)
    return () => clearInterval(timer)
  }, [])

  return { temperature, loading, error }
}

export const useAirConditionerTemperature = () => {
  const [temperature, setTemperature] = useState(-1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const endpoint = enviroment.backendURL + Endpoints.airConditionerTemperature

  const fetchTemperature = () => {
    axios
      .get(endpoint, paramsMock)
      .then(r => {
        setTemperature(r.data.main.temp)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchTemperature()
    const timer = setInterval(fetchTemperature, 300000)
    return () => clearInterval(timer)
  }, [])

  return { temperature, loading, error }
}

export const useHumidity = () => {
  const [humidity, setHumidity] = useState(-1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const endpoint = enviroment.backendURL + Endpoints.humidity

  const fetchHumidity = () => {
    axios
      .get(endpoint, paramsMock)
      .then(r => {
        setHumidity(r.data.main.humidity)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchHumidity()
    const timer = setInterval(fetchHumidity, 300000)
    return () => clearInterval(timer)
  }, [])

  return { humidity, loading, error }
}
