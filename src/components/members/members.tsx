import './members.scss';
import PlayerCard from '../../UI-components/player-card/player-card';
import { ReactElement } from 'react';
import { IPlayerCard } from '../../common/interfaces'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

interface IMembers {
  arrOfMembers?: IPlayerCard[],
}
const Members: React.FC<IMembers> = ({arrOfMembers}) => {
  const id = useSelector((state: RootState) => state.playerCards.id)
  let members: (ReactElement | undefined)[] = [];
  // eslint-disable-next-line array-callback-return
  if (arrOfMembers?.length) members = arrOfMembers.map((item: IPlayerCard, index: number) => {
    if (index ) {
      return (
        <PlayerCard 
          key={item.id}
          photo={item.photo}
          name={item.name}
          position={item.position}
          btnDelPlayer={item.id !== id}
          above={item.id === id}
          id={item.id}/>
      )
    }
  })

  return (
    <div className="members">
      <span className="title">Members</span>
      <div className="members__container">
        {members}
      </div>
    </div>
  )
}

export default Members;