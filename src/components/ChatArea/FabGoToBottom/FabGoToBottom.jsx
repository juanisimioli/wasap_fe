import { useStyles } from "./styles";

const FabGoToBottom = ({ handleClick, isScrolledToBottom }) => {
  const { classes } = useStyles();

  return (
    <div
      className={`${classes.container} ${
        isScrolledToBottom ? classes.disappear : ""
      }`}
      onClick={handleClick}
    >
      <svg
        className={classes.icon}
        viewBox="0 0 19 20"
        height="20"
        width="19"
        preserveAspectRatio="xMidYMid meet"
        version="1.1"
        x="0px"
        y="0px"
      >
        <title>down</title>
        <path
          fill="currentColor"
          d="M3.8,6.7l5.7,5.7l5.7-5.7l1.6,1.6l-7.3,7.2L2.2,8.3L3.8,6.7z"
        ></path>
      </svg>
    </div>
  );
};

export default FabGoToBottom;
