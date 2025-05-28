// Language test score data with test-specific scores for each test type
// The data includes the value (used for selection), the CLB level, and the actual test-specific score ranges

export type LanguageScore = {
  value: string;
  clbScore: number;
  firstLangWithSpouse: number;
  firstLangWithoutSpouse: number;
  secondLang: number;
  spousePoints: number;
  label?: string;
};

export type TestScores = {
  [key: string]: {
    speaking: string;
    listening: string;
    reading: string;
    writing: string;
  };
};

// Common scoring data for all language tests
export const languageScoresBase: LanguageScore[] = [
  { value: "A", clbScore: 4, firstLangWithSpouse: 0, firstLangWithoutSpouse: 0, secondLang: 0, spousePoints: 0, label: "CLB 4 or less" },
  { value: "B", clbScore: 5, firstLangWithSpouse: 6, firstLangWithoutSpouse: 6, secondLang: 1, spousePoints: 1, label: "CLB 5" },
  { value: "C", clbScore: 6, firstLangWithSpouse: 8, firstLangWithoutSpouse: 9, secondLang: 1, spousePoints: 1, label: "CLB 6" },
  { value: "D", clbScore: 7, firstLangWithSpouse: 16, firstLangWithoutSpouse: 17, secondLang: 3, spousePoints: 3, label: "CLB 7" },
  { value: "E", clbScore: 8, firstLangWithSpouse: 22, firstLangWithoutSpouse: 23, secondLang: 3, spousePoints: 3, label: "CLB 8" },
  { value: "F", clbScore: 9, firstLangWithSpouse: 29, firstLangWithoutSpouse: 31, secondLang: 6, spousePoints: 5, label: "CLB 9" },
  { value: "G", clbScore: 10, firstLangWithSpouse: 32, firstLangWithoutSpouse: 34, secondLang: 6, spousePoints: 5, label: "CLB 10 or higher" },
  { value: "H", clbScore: 10, firstLangWithSpouse: 32, firstLangWithoutSpouse: 34, secondLang: 6, spousePoints: 5, label: "CLB 10 or higher" }
];

// CELPIP-G test scores (score levels 4-12)
export const celpipScores: TestScores = {
  "A": { speaking: "M, 0-3", listening: "M, 0-3", reading: "M, 0-3", writing: "M, 0-3" },
  "B": { speaking: "4", listening: "4", reading: "4", writing: "4" },
  "C": { speaking: "5", listening: "5", reading: "5", writing: "5" },
  "D": { speaking: "6", listening: "6", reading: "6", writing: "6" },
  "E": { speaking: "7", listening: "7", reading: "7", writing: "7" },
  "F": { speaking: "8", listening: "8", reading: "8", writing: "8" },
  "G": { speaking: "9", listening: "9", reading: "9", writing: "9" },
  "H": { speaking: "10, 11, 12", listening: "10, 11, 12", reading: "10, 11, 12", writing: "10, 11, 12" }
};

// IELTS test scores (band scores 0-9.0)
export const ieltsScores: TestScores = {
  "A": { speaking: "0-3.5", listening: "0-4.0", reading: "0-3.0", writing: "0-3.5" },
  "B": { speaking: "4.0-4.5", listening: "4.5", reading: "3.5", writing: "4.0-4.5" },
  "C": { speaking: "5.0", listening: "5.0", reading: "4.0-4.5", writing: "5.0" },
  "D": { speaking: "5.5", listening: "5.5", reading: "5.0-5.5", writing: "5.5" },
  "E": { speaking: "6.0", listening: "6.0-7.0", reading: "6.0", writing: "6.0" },
  "F": { speaking: "6.5", listening: "7.5", reading: "6.5", writing: "6.5" },
  "G": { speaking: "7.0", listening: "8.0", reading: "7.0-7.5", writing: "7.0" },
  "H": { speaking: "7.5-9.0", listening: "8.5-9.0", reading: "8.0-9.0", writing: "7.5-9.0" }
};

// TEF Canada test scores (numeric ranges)
export const tefScores: TestScores = {
  "A": { speaking: "0-180", listening: "0-144", reading: "0-120", writing: "0-180" },
  "B": { speaking: "181-225", listening: "145-180", reading: "121-150", writing: "181-225" },
  "C": { speaking: "226-270", listening: "181-216", reading: "151-180", writing: "226-270" },
  "D": { speaking: "271-309", listening: "217-248", reading: "181-206", writing: "271-309" },
  "E": { speaking: "310-348", listening: "249-279", reading: "207-232", writing: "310-348" },
  "F": { speaking: "349-370", listening: "280-297", reading: "233-247", writing: "349-370" },
  "G": { speaking: "371-392", listening: "298-315", reading: "248-262", writing: "371-392" },
  "H": { speaking: "393-450", listening: "316-360", reading: "263-300", writing: "393-450" }
};

// TCF Canada test scores (numeric ranges)
export const tcfScores: TestScores = {
  "A": { speaking: "0-3", listening: "0-330", reading: "0-341", writing: "0-3" },
  "B": { speaking: "4-5", listening: "331-368", reading: "342-374", writing: "4-5" },
  "C": { speaking: "6", listening: "369-397", reading: "375-405", writing: "6" },
  "D": { speaking: "7-9", listening: "398-457", reading: "406-452", writing: "7-9" },
  "E": { speaking: "10-11", listening: "458-502", reading: "453-498", writing: "10-11" },
  "F": { speaking: "12-13", listening: "503-522", reading: "499-523", writing: "12-13" },
  "G": { speaking: "14-15", listening: "523-548", reading: "524-548", writing: "14-15" },
  "H": { speaking: "16-20", listening: "549-699", reading: "549-699", writing: "16-20" }
};

// PTE Core test scores (numeric ranges 0-90)
export const pteScores: TestScores = {
  "A": { speaking: "0-41", listening: "0-27", reading: "0-32", writing: "0-40" },
  "B": { speaking: "42-50", listening: "28-38", reading: "33-41", writing: "41-50" },
  "C": { speaking: "51-58", listening: "39-49", reading: "42-50", writing: "51-59" },
  "D": { speaking: "59-67", listening: "50-59", reading: "51-59", writing: "60-68" },
  "E": { speaking: "68-75", listening: "60-70", reading: "60-68", writing: "69-78" },
  "F": { speaking: "76-83", listening: "71-81", reading: "69-77", writing: "79-87" },
  "G": { speaking: "84-88", listening: "82-88", reading: "78-87", writing: "88-89" },
  "H": { speaking: "89-90", listening: "89-90", reading: "88-90", writing: "90" }
};

// Helper function to get the appropriate test scores based on test type
export const getTestScores = (testType: string): TestScores => {
  switch (testType) {
    case 'A': return celpipScores;
    case 'B': return ieltsScores;
    case 'C': return tefScores;
    case 'D': return tcfScores;
    case 'E': return pteScores;
    default: return celpipScores;
  }
}; 