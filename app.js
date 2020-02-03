
let alaskas = 0;
let aps = 0; // Alaskas per Second form auto clickers
let apc = 1; // alaskas per click form modifiers


let avalibleUpgrades = {
  moose: {
    name: 'Moose',
    type: 'clickModifier',
    effect: .1,
    baseCost: 15,
    cost: 15
  },
  bear: {
    name: 'bear',
    type: 'clickModifier',
    effect: 1,
    baseCost: 1000,
    cost: 1000
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
    baseCost: 500,
    cost: 500
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
  if (upgrade.cost > alaskas) {
    return
  }
  obtainedUpgrades[upgradeType]++
  alaskas -= upgrade.cost
  upgrade.cost = Math.floor(upgrade.baseCost * (obtainedUpgrades[upgradeType] * .5 + 1));
  if (upgrade.type == 'clickModifier') {

    apc += upgrade.effect;
  };
  drawAll()
}


function clickFlag() {
  alaskas += apc;
  drawCount();
}


let buttons = {
  moose: document.getElementById('moose-button'),
  bear: document.getElementById('bear-button'),
  floatPlane: document.getElementById('floatPlane-button'),
  village: document.getElementById('villages-button')
}

function updateButtons() {
  for (const [key, value] of Object.entries(buttons)) {
    if (avalibleUpgrades[key].cost > alaskas) {
      value.disabled = true
    } else {
      value.disabled = false
    }
  }

}


function drawCount() {
  document.getElementById('cookieCount').textContent = alaskas.toFixed(1);
  upgradeSpans.aps.textContent = aps.toFixed(1)
  updateButtons()
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
  upgradeSpans.apc.textContent = apc.toFixed(1)
  upgradeSpans.aps.textContent = aps.toFixed(1)

}

let costSpan = {
  moose: document.getElementById('Moose-cost'),
  bear: document.getElementById('Bear-cost'),
  floatPlanes: document.getElementById('Float Planes-cost'),
  villages: document.getElementById('villages-cost'),
}

function drawCosts() {
  costSpan.moose.textContent = avalibleUpgrades.moose.cost.toString();
  costSpan.bear.textContent = avalibleUpgrades.bear.cost.toString();
  costSpan.floatPlanes.textContent = avalibleUpgrades.floatPlane.cost.toString();
  costSpan.villages.textContent = avalibleUpgrades.village.cost.toString();

}

function drawAll() {
  drawUpgrades()
  drawCount()
  drawCosts()
}

let lastCookies = 0;
function addPerSecond() {
  for (const [key, value] of Object.entries(obtainedUpgrades)) {
    let upgrade = avalibleUpgrades[key]
    if (upgrade.type == 'autoClicker') {
      alaskas += upgrade.effect * value * apc;
    }
  }
  aps = alaskas - lastCookies;
  lastCookies = alaskas

  drawCount()
}
drawAll()
setInterval(addPerSecond, 1000);
