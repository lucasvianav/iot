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
  airConditionerToggle = 'acao/ar_condicionado/liga_desliga',
  airConditionerToggleEmpty = 'acao/ar_condicionado/estado_vazia',
  airConditionerTemperature = 'acao/ar_condicionado/temp/{{0}}',
  airConditionerMaxTemperature = 'acao/ar_condicionado/temp_max/{{0}}',
  airConditionerMinTemperature = 'acao/ar_condicionado/temp_min/{{0}}',
  humidity = 'dado/umidade/list/{{0}}',
  luminosity = 'dado/luz/list/26',
  movement = 'dado/movimento/list/25',
  roomTemperature = 'dado/temperatura/list/{{0}}',
}
