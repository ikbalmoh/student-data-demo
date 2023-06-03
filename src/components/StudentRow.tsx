import { LegalGuardian } from '@/types/legalguardian';
import { School } from '@/types/school';
import { Student } from '@/types/student';
import React, { memo } from 'react';

type Props = {
  student: Student;
  school?: School;
  legalguardian?: LegalGuardian;
};

function StudentRow({ student, school, legalguardian }: Props) {
  // To see if component being rerendered
  console.log('student id:' + student.id);

  return (
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
        {school?.name}
      </td>
      <td className="border-b border-slate-100 p-2 text-left">
        {legalguardian?.name}
      </td>
    </tr>
  );
}

export default memo(StudentRow);
