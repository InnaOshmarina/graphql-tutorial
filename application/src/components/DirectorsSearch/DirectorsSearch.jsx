import React, { useCallback, useEffect, useState } from 'react';
import { InputBase, withStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { styles } from './styles';

const DirectorsSearch = props => {
  const { classes, fetchMore } = props;
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMore({
      variables: { name: search },
      updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
    });
  }, [fetchMore, search]);

  const onSearch = useCallback(
    ({ target }) => {
      setSearch(target.value);
    },

    [],
  );

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={onSearch}
        name="name"
        value={search}
      />
    </div>
  );
};

export default withStyles(styles)(DirectorsSearch);
