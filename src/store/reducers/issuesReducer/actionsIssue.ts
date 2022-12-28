import { CustomIssueInterface } from '../../../common/interfaces'

//constants for actions
export const CREATE_ISSUE = 'CREATE_ISSUE'
export const EDIT_ISSUE = 'EDIT_ISSUE'
export const DELETE_ISSUE = 'DELETE_ISSUE'
export const SET_ISSUES = 'SET_ISSUES'

export const CHANGE_NEW_ISSUE = 'CHANGE_NEW_ISSUE'
export const CREATE_NEW_ISSUE = 'CREATE_NEW_ISSUE'
//type for actions


export type ActionChangeIssuesField = {
  type: typeof CHANGE_NEW_ISSUE
  payload: CustomIssueInterface
}
export type ActionCreateIssuesField = {
  type: typeof CREATE_NEW_ISSUE
  payload: CustomIssueInterface
}

export type ActionDeleteIssue = {
  type: typeof DELETE_ISSUE
  payload: string
}
export type ActionEditIssue = {
  type: typeof EDIT_ISSUE
  payload: CustomIssueInterface
}
export type ActionSetIssues = {
  type: typeof SET_ISSUES
  payload: CustomIssueInterface[]
}
export type ActionIssues =
  | ActionChangeIssuesField
  | ActionCreateIssuesField
  | ActionDeleteIssue
  | ActionEditIssue
  | ActionSetIssues
  
//Actions

export const addNewIssue = (issueForm: CustomIssueInterface): ActionIssues => ({
  type: CREATE_NEW_ISSUE,
  payload: issueForm,
})

export const deleteIssue = (issueForm: string): ActionIssues => ({
  type: DELETE_ISSUE,
  payload: issueForm,
})

export const editIssue = (issueForm: CustomIssueInterface): ActionIssues => ({
  type: EDIT_ISSUE,
  payload: issueForm,
})

export const setIssues = (issueForm: CustomIssueInterface[]): ActionIssues => ({
  type: SET_ISSUES,
  payload: issueForm
})
