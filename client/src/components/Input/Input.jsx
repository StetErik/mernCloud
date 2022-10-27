import s from './Input.module.sass'

const Input = ({type, value, placeholder, setValue}) => {
  const inputHandler = (e) => {
    setValue(e.target.value)
  }

  return (
    <input
      className={s.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={inputHandler}
    />
  )
}

export default Input