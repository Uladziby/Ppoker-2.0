import React from 'react'
import { useSelector } from 'react-redux'
import {
  IResponseResults,
  IStore,
} from '../../common/interfaces'
import StatiscicCard from '../../UI-components/custom-card/statistic-card'

export const ResultVoiting: React.FC = () => {
  const showStatRound: boolean = useSelector(
    (state: IStore) => state.game.statGame.showStatRound
  )
  const arrOfResultsRound: IResponseResults[] = useSelector(
    (state: IStore) => state.game.statGame.results
  )
  const cardStorage: string[] = useSelector(
    (state: IStore) => state.settings.cardStorage
  )

  console.log('arrOfResultsRound',arrOfResultsRound)
  let resultRound: any[] = cardStorage
    .map((item, index) => ({
      valueCard: item,
      percent: arrOfResultsRound[arrOfResultsRound.length - 1].resultsVote[index],
    }))
    .sort(function (a: any, b: any) {
      return b.percent - a.percent
    })
  console.log(resultRound)

  
  const result = resultRound.map((item) => (
    <div
      key={item.valueCard}
      className="statistics_cards-results_column"
      hidden={item.percent ? false : true}
    >
      <div className="statistics_cards-results_column_card">
        {<StatiscicCard id={Number(item.valueCard)} values={item.valueCard} />}
      </div>
      <div className="statistics_cards-results_column_percent">
        <h4>{item.percent}%</h4>
      </div>
    </div>
  ))

  return (
    <>
      {showStatRound ? (
        <>
          <div className="statistics_title">Voting results:</div>
          <div className="statistics_cards-results">{result}</div>
        </>
      ) : null}
    </>
  )
}
