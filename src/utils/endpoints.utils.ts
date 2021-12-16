import { enviroment } from './enviroment.utils'

/** Append the endpoint to the backend URL and interpolate the passed params to
  * the endpoint's placeholders.
  * @param endpoint
  * @param ...params The path parameters to be interpolated into the endpoint's placeholders
  * @returns The URL to place the HTTP request to
  */
export const getRoute = (endpoint: Endpoints, ...params: string[]) => {
  params.forEach((param, i) => {
    endpoint = endpoint.replace(`{{${i}}}`, param) as Endpoints
  })

  return enviroment.backURL + endpoint
}

/** API endpoints. May contain placeholders (`{{i}}`, where `i` is an integer)
  * to indicate path parameters.
  */
export const enum Endpoints {
  airConditionerGet = 'atuador/ar_condicionado/get/23',
  airConditionerPost = 'acao/ar_condicionado',
  humidity = 'dado/umidade/list/{{0}}',
  luminosity = 'dado/luz/list/26',
  movement = 'dado/movimento/list/25',
  roomTemperature = 'dado/temperatura/list/{{0}}',
}
