const path = require('node:path');
const fs = require('node:fs/promises');
const { EOL } = require('node:os');

const problemHandler = (caller, callback, filenames = ['test', 'data']) => {

  const getData = (dayName, filename) => {
    const filePath = path.join(__dirname, '..', dayName, `${filename}.txt`)
    return fs.readFile(filePath, 'utf8')
    .then(s => s.split(EOL))
    .then(d => removeTerminalReturn(d))
  }

  const removeTerminalReturn = (d) => {
    if(d.length === 0) return d;
    if (d[d.length - 1] === '') d.pop()
    return d;
  }

  const run = (caller, callback, filenames) => {
    console.log('caller',caller)
    const splitName = caller.split(path.sep);
    const dayName = splitName[splitName.length - 2]

    //TODO: Grab dayName here instead of passing it in
    console.log(`----- ${dayName} -----`)
    for (const filename of filenames) {
      getData(dayName, filename).then(data => {
        const results = callback(data)
        console.log(filename, results)
      })
    }
  }

  return run(caller, callback, filenames)
}

module.exports = problemHandler
