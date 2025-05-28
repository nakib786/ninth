export type CRSResults = {
  coreHumanCapital: {
    age: number;
    education: number;
    firstLanguage: number;
    secondLanguage: number;
    canadianWorkExperience: number;
    subtotal: number;
  };
  spouseFactors: {
    education: number;
    firstLanguage: number;
    canadianWorkExperience: number;
    subtotal: number;
  };
  skillTransferability: {
    educationLanguage: number;
    educationWorkExperience: number;
    foreignWorkExperienceLanguage: number;
    foreignWorkExperienceCanadian: number;
    certificateOfQualification: number;
    subtotal: number;
  };
  additionalPoints: {
    provincialNomination: number;
    jobOffer: number;
    canadianEducation: number;
    frenchLanguageSkills: number;
    sibling: number;
    subtotal: number;
  };
  totalScore: number;
};

// Save CRS results to localStorage for use across pages
export const saveCRSResults = (results: CRSResults): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('crsResults', JSON.stringify(results));
  }
};

// Get saved CRS results from localStorage
export const getSavedCRSResults = (): CRSResults | null => {
  if (typeof window !== 'undefined') {
    const savedResults = localStorage.getItem('crsResults');
    if (savedResults) {
      return JSON.parse(savedResults);
    }
  }
  return null;
};

// Format CRS results in official IRCC style
export const formatCRSResults = (
  coreHumanCapital: Record<string, number>,
  spouseFactors: Record<string, number>,
  skillTransferability: Record<string, number>,
  additionalPoints: Record<string, number>,
  totalScore: number
): CRSResults => {
  return {
    coreHumanCapital: {
      age: coreHumanCapital.age || 0,
      education: coreHumanCapital.education || 0,
      firstLanguage: coreHumanCapital.firstLanguage || 0,
      secondLanguage: coreHumanCapital.secondLanguage || 0,
      canadianWorkExperience: coreHumanCapital.canadianWorkExperience || 0,
      subtotal: coreHumanCapital.subtotal || 0,
    },
    spouseFactors: {
      education: spouseFactors.education || 0,
      firstLanguage: spouseFactors.firstLanguage || 0,
      canadianWorkExperience: spouseFactors.canadianWorkExperience || 0,
      subtotal: spouseFactors.subtotal || 0,
    },
    skillTransferability: {
      educationLanguage: skillTransferability.educationLanguage || 0,
      educationWorkExperience: skillTransferability.educationWorkExperience || 0,
      foreignWorkExperienceLanguage: skillTransferability.foreignWorkExperienceLanguage || 0,
      foreignWorkExperienceCanadian: skillTransferability.foreignWorkExperienceCanadian || 0,
      certificateOfQualification: skillTransferability.certificateOfQualification || 0,
      subtotal: skillTransferability.subtotal || 0,
    },
    additionalPoints: {
      provincialNomination: additionalPoints.provincialNomination || 0,
      jobOffer: additionalPoints.jobOffer || 0,
      canadianEducation: additionalPoints.canadianEducation || 0,
      frenchLanguageSkills: additionalPoints.frenchLanguageSkills || 0,
      sibling: additionalPoints.sibling || 0,
      subtotal: additionalPoints.subtotal || 0,
    },
    totalScore,
  };
};

// Sample data for testing or demonstration
export const getSampleCRSResults = (): CRSResults => {
  return {
    coreHumanCapital: {
      age: 110,
      education: 120,
      firstLanguage: 136,
      secondLanguage: 0,
      canadianWorkExperience: 40,
      subtotal: 406
    },
    spouseFactors: {
      education: 0,
      firstLanguage: 0,
      canadianWorkExperience: 0,
      subtotal: 0
    },
    skillTransferability: {
      educationLanguage: 25,
      educationWorkExperience: 13,
      foreignWorkExperienceLanguage: 0,
      foreignWorkExperienceCanadian: 0,
      certificateOfQualification: 0,
      subtotal: 38
    },
    additionalPoints: {
      provincialNomination: 0,
      jobOffer: 0,
      canadianEducation: 30,
      frenchLanguageSkills: 0,
      sibling: 15,
      subtotal: 45
    },
    totalScore: 489
  };
}; 