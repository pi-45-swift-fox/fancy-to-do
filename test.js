const sandbox = require('./sanbox.js');


(async () => {
  try
  {
    const test = await sandbox("ramagtdeh@gmail.com");
    console.log(test)
  }
  catch (err)
  {
    console.log(err)
  }
})();
