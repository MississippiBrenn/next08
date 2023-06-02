import { NextResponse } from 'next/server';

//static list we add to as we want to allow origins or not
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? ['https://www.yoursite.com', 'https://yoursite.com']
    : ['http://localhost:3000', 'https://www.google.com'];

export function middleware(request: Request) {
  //optionally apply middleware file to specific paths with regex
  // const regex = new RegExp('/api/*');
  // if (regex.test(request.url)) {
  // }

  //optionally apply middleware file to specific paths with conditoionals
  //   if(request.url.includes('/api/')){}

  //conditional for origins

  console.log('Middleware!');

  console.log(request.method);
  console.log(request.url);

  const origin = request.headers.get('origin');
  console.log(origin);

  return NextResponse.next();
}
//optionally apply middleware file to specific paths with matcher
export const config = {
  matcher: '/api/:path*',
};
