import { enviroment } from './enviroment.utils'

export const getRoute = (endpoint: Endpoints, ...params: string[]) => {
  params.forEach((param, i) => {
    endpoint = endpoint.replace(`{{${i}}}`, param) as Endpoints
  })

  return enviroment.backURL + endpoint
}
export const enum Endpoints {
  airConditionerGet = 'atuador/ar_condicionado/get/23',
  airConditionerPost = 'acao/ar_condicionado',
  humidity = 'dado/umidade/list/{{0}}',
  luminosity = 'dado/luz/list/26',
  movement = 'dado/movimento/list/25',
  roomTemperature = 'dado/temperatura/list/{{0}}',
}
