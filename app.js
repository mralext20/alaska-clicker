
let alaskas = 0;
let aps = 0; // Alaskas per Second form auto clickers
let apc = 1; // alaskas per click form modifiers


let avalibleUpgrades = {
  moose: {
    name: 'Moose',
    type: 'clickModifier',
    effect: 1,
    baseCost: 15
  },
  bear: {
    name: 'bear',
    type: 'clickModifier',
    effect: 5,
    baseCost: 100
  },
  floatPlane: {
    name: 'Float Plane',
    type: 'autoClicker',
    effect: 1,
    baseCost: 30
  },
  village: {
    name: 'Village',
    type: 'autoClicker',
    effect: 5,
    baseCost: 50
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
  if (upgrade.type == 'autoClicker') {

  }
}


function clickFlag() {
  alaskas += aps;
  drawCount();
}

function drawCount() {
  document.getElementById('cookieCount').textContent = alaskas.toString();
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


function addPerSecond() {

  for (const [key, value] of Object.entries(obtainedUpgrades)) {
    let upgrade = avalibleUpgrades[key]
    if (upgrade.type == 'autoClicker') {
      alaskas += upgrade.effect
    }
  }
  drawCount()
}

setInterval(addPerSecond, 1000);