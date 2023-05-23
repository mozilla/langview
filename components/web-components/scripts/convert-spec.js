const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Set the path to the directory containing the YAML files
const yamlDirPath = path.join(__dirname, '../..');

// Set the path to the directory where the JSON files will be saved
const jsonDirPath = path.join(__dirname, '../spec');

// Read the directory containing the YAML files
fs.readdir(yamlDirPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  // Loop through each file in the directory
  files.forEach((file) => {
    // Check if the file is a YAML file
    if (path.extname(file) === '.yaml') {
      // Read the contents of the YAML file
      const yamlFilePath = path.join(yamlDirPath, file);
      const yamlContents = fs.readFileSync(yamlFilePath, 'utf8');

      // Convert the YAML contents to a JavaScript object
      const obj = yaml.load(yamlContents);

      // Write the JavaScript object to a JSON file
      const jsonFilePath = path.join(jsonDirPath, path.basename(file, '.yaml') + '.json');
      fs.writeFileSync(jsonFilePath, JSON.stringify(obj));
    }
  });
});