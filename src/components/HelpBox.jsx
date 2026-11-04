import Icon from './Icon';
import './HelpBox.css';

function HelpBox({ icon, title, text }) {
  return (
    <article className="help-box">
      <span className="icon-badge"><Icon name={icon} /></span>
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}

export default HelpBox;
