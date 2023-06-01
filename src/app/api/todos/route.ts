import { NextResponse } from 'next/server';

//secret resource
const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos';

//api key for third party api
const API_KEY: string = process.env.DATA_API_KEY as string;

//route handlers
//dont send api key with get request
export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);
  console.log('res: ', res);

  const todos: Todo[] = await res.json();

  //   const { userId, id, title, completed } = res;

  return NextResponse.json(todos);
}

export async function DELETE(request: Request) {
  const { id }: Partial<Todo> = await request.json();

  if (!id) return NextResponse.json({ message: 'Todo id required' });

  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY,
    },
  });

  return NextResponse.json({ message: `Todo ${id} deleted` });
}

export async function POST(request: Request) {
  const { userId, title }: Partial<Todo> = await request.json();

  if (!userId || !title)
    return NextResponse.json({ message: 'Missing required data' });

  const res = await fetch(DATA_SOURCE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY,
    },
    body: JSON.stringify({
      userId,
      title,
      completed: false,
    }),
  });

  const newTodo: Todo = await res.json();

  return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
  const { userId, id, title, completed }: Todo = await request.json();

  if (!userId || !id || !title || typeof completed !== 'boolean')
    return NextResponse.json({ message: 'Missing required data' });

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY,
    },
    body: JSON.stringify({
      userId,
      title,
      completed,
    }),
  });

  const updatedTodo: Todo = await res.json();

  return NextResponse.json(updatedTodo);
}
