import axios from 'axios'
import { useEffect, useState } from 'react'
import { Endpoints, enviroment } from '../utils'

// tODO: const incrementTemperature = (): any => {}

const paramsMock = {
  params: {
    zip: '94040,us',
    appid: enviroment.key,
    units: 'metric',
  },
}

export const useSensors = {
  temperature: () => {
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
  },

  airConditioner: () => {
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
  },

  humidity: () => {
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
  },

  movement: () => {
    const [movement, setMovement] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const endpoint = enviroment.backendURL + Endpoints.movement

    const fetchMovement = () => {
      axios
        .get(endpoint, paramsMock)
        .then(() => {
          setMovement(Math.random() > 0.5)
          setLoading(false)
        })
        .catch(() => {
          setError(true)
          setLoading(false)
        })
    }

    useEffect(() => {
      fetchMovement()
      const timer = setInterval(fetchMovement, 300000)
      return () => clearInterval(timer)
    }, [])

    return { movement, loading, error }
  },

  luminosity: () => {
    const [luminosity, setLuminosity] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const endpoint = enviroment.backendURL + Endpoints.movement

    const fetchLuminosity = () => {
      axios
        .get(endpoint, paramsMock)
        .then(r => {
          setLuminosity(r.data.clouds.all)
          setLoading(false)
        })
        .catch(() => {
          setError(true)
          setLoading(false)
        })
    }

    useEffect(() => {
      fetchLuminosity()
      const timer = setInterval(fetchLuminosity, 300000)
      return () => clearInterval(timer)
    }, [])

    return { luminosity, loading, error }
  },
}
