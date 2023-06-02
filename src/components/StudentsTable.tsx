import { LegalGuardian } from '@/types/legalguardian';
import { School } from '@/types/school';
import { Student } from '@/types/student';
import React, { useMemo } from 'react';

type Props = {
  studentsData: Student[];
  schoolsData: School[];
  legalguardiansData: LegalGuardian[];
};

export default function StudentsTable({
  studentsData,
  schoolsData,
  legalguardiansData,
}: Props) {
  const schoolName = (schoolId: number) =>
    schoolsData.find((school) => school.id === schoolId)?.name;

  const legalGuardianName = (legalGuardianId: number) =>
    legalguardiansData.find((guardian) => guardian.id === legalGuardianId)
      ?.name;

  return (
    <div className="col-span-12 md:col-span-8 xl:col-span-9 bg-white shadow-lg rounded-lg">
      <div className="px-5 py-3 font-semibold text-slate-900">
        Students Table
      </div>
      <div className="border-t border-slate-200/60 p-3 overflow-auto">
        <table className="table w-full text-slate-600">
          <thead>
            <tr>
              <th className="border-b border-slate-200 p-2">ID</th>
              <th className="border-b border-slate-200 p-2 text-left">Name</th>
              <th className="border-b border-slate-200 p-2 text-left">
                Address
              </th>
              <th className="border-b border-slate-200 p-2 text-left">
                School
              </th>
              <th className="border-b border-slate-200 p-2 text-left">
                Local Guardian
              </th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student) => (
              <tr key={student.id}>
                <td className="border-b border-slate-100 text-center p-2">
                  {student.id}
                </td>
                <td className="border-b border-slate-100 p-2 text-left">
                  {student.name}
                </td>
                <td className="border-b border-slate-100 p-2 text-left">
                  {[student.address?.street, student.address?.city].join(', ')}
                </td>
                <td className="border-b border-slate-100 p-2 text-left">
                  {schoolName(student.schoolId)}
                </td>
                <td className="border-b border-slate-100 p-2 text-left">
                  {legalGuardianName(student.legalguardianId)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
