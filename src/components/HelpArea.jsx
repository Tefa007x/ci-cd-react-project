import HelpBox from './HelpBox';
import './HelpArea.css';

const HELP_ITEMS = [
  {
    id: 'h1',
    icon: 'workflow',
    title: 'What is Jenkins?',
    text: 'Jenkins is an open-source automation server that builds, tests and deploys your code every time something changes.',
  },
  {
    id: 'h2',
    icon: 'branch',
    title: 'What is a Pipeline?',
    text: 'A pipeline is a chain of stages (checkout, build, test, deploy) that your code passes through automatically.',
  },
  {
    id: 'h3',
    icon: 'zap',
    title: 'What is a Jenkinsfile?',
    text: 'A Jenkinsfile is a text file in your repository that defines the pipeline as code, so it is versioned with your app.',
  },
];

function HelpArea() {
  return (
    <section data-testid="help-area" id="help-area">
      {HELP_ITEMS.map((item) => (
        <HelpBox key={item.id} icon={item.icon} title={item.title} text={item.text} />
      ))}
    </section>
  );
}

export default HelpArea;
