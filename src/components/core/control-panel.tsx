import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { SensorsContext, ToastsContext } from '../../contexts'
import { AirConditionerRequestBodyModel } from '../../models/sensors.models'
import TemperatureControl from '../shared/temperature-control'
import Toggler from '../shared/toggler'

export function ControlPanel() {
  const { air } = useContext(SensorsContext)
  const { createToast } = useContext(ToastsContext)

  const [on, setOn] = useState(air.on)
  const [onEmpty, setOnEmpty] = useState(air.onEmpty)
  const [temperature, setTemperature] = useState(air.temperature)
  const [maxTemperature, setMaxTemperature] = useState(air.maxTemperature)
  const [minTemperature, setMinTemperature] = useState(air.minTemperature)

  const [edited, setEdited] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [invalidMax, setInvalidMax] = useState(false)
  const [invalidMin, setInvalidMin] = useState(false)

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

  const reset = (force = true) => {
    if (!air.loading && (!edited || force)) {
      setOn(air.on)
      setOnEmpty(air.onEmpty)
      setTemperature(air.temperature)
      setMaxTemperature(air.maxTemperature)
      setMinTemperature(air.minTemperature)
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
      air
        .post(body)
        .then(() => reset())
        .catch(() => createToast({ title: 'Erro', body: 'Erro 123' }))
    }
  }

  useEffect(() => reset(false), [(air.error as boolean), air.loading])

  return (
    <Form>
      <div className='row mb-3' style={{ rowGap: '20px' }}>
        <div className={`${colClasses} col-6`}>
          <Toggler
            title='Status'
            labelFn={() => (on ? 'Ligado' : 'Desligado')}
            checkedFn={() => on}
            onChangeFn={() => set(setOn, !on)}
            disabled={(air.error as boolean) || air.loading}
          />
        </div>

        <div className={`${colClasses} col-6`}>
          <Toggler
            title='Status (Sala Vazia)'
            labelFn={() => (onEmpty ? 'Ligado' : 'Desligado')}
            checkedFn={() => onEmpty}
            onChangeFn={() => set(setOnEmpty, !onEmpty)}
            disabled={!on || (air.error as boolean) || air.loading}
          />
        </div>
      </div>

      <div className='row mt-3' style={{ rowGap: '20px' }}>
        <div className={`${colClasses} col-6 col-md-4`}>
          <TemperatureControl
            title='Temperatura'
            minusFn={() => {
              set(setTemp, '', setTemperature, setInvalid, temperature - 1)
            }}
            invalidFn={() => invalid}
            valueFn={() => (on ? temperature : 'OFF')}
            plusFn={() => {
              set(setTemp, '', setTemperature, setInvalid, temperature + 1)
            }}
            disabled={!on || (air.error as boolean) || air.loading}
          />
        </div>

        <div className={`${colClasses} col-6 col-md-4`}>
          <TemperatureControl
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
            disabled={!on || (air.error as boolean) || air.loading}
          />
        </div>

        <div className={`${colClasses} col-6 col-md-4`}>
          <TemperatureControl
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
            disabled={!on || (air.error as boolean) || air.loading}
          />
        </div>
      </div>

      <div className='row d-flex justify-content-end gap-3'>
        <div className='px-3 mt-3 mx-auto'>
          {!edited ? (
            ''
          ) : (
            <div className='text-muted mt-3'>
              <small>
                * Valores editados, para retornar aos originais, aperte o botão
                resetar. Eles são sincronizados a cada minuto.
              </small>
            </div>
          )}
          <hr />
        </div>
        <Button
          className='col-3'
          variant='outline-primary'
          onClick={() => reset()}
        >
          Resetar
        </Button>
        <Button className='col-3' variant='primary' onClick={save}>
          Salvar
        </Button>
      </div>
    </Form>
  )
}

export default ControlPanel
