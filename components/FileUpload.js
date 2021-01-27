import React, { useState, useEffect, useCallback } from 'react'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Select,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneDialog } from 'material-ui-dropzone'
import axios from 'axios';

import DiscrepencyList from './DiscrepencyList';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function FileUpload() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [concern, setConcern] = useState('');
  const [emails, setEmails] = useState([]);

  const fetchDiscrepencies = useCallback(async () => {
    if (files.length === 0) return;

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const fd = new FormData();
    
    files.forEach((file) => {
      fd.append('File[]',file);
    });
    fd.append('concern', concern);
    
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/upload`, fd, config)
      setEmails(response.data.emails);
    } catch (error) {
      console.log(error);
    }
  }, [concern, files]);

  useEffect(() => {
    fetchDiscrepencies();
  }, [fetchDiscrepencies]);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  const handleChange = (event) => setConcern(event.target.value);

  const handleSave = async (submittedFiles) => {
    //Saving files to state for further use and closing Modal.
    setFiles(submittedFiles);
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={8}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Upload CSV File
          </Button>
        </Grid>
      
        <Grid item xs={12} md={4} lg={4}>
      
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="conern-native-simple">Concern</InputLabel>
            <Select
              native
              value={concern}
              onChange={handleChange}
              inputProps={{
                name: 'concern',
                id: 'concern-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value="channel_ownership">Channel Ownership</option>
              <option value="subscriber_count">Subscriber Count</option>
            </Select>
          </FormControl>
        
        </Grid>
      
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <DiscrepencyList emails={emails} />
          </Paper>
        </Grid>
      </Grid>

      <DropzoneDialog
        open={open}
        onSave={handleSave}
        acceptedFiles={['text/csv']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
      />
    </div>
  );
}

export default FileUpload;
