import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/trivia-logo.png";
import Container from "../../components/Container";
import GameContext from '../../store/GameState';
import PlayerContext from '../../store/PlayerState';

const Home = () => {
  const { resetPlayers } = useContext(PlayerContext);
  const { resetGame } = useContext(GameContext);

  useEffect(() => {
    resetPlayers();
    resetGame();
  }, [resetPlayers, resetGame]);

  return ( 
    <Container classNames="height__vh flex flex__center">
      <section className="grid__one grid__row-md">
        <img src={logo} width="240px" height="240px" alt="Trivia logo" />
        <div className="grid__one grid__row-sm grid__just-null">
          <Link to="/single-player/player-setup" className="btn btn__md btn__cool-grey">Single Player</Link>
          <Link to="/multiplayer/player-setup" className="btn btn__md btn__cool-grey">Multiplayer</Link>
          <Link to="/about" className="btn btn__md btn__cool-grey">About</Link>
        </div>
      </section>
    </Container>
  );
}
 
export default Home;