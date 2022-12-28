import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStore, ModalType, TypeUser } from '../../common/interfaces'
import GameSettings from '../../components/game-settings/game-settings.component'
import Issues from '../../components/issues/issues'
import Members from '../../components/members/members'
import SessionTitle from '../../components/session-title/session-title'
import { CreateIssueModal } from '../../components/modalWindows/CreateIssueModal'
import { KickPlayerModal } from '../../components/modalWindows/KickPlayerModal'
import { ModalWindow } from '../../components/modalWindows/modalWindow'
import './LobbyPage.scss'
import { RootState } from '../../store/reducers'
import { useHistory } from 'react-router'

const LobbyPage: FC = () => {
  const location = useSelector((state: RootState) => state.location)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (location !== '/' && history.location.pathname !== location)
      dispatch({ type: 'SET_LOCATION', payload: history.location.pathname })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const typeModalWindow = useSelector(
    (state: IStore) => state.globalSettings.typeModalWindow
  )
  const typeUser = useSelector((state: IStore) => state.globalSettings.typeUser)

  const arrOfMembers = useSelector(
    (state: RootState) => state.playerCards.playerCards
  )

  return (
    <div className="lobby-page">
      <SessionTitle />
      <Members arrOfMembers={arrOfMembers} />
      {typeUser === TypeUser.master && (
        <>
          <Issues />
          <GameSettings />
          <ModalWindow>
            {typeModalWindow === ModalType.createIssueModalWindow ? (
              <CreateIssueModal />
            ) : (
              <KickPlayerModal />
            )}
          </ModalWindow>
        </>
      )}
    </div>
  )
}

export default LobbyPage
