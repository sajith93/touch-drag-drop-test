const images = document.querySelectorAll("img");
const containers = document.querySelectorAll(".container");

images.forEach((image) => {
  image.addEventListener("touchstart", dragStart);
  image.addEventListener("touchend", dragEnd);
});

containers.forEach((container) => {
  container.addEventListener("touchmove", dragMove);
  container.addEventListener("touchend", drop);
});

function dragStart(event) {
    event.dataTransfer.setData("draggedImageId", event.target.id);
    console.log('drag started - event.target.id:', event.target.id)
  event.preventDefault();
  event.target.classList.add("hidden");
}

function dragEnd(event) {
  event.preventDefault();
  event.target.classList.remove("hidden");
}

function dragMove(event) {
  event.preventDefault();
  const touch = event.touches[0];
  const draggedImage = document.querySelector(".hidden");

  draggedImage.style.left = touch.clientX + "px";
  draggedImage.style.top = touch.clientY + "px";
}

function drop(event) {
  event.preventDefault();
  const draggedImageId = event.dataTransfer.getData("draggedImageId");
  const draggedImage = document.getElementById(draggedImageId);
  const fromContainer = draggedImage.parentNode;
  const toContainer = event.currentTarget;

  if (toContainer !== fromContainer) {
    fromContainer.appendChild(toContainer.firstElementChild);
    toContainer.appendChild(draggedImage);
  }
}
