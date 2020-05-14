import React, { useState, memo, useCallback } from 'react';
import { useQuery } from 'react-apollo';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  MenuItem,
  Menu,
  withStyles,
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import DirectorsSearch from '../DirectorsSearch/DirectorsSearch';
import DirectorsDialog from '../DirectorsDialog/DirectorsDialog';

import { directorsQuery } from './queries';

import { styles } from './styles';

const DirectorsTable = props => {
  const { classes, onOpen } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const [activeElem, setActiveElem] = useState({});

  const { loading, data, fetchMore } = useQuery(directorsQuery, {
    variables: { name: '' },
  });

  const handleDialogOpen = useCallback(() => setOpenDialog(true), []);

  const handleDialogClose = useCallback(() => setOpenDialog(false), []);

  const handleClick = useCallback(({ currentTarget }, data) => {
    setAnchorEl(currentTarget);
    setActiveElem(data);
  }, []);

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleEdit = useCallback(() => {
    onOpen(activeElem);
    handleClose();
  }, [onOpen, handleClose, activeElem]);

  const handleDelete = useCallback(() => {
    handleDialogOpen();
    handleClose();
  }, [handleDialogOpen, handleClose]);

  return (
    <>
      <Paper>
        <DirectorsSearch fetchMore={fetchMore} />
      </Paper>
      <DirectorsDialog open={openDialog} handleClose={handleDialogClose} id={activeElem.id} />
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell>Movies</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              data.directors.map(director => {
                return (
                  <TableRow key={director.id}>
                    <TableCell component="th" scope="row">
                      {director.name}
                    </TableCell>
                    <TableCell align="right">{director.age}</TableCell>
                    <TableCell>
                      {director.movies.map((movie, key) => (
                        <div key={movie.id}>
                          {`${key + 1}. `}
                          {movie.name}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      <>
                        <IconButton color="inherit" onClick={e => handleClick(e, director)}>
                          <MoreIcon />
                        </IconButton>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={() => handleEdit(director)}>
                            <CreateIcon /> Edit
                          </MenuItem>
                          <MenuItem onClick={handleDelete}>
                            <DeleteIcon /> Delete
                          </MenuItem>
                        </Menu>
                      </>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default withStyles(styles)(memo(DirectorsTable));
