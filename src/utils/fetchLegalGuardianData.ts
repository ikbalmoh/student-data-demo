const fetchLegalGuardianData = async (legalguardianId: number) => {
  try {
    const res = await fetch(`/api/legalguardian?id=${legalguardianId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    throw error;
  }
};

export default fetchLegalGuardianData;
