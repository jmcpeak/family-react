export const arrayConverter = data => {
  let data_out = [];

  if (!data) return data_out;

  for (let i = 0; i < data.length; i++) {
    data_out.push(objectConverter(data[i]));
  }

  return data_out;
};

export const convertFromJson = data => {
  let data_out = {};

  if (!data) return data_out;

  Object.keys(data).forEach(key => {
    let subObj = {},
      val = data[key];

    if (!(typeof val === 'undefined' || (!val && typeof val !== 'boolean'))) {
      subObj = null;
    }

    if (typeof val === 'boolean') subObj = { BOOL: val };
    else if (typeof val === 'string') {
      let value = val.toString();
      subObj = value === '' ? { NULL: true } : { S: value };
    } else if (typeof val === 'number') subObj = { N: val.toString() };
    else if (typeof val === 'object') {
      if (Array.isArray(val) && val.length >= 1) {
        let subObjKey = null;

        subObj = {};

        if (typeof val[0] === 'boolean') subObjKey = 'BS';
        else if (typeof val[0] === 'string') subObjKey = 'SS';
        else if (typeof val[0] === 'number') subObjKey = 'NS';

        if (!!subObjKey) {
          let subObjArr = [];
          for (let i = 0; i < val.length; i++) {
            subObjArr.push(val[i].toString());
          }
          subObj[subObjKey] = subObjArr;
        }
      }
    } else subObj = null;

    if (!!subObj) data_out[key] = subObj;
  });

  return data_out;
};

export const objectConverter = data => {
  let data_out = {};

  if (!data) return data_out;

  Object.keys(data).forEach(key => {
    let val = data[key];

    if (!!val.S) data_out[key] = val.S;
    else if (!!val.N) data_out[key] = parseInt(val.N, 10);
    else if (!!val.BOOL) data_out[key] = val.BOOL;
    else if (!!val.SS) data_out[key] = val.SS;
    else if (!!val.NS) {
      let val_arr = [];
      for (let j = 0; j < val.NS.length; j++)
        val_arr.push(parseInt(val.NS[j], 10));

      data_out[key] = val_arr;
    } else if (!!val.BS) {
      let val_arr2 = [];
      for (let jj = 0; jj < val.BS.length; jj++)
        val_arr2.push(val.BS[jj].toLowerCase() === 'true');
      data_out[key] = val_arr2;
    }
  });

  return data_out;
};
