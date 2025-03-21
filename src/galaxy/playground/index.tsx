import { B } from './B.ts';
B();
const aaaa = [1, 2, 3];
console.log([...aaaa]);
const b = {
  test: 231,
};
console.log(Object.hasOwn(b, 1));
const a = { duration: 50 };

a.speed ??= 25;
console.log(a.speed);
console.log(a ?? b);
console.log({ ...b });
console.log(a?.bbb);

function PlayGround() {
  return <div>PlayGround</div>;
}
export default PlayGround;
function f(...[a, b, c]) {
  return a + b + c;
}

f(1); // NaN (b and c are undefined)
f(1, 2, 3); // 6
f(1, 2, 3, 4); // 6 (the fourth parameter is not destructured)
