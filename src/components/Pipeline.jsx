import Icon from './Icon';
import './Pipeline.css';

const STEPS = [
  { icon: 'commit', title: 'Checkout', text: 'Pull the code from Git' },
  { icon: 'package', title: 'Build', text: 'Install and build the app' },
  { icon: 'check', title: 'Test', text: 'Run the automated tests' },
  { icon: 'rocket', title: 'Deploy', text: 'Push the Docker image' },
];

function Pipeline() {
  return (
    <section id="pipeline" aria-labelledby="pipeline-title">
      <h2 id="pipeline-title">A typical Jenkins pipeline</h2>
      <ol className="pipeline">
        {STEPS.map((step) => (
          <li className="step" key={step.title}>
            <span className="icon-badge"><Icon name={step.icon} /></span>
            <strong>{step.title}</strong>
            <span>{step.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Pipeline;
