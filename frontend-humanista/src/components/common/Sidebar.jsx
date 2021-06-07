import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { NavLink } from "reactstrap";

import categories from "../category/categories";

const useStyles = makeStyles({
  paper: {
    background: "#0b0909",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function Sidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <NavLink className="accent-color" onClick={toggleDrawer("left", true)}>
        CATEGORY
      </NavLink>
      <Drawer
        classes={{ paper: classes.paper }}
        variant="temporary"
        anchor="left"
        open={state.left}
        onClose={toggleDrawer("left", false)}
      >
        <List>
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <ListItem>
                <ListItemText primary={category.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
