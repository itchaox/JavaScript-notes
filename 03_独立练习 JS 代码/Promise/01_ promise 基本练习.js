const promise = new Promise((resolve, reject) => {
  let a = 1;
  if (a === 1) {
    return resolve(a);
    console.log("后续代码");
  } else {
    reject(a);
  }
});

promise.then(
  res => {
    console.log(res);
    console.log(2131);
  },
  err => {
    console.log(err);
  }
);
