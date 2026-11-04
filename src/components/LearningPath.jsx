import { useEffect, useState } from 'react';

import Icon from './Icon';
import './LearningPath.css';

const STORAGE_KEY = 'jenkins-progress';

const JENKINSFILE = `pipeline {
  agent any
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Build')    { steps { sh 'npm ci && npm run build' } }
    stage('Test')     { steps { sh 'npm test' } }
    stage('Docker')   { steps { sh 'docker build -t react-docker .' } }
  }
}`;

const LESSONS = [
  { id: 'l1', title: 'What is CI/CD and Jenkins?', minutes: 5, text: 'Continuous Integration builds and tests every change automatically, and Continuous Delivery ships it. Jenkins is the server that runs those steps for you.' },
  { id: 'l2', title: 'Install Jenkins and first login', minutes: 10, text: 'Install Java, add the Jenkins apt repository, open port 8080 and unlock Jenkins with the initial admin password.' },
  { id: 'l3', title: 'Your first Pipeline (Jenkinsfile)', minutes: 15, text: 'Describe the pipeline as code: an agent to run on, and stages made of steps. Save this as a Jenkinsfile in your repo, create a Pipeline job that points at it, and click Build Now.', code: JENKINSFILE },
  { id: 'l4', title: 'Build and push a Docker image', minutes: 15, text: 'Add the jenkins user to the docker group, build your image in a stage, and push it to a registry using stored credentials.' },
  { id: 'l5', title: 'Triggers, credentials and webhooks', minutes: 20, text: 'Start builds automatically on every push with a GitHub webhook, and keep secrets in the Jenkins credentials store instead of your code.' },
];

function loadDone() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function LearningPath() {
  const [done, setDone] = useState(loadDone);
  const [openId, setOpenId] = useState(() => (LESSONS.find((l) => !done.includes(l.id)) ?? LESSONS[0]).id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {
      /* storage unavailable, ignore */
    }
  }, [done]);

  const percent = Math.round((done.length / LESSONS.length) * 100);

  function toggleDone(id) {
    setDone((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  }

  async function copy(code) {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable, ignore */
    }
  }

  return (
    <section id="learning-path" aria-labelledby="path-title">
      <div className="path-head">
        <h2 id="path-title">Your Jenkins learning path</h2>
        <span className="path-count">{done.length} of {LESSONS.length} done · {percent}%</span>
      </div>
      <div className="progress" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${percent}%` }} />
      </div>
      <ol className="lessons">
        {LESSONS.map((lesson, i) => {
          const isDone = done.includes(lesson.id);
          const isOpen = openId === lesson.id;
          return (
            <li key={lesson.id} className={`lesson${isDone ? ' is-done' : ''}${isOpen ? ' is-open' : ''}`}>
              <button className="lesson-head" onClick={() => setOpenId(isOpen ? null : lesson.id)} aria-expanded={isOpen}>
                <span className="lesson-mark">{isDone ? <Icon name="check" /> : i + 1}</span>
                <span className="lesson-title">{lesson.title}</span>
                <span className="lesson-time"><Icon name="clock" /> {lesson.minutes} min</span>
                <Icon name="chevron" />
              </button>
              {isOpen && (
                <div className="lesson-body">
                  <p>{lesson.text}</p>
                  {lesson.code && (
                    <div className="code">
                      <button className="btn btn-ghost copy" onClick={() => copy(lesson.code)}>
                        <Icon name="copy" /> {copied ? 'Copied!' : 'Copy'}
                      </button>
                      <pre><code>{lesson.code}</code></pre>
                    </div>
                  )}
                  <button className={`btn ${isDone ? 'btn-secondary' : 'btn-primary'}`} onClick={() => toggleDone(lesson.id)}>
                    <Icon name="check" /> {isDone ? 'Mark as not done' : 'Mark as done'}
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default LearningPath;
