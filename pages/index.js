import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@material-ui/core';

import FileUpload from '../components/FileUpload';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Youtube Data Parser
        </Typography>
        <FileUpload />
      </Box>
    </Container>
  );
}
