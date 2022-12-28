import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { SettingsState } from '../../types/reducers/game-settings'
import CustomCardGame from '../../UI-components/custom-card/CustomCardGame'

export const ChooseCard: React.FC = () => {
  const cardStorage: string[] = useSelector(
    ({ settings }: { settings: SettingsState }) => settings.cardStorage
  )
  const centerCardValue = useSelector((state: RootState) => state.settings.shortScoreType);

  return (
    <div>
      <div className="statistics">
        <div className="statistics_title"></div>
        <div className="statistics_cards">
          <h4>Choose your card:</h4>
          <div className="statistics_cards-card">
            {cardStorage.map((card, index) => {
              if (card ==='Coffee') {
                  return(
                    <CustomCardGame
                    id={index}
                    key={index}
                    centerValue={centerCardValue}
                    inGameSelected
                    coffee
                  />
                  ) 
               }
              else return (
                <CustomCardGame
                  id={index}
                  centerValue={centerCardValue}
                  key={index}
                  inGameSelected
                />
              )
             })}
          </div>
        </div>
      </div>
    </div>
  )
}
