import { mono } from '@synthnode/util';
import { Add, Delay, Mult } from '../dist';
import { cool } from './cool';

const delayed = new Add([cool, new Delay({ signal: cool, sec: 1 })]);

const gained = new Mult(delayed, 0.5);

mono(gained);
