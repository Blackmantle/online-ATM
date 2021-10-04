import { billsType } from 'utils/types';
import billImg1 from 'assets/img/50.jpg';
import billImg2 from 'assets/img/100.jpg';
import billImg3 from 'assets/img/200.jpg';
import billImg4 from 'assets/img/500.jpg';
import billImg5 from 'assets/img/1000.jpg';
import billImg6 from 'assets/img/2000.jpg';
import billImg7 from 'assets/img/5000.jpg';

export const initBills: billsType[] = [
  {
    '5000.': 100,
    '2000.': 400,
    '1000.': 1000,
    '500.': 3000,
    '200.': 5000,
    '100.': 8000,
    '50.': 10000,
  },
  {
    '5000.': 476,
    '2000.': 345,
    '1000.': 6741,
    '500.': 4362,
    '200.': 234,
    '100.': 1643,
    '50.': 3450,
  },
  {
    '5000.': 234,
    '2000.': 678,
    '1000.': 845,
    '500.': 2451,
    '200.': 9654,
    '100.': 2345,
    '50.': 234,
  },
  {
    '5000.': 546,
    '2000.': 562,
    '1000.': 2543,
    '500.': 4365,
    '200.': 2154,
    '100.': 124,
    '50.': 342,
  },
  {
    '5000.': 2732,
    '2000.': 347,
    '1000.': 479,
    '500.': 7556,
    '200.': 3296,
    '100.': 1257,
    '50.': 3854,
  },
  {
    '5000.': 73,
    '2000.': 147,
    '1000.': 279,
    '500.': 356,
    '200.': 696,
    '100.': 857,
    '50.': 854,
  },
];

export const billsImages: Record<string, string> = {
  '50.': billImg1,
  '100.': billImg2,
  '200.': billImg3,
  '500.': billImg4,
  '1000.': billImg5,
  '2000.': billImg6,
  '5000.': billImg7,
};