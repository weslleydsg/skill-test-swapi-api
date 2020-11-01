import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';

import LoadingOverlay from '../../components/LoadingOverlay';

import { Content, CustomPaper } from './styles';

interface StarshipData {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  detail?: string;
}

const Starship: React.FC = ({ computedMatch }: any) => {
  const { id } = computedMatch.params;

  const [starship, setStarship] = useState<StarshipData | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const starshipResponse: StarshipData = await (
        await fetch(`http://swapi.dev/api/starships/${id}/`)
      ).json();

      setLoading(false);

      if (starshipResponse.detail) return;

      setStarship(starshipResponse);
    })();
  }, []);

  const DetailContent = () => {
    if (starship) {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CustomPaper>{`Name: ${starship?.name}`}</CustomPaper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomPaper>{`Model: ${starship?.model}`}</CustomPaper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomPaper>{`Manufacturer: ${starship?.manufacturer}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <CustomPaper>{`Cost In Credits: ${starship?.cost_in_credits}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <CustomPaper>{`Length: ${starship?.length}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomPaper>{`Max Atmosphering Speed: ${starship?.max_atmosphering_speed}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomPaper>{`Crew: ${starship?.crew}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomPaper>{`Passengers: ${starship?.passengers}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomPaper>{`Cargo Capacity: ${starship?.cargo_capacity}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomPaper>{`Consumables: ${starship?.consumables}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomPaper>{`Hyperdrive Rating: ${starship?.hyperdrive_rating}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomPaper>{`MGLT: ${starship?.MGLT}`}</CustomPaper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <CustomPaper>{`Starship Class: ${starship?.starship_class}`}</CustomPaper>
          </Grid>
        </Grid>
      );
    }
    return <h1>Starship not found</h1>;
  };

  return <Content>{loading ? LoadingOverlay() : DetailContent()}</Content>;
};

export default Starship;
