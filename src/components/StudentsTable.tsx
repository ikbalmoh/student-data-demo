import { LegalGuardian } from '@/types/legalguardian';
import { School } from '@/types/school';
import { Student } from '@/types/student';
import React, { useCallback, useMemo, useState } from 'react';
import StudentRow from './StudentRow';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  const [exporting, setExporting] = useState<boolean>(false);

  const getSchool = useCallback(
    (schoolId: number) => schoolsData.find((school) => school.id === schoolId),
    [schoolsData]
  );

  const getLegalGuardian = useCallback(
    (legalGuardianId: number) =>
      legalguardiansData.find((guardian) => guardian.id === legalGuardianId),
    [legalguardiansData]
  );

  const exportToPdf = async () => {
    setExporting(true);
    const pdf = new jsPDF('portrait', 'pt', 'a4');
    const data = await html2canvas(document.querySelector('#student-table')!);
    const img = data.toDataURL('image/png');
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, 'PNG', 0, 10, pdfWidth, pdfHeight);
    pdf.save('student-data.pdf');
    setExporting(false);
  };

  return (
    <div className="col-span-12 md:col-span-8 xl:col-span-9 bg-white shadow-lg rounded-lg">
      <div className="flex flex-row items-center justify-between px-5 py-3">
        <div className="font-semibold text-slate-900">Students Table</div>
        <button
          disabled={exporting || studentsData.length === 0}
          type="button"
          onClick={exportToPdf}
          className="px-5 py-2.5 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium hover:bg-indigo-500 hover:text-white hover:shadow-lg disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none"
        >
          {exporting ? 'Exporting...' : 'Export to PDF'}
        </button>
      </div>
      <div className="border-t border-slate-200/60 p-3 overflow-auto">
        <table className="table w-full text-slate-600" id="student-table">
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
