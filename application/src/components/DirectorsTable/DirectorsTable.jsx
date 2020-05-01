import React, { useState, memo } from 'react';
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

import DirectorsDialog from '../DirectorsDialog/DirectorsDialog';

import { directorsQuery } from './queries';

import { styles } from './styles';

const DirectorsTable = props => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const [activeElem, setActiveElem] = useState({});

  const { loading, data } = useQuery(directorsQuery);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleClick = ({ currentTarget }, data) => {
    setAnchorEl(currentTarget);
    setActiveElem(data);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = row => {
    const { onOpen } = props;
    onOpen(activeElem);
    handleClose();
  };

  const handleDelete = () => {
    handleDialogOpen();
    handleClose();
  };

  const { classes } = props;

  console.log('data: ', data);

  return (
    <>
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
                        <div key={movie.name}>
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
