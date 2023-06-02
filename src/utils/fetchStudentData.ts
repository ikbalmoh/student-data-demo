const fetchStudentData = async (studentId: number) => {
  try {
    const res = await fetch(`/api/student?id=${studentId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    throw error;
  }
};

export default fetchStudentData;
