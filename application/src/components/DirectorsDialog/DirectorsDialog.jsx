import React, { memo, useCallback } from 'react';
import { useMutation } from 'react-apollo';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BlockIcon from '@material-ui/icons/Block';

import { deleteDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries';

const DirectorsDialog = props => {
  const { id, open, handleClose } = props;
  const [deleteDirector] = useMutation(deleteDirectorMutation);

  const handleDelete = useCallback(async () => {
    try {
      await deleteDirector({
        variables: { id },
        refetchQueries: [{ query: directorsQuery, variables: { name: '' } }],
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }, [id, deleteDirector, handleClose]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Are you sure that you want to delete element?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you click 'Confirm' this element will be removed from data base.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <BlockIcon /> Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" autoFocus>
          <DeleteForeverIcon /> Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(DirectorsDialog);
