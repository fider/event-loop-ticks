import { ok, deepStrictEqual } from "assert";
import { tickNum } from "../src";

type Call = { id: string; tick: number; };

process.once('beforeExit', validateResult);

const result1: Call[] = [];
const result2: Call[] = [];

function areIdsUnique(data: Call[]): boolean {
  return data.length === new Set(data.map(call => call.id)).size;
}

function validateResult() {

  ok(areIdsUnique(result1), `expected result1[].id to be unique`);
  ok(areIdsUnique(result2), `expected result2[].id to be unique`);

  const expected1: Call[] = [
    { tick: 0, id: 'root1' },
    { tick: 0, id: 'a1' },
    { tick: 0, id: 'aa1' },
    { tick: 0, id: 'aaa1' },
    { tick: 0, id: 'aa2' },
    { tick: 0, id: 'root2' },
    { tick: 1, id: 'a2' },
    { tick: 1, id: 'ab1' },
    { tick: 1, id: 'a3' },
  ];

  const expected2: Call[] = [
    { tick: 0, id: 'root1' },
    { tick: 0, id: 'a1' },
    { tick: 0, id: 'aa1' },
    { tick: 0, id: 'aaa1' },
    { tick: 0, id: 'aa2' },
    { tick: 0, id: 'a2' },
    { tick: 0, id: 'ab1' },
    { tick: 0, id: 'a3' },
    { tick: 0, id: 'root2' },
  ];

  deepStrictEqual(result1, expected1);
  deepStrictEqual(result2, expected2);

  console.log('Tests passed!');
}

test1();
async function test1() {

  async function a() {
    result1.push({ tick: tickNum(), id: 'a1' });
    await aa();
    result1.push({ tick: tickNum(), id: 'a2' });
    ab();
    result1.push({ tick: tickNum(), id: 'a3' });
  }

  async function aa() {
    result1.push({ tick: tickNum(), id: 'aa1' });
    aaa();
    result1.push({ tick: tickNum(), id: 'aa2' });
  }

  async function aaa() {
    result1.push({ tick: tickNum(), id: 'aaa1' });
  }

  async function ab() {
    result1.push({ tick: tickNum(), id: 'ab1' });
  }
  
  result1.push({ tick: tickNum(), id: 'root1' });
  a();
  result1.push({ tick: tickNum(), id: 'root2' });
}

test2();
async function test2() {
  async function a() {
    result2.push({ tick: tickNum(), id: 'a1' });
    aa();
    result2.push({ tick: tickNum(), id: 'a2' });
    ab();
    result2.push({ tick: tickNum(), id: 'a3' });
  }

  async function aa() {
    result2.push({ tick: tickNum(), id: 'aa1' });
    aaa();
    result2.push({ tick: tickNum(), id: 'aa2' });
  }
  async function aaa() {
    result2.push({ tick: tickNum(), id: 'aaa1' });
  }
  async function ab() {
    result2.push({ tick: tickNum(), id: 'ab1' });
  }
  
  result2.push({ tick: tickNum(), id: 'root1' });
  a();
  result2.push({ tick: tickNum(), id: 'root2' });
}