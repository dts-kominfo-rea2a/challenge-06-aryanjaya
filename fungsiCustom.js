// TODO: import module bila dibutuhkan di sini
const fs = require('fs');

// ! JANGAN DIMODIFIKASI
let file1 = "./data1.json";
let file2 = "./data2.json";
let file3 = "./data3.json";

// ! JANGAN DIMODIFIKASI
let modifyFile1 = (val) => {
  file1 = val;
};
let modifyFile2 = (val) => {
  file2 = val;
};
let modifyFile3 = (val) => {
  file3 = val;
};

// TODO: Kerjakan bacaData
// gunakan variabel file1, file2, dan file3
const bacaData = async (callback) => {
  const messages = [];
  const error = [];
  const files = [file1, file2, file3];
  let counter = files.length;

  files.forEach((file, index) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        error[index]    = err;
        messages[index] = null;
      } else {
        messages[index] = findMessage(JSON.parse(data));
      }

      --counter;

      if (! counter) {
        callback(
          error.length ? error : null,
          messages
        );
      }
    });
  });
};

const findMessage = (data) =>{
  if (Array.isArray(data)) {
    return findMessage(data[0]);
  }

  if (data.hasOwnProperty('message')) {
    return data.message.split(' ')[1];
  }

  if (data.hasOwnProperty('data')) {
    return findMessage(data.data);
  }

  return null;
}

// ! JANGAN DIMODIFIKASI
module.exports = {
  modifyFile1,
  modifyFile2,
  modifyFile3,
  bacaData,
};
