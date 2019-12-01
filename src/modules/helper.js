export default class Helper {
    
  static showElements(...args) {
    args.forEach(element => {
      element.style='display: block;';
    });
  }

  static showElementsGrid(...args) {
    args.forEach(element => {
      element.style='display: grid;';
    });
  }

  static showElementsFlex(...args) {
    args.forEach(element => {
      element.style='display: flex;';
    });
  }

  static hideElements(...args) {
    args.forEach(element => {
      element.style='display: none';
    });
  }

  static disableFields(...args) {
    args.forEach(field => {
      field.disabled=true;
    });
  }

  static enableFields(...args) {
    args.forEach(field => {
      field.disabled=false;
    });
    }
}