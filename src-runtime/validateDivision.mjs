import { typecheckWarn } from "./typecheckWarn.mjs";
/**
 * @param {number} lhs - The left hand side.
 * @param {number} rhs - The right hand side.
 * @example
 * validateDivision( 1 ,  2 ); // Outputs: 0.5
 * validateDivision( 1 , "2"); // Warns: validateDivision> incompatible type pair
 * validateDivision(10n,  2n); // Outputs: 5n
 * @returns {number}
 */
function validateDivision(lhs, rhs) {
  const ret = lhs / rhs;
  const twoNumbers = typeof lhs === 'number' && typeof rhs === 'number';
  const twoBigInts = typeof lhs === 'bigint' && typeof rhs === 'bigint';
  const valid = twoNumbers || twoBigInts;
  if (!valid) {
    typecheckWarn(`validateDivision> incompatible type pair`, { lhs, rhs, twoNumbers, twoBigInts });
  }
  // If we got two bigint's, we are done, as isNaN and isFinite is only for "normal" numbers.
  if (twoBigInts) {
    return ret;
  }
  if (isNaN(ret)) {
    typecheckWarn(`validateDivision> NaN`, { lhs, rhs });
  }
  if (!isFinite(ret)) {
    typecheckWarn(`validateDivision> +-Infinity`, { lhs, rhs });
  }
  return ret;
}
export { validateDivision };