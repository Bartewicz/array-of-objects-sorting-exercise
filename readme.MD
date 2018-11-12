# Sorting arrays implementation

A simple static website for array with objects sorting implementation practice in VanillaJS.
Try it out [here](https://bartewicz.github.io/array-of-objects-sorting-exercise/).

## Restrictions

All values from an object are sorted using default `array.sort()` method. In this case vaules are expected to be a string or a number. Here's the code used to sort table:

```js
const sorted_array = array_from_rows.sort(function (a, b) {
      a = a.cells[column_index].innerText.toLowerCase()
      b = b.cells[column_index].innerText.toLowerCase()
      return isNaN(a - b) ? a.localeCompare(b) : a - b
    })
```

## How does it work

Sorting table is encapsulated in window 'click' event lister. If an `event.target` is any of `th` cells the sorting procedure is started. A table head cell is given a `data-sorting-order` attribute with a value `'ascending'` on default and `'descending'` after second click on it. If same cell is clicked again the attribute value is toggled. If another `th` cell is clicked the dataset sorting attribute of previously sorted column header is removed.

An `data` attribute `data-sort-property` is added to each column header while a table header is rendered from an array. Then array is sorted depending on each column header `data-sort-property` which is passed as a key to a sorting function.

Event listener that is mounted grabs the specified table depending on `th` cell that was clicked and replace table body with a new, rendered from already sorted array.