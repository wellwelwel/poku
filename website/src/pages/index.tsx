import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {
  Album,
  DatabaseZap,
  Github,
  Heart,
  HeartHandshake,
  Notebook,
  PiggyBank,
  Plus,
} from 'lucide-react';
import { ReactTyped } from 'react-typed';
import { ConfettiButton } from '@site/src/components/Confetti';
import Bun from '@site/static/img/bun.svg';
import Deno from '@site/static/img/deno.svg';
import Junior from '@site/static/img/junior.svg';
import Maintainer from '@site/static/img/maintainer.svg';
import MidLevel from '@site/static/img/mid-level.svg';
import NodeJS from '@site/static/img/node-js.svg';
import NPM from '@site/static/img/npm.svg';
import Senior from '@site/static/img/senior.svg';
import Silhouette from '@site/static/img/silhouette-darker.svg';
import SilhouetteOriginal from '@site/static/img/silhouette.svg';
import TypeScript from '@site/static/img/typescript.svg';

import '@site/src/css/home.scss';
import '@site/src/css/features.scss';

const Home = () => {
  const shuffleArray = (array: string[]): string[] => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  return (
    <>
      <Head>
        <title>Poku - Making Testing Easy</title>
      </Head>
      <main id='home'>
        <div className='container'>
          <header>
            <menu>
              <Link to='/'>
                <SilhouetteOriginal />
              </Link>
            </menu>
            <menu>
              <Link
                aria-label={"Poku's Documentation"}
                to='/docs/category/documentation'
              >
                Docs
              </Link>
              <Link
                className='hide-mobile'
                aria-label={"Poku's Examples"}
                to='/docs/category/examples'
              >
                Examples
              </Link>
              <Link
                aria-label={"Poku's GitHub"}
                to='https://github.com/wellwelwel/poku'
              >
                <Github width={18} height={18} />
              </Link>
              <Link
                aria-label={"Poku's NPM"}
                to='https://www.npmjs.com/package/poku'
              >
                <NPM width={36} height={36} />
              </Link>
              <Link
                aria-label={"Sponsor Poku's Author"}
                to='https://github.com/sponsors/wellwelwel'
              >
                <Heart width={18} height={18} />
              </Link>
            </menu>
          </header>
          <div id='this-is-poku'>
            <Heading as='h1'>
              <span className='static'>Poku makes testing </span>
              <ReactTyped
                strings={shuffleArray(['easy', 'faster', 'simple'])}
                typeSpeed={50}
                backSpeed={20}
                backDelay={2500}
                loop
                cursorChar=''
                className='typing'
              />
              .
            </Heading>
            <div>
              <Link to='/docs'>
                Start Here
                <Album />
              </Link>
              <small>
                <span>
                  <strong>Poku</strong> is and always will be{' '}
                  <strong>free</strong> and <strong>open-source</strong>
                </span>
                <HeartHandshake />
              </small>
            </div>

            <Heading as='h2'>🐷 What's Poku?</Heading>
            <p>
              A cross-platform test runner that{' '}
              <Link to='/docs/philosophy#javascript-essence-for-tests-'>
                brings the <strong>JavaScript</strong> essence back to testing
              </Link>
              .
            </p>

            <Heading as='h2'>⚡️ Quick Tutorials</Heading>
            <nav>
              <section>
                <Heading as='h2' className='float'>
                  <span>
                    Beginner <em>(aka Junior)</em>
                  </span>
                  <Junior />
                </Heading>
                <div>
                  <p>
                    Install <strong>Poku</strong>, learn what{' '}
                    <strong>assertions</strong> are, and run your first tests
                    using <code>npx poku</code>.
                  </p>
                </div>
                <Link to='/docs/tutorials/beginner'>
                  <Notebook /> Beginner Assertion Tutorial
                </Link>
              </section>
              <section>
                <Heading as='h2' className='float'>
                  <span>Mid Level</span>
                  <MidLevel />
                </Heading>
                <div>
                  <p>
                    Organize your tests using <strong>test</strong>,{' '}
                    <strong>describe</strong>, and/or <strong>it</strong> and
                    see how simple it is to create <em>TDD</em> and <em>BDD</em>{' '}
                    approaches with <strong>Poku</strong>.
                  </p>
                </div>
                <Link to='/docs/tutorials/good-practices'>
                  <Notebook /> Organizing Tests and Good Practices
                </Link>
              </section>
              <section>
                <Heading as='h2' className='float'>
                  <span>
                    Expert <em>(aka Senior)</em>
                  </span>
                  <Senior />
                </Heading>
                <div>
                  <p>
                    See how simple it's to handle your <em>APIs</em>, servers,
                    services, ports, processes, and even containers in the
                    background, plus mocks, coverage and <em>end-to-end</em>{' '}
                    tests.
                  </p>
                </div>
                <Link>
                  <Notebook /> (Soon) Tutorial on Handling Processes and
                  Services
                </Link>
              </section>
              <section>
                <Heading as='h2' className='float'>
                  <span>
                    Library <em>/</em> Package Maintainer
                  </span>
                  <Maintainer />
                </Heading>
                <div>
                  <p>
                    Run the exact same test suite for <strong>Node.js</strong>,{' '}
                    <strong>Bun</strong>, and <strong>Deno</strong> (including
                    different versions) to ensure that your package is
                    compatible with the platforms you want.
                  </p>
                </div>
                <Link to='/docs/tutorials/cross-platform'>
                  <Notebook /> Testing Across Platforms
                </Link>
              </section>
            </nav>

            <Heading as='h2'>👥 Who uses Poku?</Heading>
            <nav>
              <section>
                <Heading as='h3'>
                  <span>
                    MySQL2 <em>(node-mysql2)</em>
                  </span>
                  <DatabaseZap
                    width={65}
                    height={65}
                    stroke='rgb(45, 62, 95)'
                  />
                </Heading>
                <div>
                  <p>
                    <strong>Poku</strong> has the great pleasure of running the{' '}
                    <Link to='https://github.com/sidorares/node-mysql2'>
                      <strong>MySQL2</strong>
                    </Link>{' '}
                    test suite, the first open-source project to adopt{' '}
                    <strong>Poku</strong> <Heart />
                  </p>
                  <p>
                    <Link to='https://github.com/sidorares/node-mysql2'>
                      <strong>MySQL2</strong>
                    </Link>{' '}
                    aims for compatibility for both <strong>Node.js</strong>,{' '}
                    <strong>Bun</strong>, and <strong>Deno</strong>, as well as
                    having tests at the same time in <strong>CommonJS</strong>{' '}
                    and <strong>ES Modules</strong>, plus requiring different
                    versions of all platforms.
                  </p>
                </div>
              </section>
              <section>
                <Heading as='h3'>
                  <span>
                    Poku <em>(why not?)</em>
                  </span>
                  <Silhouette />
                </Heading>
                <div>
                  <p>
                    After all,{' '}
                    <strong>
                      <Link to='https://github.com/wellwelwel/poku'>Poku</Link>
                    </strong>{' '}
                    uses itself to test itself <PiggyBank />
                  </p>
                  <p>
                    The tests are run with <strong>TypeScript</strong> without
                    the need for compilation.
                  </p>
                  <p>
                    It's intended to be fully compatible from{' '}
                    <strong>Node.js</strong> <code>v16.x</code>,{' '}
                    <strong>Deno</strong> <code>v1.x</code>, and{' '}
                    <strong>Bun</strong> <code>v1.x</code> onwards.
                  </p>
                </div>
              </section>
            </nav>
            <Heading as='h2'>
              ⬇️ You Can <span className='feat'>Be Next</span>
            </Heading>
            <menu>
              <section>
                <Heading as='h3' title='Installing Poku with Node.js'>
                  <NodeJS aria-label="Node.js's Logo" />
                </Heading>
                <div className='custom-code-block'>
                  <ConfettiButton toCopy='npm i -D poku' />
                </div>
              </section>
              <section>
                <Heading
                  as='h3'
                  title='Installing Poku with Node.js + TypeScript'
                >
                  <NodeJS aria-label="Node.js's Logo" />
                  <Plus stroke='#435a8a96' />
                  <TypeScript aria-label="TypeScript's Logo" />
                </Heading>
                <div className='custom-code-block'>
                  <ConfettiButton toCopy='npm i -D poku tsx' />
                </div>
              </section>
              <section>
                <Heading as='h3' title='Installing Poku with Bun'>
                  <Bun aria-label="Bun's Logo" />
                </Heading>
                <div className='custom-code-block'>
                  <ConfettiButton toCopy='bun add -d poku' />
                </div>
              </section>
              <section>
                <Heading as='h3' title='Installing Poku with Deno'>
                  <Deno aria-label="Deno's Logo" />
                </Heading>
                <div className='custom-code-block'>
                  <ConfettiButton toCopy='deno add npm:poku' />
                </div>
              </section>
            </menu>
          </div>
          <footer>
            <Heading as='h4'>
              <span>
                Support Poku by giving it a star on{' '}
                <Link to='https://github.com/wellwelwel/poku'>GitHub</Link>
              </span>
              <Heart />
            </Heading>
            <p>
              <strong>Poku</strong> is under the{' '}
              <Link to='https://github.com/wellwelwel/poku/blob/main/LICENSE'>
                MIT License
              </Link>
              .
            </p>
            <p>
              Copyright © 2024-present{' '}
              <Link to='https://github.com/wellwelwel'>Weslley Araújo</Link> and{' '}
              <strong>Poku</strong>{' '}
              <Link to='https://github.com/wellwelwel/poku/graphs/contributors'>
                contributors
              </Link>
              .
            </p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default Home;
