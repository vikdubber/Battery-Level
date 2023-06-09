class BatteryInfo {
  constructor(div_id) {
    if (!div_id) throw `id of parent DOMElement is needed`;
    const rootDiv = document.getElementById(div_id);
    if (!rootDiv) throw `DIV#${div_id} is not exist in DOM`;
    this._rootDiv = rootDiv;
    this._infoElements = {
      'charge_bar': null,
      'charge_level': null,
      'charging_status': null,
    };
  }
  get rootDiv() {
    return this._rootDiv;
  }
  get infoElements() {
    return this._infoElements;
  }
  _generateVisualElements() {
    if (this._rootDiv.childElementCount) this._rootDiv.innerHTML = '';
    for (const elementName in this._infoElements) {
      const newElement = document.createElement('div');
      newElement.id = elementName;
      this._infoElements[elementName] = newElement;
      this._rootDiv.appendChild(newElement);
    };
  }
  _getInfoElement(elementName) {
    if (!this._infoElements[elementName]) throw 'Element not present';
    return this._infoElements[elementName];
  }
  create(battery) {
    this._generateVisualElements();
    this.chargingChangeHandler(battery);
    this.levelChangeHandler(battery);
  }
  chargingChangeHandler({ charging: isCharging } = battery) {
    if (!battery) return;
    this._rootDiv.setAttribute('data-charging', isCharging);
    this._getInfoElement('charging_status').innerHTML = `${isCharging ? '' : 'dis'}charging`;
  }
  levelChangeHandler({ level: level } = battery) {
    if (!battery) return;
    const percantage = level * 100;
    this._getInfoElement('charge_bar').style.height = `${percantage}%`;
    this._getInfoElement('charge_level').innerHTML = `${percantage}%`;
  }
};

navigator.getBattery().then((battery) => {
  const batteryInfo = new BatteryInfo('battery');
  batteryInfo.create(battery);
  battery.onchargingchange = () => batteryInfo.chargingChangeHandler(battery);
  battery.onlevelchange = () => batteryInfo.levelChangeHandler(battery);
});
