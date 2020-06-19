import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#151618',
  },
  label: {
    color: '#fafafa',
  },
});

const NavBar = ({ setDrinks }) => {
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    setDrinks([]);
  };
  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          // value={value}
          // onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab
            className={classes.label}
            onClick={(e) => handleClick(e)}
            label="By Main Ingredient"
          />
        </Tabs>
      </Paper>
    </div>
  );
};

export default NavBar;
