// pages/api/get/SelectSubject/Day/[day].ts
import { NextApiRequest, NextApiResponse } from "next";
const mysql = require("mysql2");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "attendance",
});

interface Category {
    SubjectName: string;
    SubjectName2: string;
    ID: number;
    Format: string;
    Unit: number;
    Start: number;
    Time: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { day } = req.query;
    const sqlSelect = `SELECT * FROM ${day}`;
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