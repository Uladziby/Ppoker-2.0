import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  IResponseResults,
  IStatiscicsCard,
  IStatiscicsRound,
  IStore,
} from '../../common/interfaces'
import { RootState } from '../../store'
import StatiscicCard from '../../UI-components/custom-card/statistic-card'
import './ResultsPage.scss'

export const ResultsPage: React.FC = () => {
  
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location )
  const history = useHistory();
 // const data: any = useSelector((state: RootState) => state.game)


  useEffect(() => {
    if (location !== '/' && history.location.pathname !== location) dispatch({type: 'SET_LOCATION', payload: history.location.pathname})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const issueCard = useSelector((state: IStore) => state.issues.issueCard)
  const titleGame: string = useSelector((state: IStore) => state.settings.title)

  const arrResults: IResponseResults[] = useSelector(
    (state: IStore) => state.game.statGame.results
  )

  const cardStorage: string[] = useSelector(
    (state: IStore) => state.settings.cardStorage
  )

  const downloadResult = () => {
    const data = arrResults.map((item: IResponseResults) => {
      const issue = issueCard.find((iss) => iss.id === item.idIssue)?.title
      let res = '';
      cardStorage.forEach((card, index) => res += `card ${card} :  ${item.resultsVote[index]}%,\n`)
      return `${issue}:  \n${res}\n `
    })
    const blob = new Blob(data, {type : 'text/csv'});
    const link = document.createElement('a');
    link.download = "result.csv";
    link.href = URL.createObjectURL(blob);
    link.click();
  }

  function createCardsResults(id: string): IStatiscicsRound {

    const filterArray = arrResults.filter(({ idIssue }) => idIssue === id)
    let statCurrentId: IStatiscicsRound = {
      idIssue: '',
      resultRound: [],
    }
    const currentId = filterArray[0]
    if (filterArray[0] === undefined) return statCurrentId
    let round: IStatiscicsCard[] = cardStorage
      .map((item, index) => ({
        valueCard: item,
        percent: currentId.resultsVote[index],
      }))
      .sort(function (a: IStatiscicsCard, b: IStatiscicsCard) {
        return b.percent - a.percent
      })

    return (statCurrentId = { idIssue: id, resultRound: round })
  }

  function sortIdArray(id: string): JSX.Element[] {
    let filterArrayElement = createCardsResults(id)

    return filterArrayElement.resultRound.map(({ percent, valueCard }) => (
      <div
        key={valueCard}
        hidden={percent ? false : true}
        className="results_content__round_cards_card"
      >
        {<StatiscicCard id={Number(valueCard)} values={valueCard} />}
        <div className="statistics_cards-results_column_percent">
          <h4>{percent}%</h4>
        </div>
      </div>
    ))
  }

  const results = issueCard.map(({ title, link, id }) => {
    return (
      <div key={id} className="results_content__round">
        <div className="results_content__round_issueTitle">
          <div className={`custom-issue`}>
            <div className="content-text">
              {title && (
                <a className="main-text" href={link}>
                  {title}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="results_content__round_cards">{sortIdArray(id!)}</div>
      </div>
    )
  })

  return (
    <div className="results">
      <button type="button" className="btn_primary" onClick={downloadResult}> Download</button>
      <div className="results_title">{titleGame}</div>
      <div className="results_content"> {results} </div>
    </div>
  )
}
