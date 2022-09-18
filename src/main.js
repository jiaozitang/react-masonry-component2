// src/main.js
import foo from "./foo.js";

import { sum } from "lodash-es";


export default function () {
    console.log(foo);
    console.log(sum([1, 2]));
}
