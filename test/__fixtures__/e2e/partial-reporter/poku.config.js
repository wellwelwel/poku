export default {
  reporter: () => ({
    onRunStart() {},
    onFileStart() {},
    onFileResult({ status }) {
      console.log(`partial reporter file ${status ? 'passed' : 'failed'}`);
    },
    onRunResult() {},
    onExit({ results }) {
      console.log(`partial reporter exit with ${results.passed} passed`);
    },
  }),
};
