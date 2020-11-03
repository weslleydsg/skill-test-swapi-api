import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

interface Params {
  id: string;
}

const Character: React.FC = () => {
  const { id } = useParams<Params>();

  const [character, setCharacter] = useState<CharacterData | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const characterResponse: CharacterData = await (
          await fetch(`${process.env.REACT_APP_API_URL}people/${id}/`)
        ).json();

        if (characterResponse.detail) setErrorMessage('Character not found.');
        else setCharacter(characterResponse);

        setLoading(false);
      } catch (error) {
        setErrorMessage('Invalid API URL.');
        setLoading(false);
      }
    })();
  }, []);

  const DetailContent = () => {
    if (errorMessage) {
      return <Typography variant="h4">{errorMessage}</Typography>;
    }

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
  };

  return <Content>{loading ? LoadingOverlay() : DetailContent()}</Content>;
};

export default Character;
