import Logoo from 'src/static/Logo.png'
const Logo = (props) => (
  <img
  style={{height :60}}
    alt="Logo"
    src={Logoo}
    {...props}
  />
);

export default Logo;
