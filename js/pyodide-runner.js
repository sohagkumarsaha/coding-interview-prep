// PyRunner: thin wrapper around Pyodide for running arbitrary Python in-browser
// and for evaluating a list of {call, expected} test assertions against
// whatever the submitted code defines. No backend involved — everything
// executes locally in WebAssembly.
const PyRunner = (function () {
  const PYODIDE_INDEX_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/";
  let pyodide = null;
  let loadingPromise = null;
  const statusListeners = [];

  function onStatus(cb) {
    statusListeners.push(cb);
  }
  function emitStatus(state) {
    statusListeners.forEach((cb) => cb(state));
  }

  function load() {
    if (loadingPromise) return loadingPromise;
    emitStatus("loading");
    loadingPromise = new Promise((resolve, reject) => {
      if (typeof loadPyodide === "undefined") {
        emitStatus("error");
        reject(new Error("Pyodide script did not load from the CDN."));
        return;
      }
      loadPyodide({ indexURL: PYODIDE_INDEX_URL })
        .then((py) => {
          pyodide = py;
          emitStatus("ready");
          resolve(py);
        })
        .catch((err) => {
          emitStatus("error");
          reject(err);
        });
    });
    return loadingPromise;
  }

  // Run arbitrary code, return captured stdout/stderr as a single string.
  async function run(code) {
    await load();
    const wrapped = [
      "import io, sys, traceback",
      "_optimus_buf = io.StringIO()",
      "_optimus_old_out, _optimus_old_err = sys.stdout, sys.stderr",
      "sys.stdout = _optimus_buf",
      "sys.stderr = _optimus_buf",
      "try:",
      "    exec(compile(" + JSON.stringify(code) + ", '<cell>', 'exec'), {})",
      "except Exception:",
      "    traceback.print_exc()",
      "finally:",
      "    sys.stdout, sys.stderr = _optimus_old_out, _optimus_old_err",
      "_optimus_buf.getvalue()",
    ].join("\n");
    return await pyodide.runPythonAsync(wrapped);
  }

  // Run code, then evaluate a list of {call, expected} assertions against
  // the resulting global namespace. expected is compared against repr(actual).
  async function runWithTests(code, tests) {
    await load();
    const testsJson = JSON.stringify(tests || []);
    const wrapped = [
      "import io, sys, json, traceback",
      "_optimus_buf = io.StringIO()",
      "_optimus_old_out, _optimus_old_err = sys.stdout, sys.stderr",
      "sys.stdout = _optimus_buf",
      "sys.stderr = _optimus_buf",
      "_optimus_globals = {}",
      "_optimus_results = []",
      "_optimus_tests = json.loads(" + JSON.stringify(testsJson) + ")",
      "try:",
      "    exec(compile(" + JSON.stringify(code) + ", '<cell>', 'exec'), _optimus_globals)",
      "    for _optimus_i, _optimus_t in enumerate(_optimus_tests):",
      "        try:",
      "            _optimus_val = eval(_optimus_t['call'], _optimus_globals)",
      "            _optimus_actual = repr(_optimus_val)",
      "            _optimus_results.append({'index': _optimus_i, 'passed': _optimus_actual == _optimus_t['expected'], 'actual': _optimus_actual, 'error': None})",
      "        except Exception as _optimus_e:",
      "            _optimus_results.append({'index': _optimus_i, 'passed': False, 'actual': None, 'error': str(_optimus_e)})",
      "except Exception:",
      "    traceback.print_exc()",
      "finally:",
      "    sys.stdout, sys.stderr = _optimus_old_out, _optimus_old_err",
      "json.dumps({'output': _optimus_buf.getvalue(), 'results': _optimus_results})",
    ].join("\n");
    const resultJson = await pyodide.runPythonAsync(wrapped);
    return JSON.parse(resultJson);
  }

  return { load, run, runWithTests, onStatus };
})();
