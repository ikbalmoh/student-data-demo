import { LegalGuardian } from '@/types/legalguardian';
import { School } from '@/types/school';
import { Student } from '@/types/student';
import React, { useCallback, useMemo } from 'react';
import StudentRow from './StudentRow';

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
  const getSchool = useCallback(
    (schoolId: number) => schoolsData.find((school) => school.id === schoolId),
    [schoolsData]
  );

  const getLegalGuardian = useCallback(
    (legalGuardianId: number) =>
      legalguardiansData.find((guardian) => guardian.id === legalGuardianId),
    [legalguardiansData]
  );

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
            {studentsData.length > 0 ? (
              studentsData.map((student) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  school={getSchool(student.schoolId)}
                  legalguardian={getLegalGuardian(student.legalguardianId)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-10 text-slate-500 text-center">
                  Please Select Students
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
