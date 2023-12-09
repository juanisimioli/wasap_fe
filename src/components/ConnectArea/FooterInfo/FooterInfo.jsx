import { LinkedIn, GitHub } from "@mui/icons-material";
import Link from "next/link";
import { useStyles } from "./styles";

const FooterInfo = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      dApp for educational & learning purposes
      <Link href="https://www.linkedin.com/in/juanisimioli/" target="_blank">
        <LinkedIn className={classes.icon} />
      </Link>
      <Link href="https://github.com/juanisimioli/wasap_fe" target="_blank">
        <GitHub className={classes.icon} />
      </Link>
    </div>
  );
};

export default FooterInfo;
