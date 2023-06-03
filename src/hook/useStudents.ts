import { useState, useEffect, useMemo, useCallback } from 'react';
import { Student } from '@/types/student';
import { School } from '@/types/school';
import { LegalGuardian } from '@/types/legalguardian';
import fetchStudentData from '@/utils/fetchStudentData';
import fetchSchoolData from '@/utils/fetchSchoolData';
import fetchLegalGuardianData from '@/utils/fetchLegalGuardianData';

export default function useStudents(ids: number[]) {
  const [students, setStudents] = useState<Student[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [legalGuardians, setLegalGuardians] = useState<LegalGuardian[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (ids: number[]) => {
      setLoading(true);
      let _students = [...students];
      let _schools = [...schools];
      let _legalGuardians = [...legalGuardians];
      for (const studentId of ids) {
        let student: Student;
        const studentIndex = _students.findIndex(
          (student) => student.id === studentId
        );

        if (studentIndex < 0) {
          student = await fetchStudentData(studentId);
          _students.push(student);
        } else {
          student = _students[studentIndex];
        }

        const { schoolId, legalguardianId } = student;

        const schoolIndex = _schools.findIndex(
          (school) => school.id === schoolId
        );
        if (schoolIndex < 0) {
          const school: School = await fetchSchoolData(schoolId);
          _schools.push(school);
        }

        const guardianIndex = _legalGuardians.findIndex(
          (guardian) => guardian.id === legalguardianId
        );
        if (guardianIndex < 0) {
          const legalGuardian: LegalGuardian = await fetchLegalGuardianData(
            legalguardianId
          );
          _legalGuardians.push(legalGuardian);
        }
      }
      setStudents(_students);
      setSchools(_schools);
      setLegalGuardians(_legalGuardians);
      setLoading(false);
    },
    [legalGuardians, schools, students]
  );

  useEffect(() => {
    fetchData(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  const studentsData = useMemo<Student[]>(() => {
    const filteredStudentsData: Student[] = students
      .filter((s) => ids.includes(s.id))
      .sort((a, b) => a.id - b.id);
    return filteredStudentsData;
  }, [students, ids]);

  const schoolsData = useMemo<School[]>(() => {
    const schoolIds: number[] = studentsData.map((student) => student.schoolId);
    const filteredSchoolsData: School[] = schools
      .filter((s) => schoolIds.includes(s.id))
      .sort((a, b) => a.id - b.id);
    return filteredSchoolsData;
  }, [studentsData, schools]);

  const legalguardiansData = useMemo<LegalGuardian[]>(() => {
    const legalGuardianIds: number[] = studentsData.map(
      (student) => student.legalguardianId
    );
    const filteredLegalGuardianData: LegalGuardian[] = legalGuardians
      .filter((s) => legalGuardianIds.includes(s.id))
      .sort((a, b) => a.id - b.id);
    return filteredLegalGuardianData;
  }, [legalGuardians, studentsData]);

  return { studentsData, schoolsData, legalguardiansData, loading };
}
