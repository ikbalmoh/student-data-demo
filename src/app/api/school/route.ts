import { NextResponse, NextRequest } from 'next/server';
import schools from '@/data/schools.json';

export const GET = async (request: NextRequest) => {
  try {
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
      throw new Error('id is required');
    }

    const school = schools.find((school) => school.id === parseInt(id));

    if (!school) {
      throw new Error('School no found!');
    }

    return NextResponse.json(school, {
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
