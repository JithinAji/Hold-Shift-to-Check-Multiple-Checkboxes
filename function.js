const checkBoxes = document.querySelectorAll('input[type="checkbox"]');

let lastChecked = -1;

const checkBoxEventListener = (eventName, applyMethod, isOn) => {
  if (isOn) {
    checkBoxes.forEach((checkBox) => {
      checkBox.addEventListener(eventName, applyMethod);
    });
  } else {
    checkBoxes.forEach((checkBox) => {
      checkBox.removeEventListener(eventName, applyMethod);
    });
  }
};

const isChecked = (id) => {
  if (checkBoxes[id].checked === true) return true;
  else return false;
};

const selectCheckBoxEvent = (event) => {
  checkBoxes.forEach((checkBox, id) => {
    if (checkBox === event.target && isChecked(id)) {
      if (lastChecked < id) {
        selectCheckBox(lastChecked, id);
      } else {
        selectCheckBox(id, lastChecked);
      }
      lastChecked = id;
    }
  });
};

const isShiftKeyDown = (e) => {
  if (e.keyCode === 16) {
    checkBoxEventListener("click", selectCheckBoxEvent, true);
  }
};

const isShiftKeyUp = (e) => {
  if (e.keyCode === 16) {
    checkBoxEventListener("click", selectCheckBoxEvent, false);
    lastChecked = -1;
  }
};

const selectCheckBox = (startId, endId) => {
  if (lastChecked >= 0) {
    for (; startId <= endId; startId++) {
      checkBoxes[startId].checked = true;
    }
  }
};

document.addEventListener("keydown", isShiftKeyDown);
document.addEventListener("keyup", isShiftKeyUp);
