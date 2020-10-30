import React, { useState, useEffect, useMemo } from 'react';

import { ResponseList } from '../../interfaces/ResponseList';

interface Character {
  name?: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
  homeworld?: string;
}

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    (async () => {
      const data: ResponseList<Character> = await (
        await fetch('https://swapi.dev/api/people/')
      ).json();

      setCharacters(data.results);
    })();
  }, []);

  const CharactersNames = useMemo(
    () => characters.map((character) => character.name),
    [characters]
  );

  return (
    <ul>
      {CharactersNames.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
};

export default Characters;
