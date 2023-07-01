// app.js

// Retrieve all the grid items
var items = document.querySelectorAll('.item');

// Add draggable behavior to each item
items.forEach(function(item) {
  interact(item)
    .draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: '.grid',
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: true
        }),
        interact.modifiers.snap({
          targets: [
            interact.createSnapGrid({ x: 110, y: 110 }) // Adjust the grid size as needed
          ],
          range: Infinity,
          relativePoints: [ { x: 0, y: 0 } ]
        })
      ],
      inertia: true
    })
    .on('dragmove', function(event) {
      var target = event.target;

      // Get the current grid cell coordinates
      var cellX = Math.floor(event.pageX / 110); // Adjust the cell size as needed
      var cellY = Math.floor(event.pageY / 110); // Adjust the cell size as needed

      // Check if the cell is empty
      var cellIsEmpty = !document.querySelector('.cell[data-x="' + cellX + '"][data-y="' + cellY + '"] .item');

      // Update the item's position
      target.style.transform = 'translate(' + (cellX * 110) + 'px, ' + (cellY * 110) + 'px)';

      // Store the updated position in data attributes
      target.setAttribute('data-x', cellX);
      target.setAttribute('data-y', cellY);

      // Remove the item from the previous cell
      var prevCell = document.querySelector('.cell[data-x="' + target.dataset.x + '"][data-y="' + target.dataset.y + '"]');
      if (prevCell) {
        prevCell.innerHTML = '';
      }

      // Place the item in the current cell if it's empty
      if (cellIsEmpty) {
        var newCell = document.querySelector('.cell[data-x="' + cellX + '"][data-y="' + cellY + '"]');
        newCell.appendChild(target);
      }
    });
});
