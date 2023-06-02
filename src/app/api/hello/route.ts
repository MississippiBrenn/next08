import next from 'next/types';
//share token count between different files
//if you want to make api public you will want to use cors but we can do it wout

import { limiter } from '../config/limiter';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const origin = request.headers.get('origin');

  const remaining = await limiter.removeTokens(1);
  console.log('remaining', remaining);

  if (remaining < 0) {
    return new NextResponse(null, {
      status: 429,
      statusText: 'Too Many Requests',
      //if sent from thunderclient or postman origin won't exist
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Content-Type': 'text/plain',
      },
    });
  }
  return new Response('Hello, Next.js!');
}
