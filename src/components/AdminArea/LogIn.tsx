import styles from "./LogIn.module.scss";

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCardBoard}>
        <div className={styles.logo}>
          <img
            className={styles.loginLogo}
            src="https://firebasestorage.googleapis.com/v0/b/sapunmontan.appspot.com/o/logo%2Fmontanair.png?alt=media&token=f42ebf81-1205-44d2-806b-7130100adda7"
          />
        </div>

        <h3 className={styles.textInside}>{"Login Admin"}</h3>
        <div className={styles.inputFields}>
          <label htmlFor="email">{"Email:"}</label>
          <input name="email" type={"email"}></input>
          <label htmlFor="email">{"Parola:"}</label>
          <input name="password" type={"password"}></input>
          <input type="submit" value="Submit" />
        </div>
      </div>
    </div>
  );
};
export default Login;
