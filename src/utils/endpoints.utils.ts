import { enviroment } from './enviroment.utils'

export const getRoute = (endpoint: Endpoints) => enviroment.backURL + endpoint

export const enum Endpoints {
  airConditionerTemperature = 'data/2.5/weather',
  humidity = 'data/2.5/weather',
  luminosity = 'data/2.5/weather',
  movement = 'data/2.5/weather',
  roomTemperature = 'data/2.5/weather',
}
