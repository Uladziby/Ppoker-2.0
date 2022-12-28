import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { ModalType } from '../../common/interfaces'
import './custom-issue.styles.scss'
import addCard from "../../assets/icons/add-card.png"
import { setTypeModalWindow, toggleModalWindow } from '../../store/reducers/globalReducer/globalActions'
import { editIssue } from '../../store/reducers/issuesReducer/actionsIssue'
import { initialEditIssueCard } from '../../store/reducers/issuesReducer/issueReducer'

const CreateIssueCard: FC = () => {
  const dispatch = useDispatch()

  const handlerCreateIssue = () => {
    dispatch(editIssue(initialEditIssueCard))
    dispatch(toggleModalWindow(true))
    dispatch(setTypeModalWindow(ModalType.createIssueModalWindow))
  }

  return (
    <div className={`custom-issue`}>
      <div className="content-text">
        <div className="main-text">Create New Issue</div>
      </div>

      <div className="buttons">
        <div onClick={handlerCreateIssue}>
          <img  src = {addCard} alt="Create" className="create-button " />
        </div>
      </div>
    </div>
  )
}

export default CreateIssueCard
