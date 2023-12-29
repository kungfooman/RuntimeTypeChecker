import {options} from "./options.mjs";
/**
 * @param {string} msg - The main message.
 * @param {...any} extra - Extra strings or objects etc.
 */
function warn(msg, ...extra) {
  const {mode, warned} = options;
  warned[msg] = warned[msg] || {hits: 0};
  warned[msg].hits++;
  switch (mode) {
    case 'spam':
      console.error(msg, ...extra);
      break;
    case 'once':
      if (warned[msg].hits === 1) {
        console.error(msg, ...extra);
      }
      break;
    case 'never':
      break;
    default:
      console.error("warn> unsupported mode:", mode);
  }
}
export {warn};