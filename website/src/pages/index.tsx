import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Heading from '@theme/Heading';
import { ReactTyped } from 'react-typed';
import { ConfettiButton } from '@site/src/components/Confetti';
import { Album, Github, Heart } from 'lucide-react';
import Junior from '@site/static/img/junior.svg';
import MidLevel from '@site/static/img/mid-level.svg';
import Senior from '@site/static/img/senior.svg';
import Maintainer from '@site/static/img/maintainer.svg';
import MySQL from '@site/static/img/mysql.svg';
import Silhouette from '@site/static/img/silhouette-darker.svg';
import SilhouetteOriginal from '@site/static/img/silhouette.svg';
import NPM from '@site/static/img/npm.svg';

// Asserts
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
              <small>
                <strong>Poku</strong> is and always will be{' '}
                <strong>free</strong> and <strong>open-source</strong>.
              </small>
              <Link to='/docs#quickstart'>
                Start Here
                <Album />
              </Link>
            </div>
            <nav>
              <section>
                <Heading as='h2'>
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
                <Link to='/docs/roadmaps/beginner'>
                  Beginner Assertion Tutorial 🧑🏻‍🎓
                </Link>
              </section>
              <section>
                <Heading as='h2'>
                  Mid Level
                  <MidLevel />
                </Heading>
                <div>
                  <p>
                    Organize your tests using <strong>test</strong>,{' '}
                    <strong>describe</strong>, and/or <strong>it</strong>.
                  </p>
                </div>
                <Link to='/docs/roadmaps/mid-level'>
                  Tutorial on How to Organize Your Tests 🧙🏻
                </Link>
              </section>
              <section>
                <Heading as='h2'>
                  <span>
                    Package <em>/</em> Library Maintainer
                  </span>
                  <Maintainer />
                </Heading>
                <div>
                  <p>
                    Since <strong>Poku</strong> bings the{' '}
                    <Link to='/docs/philosophy#javascript-essence-for-tests-'>
                      native <strong>JavaScript</strong> syntax for testing
                    </Link>
                    , it's possible to run the same test suite for{' '}
                    <strong>Node.js</strong>, <strong>Bun</strong>, and{' '}
                    <strong>Deno</strong> to ensure that your package is
                    compatible with the necessary platforms.
                  </p>
                </div>
                <Link>(Soon) Cross-Platform Tutorial 🔧</Link>
              </section>
              <section>
                <Heading as='h2'>
                  <span>
                    Expert <em>(aka Senior)</em>
                  </span>
                  <Senior />
                </Heading>
                <div>
                  <p>
                    Feel right at home and see how simple it is to create{' '}
                    <em>TDD</em> and <em>BDD</em> approaches with{' '}
                    <strong>Poku</strong>, plus mocks with <strong>Poku</strong>{' '}
                    +{' '}
                    <Link to='https://github.com/testdouble/quibble'>
                      <strong>quibble</strong>
                    </Link>{' '}
                    and how to start your <em>APIs</em>, servers, services, and
                    containers in the background ☕️
                  </p>
                </div>
                <Link>
                  (Soon) Tutorial on Handling Processes and Services 🔬
                </Link>
              </section>
            </nav>

            <Heading as='h2'>Who uses Poku?</Heading>
            <nav>
              <section>
                <Heading as='h3'>
                  <span>
                    MySQL2 <em>(node-mysql2)</em>
                  </span>
                  <MySQL />
                </Heading>
                <div>
                  <p>
                    <strong>Poku</strong> has the great pleasure of running the{' '}
                    <Link to='https://github.com/sidorares/node-mysql2'>
                      <strong>MySQL2</strong>
                    </Link>{' '}
                    test suite, the first open-source project to adopt{' '}
                    <strong>Poku</strong> 💙
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
                  <p>
                    <Link to='https://github.com/sidorares/node-mysql2'>
                      <img
                        src='https://img.shields.io/github/stars/sidorares/node-mysql2?style=social'
                        alt='MySQL2 Stars'
                      />
                    </Link>{' '}
                    <Link to='https://www.npmjs.com/package/mysql2'>
                      <img
                        src='https://img.shields.io/npm/dm/mysql2?style=social'
                        alt='NPM Downloads'
                      />
                    </Link>
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
                    <strong>Poku</strong> uses itself to test itself 🐷
                  </p>
                  <p>
                    The tests guarantee 100% coverage whenever possible and are
                    run with <strong>TypeScript</strong> without the need for
                    compilation.
                  </p>
                  <p>
                    <strong>Poku</strong> is intended to be fully compatible
                    from <strong>Node.js</strong> <code>v8.10.0</code> onwards
                    (although it is fully tested from <strong>Node.js</strong>{' '}
                    <code>v6.x.x</code> onwards), <strong>Deno</strong>{' '}
                    <code>v1.x.x</code>, and <strong>Bun</strong>{' '}
                    <code>v1.x.x</code>.
                  </p>
                </div>
              </section>
            </nav>
            <Heading as='h2'>
              And who knows? <span className='feat'>You could be next</span> ⬇️
            </Heading>
            <menu>
              <section>
                <Heading as='h3'>Node.js</Heading>
                <div className='custom-code-block'>
                  <ConfettiButton toCopy='npm i -D poku' />
                </div>
              </section>
              <section>
                <Heading as='h3'>Node.js + TypesScript</Heading>
                <div className='custom-code-block'>
                  <ConfettiButton toCopy='npm i -D poku tsx' />
                </div>
              </section>
              <section>
                <Heading as='h3'>Bun</Heading>
                <div className='custom-code-block'>
                  <ConfettiButton toCopy='bun add -d poku' />
                </div>
              </section>
              <section>
                <Heading as='h3'>Deno</Heading>
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
