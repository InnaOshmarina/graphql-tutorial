import React, { useCallback, useState } from 'react';

import { Fab, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import DirectorsTable from '../DirectorsTable/DirectorsTable';
import DirectorsForm from '../DirectorsForm/DirectorsForm';

import { styles } from './styles';

const INITIAL_STATE = {
  open: false,
  name: '',
  age: 0,
};

const Directors = props => {
  const { classes } = props;
  const [director, setDirector] = useState({ ...INITIAL_STATE });

  const { name, age, id, open } = director;

  const handleClickOpen = useCallback(
    data => {
      setDirector({
        ...INITIAL_STATE,
        open: true,
        ...data,
      });
    },
    [setDirector],
  );

  const handleClose = useCallback(() => {
    setDirector({ ...INITIAL_STATE, id: null });
  }, [setDirector]);

  const handleChange = useCallback(
    ({ target }) => {
      setDirector({ ...director, [target.name]: target.value });
    },
    [setDirector, director],
  );

  return (
    <>
      <DirectorsForm
        handleChange={handleChange}
        selectedValue={{ name, age, id }}
        open={open}
        onClose={handleClose}
      />
      <div className={classes.wrapper}>
        <DirectorsTable onOpen={handleClickOpen} onClose={handleClose} />
        <Fab
          onClick={() => handleClickOpen(null)}
          color="primary"
          aria-label="Add"
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  );
};

export default withStyles(styles)(Directors);
