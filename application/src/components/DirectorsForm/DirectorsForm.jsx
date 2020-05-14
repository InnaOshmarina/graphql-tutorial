import React, { useCallback } from 'react';
import { useMutation } from 'react-apollo';
import { TextField, Button, DialogTitle, Dialog, withStyles } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { addDirectorMutation, updateDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries';

import { styles } from './styles';

const DirectorsForm = props => {
  const { classes, open, handleChange, selectedValue = {}, onClose } = props;
  const { id, name, age } = selectedValue;

  const [addDirector] = useMutation(addDirectorMutation);
  const [updateDirector] = useMutation(updateDirectorMutation);

  const handleSave = useCallback(async () => {
    try {
      id
        ? await updateDirector({
            variables: { id, name, age: Number(age) },
            refetchQueries: [{ query: directorsQuery, variables: { name: '' } }],
          })
        : await addDirector({
            variables: { name, age: Number(age) },
            refetchQueries: [{ query: directorsQuery, variables: { name: '' } }],
          });
      onClose();
    } catch (error) {
      console.log(error);
    }
  }, [id, name, age, updateDirector, addDirector, onClose]);

  return (
    <Dialog onClose={onClose} open={open} aria-labelledby="simple-dialog-title">
      <DialogTitle className={classes.title} id="simple-dialog-title">
        Director information
      </DialogTitle>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          name="name"
        />
        <TextField
          id="outlined-rate"
          label="Age"
          className={classes.textField}
          value={age}
          onChange={e => handleChange(e)}
          type="number"
          margin="normal"
          variant="outlined"
          name="age"
        />
        <div className={classes.wrapper}>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            <SaveIcon /> Save
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default withStyles(styles)(DirectorsForm);
