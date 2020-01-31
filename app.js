
let alaskas = 0;
let aps = 0; // Alaskas per Second form auto clickers
let apc = 1; // alaskas per click form modifiers


let avalibleUpgrades = {
  moose: {
    name: 'Moose',
    type: 'clickModifier',
    effect: 1,
    baseCost: 15,
    cost: 15
  },
  bear: {
    name: 'bear',
    type: 'clickModifier',
    effect: 5,
    baseCost: 100,
    cost: 100
  },
  floatPlane: {
    name: 'Float Plane',
    type: 'autoClicker',
    effect: 1,
    baseCost: 30,
    cost: 30
  },
  village: {
    name: 'Village',
    type: 'autoClicker',
    effect: 5,
    baseCost: 50,
    cost: 50
  }
}

let obtainedUpgrades = {
  moose: 0,
  bear: 0,
  floatPlane: 0,
  village: 0
}

function buyUpgrade(upgradeType) {
  let upgrade = avalibleUpgrades[upgradeType]
  if (upgrade.baseCost > alaskas) {
    return
  }
  obtainedUpgrades[upgradeType]++
  alaskas -= upgrade.cost
  upgrade.cost = Math.floor(upgrade.baseCost * (obtainedUpgrades[upgradeType] * .05 + 1));
  if (upgrade.type == 'clickModifier') {

    apc += upgrade.effect;
  };
  drawAll()
}


function clickFlag() {
  alaskas += apc;
  drawCount();
}

function drawCount() {
  document.getElementById('cookieCount').textContent = alaskas.toString();
  upgradeSpans.aps.textContent = aps.toString()
}

let upgradeSpans = {
  moose: document.getElementById('Moose'),
  bear: document.getElementById('Bear'),
  floatPlanes: document.getElementById('Float Planes'),
  villages: document.getElementById('villages'),
  aps: document.getElementById('aps'),
  apc: document.getElementById('apc'),

}

function drawUpgrades() {
  upgradeSpans.moose.textContent = obtainedUpgrades.moose.toString();
  upgradeSpans.bear.textContent = obtainedUpgrades.bear.toString();
  upgradeSpans.floatPlanes.textContent = obtainedUpgrades.floatPlane.toString();
  upgradeSpans.villages.textContent = obtainedUpgrades.village.toString();
  upgradeSpans.apc.textContent = apc.toString()
  upgradeSpans.aps.textContent = aps.toString()

}

function drawAll() {
  drawUpgrades()
  drawCount()
}

let lastCookies = 0;
function addPerSecond() {
  for (const [key, value] of Object.entries(obtainedUpgrades)) {
    let upgrade = avalibleUpgrades[key]
    if (upgrade.type == 'autoClicker') {
      alaskas += upgrade.effect * value;
    }
  }
  aps = alaskas - lastCookies;
  lastCookies = alaskas

  drawCount()
}

setInterval(addPerSecond, 1000);