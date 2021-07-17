let checkBoxes = document.querySelectorAll('input[type="checkbox"]');

let lastChecked = null;

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

const selectCheckBoxEvent = (event) => {
  checkBoxes.forEach((checkBox, id) => {
    if (checkBox === event.target) {
      if (lastChecked < id) {
        selectCheckBox(lastChecked, id);
      } else {
        selectCheckBox(id, lastChecked);
      }
      lastChecked = id;
    }
  });
};

const updateLastChecked = (event) => {
  checkBoxes.forEach((checkBox, id) => {
    if (checkBox === event.target) {
      lastChecked = id;
    }
  });
};

const isShiftKeyDown = (e) => {
  if (e.keyCode === 16) {
    checkBoxEventListener("click", updateLastChecked, false);
    checkBoxEventListener("click", selectCheckBoxEvent, true);
  }
};

const isShiftKeyUp = (e) => {
  if (e.keyCode === 16) {
    checkBoxEventListener("click", selectCheckBoxEvent, false);
    checkBoxEventListener("click", updateLastChecked, true);
  }
};

const selectCheckBox = (startId, endId) => {
  for (; startId <= endId; startId++) {
    checkBoxes[startId].checked = true;
  }
};

document.addEventListener("keydown", isShiftKeyDown);
document.addEventListener("keyup", isShiftKeyUp);

checkBoxEventListener("click", updateLastChecked, true);
