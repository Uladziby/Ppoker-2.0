import { FC, useState } from 'react'
import './custom-issue.styles.scss'
import editIcon from '../../assets/icons/edit-card-icon.png'
import deleteIcon from '../../assets/icons/delete-card-icon.png'
import closeIcon from '../../assets/icons/close-card-icon.png'
import {
  
  CustomIssueInterface,
  IStore,
  locationPath,
} from '../../common/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteIssue,
  editIssue,
} from '../../store/reducers/issuesReducer/actionsIssue'
import {
  isEditIssue,
  toggleModalWindow,
} from '../../store/reducers/globalReducer/globalActions'
import { initialEditIssueCard } from '../../store/reducers/issuesReducer/issueReducer'


const CustomIssue: FC<CustomIssueInterface> = ({ priority, title, link, id}) => {
  const idCurrentIssue : string = useSelector((state:IStore)=> state.game.idCurrentIssue)


  const editButton = true
  let closeButton = false
  const deleteButton = true
  const dispatch = useDispatch()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [issueCard, setIssueCard] = useState<CustomIssueInterface>({
    link: link,
    title: title,
    priority: priority,
    id: id
  })
  const currentLocation: string = useSelector((state: IStore) => state.location)
  if(currentLocation===locationPath.startPage){
    closeButton=true
  }
  const handlerEditIssue = () => {
    dispatch(editIssue(issueCard))
    dispatch(isEditIssue(true))
    dispatch(toggleModalWindow(true))
  }

  const handlerDeleteIssue = () => {
    dispatch(deleteIssue(title))
    dispatch(editIssue(initialEditIssueCard))
  }

  
  return (
    <div className={`custom-issue ${id ===idCurrentIssue ? 'current-card' : ''} `}>
      <div className="content-text">
        {id ===idCurrentIssue   && <div className="selected-issue-text">current</div>}
        {title && (
          <a className="main-text" href={link}>
            {title}
          </a>
        )}
        {priority && <div className="priority-text">{priority} priority</div>}
      </div>
        {currentLocation === locationPath.startPage && (
          <div className="buttons">
            {closeButton?
            <button className="closeBtnIssue" onClick={handlerDeleteIssue} >
                <img src={closeIcon} alt="Close" className="close-button "/>
            </button>
            : null}
          </div>
        )}
      {currentLocation === locationPath.lobbyPage && (
        <div className="buttons">
          {editButton && (
            <div onClick={handlerEditIssue}>
              <img src={editIcon} alt="Edit" className="edit-button " />
            </div>
          )}

          {deleteButton && (
            <div>
              <img
                onClick={handlerDeleteIssue}
                src={deleteIcon}
                alt="Delete"
                className="delete-button "
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CustomIssue
