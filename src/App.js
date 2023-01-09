import styles from './App.module.css';
import React, { useCallback, useState } from 'react';
import {Input, Button} from './components'
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import {mockAPI} from './api/api'

const EMAIL_REGEXP =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function App() {

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false)

  const handleDefoultState = useCallback(() => {
    setIsSuccess(false);
    setIsError(false);
  }, [setIsSuccess, setIsError])

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    mode: 'onChange',
    defaultValues: {
      Email: '',
      password: ''
    }
  });

  const onSubmit = (formData) => {
    const resp = mockAPI.getUser(formData);
    resp.then(data => setIsSuccess(data))
    .catch(e => setIsError(e));
    
    reset();
  }

  return (
    <main>
      <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Вход</h1>
        <p className={styles.description}>Для существующих пользователей</p>

        <p className={cn(styles.description, styles.inputDescription)}>E-Mail:<span className={styles.decor}> *</span></p>
        <Input 
          error={errors.Email} 
          {...register('Email', {
            required: {
              value: true, 
              message: 'Это поле обязательно!'
            }, 
            pattern: {
              value: EMAIL_REGEXP, 
              message: 'Укажите корректный email адрес'
            }
          })} 
          type='text' 
          placeholder='E-Mail' 
        />

        <p className={cn(styles.description, styles.inputDescription)}>Пароль:<span className={styles.decor}> *</span></p>
        <Input 
          error={errors.password}
          {...register('password', {
            required: {
              value: true, 
              message: 'Это поле обязательно!'
            }, 
            minLength: {
              value: 8, 
              message: 'Пароль должен быть не меньше 8 символов'
            }
          })} 
          type='password' 
          placeholder='password' 
        />
        {isSuccess && <span className={styles.infoSuccess}>Добро пожаловать!</span>}
        {isError && <span className={styles.infoError}>Такого пользователя не существует!</span>}
        
        {isSuccess || isError? 
          <Button onClick={handleDefoultState} apperance='primary' className={styles.btn}>Еще разок</Button>
          : <Button apperance='primary' className={styles.btn}>Войти в систему</Button> 
        }
        
      </form>
    </main>
  );
}

export default App;
