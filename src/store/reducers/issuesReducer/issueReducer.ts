import { ActionIssues, DELETE_ISSUE, EDIT_ISSUE } from './actionsIssue'
import { CREATE_NEW_ISSUE } from './actionsIssue'
import { CustomIssueInterface, IIssues } from '../../../common/interfaces'
import { createID } from '../../../common/randomId'

export const arrOfIssues: CustomIssueInterface[] = [
  {
    title: 'issue 14',
    link: 'https://react-hook-form.com/api/useform',
    priority: 'Medium',
    id: createID()
  },
  /* {
    title: 'issue 06',
    link: 'https://react-hook-form.com/api/useform',
    priority: 'High',
    id: createID()
  }, */
]

export const initialEditIssueCard :CustomIssueInterface={
  link: '',
  title: '',
  priority: 'Low',
  id: ''
}

export const initialStateIssues: IIssues = {
  issueCard: arrOfIssues,
  editIssueCard : initialEditIssueCard,
}

export const ChangeIssuesReducer = (
  state: IIssues = initialStateIssues,
  action: ActionIssues
) => {
  switch (action.type) {
    case CREATE_NEW_ISSUE: {
      return { ...state, issueCard: [...state.issueCard, action.payload] }
    }
    case DELETE_ISSUE: {
      return {
        ...state,
        issueCard: state.issueCard.filter(
          (item) => item.title !== action.payload
        ),
      }
    }
    case 'SET_ISSUES': {
      return {
        ...state,
        issueCard: action.payload,
      }
    }
    case EDIT_ISSUE: {
      return {
        ...state,
        editIssueCard: action.payload
      }
    }
    default:
      return state
  }
}
