"use strict";
// let storage = localStorage;
let completedTasks = parseInt(storage.getItem("completedTasks")) || 0;

// リストの完了数はローカルストレージに保存
window.onload = () => {
  updatePlantImage(); // ページ読み込み時に画像を更新
};

function completeTask() {
  completedTasks++;
  console.log(completedTasks);

  storage.setItem("completedTasks", completedTasks); // 完了したタスク数をローカルストレージに保存
  updatePlantImage(); // 画像を更新
}

function updatePlantImage() {
  const imageIndex = Math.floor(completedTasks / 4) + 1; // 5タスクごとに切り替え
  const objectCategory = storage.getItem("objectCategory") || "plant"; // デフォルトは植物
  const topImage = document.getElementById("topImage");
  topImage.src = `./img/${objectCategory}${imageIndex}.png`; // 完了数に応じた画像に切り替え
}
