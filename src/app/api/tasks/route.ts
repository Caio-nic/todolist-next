import { NextResponse } from "next/server";
import { createConnection } from "../../db";
import { ResultSetHeader } from "mysql2/promise";

export async function GET() {
  const connection = await createConnection();
  const [rows] = await connection.query("SELECT * FROM tasks");
  await connection.end();

  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const connection = await createConnection();
  const { title } = await request.json();

  const [result] = await connection.query<ResultSetHeader>(
    "INSERT INTO tasks (title, status) VALUES (?, ?)",
    [title, "Todo"]
  );
  await connection.end();

  return NextResponse.json({ id: result.insertId, title, status: "Todo" });
}

export async function PUT(request: Request) {
  const connection = await createConnection();
  const { id, title, status } = await request.json();

  await connection.query(
    "UPDATE tasks SET title = ?, status = ? WHERE id = ?",
    [title, status, id]
  );
  await connection.end();

  return NextResponse.json({ message: "Task updated successfully" });
}

export async function DELETE(request: Request) {
  const connection = await createConnection();
  const { id, ids } = await request.json();

  if (ids) {
    await connection.query("DELETE FROM tasks WHERE id IN (?)", [ids]);
  } else if (id) {
    await connection.query("DELETE FROM tasks WHERE id = ?", [id]);
  }
  await connection.end();

  return NextResponse.json({ message: "Task(s) deleted successfully" });
}
