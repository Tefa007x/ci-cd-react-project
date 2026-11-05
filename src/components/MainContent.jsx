import { useState } from 'react';

import HelpArea from './HelpArea';
import Icon from './Icon';
import LearningPath from './LearningPath';
import Pipeline from './Pipeline';

const REPO_URL = 'https://github.com/Tefa007x/ci-cd-react-project.git';

function MainContent() {
  const [helpVisible, setHelpVisible] = useState(false);
  const [pathVisible, setPathVisible] = useState(false);

  function toggleHelp() {
    setHelpVisible((isVisible) => !isVisible);
  }

  return (
    <main>
      <p className="tagline">Hands-on CI/CD with Jenkins, from your first Jenkinsfile to a running deployment.</p>
      <div className="actions">
        <button className="btn btn-primary" onClick={() => setPathVisible((v) => !v)} aria-expanded={pathVisible}>
          {pathVisible ? 'Close Path' : 'Start Learning'} <Icon name="arrow" />
        </button>
        <button className="btn btn-secondary" onClick={toggleHelp} aria-expanded={helpVisible}>
          <Icon name="book" />
          {helpVisible ? 'Hide' : 'Show'} Help
        </button>
        <a className="btn btn-ghost" href={REPO_URL} target="_blank" rel="noopener noreferrer">
          <Icon name="github" /> Source <Icon name="external" />
        </a>
      </div>
      {pathVisible && <LearningPath />}
      {helpVisible && <HelpArea />}
      <Pipeline />
    </main>
  );
}

export default MainContent;
