import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

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

const Home: React.FC = () => {
  const [charactersLoading, setCharactersLoading] = useState<boolean>(true);
  const [starshipsLoading, setStarshipsLoading] = useState<boolean>(true);

  const [charactersPage, setCharactersPage] = useState<number>(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [openCharactersList, setOpenCharactersList] = React.useState(false);

  const [starshipsPage, setStarshipsPage] = useState<number>(1);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [openStarshipsList, setOpenStarshipsList] = React.useState(false);

  const handleCharactersListClick = () =>
    setOpenCharactersList(!openCharactersList);

  const handleStarshipsListClick = () =>
    setOpenStarshipsList(!openStarshipsList);

  useEffect(() => {
    (async () => {
      const charactersResponse: ResponseList<Character> = await (
        await fetch(`http://swapi.dev/api/people/?page=${charactersPage}`)
      ).json();
      setCharacters([...characters, ...charactersResponse.results]);

      if (charactersPage < Math.ceil(Number(charactersResponse.count) / 10)) {
        setCharactersPage(charactersPage + 1);
        return;
      }

      setCharactersLoading(false);
    })();
  }, [charactersPage]);

  useEffect(() => {
    (async () => {
      const starshipsResponse: ResponseList<Starship> = await (
        await fetch(`http://swapi.dev/api/starships/?page=${starshipsPage}`)
      ).json();
      setStarships([...starships, ...starshipsResponse.results]);

      if (starshipsPage < Math.ceil(Number(starshipsResponse.count) / 10)) {
        setStarshipsPage(starshipsPage + 1);
        return;
      }

      setStarshipsLoading(false);
    })();
  }, [starshipsPage]);

  const HomeContent = () => (
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

  return (
    <Wrapper>
      {charactersLoading || starshipsLoading ? LoadingOverlay() : HomeContent()}
    </Wrapper>
  );
};

export default Home;
