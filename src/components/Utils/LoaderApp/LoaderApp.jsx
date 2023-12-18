import Image from "next/image";
import { LinearProgress } from "@mui/material";
import { useStyles } from "./styles";

const LoaderApp = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <Image
        src="/wasap-3-logo.png"
        width={45}
        height={45}
        alt="wasap logo"
        priority
      />
      <LinearProgress className={classes.loader} />
    </div>
  );
};

export default LoaderApp;
