'use client'
import s from './mainForm.module.scss'
import { IDataForm } from '../slides/slide1'
import { Controller, useForm } from 'react-hook-form'
import PhoneInput, {
  isPossiblePhoneNumber,
} from 'react-phone-number-input/input'
import 'react-phone-number-input/style.css'
import { useState } from 'react'
import { BiError } from 'react-icons/bi'

const MainForm = ({ dataForm }: { dataForm: IDataForm }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm()

  const defaultPhone = ''

  const [phone, setPhone] = useState(defaultPhone)

  const onSubmit = (data) => {
    console.log(data)
    reset({})
  }

  return (
    <>
      <div className={s.number__container}>
        <h2 className={s.number__header}>{dataForm.header}</h2>
        <form className={s.number__form} onSubmit={handleSubmit(onSubmit)}>
          {errors['phone-input'] && (
            <BiError
              style={{
                position: 'absolute',
                marginLeft: '1rem',
              }}
            />
          )}
          <Controller
            name="phone-input"
            control={control}
            // maxLength={5}
            rules={{
              validate: (value) => isPossiblePhoneNumber(`${value}`),

              maxLength: 17,
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                value={value}
                placeHolder="8 990 987 65 43"
                onChange={onChange}
                defaultCountry="RU"
                className={s.number__input}
                id="phone-input"
                smartCaret={true}
                useNationalFormatForDefaultCountryValue={true}
              />
            )}
          />
          <button
            className={s.number__button}
            type="submit"
            onClick={() => setValue('phone-number', '')}
          >
            {dataForm.buttonText}
            <b>{dataForm.buttonStrongText}</b>
          </button>
        </form>
        <span className={s.small__text}>{dataForm.smallText}</span>
      </div>
    </>
  )
}

export default MainForm