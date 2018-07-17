import React from 'react';
import PropTypes from 'prop-types';

const { string, func } = PropTypes;

const propTypes = {
  value: string.isRequired,
  action: func.isRequired,
};

const search = ({ action, value }) => (
  <input onChange={action} value={value} type="text" />
);

search.propTypes = propTypes;

export default search;
