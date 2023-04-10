navigator.getBattery().then((battery) => {
  battery.onchargingchange = chargingChangeHandler(battery);
  battery.onlevelchange = levelChangeHandler(battery);

  setInterval(() => updateStatus(battery), 1000);
});

const updateStatus = (battery) => {
  chargingChangeHandler(battery);
  levelChangeHandler(battery);
}

const chargingChangeHandler = (battery) => {
  if (!battery) return;
  const text = battery.charging ? 'charging' : 'discharging';
  document.getElementById('charging_status').innerHTML = text;
  document.getElementById('battery').setAttribute('data-charging', battery.charging)
}

const levelChangeHandler = (battery) => {
  if (!battery) return;
  const { offsetHeight: fullHeigth } = document.getElementById('battery');
  document.getElementById('charge_level').innerHTML = `${Math.round(battery.level * 100)}%`;
  document.getElementById('battery_bar').style.height = `${fullHeigth * battery.level}px`;
}