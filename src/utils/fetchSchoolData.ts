const fetchSchoolData = async (schoolId: number) => {
  try {
    const res = await fetch(`/api/school?id=${schoolId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    throw error;
  }
};

export default fetchSchoolData;
