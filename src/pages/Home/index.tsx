import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import LoadingOverlay from '../../components/LoadingOverlay';

import { Wrapper, Content, CustomListItem } from './styles';

interface ResponseList<T> {
  count: string;
  next: string;
  previous: string | null;
  results: T[];
}

interface Character {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

interface Starship {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[];
  pilots: string[];
  starship_class: string;
  url: string;
}

type LoadState = 'idle' | 'loading' | 'loaded' | 'error';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [charactersLoadState, setCharactersLoadState] = useState<LoadState>(
    'loading'
  );
  const [charactersPage, setCharactersPage] = useState<number>(1);
  const [openCharactersList, setOpenCharactersList] = React.useState(true);

  const [starships, setStarships] = useState<Starship[]>([]);
  const [starshipsLoadState, setStarshipsLoadState] = useState<LoadState>(
    'idle'
  );
  const [starshipsPage, setStarshipsPage] = useState<number>(1);
  const [openStarshipsList, setOpenStarshipsList] = React.useState(false);

  const handleCharactersListClick = () =>
    setOpenCharactersList(!openCharactersList);

  const handleStarshipsListClick = () =>
    setOpenStarshipsList(!openStarshipsList);

  useEffect(() => {
    if (charactersLoadState === 'loading' || starshipsLoadState === 'loading') {
      setLoading(true);
    } else setLoading(false);
  }, [charactersLoadState, starshipsLoadState]);

  useEffect(() => {
    if (openCharactersList && charactersLoadState === 'idle') {
      setCharactersLoadState('loading');
    }
  }, [openCharactersList]);

  useEffect(() => {
    if (openStarshipsList && starshipsLoadState === 'idle') {
      setStarshipsLoadState('loading');
    }
  }, [openStarshipsList]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const charactersResponse: ResponseList<Character> = await (
          await fetch(
            `${process.env.REACT_APP_API_URL}people/?page=${charactersPage}`
          )
        ).json();
        setCharacters([...characters, ...charactersResponse.results]);

        if (charactersPage < Math.ceil(Number(charactersResponse.count) / 10)) {
          setCharactersPage(charactersPage + 1);
        } else setCharactersLoadState('loaded');
      } catch (error) {
        setErrorMessage('Invalid API URL.');
        setCharactersLoadState('error');
      }
    };

    if (charactersLoadState === 'loading') loadData();
  }, [charactersLoadState, charactersPage]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const starshipsResponse: ResponseList<Starship> = await (
          await fetch(
            `${process.env.REACT_APP_API_URL}starships/?page=${starshipsPage}`
          )
        ).json();
        setStarships([...starships, ...starshipsResponse.results]);

        if (starshipsPage < Math.ceil(Number(starshipsResponse.count) / 10)) {
          setStarshipsPage(starshipsPage + 1);
        } else setStarshipsLoadState('loaded');
      } catch (error) {
        setErrorMessage('Invalid API URL.');
        setStarshipsLoadState('error');
      }
    };

    if (starshipsLoadState === 'loading') loadData();
  }, [starshipsLoadState, starshipsPage]);

  const HomeContent = () => {
    if (errorMessage) {
      return <Typography variant="h4">{errorMessage}</Typography>;
    }

    return (
      <Content>
        <List
          component="nav"
          aria-labelledby="star-wars-list-api"
          subheader={
            <ListSubheader component="h1" id="star-wars-list-api">
              Star Wars Api Lists
            </ListSubheader>
          }
        >
          <CustomListItem
            id="Characters"
            button
            onClick={handleCharactersListClick}
          >
            <ListItemText primary="Characters" />
            {openCharactersList ? <ExpandLess /> : <ExpandMore />}
          </CustomListItem>
          <Collapse in={openCharactersList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {characters.map((character) => (
                <Link to={`/character/${character?.url.split('/')[5]}`}>
                  <CustomListItem id={character.name} button collapsed="true">
                    <ListItemText primary={character.name} />
                  </CustomListItem>
                </Link>
              ))}
            </List>
          </Collapse>

          <CustomListItem
            id="Starships"
            button
            onClick={handleStarshipsListClick}
          >
            <ListItemText primary="Starships" />
            {openStarshipsList ? <ExpandLess /> : <ExpandMore />}
          </CustomListItem>
          <Collapse in={openStarshipsList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {starships.map((starship) => (
                <Link to={`/starship/${starship?.url.split('/')[5]}`}>
                  <CustomListItem id={starship.name} button collapsed="true">
                    <ListItemText primary={starship.name} />
                  </CustomListItem>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>
      </Content>
    );
  };

  return (
    <Wrapper>
      {loading ? LoadingOverlay() : <div />}
      {HomeContent()}
    </Wrapper>
  );
};

export default Home;
