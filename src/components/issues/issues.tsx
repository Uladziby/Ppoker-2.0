import './issues.scss'
import CustomIssue from '../../UI-components/custom-issue/custom-issue.component'
import { CustomIssueInterface, IStore } from '../../common/interfaces'
import CreateIssueCard from '../../UI-components/custom-issue/CreateIssueCard'
import { useSelector } from 'react-redux'
import { createID } from '../../common/randomId'

const Issues: React.FC = () => {
  const arrOfIssues: CustomIssueInterface[] = useSelector(
    (state: IStore) => state.issues.issueCard
  )

  const issues = arrOfIssues.map(({ title, link, priority  }) => {
    return (
      <CustomIssue key={title} priority={priority} title={title} link={link} id={createID()}/>
    )
  })

  return (
    <div className="issues">
      <span className="title">Issues</span>
      <div className="issues__container">
        <div className="issues__container">
          {issues}
          <CreateIssueCard />
        </div>
      </div>
    </div>
  )
}

export default Issues
