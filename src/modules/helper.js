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

  static disableField(field) {
    field.disabled=true;
  }

  static enableField(field) {
    field.disabled=false;
  }
}