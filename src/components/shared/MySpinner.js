import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const MySpinner = ({ ...props }) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <CircularProgress {...props} />
        </div>
    );
};

export default MySpinner;