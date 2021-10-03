import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 210,
    marginLeft: -3,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    margin: 3,
  },
});

export default useStyles;