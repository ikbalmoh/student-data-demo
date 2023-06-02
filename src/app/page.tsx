'use client';

import StudentsPicker from '@/components/StudentsPicker';
import StudentsTable from '@/components/StudentsTable';
import useStudents from '@/hook/useStudents';
import { useState } from 'react';

export default function Home() {
  const [studentsIds, setStudentsIds] = useState<number[]>([]);

  const onStudentsPick = (ids: number[]) => setStudentsIds(ids);

  const { studentsData, schoolsData, legalguardiansData, loading } =
    useStudents(studentsIds);

  return (
    <main className="min-h-screen grid grid-cols-12 gap-6 container mx-auto py-12 md:py-20 px-5 md:px-0">
      <StudentsPicker onPickHandler={onStudentsPick} loading={loading} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        legalguardiansData={legalguardiansData}
      />
    </main>
  );
}
