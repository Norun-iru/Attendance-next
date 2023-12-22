// pages/api/get/SelectSubject/Subject/[subject].ts
import { NextApiRequest, NextApiResponse } from "next";
const mysql = require("mysql2");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "attendance",
});

interface Category {
    ID: number;
    Number: number;
    Name: string;
    Status: boolean;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { subject } = req.query;
    const sqlSelect = `SELECT * FROM ${subject}`;
    db.query(sqlSelect, (err: Error, result: Category[]) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
}
