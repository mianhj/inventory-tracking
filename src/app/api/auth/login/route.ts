import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/jwt';
import _ from 'lodash';
import { error } from 'console';

type RequestPayload = {
  email: string;
  password: string;
};
export async function POST(req: NextRequest) {
  try {
    const body: RequestPayload = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user)
      return NextResponse.json(
        {
          error: 'Invalid email or password!',
        },
        { status: 404 }
      );

    //check password
    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return NextResponse.json(
        {
          error: 'Invalid email or password!',
        },
        { status: 404 }
      );

    const userResponse = _.pick(user, ['id', 'email', 'name']);
    const token = encrypt(userResponse);

    const response = NextResponse.json({ user: userResponse, token });
    response.cookies.set('Authorization', token, {
      maxAge: 60 * 60 * 24 * 7, // 1 week expiration
    });
    return response;
  } catch (err) {
    console.log(err);

    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
