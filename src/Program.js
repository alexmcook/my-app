var flatES = [new tier (0, 0, 0), new tier(136, 145, 75), new tier(107, 135, 69),
              new tier(73, 106, 60), new tier(49, 72, 51), new tier(30, 48, 43),
              new tier(20, 29, 35),  new tier(16, 19, 29), new tier(13, 15, 23),
              new tier(9, 12, 17), new tier(6, 8, 11), new tier(3, 5, 3)];

var percentES = [new tier (0, 0, 0), new tier(121, 132, 84), new tier(101, 120, 72),
                 new tier(83, 100, 60), new tier(65, 82, 44), new tier(47, 64, 30),
                 new tier(29, 46, 18), new tier(11, 28, 3)];

var hybridES = [new tier (0, 0, 0), new tier(51, 56, 78), new tier(42, 50, 60),
                new tier(33, 41, 44), new tier(24, 32, 30), new tier(15, 23, 18),
                new tier(6, 14, 3)];

var hybridBlock = [new tier (0, 0, 0), new tier(16, 17, 78), new tier(14, 15, 60),
                   new tier(12, 13, 44), new tier(10, 11, 30), new tier(8, 9, 18),
                   new tier(6, 7, 3)];

var percentBlock = [new tier (0, 0, 0), new tier(26, 28, 79), new tier(23, 25, 56),
                    new tier(20, 22, 42), new tier(17, 19, 28), new tier(14, 16, 17),
                    new tier(11, 13, 1)];

function tier(min, max, lvl) {
  this.min = min;
  this.max = max;
  this.lvl = lvl;
}

function pair(a, b) {
  this.a = a;
  this.b = b;
}

function itemTiers(baseES, percentESTier, hybridESTier, flatESTier, blockTier, minES, maxES) {
  this.baseES = baseES;
  this.percentESTier = percentESTier;
  this.hybridESTier = hybridESTier;
  this.flatESTier = flatESTier;
  this.blockTier = blockTier;
  this.minES = minES;
  this.maxES = maxES;
}

function calcBlock(itemBlock, iLvl) {
  let output = [];
  for (let i = 0; i < percentBlock.length; i++) {
    for (let j = 0; j < hybridBlock.length; j++) {
      if ((itemBlock >= percentBlock[i].min + hybridBlock[j].min) &&
          (itemBlock <= percentBlock[i].max + hybridBlock[j].max) &&
          percentBlock[i].lvl <= iLvl &&
          hybridBlock[j].lvl <= iLvl) {
        output.push(new pair(j, i));
      }
    }
  }
  return output;
}

function calcPercentES(itemPercentES, iLvl) {
  let output = [];
  for (let i = 0; i < percentES.length; i++) {
    for (let j = 0; j < hybridES.length; j++) {
      if ((itemPercentES >= percentES[i].min + hybridES[j].min) &&
          (itemPercentES <= percentES[i].max + hybridES[j].max) &&
          percentES[i].lvl <= iLvl &&
          hybridES[j].lvl <= iLvl) {
        output.push(new pair(i, j));
      }
    }
  }
  return output;
}

function calcFlatES(itemFlatES, iLvl) {
  let output = [];
  for (let i = 0; i < flatES.length; i++) {
    if (itemFlatES >= flatES[i].min &&
       itemFlatES <= flatES[i].max &&
       flatES[i].lvl <= iLvl) {
      output.push(i);
    }
  }
  return output;
}

function calcAll(item) {
  let percentESTiers = calcPercentES(item.percentES, item.iLvl);
  let hybridESTiers = calcBlock(item.percentBlock, item.iLvl);
  let flatESTiers = calcFlatES(item.flatES, item.iLvl);
  let items = [];

  for (let i = 0; i < percentESTiers.length; i++) {
    for (let j = 0; j < hybridESTiers.length; j++) {
      if (hybridESTiers[j].a === percentESTiers[i].b) {
        items.push(new itemTiers(item.baseES,
                                 percentESTiers[i].a,
                                 hybridESTiers[j].a,
                                 flatESTiers[0],
                                 hybridESTiers[j].b,
                                 Math.round(((percentES[percentESTiers[i].a].min +
                                   hybridES[hybridESTiers[j].a].min +
                                   120) / 100) * (parseInt(item.baseES, 10) + flatES[flatESTiers[0]].min)),
                                 Math.round(((percentES[percentESTiers[i].a].max +
                                   hybridES[hybridESTiers[j].a].max +
                                   120) / 100) * (parseInt(item.baseES, 10) + flatES[flatESTiers[0]].max))
                                 ));
      }
    }
  }
  return items;
}

var testItem = {
  baseES: null,
  percentES: null,
  flatES: null,
  percentBlock: null,
  iLvl: null,
  setValues: function(baseES, percentES, flatES, percentBlock, iLvl) {
    this.baseES = baseES;
    this.percentES = percentES;
    this.flatES = flatES;
    this.percentBlock = percentBlock;
    this.iLvl = iLvl;
  }
}

export function display(baseES, percentES, flatES, percentBlock, iLvl) {
  testItem.setValues(baseES, percentES, flatES, percentBlock, iLvl);
  let items = [];
  if (testItem.percentES != null && testItem.flatES != null &&
      testItem.percentBlock != null && testItem.iLvl != null) {
    items = calcAll(testItem);
  }
  return items;
}
