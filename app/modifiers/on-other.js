import { modifier } from 'ember-modifier';

export default modifier((element, [event, callback], { target = document }) => {
  function handleEvent(e) {
    if (!element.contains(target)) {
      callback();
    }
  }

  target.addEventListener(event, handleEvent);

  return () => {
    target.removeEventListener(event, handleEvent);
  };
});
