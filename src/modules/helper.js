export default class Helper {
    
  showElements(...args) {
    args.forEach(element => {
      element.style='display: block;';
    });
  }

  showElementsGrid(...args) {
    args.forEach(element => {
      element.style='display: grid;';
    });
  }

  showElementsFlex(...args) {
    args.forEach(element => {
      element.style='display: flex;';
    });
  }

  hideElements(...args) {
    args.forEach(element => {
      element.style='display: none';
    });
  }
}