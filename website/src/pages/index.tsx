import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Copy, Github, Heart, Package2 } from 'lucide-react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
// eslint-disable-next-line import/no-unresolved
import Heading from '@theme/Heading';

// Asserts
import '@site/src/css/home.scss';
import '@site/src/css/features.scss';
import Logo from '@site/static/img/favicon.svg';
import Success from '@site/static/img/success.svg';
import Silhouette from '@site/static/img/silhouette-light.svg';
import NPM from '@site/static/img/npm.svg';
import Docs from '@site/static/img/open.svg';

const Home = () => {
  const [size, setSize] = useState<null | string>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied');
    } catch (error) {
      toast.error("Couldn't Copy", {
        description: error instanceof Error ? error.message : undefined,
      });
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      setSize('0.0 KB');
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch('/assets/json/size.json', { signal })
      .then((response) => response.json())
      .then((data: { size: number }) => {
        if (signal.aborted) return;

        setSize(`${(data.size / 1024).toFixed(1)} KB`);
        setTimeout(() => {
          toast.success('All tests passed.', {
            description: (
              <>
                Exited with code <strong>0</strong>
              </>
            ),
            className: 'poku-runned',
          });
        }, 1250);
      })
      .catch((error) => {
        if (signal.aborted) return;

        setTimeout(() => {
          toast.error('Some tests failed.', {
            description: (
              <>
                <p>{error.message}</p>
                <span>
                  Exited with code <strong>1</strong>
                </span>
              </>
            ),
          });
        }, 1250);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Poku - Your Test Runner Pet</title>
      </Head>
      <main id='home'>
        <Toaster richColors position='top-right' />
        <div className='container'>
          <div id='this-is-poku'>
            <Heading as='h1'>
              Poku <span className='sm'>is your</span>
              <br />
              <span className='lg'>Test Runner</span>
              <br />
              <span className='md'>Pet</span> <Silhouette className='logo' />
            </Heading>
            <section>
              <div className='content'>
                <Logo className='logo' />
                <div className='features'>
                  <p>
                    <Success />
                    <Link to='https://github.com/nodejs/node'>
                      Node.js
                      <small>6 +</small>
                    </Link>
                  </p>
                  <p>
                    <Success />
                    <Link to='https://github.com/oven-sh/bun'>
                      Bun
                      <small>0.5.3 +</small>
                    </Link>
                  </p>
                  <p>
                    <Success />
                    <Link to='https://github.com/denoland/deno'>
                      Deno
                      <small>1.3.0 +</small>
                    </Link>
                  </p>
                  <p>
                    <Success />
                    <span>
                      <strong>Sequential</strong> and <strong>Parallel</strong>{' '}
                      runs
                    </span>
                  </p>
                  <p>
                    <Success />
                    <span>
                      No need to compile{' '}
                      <Link to='https://github.com/microsoft/TypeScript'>
                        <strong>TypeScript</strong>
                      </Link>{' '}
                      *
                    </span>
                  </p>
                  <p>
                    <Success />
                    <span>
                      Compatible with <strong>Coverage</strong> tools
                    </span>
                  </p>
                  <p>
                    <Success />
                    <span>
                      <strong>Human-friendly assertion</strong> errors
                    </span>
                  </p>
                  <p>
                    <Success />
                    <span>
                      Both <strong>CLI</strong> and <strong>API</strong>{' '}
                      <em>(in-code)</em> usage
                    </span>
                  </p>
                  <p>
                    <Success />
                    <span>
                      Support for <strong>ESM</strong> and <strong>CJS</strong>
                    </span>
                  </p>
                  <p>
                    <Success />
                    <span>
                      No configurations <em>(except you want)</em>
                    </span>{' '}
                  </p>
                  <p>
                    <Success />
                    <span>
                      <strong>Zero</strong> external dependencies
                    </span>
                  </p>
                  {size ? (
                    <p>
                      <Success />
                      <Link to='https://pkg-size.dev/poku' className='v-center'>
                        <Package2 height={15} />{' '}
                        <strong>Install Size: {size}</strong>
                      </Link>
                    </p>
                  ) : null}
                </div>
              </div>
              <footer>
                <small>
                  <Silhouette width={13} /> Let's make <code>describe</code>,{' '}
                  <code>beforeEach</code> and everything else easier 🚀
                </small>
                <div className='custom-code-block'>
                  npm i -D poku
                  <button onClick={() => copyToClipboard('npm i -D poku')}>
                    <Copy />
                  </button>
                </div>
                <Link aria-label={"Learn the Poku's Documentation"} to='/docs'>
                  Here's How to Start <Docs width={24} height={24} />
                </Link>
              </footer>
            </section>
            <small>
              <Link
                aria-label={"Poku's GitHub"}
                to='https://github.com/wellwelwel/poku'
              >
                <Github />
              </Link>
              <Link
                aria-label={"Poku's NPM"}
                to='https://www.npmjs.com/package/poku'
              >
                <NPM width={42} height={42} />
              </Link>
              <Link
                aria-label={"Sponsor Poku's Author"}
                to='https://github.com/sponsors/wellwelwel'
              >
                <Heart />
              </Link>
            </small>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
