import { NextResponse, NextRequest } from 'next/server';
import students from '@/data/students.json';

export const GET = async (request: NextRequest) => {
  try {
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
      throw new Error('id is required');
    }

    const student = students.find((student) => student.id === parseInt(id));

    if (!student) {
      throw new Error('Student no found!');
    }

    return NextResponse.json(student, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Server Error',
      },
      {
        status: 400,
      }
    );
  }
};
