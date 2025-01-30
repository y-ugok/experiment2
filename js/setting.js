document.addEventListener("DOMContentLoaded", () => {
  let savedColor = localStorage.getItem("themeColor") || "#FFBDB1";
  console.log(savedColor);
  applyThemeColor(savedColor);
  setButtonState(savedColor);

  // 初期状選択保存と初期状態設定
  const savedCategory = localStorage.getItem("objectCategory") || "plant";
  console.log("Saved category:", savedCategory);
  setCategoryButtonState(savedCategory);
});

function setCategoryButtonState(category) {
  const categoryButtons = document.querySelectorAll(".button-wrapper button");
  categoryButtons.forEach((button) => {
    if (button.id === category) {
      button.classList.add("selected-button");
    } else {
      button.classList.remove("selected-button");
    }
  });
}

const resetDialog = document.getElementById("reset-dialog");
const resetButton = document.getElementById("reset-btn");
const cancelResetButton = document.getElementById("cancel-reset");
const confirmResetButton = document.getElementById("confirm-reset");
const colorModal = document.getElementById("colorModal");
const objectModal = document.getElementById("objectModal");
const colorButton = document.getElementById("colorButton");
const colorClose = document.getElementById("colorClose");
const objectClose = document.getElementById("objectClose");
const objectChange = document.getElementById("objectChange");
const buttons = document.querySelectorAll(".button-wrapper button");
const object = document.getElementById("objectChange");
// const button = document.querySelector(".button-wrapper>button");

objectChange.addEventListener("click", () => {
  updateDialogPosition(objectModal);
});
colorButton.addEventListener("click", () => {
  updateDialogPosition(colorModal);
});

function updateDialogPosition(dialog) {
  const footer = document.getElementById("footer");
  const viewportHeight = window.innerHeight; // ビューポートの高さ
  const footerRect = footer.getBoundingClientRect(); // フッターの位置
  const footerOffset = viewportHeight - footerRect.bottom; // フッターまでの距離

  // ウィンドウサイズに応じたモーダルの幅と位置を変更
  if (window.matchMedia("(max-width: 1024px)").matches) {
    // 1024px未満の場合、モーダル幅を100%にし、下端がページ下端に合わせる
    dialog.style.width = "100%";
    dialog.style.height = "50vh";
    dialog.style.bottom = "0px"; // モーダルの下端をページ下端に合わせる
  } else {
    // 1024px以上の場合、モーダル幅を250pxに設定し、フッターと下端が揃うように調整
    dialog.style.width = "250px";
    dialog.style.height = "50vh";
    dialog.style.bottom = `${footerOffset}px`; // フッターの下端に合わせる
  }
  dialog.classList.add("show-from");
  dialog.showModal();
  requestAnimationFrame(() => {
    dialog.classList.remove("show-from");
  });
}
colorModal.addEventListener("click", (event) => {
  if (event.target === colorModal) {
    close();
  }
});
objectModal.addEventListener("click", (event) => {
  if (event.target === objectModal) {
    cbjectclose();
  }
});
colorClose.addEventListener("click", close);
objectClose.addEventListener("click", cbjectclose);

function close() {
  colorModal.classList.add("hide-to");
  colorModal.addEventListener(
    "transitionend",
    // cssのトランジションが完了した時に発火
    () => {
      colorModal.classList.remove("hide-to");
      colorModal.close();
    },
    { once: true }
    // このイベントリスナーが1度だけ実行されてその後自動的に削除
  );
}
function cbjectclose() {
  objectModal.classList.add("hide-to");
  objectModal.addEventListener(
    "transitionend",
    // cssのトランジションが完了した時に発火
    () => {
      objectModal.classList.remove("hide-to");
      objectModal.close();
    },
    { once: true }
    // このイベントリスナーが1度だけ実行されてその後自動的に削除
  );
}

function setButtonState(color) {
  const buttons = {
    "#FFBDB1": document.getElementById("red"),
    "#FFEC9B": document.getElementById("yellow"),
    "#BFF0B1": document.getElementById("green"),
    "#B1D4FF": document.getElementById("blue"),
  };

  Object.keys(buttons).forEach((key) => {
    //buttons:プロパティが返されるオブジェクト
    if (key === color) {
      buttons[key].textContent = "適用中";
      buttons[key].classList.add("selected-button");
    } else {
      buttons[key].textContent = "適用";
      buttons[key].classList.remove("selected-button");
    }
  });
}

function applyThemeColor(color) {
  document.querySelector("header").style.backgroundColor = color;
  const rectangles = document.querySelectorAll(".rectangle");
  const removeButtons = document.querySelectorAll(".remove-btn");
  rectangles.forEach((rect) => {
    rect.style.backgroundColor = color;
  });
  removeButtons.forEach((btn) => {
    btn.style.backgroundColor = color;
  });
}

// テーマカラー関連
let selectedColor;
document.querySelectorAll(".wrapper button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const buttonId = event.target.id;
    switch (buttonId) {
      case "red":
        selectedColor = "#FFBDB1";
        break;
      case "yellow":
        selectedColor = "#FFEC9B";
        break;
      case "green":
        selectedColor = "#BFF0B1";
        break;
      case "blue":
        selectedColor = "#B1D4FF";
        break;
      default:
        selectedColor = "#FFC3B7";
    }
    localStorage.setItem("themeColor", selectedColor);
    setButtonState(selectedColor);
    applyThemeColor(selectedColor);
    console.log(selectedColor);
  });
});

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const selectedCategory = event.target.id; // ボタンのIDを取得
    localStorage.setItem("objectCategory", selectedCategory); // 保存
    console.log("Selected category:", selectedCategory); // デバッグ用ログ
  });
});
