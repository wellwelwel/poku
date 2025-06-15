declare const Deno: {
  version: {
    deno: string;
  };
};

declare const Bun: {
  version: string;
};

declare module 'istanbul-lib-report';
declare module 'istanbul-reports';
declare module 'c8/lib/report.js' {
  const createReporter: any;
  export default createReporter;
}