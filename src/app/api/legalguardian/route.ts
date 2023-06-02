import { NextResponse, NextRequest } from 'next/server';
import legalguardian from '@/data/legalguardians.json';

export const GET = async (request: NextRequest) => {
  try {
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
      throw new Error('id is required');
    }

    const guardian = legalguardian.find(
      (guardian) => guardian.id === parseInt(id)
    );

    if (!guardian) {
      throw new Error('guardian no found!');
    }

    return NextResponse.json(guardian, {
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
