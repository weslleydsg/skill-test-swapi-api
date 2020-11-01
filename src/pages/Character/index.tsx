import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';

import LoadingOverlay from '../../components/LoadingOverlay';

import { Content, CustomPaper } from './styles';

interface CharacterData {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  detail?: string;
}

const Character: React.FC = ({ computedMatch }: any) => {
  const { id } = computedMatch.params;

  const [character, setCharacter] = useState<CharacterData | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const characterResponse: CharacterData = await (
        await fetch(`http://swapi.dev/api/people/${id}/`)
      ).json();

      setLoading(false);

      if (characterResponse.detail) return;

      setCharacter(characterResponse);
    })();
  }, []);

  const DetailContent = () => {
    if (character) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomPaper>{`Name: ${character?.name}`}</CustomPaper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomPaper>{`Height: ${character?.height}`}</CustomPaper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomPaper>{`Hair Color: ${character?.hair_color}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomPaper>{`Skin Color: ${character?.skin_color}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomPaper>{`Eye Color: ${character?.eye_color}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomPaper>{`Birth Year: ${character?.birth_year}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomPaper>{`Gender: ${character?.gender}`}</CustomPaper>
          </Grid>
        </Grid>
      );
    }
    return <h1>Character not found</h1>;
  };

  return <Content>{loading ? LoadingOverlay() : DetailContent()}</Content>;
};

export default Character;
