import PropTypes from "prop-types";
import React from "react";
import { firstCharToUpperCase } from "../../utils/firstCharToUpperCase";
import { Typography, CardContent } from "@material-ui/core";

const AdditionalInfo = ({ pokemon }) => {
  const { abilities, height, weight } = pokemon;
  return (
    <CardContent>
      <Typography align="left" gutterBottom variant="subtitle1" color="primary">
        Abilities:
      </Typography>
      <ul className="text-align-left">
        {abilities.map((ability) => (
          <li key={ability.ability.name}>
            <strong>{firstCharToUpperCase(ability.ability.name)}</strong>
          </li>
        ))}
      </ul>

      <Typography align="left" gutterBottom variant="subtitle1" color="primary">
        Size:
      </Typography>
      <ul className="text-align-left">
        <li>
          <strong>{`Height: ${height}`}</strong>
        </li>
        <li>
          <strong>{`Weigth: ${weight}`}</strong>
        </li>
      </ul>
    </CardContent>
  );
};

AdditionalInfo.propTypes = {
  pokemon: PropTypes.shape({
    abilities: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
  }),
};

export default AdditionalInfo;
