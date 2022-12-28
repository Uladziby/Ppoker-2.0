import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '../../UI-components/Button/button'
import Switcher from '../../UI-components/switcher/switcher'
import './ConnectLobby.scss'
import photo_member from '../../assets/icons/checkmark.png'

export interface IMember {
  firstName: string
  lastName: string
  position: string
  image?: string
}
type PropsModal = {
  setActiveModal: Function
}

export const ConnectLobbyModal: React.FC<PropsModal> = ({ setActiveModal }) => {
  const { register, handleSubmit } = useForm<IMember>()
  const [result, setResult] = useState<IMember>()
  const onSubmit : SubmitHandler<IMember> = data =>  {
    setActiveModal(false)
    setResult(data)
  }

  const onCloseModal =()=>{
    setActiveModal(false)
  }

  useEffect(() => {
    //TO DO fetch to server
    //if (result) resp(result)
    //console.log(result)
  }, [result])

  async function resp(player: IMember){
        await fetch('http://localhost:4000/player',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(player)
        })
        .then((res) => console.log(res.json()))
        //.then((res)=>console.log(res))
        // .then((re) => setArrOfIssues([...re, ...arrOfIssues]));
      }
     // receive issue

  return (
    <div className="container_ConnectLobby">
      <div className="connectLobby__title">
        <h3>Connect to lobby</h3>
        <div className="connectLobby__title-right">
          <label htmlFor="connectObserver">connect as observer</label>
          {   <Switcher
            switcherOn={false}
            setSwitcherOn={function (switcherState: boolean): void {
              throw new Error('Function not implemented.')
            }}
          />}
        </div>
      </div>
      <div className="connectLobby__register">
        <form
          className="connectLobby__register-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="">First name:</label>
          <input className="inputElem" {...register('firstName')} />
          <label htmlFor="">Last name:</label>
          <input className="inputElem" {...register('lastName')} />
          <label htmlFor="">Job position:</label>
          <input className="inputElem" {...register('position')} />
          <div className="connectLobby__register-form_image">
            <label>Image:</label>
            <div className="connectLobby__register-form_image-choose">
              <div id="output_text">Choose file</div>
              <Button text={'Choose'} styleButton={'primary'} />
            </div>
            <img
              src={photo_member}
              alt="photo_member"
              width="83px"
              height="83px"
            />
          </div>
          <div className="connectLobby__register-form_buttons">
            <Button text={'Confirm'} styleButton={'primary'} type="submit" />
            <Button text={'Cancel'} styleButton={'add'}  onClick={onCloseModal}/>
          </div>
        </form>
      </div>
    </div>
  )
}
