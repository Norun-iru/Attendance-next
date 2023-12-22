// pages/api/get/TimeTable.ts
import { NextApiRequest, NextApiResponse } from 'next';
const mysql = require('mysql2');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'attendance',
  });

  interface Category {
    Day: string;
    First: string;
    Second: string;
    Third: string;
    Fourth: string;
    Fifth: string;
    Sixth: string;
    Seventh: string;
    Eighth: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sqlSelect = 'SELECT * FROM Subjects';

  db.query(sqlSelect, (err : Error, result : Category[]) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
}
