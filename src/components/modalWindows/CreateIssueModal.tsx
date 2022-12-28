import React, {  useEffect, useState } from 'react'
import { Button } from '../../UI-components/Button/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import '../../UI-components/custom-dropdown/custom-dropdown.styles.scss'
import './CreateIssueModal.scss'
import {
  addNewIssue,
  deleteIssue,
  editIssue,
} from '../../store/reducers/issuesReducer/actionsIssue'
import { useDispatch, useSelector } from 'react-redux'
import { CustomIssueInterface, IStore } from '../../common/interfaces'
import { initialEditIssueCard } from '../../store/reducers/issuesReducer/issueReducer'
import { toggleModalWindow } from '../../store/reducers/globalReducer/globalActions'
import { createID } from '../../common/randomId'

export const CreateIssueModal: React.FC = () => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomIssueInterface>()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, setResult] = useState<CustomIssueInterface>()
  const isEditIssue: boolean = useSelector(
    (state: IStore) => state.globalSettings.isEditIssue
  )
  const editIssueCard: CustomIssueInterface = useSelector(
    (state: IStore) => state.issues.editIssueCard
  )
  const onSubmit: SubmitHandler<CustomIssueInterface> = (data) => {
    data.id = createID()
    setResult(data)
    if (isEditIssue) {
      dispatch(deleteIssue(editIssueCard.title))
      dispatch(addNewIssue(data))
    } else {
      dispatch(addNewIssue(data))
    }
    onCloseModal()
  }
  useEffect(() => {}, [isEditIssue])

  const onCloseModal = () => {
    dispatch(toggleModalWindow(false))
    dispatch(editIssue(initialEditIssueCard))
  }

  return (
    <div className="container_createIssue">
      <div className="createIssue__title">
        <h3>Create Issue</h3>
      </div>
      <form className="createIssue__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="createIssue__form_inputs">
          <label htmlFor="">Title:</label>
          <div className="createIssue__form_inputs_block">
            <input
              defaultValue={editIssueCard.title}
              className="inputElem"
              {...register('title', {
                required: true,
                pattern: {
                  value: /\w/,
                  message: 'This title is exist',
                },
              })}
            />
            {errors.title && (
              <p className="error_validate">{errors.title.message}</p>
            )}
          </div>

          <label htmlFor="">Link:</label>
          <div className="createIssue__form_inputs_block">

          <input
            defaultValue={editIssueCard.link}
            className="inputElem"
            {...register('link', {
              required: true,
              pattern: {
                value: /\w/,
                message: 'Invalid link',
              },
            })}
          />
          {errors.link && (
            <p className="error_validate">{errors.link.message}</p>
          )}
           </div>
          <label htmlFor="">Priority:</label>
          <div className="container_drop-down">
            <select className="drop-down" {...register('priority')}>
              <option className="option" value="Low">
                Low
              </option>

              <option className="option" value="Medium">
                Medium
              </option>

              <option className="option" value="High">
                High
              </option>
            </select>
          </div>
        </div>

        <div className="createIssue__form_buttons">
          <Button text={'Yes'} styleButton={'primary'} type="submit" />
          <Button
            text={'No'}
            styleButton={'add'}
            type="button"
            onClick={onCloseModal}
          />
        </div>
      </form>
    </div>
  )
}
