import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));


function ThemedSuspense() {
  const classes = useStyles();
  return (
    <div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
        <div className={classes.root}>
          <CircularProgress />
        </div>
    </div>
  )
}

export default ThemedSuspense
