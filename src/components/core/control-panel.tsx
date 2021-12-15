import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { SensorsContext, ToastsContext } from '../../contexts'
import { NumberUnit, ResponseModel, ToastType } from '../../models'
import { AirConditionerRequestBodyModel } from '../../models/sensors.models'
import { GlobalLoading } from '../shared'
import NumberControl from '../shared/number-control'
import Toggler from '../shared/toggler'

export function ControlPanel() {
  const { air } = useContext(SensorsContext)
  const { createToast } = useContext(ToastsContext)

  const [on, setOn] = useState(air.on)
  const [onEmpty, setOnEmpty] = useState(air.onEmpty)
  const [commandTimeout, setCommandTimeout] = useState(air.commandTimeout)
  const [temperature, setTemperature] = useState(air.temperature)
  const [maxTemperature, setMaxTemperature] = useState(air.maxTemperature)
  const [minTemperature, setMinTemperature] = useState(air.minTemperature)

  const [edited, setEdited] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [invalidMax, setInvalidMax] = useState(false)
  const [invalidMin, setInvalidMin] = useState(false)

  const [globalLoading, setGlobalLoading] = useState(false)

  const set = (setter: (...args: any[]) => any, ...args: any[]) => {
    setter(...args)
    setEdited(true)
  }

  let invalidTimeout: NodeJS.Timeout
  const setTemp = (
    type: string,
    setValue: (value: number) => any,
    setInvalid: (invalid: boolean) => any,
    value: number
  ) => {
    const isValid = air.isTemperatureValid(type, value)
    setInvalid(!isValid)

    if (isValid) {
      setValue(value)
      clearTimeout(invalidTimeout)
    } else {
      invalidTimeout = setTimeout(() => setInvalid(false), 1000)
    }
  }

  const colClasses = 'd-flex justify-content-center'
  const disabledConds = (air.error as boolean) || air.loading || globalLoading

  const reset = (force = true) => {
    if (!air.loading && (!edited || force)) {
      setOn(air.on)
      setOnEmpty(air.onEmpty)
      setTemperature(air.temperature)
      setMaxTemperature(air.maxTemperature)
      setMinTemperature(air.minTemperature)
      setCommandTimeout(air.commandTimeout)
      setEdited(false)
    }
  }

  const save = () => {
    const body: AirConditionerRequestBodyModel = {}
    let flag = false

    if (temperature !== air.temperature) {
      body.temperature = temperature
      flag = true
    }

    if (maxTemperature !== air.maxTemperature) {
      body.maxTemperature = maxTemperature
      flag = true
    }

    if (minTemperature !== air.minTemperature) {
      body.minTemperature = minTemperature
      flag = true
    }

    if (on !== air.on) {
      body.on = on
      flag = true
    }

    if (onEmpty !== air.onEmpty) {
      body.onEmpty = onEmpty
      flag = true
    }

    if (flag) {
      setGlobalLoading(true)

      air
        .post(body)
        .then(() => {
          reset()
          createToast({
            title: 'Controle do ar - Atualizado com sucesso',
            body: `A atualização do controle do ar-condicionado foi feita com
                   sucesso. Os dados serão atualizados em poucos instantes.`,
            type: ToastType.Success,
          })
        })
        .catch((err: ResponseModel) => {
          createToast({
            title: `Controle do ar - Erro ${err.status}`,
            body: err.message || 'Ocorreu um erro.',
            type: ToastType.Error,
          })
        })
        .finally(() => setGlobalLoading(false))
    }
  }

  useEffect(() => reset(false), [air.error as boolean, air.loading])

  return (
    <>
      <GlobalLoading loading={globalLoading} />
      <Form>
        <div className='row mb-3' style={{ rowGap: '20px' }}>
          <div className={`${colClasses} col-6`}>
            <Toggler
              title='Status'
              labelFn={() => (on ? 'Ligado' : 'Desligado')}
              checkedFn={() => on}
              onChangeFn={() => set(setOn, !on)}
              disabled={disabledConds}
            />
          </div>

          <div className={`${colClasses} col-6`}>
            <Toggler
              title='Status (Sala Vazia)'
              labelFn={() => (onEmpty ? 'Ligado' : 'Desligado')}
              checkedFn={() => onEmpty}
              onChangeFn={() => set(setOnEmpty, !onEmpty)}
              disabled={!on || disabledConds}
            />
          </div>
        </div>

        <div className='row mt-3' style={{ rowGap: '20px' }}>
          <div className={`${colClasses} col-6 col-md-3`}>
            <NumberControl
              title='Temperatura'
              minusFn={() => {
                set(setTemp, '', setTemperature, setInvalid, temperature - 1)
              }}
              invalidFn={() => invalid}
              valueFn={() => (on ? temperature : 'OFF')}
              plusFn={() => {
                set(setTemp, '', setTemperature, setInvalid, temperature + 1)
              }}
              disabled={!on || disabledConds}
              unit={NumberUnit.Celsius}
            />
          </div>

          <div className={`${colClasses} col-6 col-md-3`}>
            <NumberControl
              title='Temp. Máxima (sala)'
              minusFn={() => {
                set(
                  setTemp,
                  'max',
                  setMaxTemperature,
                  setInvalidMax,
                  maxTemperature - 1
                )
              }}
              invalidFn={() => invalidMax}
              valueFn={() => (on ? maxTemperature : 'OFF')}
              plusFn={() => {
                set(
                  setTemp,
                  'max',
                  setMaxTemperature,
                  setInvalidMax,
                  maxTemperature + 1
                )
              }}
              disabled={!on || disabledConds}
              unit={NumberUnit.Celsius}
            />
          </div>

          <div className={`${colClasses} col-6 col-md-3`}>
            <NumberControl
              title='Temp. Mínima (sala)'
              minusFn={() => {
                set(
                  setTemp,
                  'min',
                  setMinTemperature,
                  setInvalidMin,
                  minTemperature - 1
                )
              }}
              invalidFn={() => invalidMin}
              valueFn={() => (on ? minTemperature : 'OFF')}
              plusFn={() => {
                set(
                  setTemp,
                  'min',
                  setMinTemperature,
                  setInvalidMin,
                  minTemperature + 1
                )
              }}
              disabled={!on || disabledConds}
              unit={NumberUnit.Celsius}
            />
          </div>

          <div className={`${colClasses} col-6 col-md-3`}>
            <NumberControl
              title='Timeout entre comandos'
              minusFn={() => set(setCommandTimeout, commandTimeout - 1)}
              invalidFn={() => invalidMin}
              valueFn={() => commandTimeout}
              plusFn={() => set(setCommandTimeout, commandTimeout + 1)}
              disabled={disabledConds}
              unit={NumberUnit.Minutes}
            />
          </div>
        </div>

        <div className='row d-flex justify-content-end gap-3 px-4'>
          <div className='mt-3 mx-auto'>
            {!edited && !air.error ? (
              ''
            ) : (
              <div className='text-muted mt-3'>
                <small>
                  {air.error
                    ? `* O formulário está desativado devido a algum erro com a
                      conexão ao servidor. Uma nova tentativa é feita a cada
                      minuto.`
                    : `* Valores editados, para retornar aos originais, aperte o
                      botão resetar. Eles são sincronizados a cada minuto.`}
                </small>
              </div>
            )}
            <hr />
          </div>

          <Button
            className='col-3'
            variant='outline-primary'
            onClick={() => reset()}
            disabled={disabledConds}
          >
            Resetar
          </Button>

          <Button
            className='col-3'
            variant='primary'
            onClick={save}
            disabled={disabledConds}
          >
            Salvar
          </Button>
        </div>
      </Form>
    </>
  )
}

export default ControlPanel
