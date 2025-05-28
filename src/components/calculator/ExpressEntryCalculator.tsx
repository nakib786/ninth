'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './calculator-styles.css';
import { 
  languageScoresBase, 
  getTestScores
} from './data/languageScores';
import { formatCRSResults, saveCRSResults } from './data/calculatorUtils';

// Express Entry scoring data from reference calculator
const ageScores = [
  { value: "A", label: "17 years of age or less", withSpousePoints: 0, withoutSpousePoints: 0 },
  { value: "B", label: "18 years of age", withSpousePoints: 90, withoutSpousePoints: 99 },
  { value: "C", label: "19 years of age", withSpousePoints: 95, withoutSpousePoints: 105 },
  { value: "D", label: "20 years of age", withSpousePoints: 100, withoutSpousePoints: 110 },
  { value: "E", label: "21 years of age", withSpousePoints: 100, withoutSpousePoints: 110 },
  { value: "F", label: "22 years of age", withSpousePoints: 100, withoutSpousePoints: 110 },
  { value: "G", label: "23 years of age", withSpousePoints: 100, withoutSpousePoints: 110 },
  { value: "H", label: "24 years of age", withSpousePoints: 100, withoutSpousePoints: 110 },
  { value: "I", label: "25 years of age", withSpousePoints: 100, withoutSpousePoints: 110 },
  { value: "J", label: "26 years of age", withSpousePoints: 100, withoutSpousePoints: 110 },
  { value: "K", label: "27 years of age", withSpousePoints: 100, withoutSpousePoints: 110 },
  { value: "L", label: "28 years of age", withSpousePoints: 100, withoutSpousePoints: 110 },
  { value: "M", label: "29 years of age", withSpousePoints: 100, withoutSpousePoints: 110 },
  { value: "N", label: "30 years of age", withSpousePoints: 95, withoutSpousePoints: 105 },
  { value: "O", label: "31 years of age", withSpousePoints: 90, withoutSpousePoints: 99 },
  { value: "P", label: "32 years of age", withSpousePoints: 85, withoutSpousePoints: 94 },
  { value: "Q", label: "33 years of age", withSpousePoints: 80, withoutSpousePoints: 88 },
  { value: "R", label: "34 years of age", withSpousePoints: 75, withoutSpousePoints: 83 },
  { value: "S", label: "35 years of age", withSpousePoints: 70, withoutSpousePoints: 77 },
  { value: "T", label: "36 years of age", withSpousePoints: 65, withoutSpousePoints: 72 },
  { value: "U", label: "37 years of age", withSpousePoints: 60, withoutSpousePoints: 66 },
  { value: "V", label: "38 years of age", withSpousePoints: 55, withoutSpousePoints: 61 },
  { value: "W", label: "39 years of age", withSpousePoints: 50, withoutSpousePoints: 55 },
  { value: "X", label: "40 years of age", withSpousePoints: 45, withoutSpousePoints: 50 },
  { value: "Y", label: "41 years of age", withSpousePoints: 35, withoutSpousePoints: 39 },
  { value: "Z", label: "42 years of age", withSpousePoints: 25, withoutSpousePoints: 28 },
  { value: "AA", label: "43 years of age", withSpousePoints: 15, withoutSpousePoints: 17 },
  { value: "AB", label: "44 years of age", withSpousePoints: 5, withoutSpousePoints: 6 },
  { value: "AC", label: "45 years of age or more", withSpousePoints: 0, withoutSpousePoints: 0 }
];

const educationScores = [
  { value: "A", label: "None, or less than secondary (high school)", withSpousePoints: 0, withoutSpousePoints: 0 },
  { value: "B", label: "Secondary diploma (high school graduation)", withSpousePoints: 28, withoutSpousePoints: 30 },
  { value: "C", label: "One-year program at a university, college, trade or technical school, or other institute", withSpousePoints: 84, withoutSpousePoints: 90 },
  { value: "D", label: "Two-year program at a university, college, trade or technical school, or other institute", withSpousePoints: 91, withoutSpousePoints: 98 },
  { value: "E", label: "Bachelor's degree (three or more year program at a university, college, trade or technical school, or other institute)", withSpousePoints: 112, withoutSpousePoints: 120 },
  { value: "F", label: "Two or more certificates, diplomas or degrees. One must be for a program of three or more years", withSpousePoints: 119, withoutSpousePoints: 128 },
  { value: "G", label: "Master's degree, or professional degree needed to practice in a licensed profession", withSpousePoints: 126, withoutSpousePoints: 135 },
  { value: "H", label: "Doctoral level university degree (PhD)", withSpousePoints: 140, withoutSpousePoints: 150 }
];

const languageScores = languageScoresBase;

const workExperienceScores = [
  { value: "A", label: "None or less than a year", withSpousePoints: 0, withoutSpousePoints: 0 },
  { value: "B", label: "1 year", withSpousePoints: 35, withoutSpousePoints: 40 },
  { value: "C", label: "2 years", withSpousePoints: 46, withoutSpousePoints: 53 },
  { value: "D", label: "3 years", withSpousePoints: 56, withoutSpousePoints: 64 },
  { value: "E", label: "4 years", withSpousePoints: 63, withoutSpousePoints: 72 },
  { value: "F", label: "5 years or more", withSpousePoints: 70, withoutSpousePoints: 80 },
];

const canadianWorkExperienceScores = [
  { value: "A", label: "None", withSpousePoints: 0, withoutSpousePoints: 0 },
  { value: "B", label: "1 year", withSpousePoints: 35, withoutSpousePoints: 40 },
  { value: "C", label: "2 years", withSpousePoints: 46, withoutSpousePoints: 53 },
  { value: "D", label: "3 years", withSpousePoints: 56, withoutSpousePoints: 64 },
  { value: "E", label: "4 years", withSpousePoints: 63, withoutSpousePoints: 72 },
  { value: "F", label: "5 years or more", withSpousePoints: 70, withoutSpousePoints: 80 },
];

const expressEntryFactors = [
  {
    id: 'maritalStatus',
    name: '1) What is your marital status?',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'F', label: 'Annulled Marriage' },
      { value: 'B', label: 'Common-Law' },
      { value: 'C', label: 'Divorced / Separated' },
      { value: 'D', label: 'Legally Separated' },
      { value: 'E', label: 'Married' },
      { value: 'A', label: 'Never Married / Single' },
      { value: 'G', label: 'Widowed' },
    ],
  },
  {
    id: 'spouseCitizenship',
    name: '2) i. Is your spouse or common-law partner a citizen or permanent resident of Canada?',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'No' },
      { value: 'B', label: 'Yes' },
    ],
  },
  {
    id: 'spouseAccompanying',
    name: '2) ii. Will your spouse or common-law partner come with you to Canada?',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'No' },
      { value: 'B', label: 'Yes' },
    ],
  },
  {
    id: 'age',
    name: '3) How old are you?',
    description: 'Choose the best answer:\n- If you\'ve been invited to apply, enter your age on the date you were invited.\n- If you plan to complete an Express Entry profile, enter your current age.',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...ageScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'education',
    name: '4) What is your level of education?',
    description: 'Enter the highest level of education for which you:\n- earned a Canadian degree, diploma or certificate or\n- had an Educational Credential Assessment (ECA) if you did your study outside Canada. (ECAs must be from an approved agency, in the last five years)',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...educationScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'canadianEducation',
    name: '4b) Have you earned a Canadian degree, diploma or certificate?',
    description: 'Note: to answer yes:\n- English or French as a Second Language must not have made up more than half your study\n- you must not have studied under an award that required you to return to your home country after graduation to apply your skills and knowledge\n- you must have studied at a school within Canada (foreign campuses don\'t count)\n- you had to be enrolled full time for at least eight months, unless you completed the study or training program (in whole or in part) between March 2020 and August 2022\n- you had to have been physically present in Canada for at least eight months, unless you completed the study or training program (in whole or in part) between March 2020 and August 2022',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'No' },
      { value: 'B', label: 'Yes' },
    ],
  },
  {
    id: 'canadianEducationLevel',
    name: '4c) Choose the best answer to describe this level of education.',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'Secondary (high school) or less' },
      { value: 'B', label: 'One- or two-year diploma or certificate' },
      { value: 'C', label: 'Degree, diploma or certificate of three years or longer OR a Master\'s, professional or doctoral degree of at least one academic year' },
    ],
  },
  {
    id: 'officialLanguages',
    name: '5) Official languages: Canada\'s official languages are English and French.',
    description: 'You need to submit language test results that are less than two years old for all programs under Express Entry, even if English or French is your first language.\nFor accurate scoring, make sure to select the correct test type and enter your exact scores from your official test results.',
    options: [],
  },
  {
    id: 'languageTest',
    name: 'i. Are your test results less than two years old?',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'Yes' },
      { value: 'B', label: 'No' },
    ],
  },
  {
    id: 'firstLanguageTest',
    name: 'ii. Which language test did you take for your first official language?',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'CELPIP-G' },
      { value: 'B', label: 'IELTS' },
      { value: 'E', label: 'PTE Core' },
      { value: 'C', label: 'TEF Canada' },
      { value: 'D', label: 'TCF Canada' },
    ],
  },
  {
    id: 'firstLanguageSpeaking',
    name: 'Speaking:',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...languageScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'firstLanguageListening',
    name: 'Listening:',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...languageScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'firstLanguageReading',
    name: 'Reading:',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...languageScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'firstLanguageWriting',
    name: 'Writing:',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...languageScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'secondLanguageTest',
    name: 'Do you have other language results?',
    description: 'If so, which language test did you take for your second official language?\nTest results must be less than two years old.',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'Yes' },
      { value: 'B', label: 'No' },
    ],
  },
  {
    id: 'secondLanguageType',
    name: 'Which test did you take?',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'CELPIP-G' },
      { value: 'B', label: 'IELTS' },
      { value: 'E', label: 'PTE Core' },
      { value: 'C', label: 'TEF Canada' },
      { value: 'D', label: 'TCF Canada' },
    ],
  },
  {
    id: 'secondLanguageSpeaking',
    name: 'Speaking:',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...languageScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'secondLanguageListening',
    name: 'Listening:',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...languageScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'secondLanguageReading',
    name: 'Reading:',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...languageScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'secondLanguageWriting',
    name: 'Writing:',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...languageScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'workExperience',
    name: '6) i. How many years of skilled work experience do you have?',
    description: 'Count work that was:\n- full-time (or an equal amount of part-time) AND\n- paid AND\n- in one occupation (NOC) AND\n- within the last 10 years AND\n- NOC skill type 0, A or B (TEER 0, 1, 2 or 3)',
    options: workExperienceScores.map(score => ({ value: score.value, label: score.label })),
  },
  {
    id: 'canadianWorkExperience',
    name: '6) ii. In the last 10 years, how many years of skilled work experience in Canada do you have?',
    description: 'It must have been paid and full-time (or an equal amount in part-time).\nYou must have been physically in Canada and working for a Canadian employer. This includes remote work.\n"Skilled work" in the NOC is TEER 0, 1, 2 or 3 category jobs.',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...canadianWorkExperienceScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'foreignWorkExperience',
    name: '6) iii. In the last 10 years, how many total years of foreign skilled work experience do you have?',
    description: 'It must have been paid, full-time (or an equal amount in part-time), and in only one occupation (NOC TEER category 0, 1, 2 or 3).',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'None or less than a year' },
      { value: 'B', label: '1 year' },
      { value: 'C', label: '2 years' },
      { value: 'D', label: '3 years or more' },
    ],
  },
  {
    id: 'certificate',
    name: '7) Do you have a certificate of qualification from a Canadian province, territory or federal body?',
    description: 'A certificate of qualification lets people work in some skilled trades in Canada. Only the provinces, territories and a federal body can issue these certificates. To get one, a person must have them assess their training, trade experience and skills to and then pass a certification exam.\nPeople usually have to go to the province or territory to be assessed. They may also need experience and training from an employer in Canada.\nThis isn\'t the same as a nomination from a province or territory.',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'No' },
      { value: 'B', label: 'Yes' },
    ],
  },
  {
    id: 'jobOffer',
    name: '8) Do you have a valid job offer supported by a Labour Market Impact Assessment (if needed)?',
    description: 'Note: As of March 25, 2025, job offer points have been removed from the Comprehensive Ranking System for current and future candidates in the Express Entry pool.',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'No' },
      { value: 'B', label: 'Yes' },
    ],
  },
  {
    id: 'nocJobOffer',
    name: 'Which NOC TEER is the job offer?',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'NOC TEER 0 Major group 00' },
      { value: 'B', label: 'NOC TEER 1, 2 or 3, or any TEER 0 other than Major group 00' },
    ],
  },
  {
    id: 'provincialNomination',
    name: '9) Do you have a nomination certificate from a province or territory?',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'No' },
      { value: 'B', label: 'Yes' },
    ],
  },
  {
    id: 'sibling',
    name: '10) Do you or your spouse or common law partner (if they will come with you to Canada) have at least one brother or sister living in Canada who is a citizen or permanent resident?',
    description: 'Note: to answer yes, the brother or sister must be:\n- 18 years old or older\n- related to you or your partner by blood, marriage, common-law partnership or adoption\n- have a parent in common with you or your partner\n\nA brother or sister is related to you by:\n- blood (biological)\n- adoption\n- marriage (step-brother or step-sister)',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'No' },
      { value: 'B', label: 'Yes' },
    ],
  },
  {
    id: 'spouseEducation',
    name: '11) What is the highest level of education for which your spouse or common-law partner\'s has:',
    description: '- earned a Canadian degree, diploma or certificate; or\n- had an Educational Credential Assessment (ECA)? (ECAs must be from an approved agency, in the last five years)',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'None, or less than secondary (high school)' },
      { value: 'B', label: 'Secondary diploma (high school graduation)' },
      { value: 'C', label: 'One-year program at a university, college, trade or technical school, or other institute' },
      { value: 'D', label: 'Two-year program at a university, college, trade or technical school, or other institute' },
      { value: 'E', label: 'Bachelor\'s degree (three or more year program at a university, college, trade or technical school, or other institute)' },
      { value: 'F', label: 'Two or more certificates, diplomas or degrees. One must be for a program of three or more years' },
      { value: 'G', label: 'Master\'s degree, or professional degree needed to practice in a licensed profession' },
      { value: 'H', label: 'Doctoral level university degree (PhD)' },
    ],
  },
  {
    id: 'spouseCanadianWorkExperience',
    name: '12) In the last 10 years, how many years of skilled work experience in Canada does your spouse/common-law partner have?',
    description: 'It must have been paid, full-time (or an equal amount in part-time), and in one or more NOC TEER category 0, 1, 2, or 3 jobs.\nThey must have been physically in Canada and working for a Canadian employer. This includes remote work.',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'None or less than a year' },
      { value: 'B', label: '1 year' },
      { value: 'C', label: '2 years' },
      { value: 'D', label: '3 years' },
      { value: 'E', label: '4 years' },
      { value: 'F', label: '5 years or more' },
    ],
  },
  {
    id: 'spouseLanguageTest',
    name: '13) Did your spouse or common-law partner take a language test? If so, which one?',
    description: 'Test results must be less than two years old.\nLanguage tests must be from an approved agency. If your spouse or common-law partner didn\'t take a test, select "not applicable".',
    options: [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'CELPIP-G' },
      { value: 'B', label: 'IELTS' },
      { value: 'E', label: 'PTE Core' },
      { value: 'C', label: 'TEF Canada' },
      { value: 'D', label: 'TCF Canada' },
      { value: 'F', label: 'not applicable' },
    ],
  },
  {
    id: 'spouseLanguageSpeaking',
    name: 'Speaking:',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...languageScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'spouseLanguageListening',
    name: 'Listening:',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...languageScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'spouseLanguageReading',
    name: 'Reading:',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...languageScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
  {
    id: 'spouseLanguageWriting',
    name: 'Writing:',
    options: [
      { value: 'badvalue', label: 'Select...' },
      ...languageScores.map(score => ({ value: score.value, label: score.label }))
    ],
  },
];

export default function ExpressEntryCalculator() {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [hasSpouse, setHasSpouse] = useState(false);
  const [breakdown, setBreakdown] = useState<Record<string, number>>({
    coreFactors: 0,
    spouseFactors: 0,
    skillTransferability: 0,
    additionalPoints: 0
  });
  const [selectedLanguageTest, setSelectedLanguageTest] = useState<string>('');
  const [selectedSecondLanguageTest, setSelectedSecondLanguageTest] = useState<string>('');
  const [selectedSpouseLanguageTest, setSelectedSpouseLanguageTest] = useState<string>('');
  const router = useRouter();
  
  const handleOptionSelect = (factorId: string, value: string) => {
    // Create new selections object with the updated value
    const newSelections = { ...selections, [factorId]: value };
    
    // Special handling for test type selection to track which test is selected
    if (factorId === 'firstLanguageTest') {
      setSelectedLanguageTest(value);
    } else if (factorId === 'secondLanguageType') {
      setSelectedSecondLanguageTest(value);
    } else if (factorId === 'spouseLanguageTest') {
      setSelectedSpouseLanguageTest(value);
    }
    
    // Special handling for marital status changes
    if (factorId === 'maritalStatus') {
      // If not married or common-law, reset spouse-related fields
      if (value !== 'E' && value !== 'B') {
        setHasSpouse(false);
        
        // Reset spouse-related selections
        const resetSelections = { ...newSelections };
        delete resetSelections.spouseCitizenship;
        delete resetSelections.spouseAccompanying;
        delete resetSelections.spouseEducation;
        delete resetSelections.spouseCanadianWorkExperience;
        delete resetSelections.spouseLanguageTest;
        delete resetSelections.spouseLanguageSpeaking;
        delete resetSelections.spouseLanguageListening;
        delete resetSelections.spouseLanguageReading;
        delete resetSelections.spouseLanguageWriting;
        
        setSelections(resetSelections);
        validateForm(resetSelections);
        return;
      }
    }
    
    // Special handling for spouse citizenship changes
    if (factorId === 'spouseCitizenship') {
      if (value === 'B') {
        // If spouse is Canadian, reset accompanying question
        const resetSelections = { ...newSelections };
        delete resetSelections.spouseAccompanying;
        setHasSpouse(false);
        setSelections(resetSelections);
        validateForm(resetSelections);
        return;
      }
    }
    
    // Special handling for spouse accompanying changes
    if (factorId === 'spouseAccompanying') {
      setHasSpouse(value === 'B');
      
      // If spouse is not accompanying, reset spouse-related fields
      if (value !== 'B') {
        const resetSelections = { ...newSelections };
        delete resetSelections.spouseEducation;
        delete resetSelections.spouseCanadianWorkExperience;
        delete resetSelections.spouseLanguageTest;
        delete resetSelections.spouseLanguageSpeaking;
        delete resetSelections.spouseLanguageListening;
        delete resetSelections.spouseLanguageReading;
        delete resetSelections.spouseLanguageWriting;
        
        setSelections(resetSelections);
        validateForm(resetSelections);
        return;
      }
    }
    
    // Special handling for language test changes
    if (factorId === 'languageTest' && value === 'B') {
      // If test results are not less than 2 years old, reset language-related fields
      const resetSelections = { ...newSelections };
      delete resetSelections.firstLanguageTest;
      delete resetSelections.firstLanguageSpeaking;
      delete resetSelections.firstLanguageListening;
      delete resetSelections.firstLanguageReading;
      delete resetSelections.firstLanguageWriting;
      delete resetSelections.secondLanguageTest;
      delete resetSelections.secondLanguageType;
      delete resetSelections.secondLanguageSpeaking;
      delete resetSelections.secondLanguageListening;
      delete resetSelections.secondLanguageReading;
      delete resetSelections.secondLanguageWriting;
      
      setSelections(resetSelections);
      validateForm(resetSelections);
      return;
    }
    
    // Special handling for second language test changes
    if (factorId === 'secondLanguageTest' && value === 'B') {
      // If no second language test, reset second language fields
      const resetSelections = { ...newSelections };
      delete resetSelections.secondLanguageType;
      delete resetSelections.secondLanguageSpeaking;
      delete resetSelections.secondLanguageListening;
      delete resetSelections.secondLanguageReading;
      delete resetSelections.secondLanguageWriting;
      
      setSelections(resetSelections);
      validateForm(resetSelections);
      return;
    }
    
    // Special handling for spouse language test changes
    if (factorId === 'spouseLanguageTest' && value === 'F') {
      // If spouse language test is not applicable, reset spouse language fields
      const resetSelections = { ...newSelections };
      delete resetSelections.spouseLanguageSpeaking;
      delete resetSelections.spouseLanguageListening;
      delete resetSelections.spouseLanguageReading;
      delete resetSelections.spouseLanguageWriting;
      
      setSelections(resetSelections);
      validateForm(resetSelections);
      return;
    }
    
    // Special handling for first language test selection
    if (factorId === 'firstLanguageTest') {
      // Reset second language related fields when first language changes
      const resetSelections = { ...newSelections };
      delete resetSelections.secondLanguageTest;
      delete resetSelections.secondLanguageType;
      delete resetSelections.secondLanguageSpeaking;
      delete resetSelections.secondLanguageListening;
      delete resetSelections.secondLanguageReading;
      delete resetSelections.secondLanguageWriting;
      
      setSelections(resetSelections);
      validateForm(resetSelections);
      return;
    }
    
    // Update selections and validate form
    setSelections(newSelections);
    validateForm(newSelections);
  };
  
  const validateForm = (currentSelections: Record<string, string>) => {
    // Start by assuming the form is valid
    let isValid = true;
    
    // Get all visible questions based on current selections
    const visibleFactors = expressEntryFactors.filter(factor => 
      isQuestionVisible(factor.id, currentSelections)
    );
    
    // Check if all visible questions have valid answers
    for (const factor of visibleFactors) {
      // Skip factors that don't need validation (like section headers)
      if (factor.id === 'officialLanguages') continue;
      
      // Check if this factor has a valid selection
      const value = currentSelections[factor.id];
      if (!value || value === 'badvalue') {
        isValid = false;
        break;
      }
    }
    
    // Update button state
    setIsButtonDisabled(!isValid);
  };
  
  // Determine if question should be visible based on given selections
  const isQuestionVisible = (factorId: string, currentSelections = selections) => {
    // Always show first question (marital status)
    if (factorId === 'maritalStatus') return true;

    // Spouse citizenship question - only if married/common-law
    if (factorId === 'spouseCitizenship') {
      return currentSelections.maritalStatus === 'E' || currentSelections.maritalStatus === 'B';
    }

    // Spouse accompanying question - only if spouse is not Canadian PR/citizen
    if (factorId === 'spouseAccompanying') {
      return (currentSelections.maritalStatus === 'E' || currentSelections.maritalStatus === 'B') && 
             currentSelections.spouseCitizenship === 'A';
    }
    
    // Determine if user has a spouse coming to Canada (for spouse section)
    const hasSpouseAccompanying = 
      (currentSelections.maritalStatus === 'E' || currentSelections.maritalStatus === 'B') && 
      currentSelections.spouseCitizenship === 'A' &&
      currentSelections.spouseAccompanying === 'B';
    
    // Age question - show once marital status is answered
    if (factorId === 'age') {
      if (currentSelections.maritalStatus === 'E' || currentSelections.maritalStatus === 'B') {
        if (currentSelections.spouseCitizenship === 'A') {
          return currentSelections.spouseAccompanying !== undefined && 
                 currentSelections.spouseAccompanying !== 'badvalue';
        }
        return currentSelections.spouseCitizenship !== undefined && 
               currentSelections.spouseCitizenship !== 'badvalue';
      }
      return currentSelections.maritalStatus !== undefined && 
             currentSelections.maritalStatus !== 'badvalue' &&
             currentSelections.maritalStatus !== 'E' &&
             currentSelections.maritalStatus !== 'B';
    }

    // Education question - show once age is selected
    if (factorId === 'education') {
      return currentSelections.age !== undefined && 
             currentSelections.age !== 'badvalue';
    }

    // Canadian education question - show once education is selected
    if (factorId === 'canadianEducation') {
      return currentSelections.education !== undefined && 
             currentSelections.education !== 'badvalue';
    }

    // Canadian education level - show only if they have Canadian education
    if (factorId === 'canadianEducationLevel') {
      return currentSelections.canadianEducation === 'B';
    }

    // Special handling for official languages intro
    if (factorId === 'officialLanguages') {
      return currentSelections.canadianEducation !== undefined && 
             currentSelections.canadianEducation !== 'badvalue';
    }
    
    // Language test question - show after official languages intro
    if (factorId === 'languageTest') {
      return currentSelections.canadianEducation !== undefined && 
             currentSelections.canadianEducation !== 'badvalue';
    }

    // First language test type - show if test results are less than 2 years old
    if (factorId === 'firstLanguageTest') {
      return currentSelections.languageTest === 'A';
    }

    // First language scores - show once test type is selected
    if (factorId === 'firstLanguageSpeaking') {
      return currentSelections.firstLanguageTest !== undefined && 
             currentSelections.firstLanguageTest !== 'badvalue';
    }
    
    // Hide other first language test fields since they're rendered together
    if (factorId.startsWith('firstLanguage') && factorId !== 'firstLanguageTest' && factorId !== 'firstLanguageSpeaking') {
      return false;
    }

    // Second language test question - show once first language scores are entered
    if (factorId === 'secondLanguageTest') {
      return currentSelections.firstLanguageSpeaking !== undefined && 
             currentSelections.firstLanguageSpeaking !== 'badvalue' &&
             currentSelections.firstLanguageListening !== undefined && 
             currentSelections.firstLanguageListening !== 'badvalue' &&
             currentSelections.firstLanguageReading !== undefined && 
             currentSelections.firstLanguageReading !== 'badvalue' &&
             currentSelections.firstLanguageWriting !== undefined && 
             currentSelections.firstLanguageWriting !== 'badvalue';
    }

    // Second language type and scores - show if they took second language test
    if (factorId === 'secondLanguageType') {
      return currentSelections.secondLanguageTest === 'A';
    }

    if (factorId === 'secondLanguageSpeaking') {
      return currentSelections.secondLanguageType !== undefined && 
             currentSelections.secondLanguageType !== 'badvalue';
    }
    
    // Hide other second language test fields since they're rendered together
    if (factorId.startsWith('secondLanguage') && 
        factorId !== 'secondLanguageTest' && 
        factorId !== 'secondLanguageType' &&
        factorId !== 'secondLanguageSpeaking') {
      return false;
    }

    // Work experience - show once language questions are answered
    if (factorId === 'workExperience') {
      if (currentSelections.secondLanguageTest === 'A') {
        return currentSelections.secondLanguageSpeaking !== undefined && 
               currentSelections.secondLanguageSpeaking !== 'badvalue' &&
               currentSelections.secondLanguageListening !== undefined && 
               currentSelections.secondLanguageListening !== 'badvalue' &&
               currentSelections.secondLanguageReading !== undefined && 
               currentSelections.secondLanguageReading !== 'badvalue' &&
               currentSelections.secondLanguageWriting !== undefined && 
               currentSelections.secondLanguageWriting !== 'badvalue';
      } else {
        return currentSelections.secondLanguageTest === 'B';
      }
    }

    // Canadian work experience - show once work experience is selected
    if (factorId === 'canadianWorkExperience') {
      return currentSelections.workExperience !== undefined && 
             currentSelections.workExperience !== 'badvalue';
    }

    // Foreign work experience - show once Canadian work experience is selected
    if (factorId === 'foreignWorkExperience') {
      return currentSelections.canadianWorkExperience !== undefined && 
             currentSelections.canadianWorkExperience !== 'badvalue';
    }

    // Certificate of qualification - show once foreign work experience is selected
    if (factorId === 'certificate') {
      return currentSelections.foreignWorkExperience !== undefined && 
             currentSelections.foreignWorkExperience !== 'badvalue';
    }

    // Job offer - show once certificate question is answered
    if (factorId === 'jobOffer') {
      return currentSelections.certificate !== undefined && 
             currentSelections.certificate !== 'badvalue';
    }

    // NOC job offer - show only if they have a job offer
    if (factorId === 'nocJobOffer') {
      return currentSelections.jobOffer === 'B';
    }

    // Provincial nomination - show once job offer questions are answered
    if (factorId === 'provincialNomination') {
      if (currentSelections.jobOffer === 'B') {
        return currentSelections.nocJobOffer !== undefined && 
               currentSelections.nocJobOffer !== 'badvalue';
      } else {
        return currentSelections.jobOffer === 'A';
      }
    }

    // Sibling question - show once provincial nomination is answered
    if (factorId === 'sibling') {
      return currentSelections.provincialNomination !== undefined && 
             currentSelections.provincialNomination !== 'badvalue';
    }

    // Spouse section questions - only show if user has spouse accompanying
    if (factorId === 'spouseEducation') {
      return hasSpouseAccompanying && 
             currentSelections.sibling !== undefined && 
             currentSelections.sibling !== 'badvalue';
    }
    
    // Spouse Canadian work experience - show after spouse education
    if (factorId === 'spouseCanadianWorkExperience') {
      return hasSpouseAccompanying && 
             currentSelections.spouseEducation !== undefined && 
             currentSelections.spouseEducation !== 'badvalue';
    }
    
    // Spouse language test - show after spouse work experience
    if (factorId === 'spouseLanguageTest') {
      return hasSpouseAccompanying && 
             currentSelections.spouseCanadianWorkExperience !== undefined && 
             currentSelections.spouseCanadianWorkExperience !== 'badvalue';
    }
    
    // Spouse language scores - show if spouse took a language test
    if (factorId === 'spouseLanguageSpeaking') {
      return hasSpouseAccompanying && 
             currentSelections.spouseLanguageTest !== undefined && 
             currentSelections.spouseLanguageTest !== 'badvalue' &&
             currentSelections.spouseLanguageTest !== 'F'; // Not "not applicable"
    }
    
    // Hide other spouse language test fields since they're rendered together
    if (factorId.startsWith('spouseLanguage') && 
        factorId !== 'spouseLanguageTest' && 
        factorId !== 'spouseLanguageSpeaking') {
      return false;
    }

    return false;
  };
  
  const calculateCRSScore = () => {
    // Determine if applicant has spouse accompanying
    const hasSpouseAccompanying = hasSpouse;
    
    // Calculate Core/Human Capital Factors
    let coreFactors = 0;
    
    // Age points
    if (selections.age !== undefined) {
      const ageValue = selections.age;
      const ageScore = ageScores.find(score => score.value === ageValue);
      if (ageScore) {
        coreFactors += hasSpouseAccompanying ? ageScore.withSpousePoints : ageScore.withoutSpousePoints;
      }
    }
    
    // Education points
    if (selections.education !== undefined) {
      const educationValue = selections.education;
      const educationScore = educationScores.find(score => score.value === educationValue);
      if (educationScore) {
        coreFactors += hasSpouseAccompanying ? educationScore.withSpousePoints : educationScore.withoutSpousePoints;
      }
    }
    
    // First Language points (each language skill)
    let firstLanguageTotal = 0;
    if (selections.firstLanguageSpeaking) {
      const speakingScore = languageScores.find(score => score.value === selections.firstLanguageSpeaking);
      const listeningScore = languageScores.find(score => score.value === selections.firstLanguageListening);
      const readingScore = languageScores.find(score => score.value === selections.firstLanguageReading);
      const writingScore = languageScores.find(score => score.value === selections.firstLanguageWriting);
      
      if (speakingScore) {
        firstLanguageTotal += hasSpouseAccompanying ? speakingScore.firstLangWithSpouse : speakingScore.firstLangWithoutSpouse;
        coreFactors += hasSpouseAccompanying ? speakingScore.firstLangWithSpouse : speakingScore.firstLangWithoutSpouse;
      }
      if (listeningScore) {
        firstLanguageTotal += hasSpouseAccompanying ? listeningScore.firstLangWithSpouse : listeningScore.firstLangWithoutSpouse;
        coreFactors += hasSpouseAccompanying ? listeningScore.firstLangWithSpouse : listeningScore.firstLangWithoutSpouse;
      }
      if (readingScore) {
        firstLanguageTotal += hasSpouseAccompanying ? readingScore.firstLangWithSpouse : readingScore.firstLangWithoutSpouse;
        coreFactors += hasSpouseAccompanying ? readingScore.firstLangWithSpouse : readingScore.firstLangWithoutSpouse;
      }
      if (writingScore) {
        firstLanguageTotal += hasSpouseAccompanying ? writingScore.firstLangWithSpouse : writingScore.firstLangWithoutSpouse;
        coreFactors += hasSpouseAccompanying ? writingScore.firstLangWithSpouse : writingScore.firstLangWithoutSpouse;
      }
    }
    
    // Second Language points (if applicable)
    let secondLanguagePoints = 0;
    if (selections.secondLanguageTest === 'A' && selections.secondLanguageSpeaking) {
      const speakingValue = selections.secondLanguageSpeaking;
      const listeningValue = selections.secondLanguageListening;
      const readingValue = selections.secondLanguageReading;
      const writingValue = selections.secondLanguageWriting;
      
      const speakingScore = languageScores.find(score => score.value === speakingValue);
      const listeningScore = languageScores.find(score => score.value === listeningValue);
      const readingScore = languageScores.find(score => score.value === readingValue);
      const writingScore = languageScores.find(score => score.value === writingValue);
      
      // Add second language points (each skill gets the secondLang points)
      if (speakingScore) secondLanguagePoints += speakingScore.secondLang;
      if (listeningScore) secondLanguagePoints += listeningScore.secondLang;
      if (readingScore) secondLanguagePoints += readingScore.secondLang;
      if (writingScore) secondLanguagePoints += writingScore.secondLang;
      
      // Cap second language points at 22 if spouse is accompanying
      if (hasSpouseAccompanying && secondLanguagePoints > 22) {
        secondLanguagePoints = 22;
      }
    }
    
    // Add second language points to core factors
    coreFactors += secondLanguagePoints;
    
    // Work Experience points
    if (selections.workExperience !== undefined) {
      const workExpValue = selections.workExperience;
      const workExpScore = workExperienceScores.find(score => score.value === workExpValue);
      if (workExpScore) {
        coreFactors += hasSpouseAccompanying ? workExpScore.withSpousePoints : workExpScore.withoutSpousePoints;
      }
    }
    
    // Canadian Work Experience
    if (selections.canadianWorkExperience !== undefined) {
      const canadianWorkExpValue = selections.canadianWorkExperience;
      const canadianWorkExpScore = canadianWorkExperienceScores.find(score => score.value === canadianWorkExpValue);
      if (canadianWorkExpScore) {
        coreFactors += hasSpouseAccompanying ? 
          canadianWorkExpScore.withSpousePoints : 
          canadianWorkExpScore.withoutSpousePoints;
      }
    }
    
    // Calculate Spouse Factors (if applicable)
    let spouseFactors = 0;
    
    // Spouse education
    let spouseEduPoints = 0;
    if (hasSpouseAccompanying && selections.spouseEducation) {
      const eduValue = selections.spouseEducation;
      const spouseEduPointsMap = {
        'A': 0, 'B': 2, 'C': 6, 'D': 7, 'E': 8, 'F': 9, 'G': 10, 'H': 10
      };
      spouseEduPoints = spouseEduPointsMap[eduValue as keyof typeof spouseEduPointsMap] || 0;
      spouseFactors += spouseEduPoints;
    }
    
    // Spouse Canadian work experience
    let spouseWorkExpPoints = 0;
    if (hasSpouseAccompanying && selections.spouseCanadianWorkExperience) {
      const workExpValue = selections.spouseCanadianWorkExperience;
      const spouseWorkPointsMap = {
        'A': 0, 'B': 5, 'C': 7, 'D': 8, 'E': 9, 'F': 10
      };
      spouseWorkExpPoints = spouseWorkPointsMap[workExpValue as keyof typeof spouseWorkPointsMap] || 0;
      spouseFactors += spouseWorkExpPoints;
    }
    
    // Spouse language skills
    let spouseLangPoints = 0;
    if (hasSpouseAccompanying && selections.spouseLanguageTest && selections.spouseLanguageTest !== 'F') {
      if (selections.spouseLanguageSpeaking) {
        const speakingScore = languageScores.find(score => score.value === selections.spouseLanguageSpeaking);
        const listeningScore = languageScores.find(score => score.value === selections.spouseLanguageListening);
        const readingScore = languageScores.find(score => score.value === selections.spouseLanguageReading);
        const writingScore = languageScores.find(score => score.value === selections.spouseLanguageWriting);
        
        if (speakingScore) spouseLangPoints += speakingScore.secondLang;
        if (listeningScore) spouseLangPoints += listeningScore.secondLang;
        if (readingScore) spouseLangPoints += readingScore.secondLang;
        if (writingScore) spouseLangPoints += writingScore.secondLang;
        
        spouseFactors += spouseLangPoints;
      }
    }
    
    // Calculate Skill Transferability Factors
    let skillTransferability = 0;
    
    // Get CLB scores for calculations
    const clbScores = {
      speaking: 0,
      listening: 0,
      reading: 0,
      writing: 0
    };
    
    if (selections.firstLanguageSpeaking) {
      const speakingScore = languageScores.find(score => score.value === selections.firstLanguageSpeaking);
      const listeningScore = languageScores.find(score => score.value === selections.firstLanguageListening);
      const readingScore = languageScores.find(score => score.value === selections.firstLanguageReading);
      const writingScore = languageScores.find(score => score.value === selections.firstLanguageWriting);
      
      if (speakingScore) clbScores.speaking = speakingScore.clbScore;
      if (listeningScore) clbScores.listening = listeningScore.clbScore;
      if (readingScore) clbScores.reading = readingScore.clbScore;
      if (writingScore) clbScores.writing = writingScore.clbScore;
    }
    
    // Education + Language - Factor A
    let educationA = 0;
    if (selections.education) {
      const educationValue = selections.education;
      
      // If education is none or secondary, no points
      if (educationValue === 'A' || educationValue === 'B') {
        educationA = 0;
      } 
      // If education is post-secondary 1-3 years
      else if (educationValue === 'C' || educationValue === 'D' || educationValue === 'E') {
        // Check if all CLB scores are 7 or higher
        if (clbScores.speaking >= 7 && clbScores.listening >= 7 && 
            clbScores.reading >= 7 && clbScores.writing >= 7) {
          // If all CLB scores are 9 or higher
          if (clbScores.speaking >= 9 && clbScores.listening >= 9 && 
              clbScores.reading >= 9 && clbScores.writing >= 9) {
            educationA = 25;
          } else {
            educationA = 13;
          }
        }
      }
      // If education is two or more degrees, master's, or PhD
      else if (educationValue === 'F' || educationValue === 'G' || educationValue === 'H') {
        // Check if all CLB scores are 7 or higher
        if (clbScores.speaking >= 7 && clbScores.listening >= 7 && 
            clbScores.reading >= 7 && clbScores.writing >= 7) {
          // If all CLB scores are 9 or higher
          if (clbScores.speaking >= 9 && clbScores.listening >= 9 && 
              clbScores.reading >= 9 && clbScores.writing >= 9) {
            educationA = 50;
          } else {
            educationA = 25;
          }
        }
      }
    }
    
    // Education + Canadian Work Experience - Factor B
    let educationB = 0;
    if (selections.education && selections.canadianWorkExperience) {
      const educationValue = selections.education;
      const canadianWorkExpValue = selections.canadianWorkExperience;
      
      // If education is none or secondary, no points
      if (educationValue === 'A' || educationValue === 'B') {
        educationB = 0;
      } 
      // If education is post-secondary 1-3 years
      else if (educationValue === 'C' || educationValue === 'D' || educationValue === 'E') {
        // If no Canadian work experience
        if (canadianWorkExpValue === 'A') {
          educationB = 0;
        } 
        // If 1 year of Canadian work experience
        else if (canadianWorkExpValue === 'B') {
          educationB = 13;
        } 
        // If more than 1 year
        else {
          educationB = 25;
        }
      }
      // If education is two or more degrees, master's, or PhD
      else if (educationValue === 'F' || educationValue === 'G' || educationValue === 'H') {
        // If no Canadian work experience
        if (canadianWorkExpValue === 'A') {
          educationB = 0;
        } 
        // If 1 year of Canadian work experience
        else if (canadianWorkExpValue === 'B') {
          educationB = 25;
        } 
        // If more than 1 year
        else {
          educationB = 50;
        }
      }
    }
    
    // Cap education transferability at 50
    const educationTransferability = Math.min(educationA + educationB, 50);
    
    // Foreign Work Experience + Language - Factor A
    let foreignExpA = 0;
    if (selections.foreignWorkExperience) {
      const foreignWorkExpValue = selections.foreignWorkExperience;
      
      // If no foreign work experience
      if (foreignWorkExpValue === 'A') {
        foreignExpA = 0;
      } 
      // If 1-2 years of foreign work experience
      else if (foreignWorkExpValue === 'B' || foreignWorkExpValue === 'C') {
        // Check if all CLB scores are 7 or higher
        if (clbScores.speaking >= 7 && clbScores.listening >= 7 && 
            clbScores.reading >= 7 && clbScores.writing >= 7) {
          // If all CLB scores are 9 or higher
          if (clbScores.speaking >= 9 && clbScores.listening >= 9 && 
              clbScores.reading >= 9 && clbScores.writing >= 9) {
            foreignExpA = 25;
          } else {
            foreignExpA = 13;
          }
        }
      }
      // If 3+ years of foreign work experience
      else if (foreignWorkExpValue === 'D') {
        // Check if all CLB scores are 7 or higher
        if (clbScores.speaking >= 7 && clbScores.listening >= 7 && 
            clbScores.reading >= 7 && clbScores.writing >= 7) {
          // If all CLB scores are 9 or higher
          if (clbScores.speaking >= 9 && clbScores.listening >= 9 && 
              clbScores.reading >= 9 && clbScores.writing >= 9) {
            foreignExpA = 50;
          } else {
            foreignExpA = 25;
          }
        }
      }
    }
    
    // Foreign Work Experience + Canadian Work Experience - Factor B
    let foreignExpB = 0;
    if (selections.foreignWorkExperience && selections.canadianWorkExperience) {
      const foreignWorkExpValue = selections.foreignWorkExperience;
      const canadianWorkExpValue = selections.canadianWorkExperience;
      
      // If no foreign work experience
      if (foreignWorkExpValue === 'A') {
        foreignExpB = 0;
      } 
      // If 1-2 years of foreign work experience
      else if (foreignWorkExpValue === 'B' || foreignWorkExpValue === 'C') {
        // If no Canadian work experience
        if (canadianWorkExpValue === 'A') {
          foreignExpB = 0;
        } 
        // If 1 year of Canadian work experience
        else if (canadianWorkExpValue === 'B') {
          foreignExpB = 13;
        } 
        // If more than 1 year
        else {
          foreignExpB = 25;
        }
      }
      // If 3+ years of foreign work experience
      else if (foreignWorkExpValue === 'D') {
        // If no Canadian work experience
        if (canadianWorkExpValue === 'A') {
          foreignExpB = 0;
        } 
        // If 1 year of Canadian work experience
        else if (canadianWorkExpValue === 'B') {
          foreignExpB = 25;
        } 
        // If more than 1 year
        else {
          foreignExpB = 50;
        }
      }
    }
    
    // Cap foreign experience transferability at 50
    const foreignExpTransferability = Math.min(foreignExpA + foreignExpB, 50);
    
    // Certificate of Qualification
    let certificatePoints = 0;
    if (selections.certificate === 'B') {
      // With good language (CLB 7+)
      if (clbScores.speaking >= 7 && clbScores.listening >= 7 && 
          clbScores.reading >= 7 && clbScores.writing >= 7) {
        certificatePoints = 50;
      } 
      // With moderate language (CLB 5+)
      else if (clbScores.speaking >= 5 && clbScores.listening >= 5 && 
               clbScores.reading >= 5 && clbScores.writing >= 5) {
        certificatePoints = 25;
      }
    }
    
    // Total skill transferability (capped at 100)
    skillTransferability = Math.min(educationTransferability + foreignExpTransferability + certificatePoints, 100);
    
    // Calculate Additional Points
    let additionalPoints = 0;
    
    // Provincial nomination (600 points)
    const provincialNominationPts = selections.provincialNomination === 'B' ? 600 : 0;
    additionalPoints += provincialNominationPts;
    
    // Canadian Education
    let canadianEduPts = 0;
    if (selections.canadianEducation === 'B' && selections.canadianEducationLevel) {
      if (selections.canadianEducationLevel === 'B') {
        canadianEduPts = 15;
      } else if (selections.canadianEducationLevel === 'C') {
        canadianEduPts = 30;
      }
      additionalPoints += canadianEduPts;
    }
    
    // Sibling in Canada
    const siblingPts = selections.sibling === 'B' ? 15 : 0;
    additionalPoints += siblingPts;
    
    // Job offer points - not implemented in this calculator version
    const jobOfferPts = 0;
    
    // French language skills
    let frenchBonus = 0;
    
    // Check if first language is French (TEF Canada or TCF Canada)
    const isFirstLangFrench = selections.firstLanguageTest === 'C' || selections.firstLanguageTest === 'D';
    const isSecondLangFrench = selections.secondLanguageTest === 'A' && 
                              (selections.secondLanguageType === 'C' || selections.secondLanguageType === 'D');
    
    if (isFirstLangFrench) {
      // Check if first language (French) CLB is 7+
      const frenchCLB = Math.min(
        clbScores.speaking,
        clbScores.listening,
        clbScores.reading,
        clbScores.writing
      );
      
      if (frenchCLB >= 7) {
        // If they also took English test
        if (selections.secondLanguageTest === 'A') {
          // Get English CLB
          const englishCLBs = [0, 0, 0, 0];
          
          if (selections.secondLanguageSpeaking) {
            const speakingScore = languageScores.find(score => score.value === selections.secondLanguageSpeaking);
            const listeningScore = languageScores.find(score => score.value === selections.secondLanguageListening);
            const readingScore = languageScores.find(score => score.value === selections.secondLanguageReading);
            const writingScore = languageScores.find(score => score.value === selections.secondLanguageWriting);
            
            if (speakingScore) englishCLBs[0] = speakingScore.clbScore;
            if (listeningScore) englishCLBs[1] = listeningScore.clbScore;
            if (readingScore) englishCLBs[2] = readingScore.clbScore;
            if (writingScore) englishCLBs[3] = writingScore.clbScore;
          }
          
          const minEnglishCLB = Math.min(...englishCLBs);
          
          // If English is CLB 5+
          if (minEnglishCLB >= 5) {
            frenchBonus = 50;
          }
        }
      }
    } 
    // If first language is not French, check if second language is French
    else if (isSecondLangFrench) {
      // Get French CLB from second language
      const frenchCLBs = [0, 0, 0, 0];
      
      if (selections.secondLanguageSpeaking) {
        const speakingScore = languageScores.find(score => score.value === selections.secondLanguageSpeaking);
        const listeningScore = languageScores.find(score => score.value === selections.secondLanguageListening);
        const readingScore = languageScores.find(score => score.value === selections.secondLanguageReading);
        const writingScore = languageScores.find(score => score.value === selections.secondLanguageWriting);
        
        if (speakingScore) frenchCLBs[0] = speakingScore.clbScore;
        if (listeningScore) frenchCLBs[1] = listeningScore.clbScore;
        if (readingScore) frenchCLBs[2] = readingScore.clbScore;
        if (writingScore) frenchCLBs[3] = writingScore.clbScore;
      }
      
      const minFrenchCLB = Math.min(...frenchCLBs);
      
      // If French is CLB 7+
      if (minFrenchCLB >= 7) {
        frenchBonus = 50;
      } 
      // If French is CLB 5-6
      else if (minFrenchCLB >= 5) {
        frenchBonus = 25;
      }
    }
    
    additionalPoints += frenchBonus;
    
    // Calculate Total CRS Score
    const totalCRSScore = coreFactors + spouseFactors + skillTransferability + additionalPoints;
    
    setTotalPoints(totalCRSScore);
    setBreakdown({
      coreFactors,
      spouseFactors,
      skillTransferability,
      additionalPoints
    });
    setShowResults(true);
    
    // Format and save the results
    const coreHumanCapitalFactors = {
      age: hasSpouseAccompanying ? 
        (ageScores.find(score => score.value === selections.age)?.withSpousePoints || 0) : 
        (ageScores.find(score => score.value === selections.age)?.withoutSpousePoints || 0),
      education: hasSpouseAccompanying ? 
        (educationScores.find(score => score.value === selections.education)?.withSpousePoints || 0) : 
        (educationScores.find(score => score.value === selections.education)?.withoutSpousePoints || 0),
      firstLanguage: firstLanguageTotal,
      secondLanguage: secondLanguagePoints,
      canadianWorkExperience: hasSpouseAccompanying ? 
        (canadianWorkExperienceScores.find(score => score.value === selections.canadianWorkExperience)?.withSpousePoints || 0) : 
        (canadianWorkExperienceScores.find(score => score.value === selections.canadianWorkExperience)?.withoutSpousePoints || 0),
      subtotal: coreFactors
    };
    
    const spouseFactorsResult = {
      education: spouseEduPoints,
      firstLanguage: spouseLangPoints,
      canadianWorkExperience: spouseWorkExpPoints,
      subtotal: spouseFactors
    };
    
    const skillTransferabilityFactors = {
      educationLanguage: educationA,
      educationWorkExperience: educationB,
      foreignWorkExperienceLanguage: foreignExpA,
      foreignWorkExperienceCanadian: foreignExpB,
      certificateOfQualification: certificatePoints,
      subtotal: skillTransferability
    };
    
    const additionalPointsResult = {
      provincialNomination: provincialNominationPts,
      jobOffer: jobOfferPts,
      canadianEducation: canadianEduPts,
      frenchLanguageSkills: frenchBonus,
      sibling: siblingPts,
      subtotal: additionalPoints
    };
    
    // Save results to localStorage
    const formattedResults = formatCRSResults(
      coreHumanCapitalFactors,
      spouseFactorsResult,
      skillTransferabilityFactors,
      additionalPointsResult,
      totalCRSScore
    );
    
    saveCRSResults(formattedResults);
    
    return {
      coreFactors,
      spouseFactors,
      skillTransferability,
      additionalPoints,
      totalCRSScore
    };
  };
  
  // Get question div ID based on factor ID
  const getQuestionDivId = (factorId: string): string => {
    const idMap: Record<string, string> = {
      'maritalStatus': 'q1',
      'spouseCitizenship': 'q2i-spouse-cit',
      'spouseAccompanying': 'q2ii-spouse-joining',
      'age': 'q3-age',
      'education': 'q4-education',
      'canadianEducation': 'q4b-education',
      'canadianEducationLevel': 'q4c-education',
      'officialLanguages': 'q5-ol',
      'languageTest': 'q5i-fol',
      'firstLanguageTest': 'q5i-a-fol',
      'firstLanguageSpeaking': 'q5i-b-fol',
      'secondLanguageTest': 'q5ii-sol',
      'secondLanguageType': 'q5ii-a-sol',
      'secondLanguageSpeaking': 'q5ii-b-sol',
      'workExperience': 'q6-work-xp',
      'canadianWorkExperience': 'q6i-canadian',
      'foreignWorkExperience': 'q6ii-foreign',
      'certificate': 'q7-certificate',
      'jobOffer': 'q8-offer',
      'nocJobOffer': 'q8-noc',
      'provincialNomination': 'q9-nomination',
      'sibling': 'q10-sibling',
      'spouseEducation': 'q10-s-education',
      'spouseCanadianWorkExperience': 'q11-s-work-xp',
      'spouseLanguageTest': 'q12-s-fol',
      'spouseLanguageSpeaking': 'q12ii-s-fol'
    };
    
    return idMap[factorId] || `q-${factorId}`;
  };
  
  // Get the available second language test options based on the first language selection
  const getSecondLanguageTypeOptions = () => {
    // If first language is English (CELPIP-G, IELTS, or PTE Core)
    if (selections.firstLanguageTest === 'A' || selections.firstLanguageTest === 'B' || selections.firstLanguageTest === 'E') {
      // Show only French tests
      return [
        { value: 'badvalue', label: 'Select...' },
        { value: 'C', label: 'TEF Canada' },
        { value: 'D', label: 'TCF Canada' },
      ];
    } 
    // If first language is French (TEF Canada or TCF Canada)
    else if (selections.firstLanguageTest === 'C' || selections.firstLanguageTest === 'D') {
      // Show only English tests
      return [
        { value: 'badvalue', label: 'Select...' },
        { value: 'A', label: 'CELPIP-G' },
        { value: 'B', label: 'IELTS' },
        { value: 'E', label: 'PTE Core' },
      ];
    } 
    // Default case
    return [
      { value: 'badvalue', label: 'Select...' },
      { value: 'A', label: 'CELPIP-G' },
      { value: 'B', label: 'IELTS' },
      { value: 'E', label: 'PTE Core' },
      { value: 'C', label: 'TEF Canada' },
      { value: 'D', label: 'TCF Canada' },
    ];
  };
  
  // Get language score label based on test type and score value
  const getLanguageScoreLabel = (testType: string, scoreValue: string, skillType: 'speaking' | 'listening' | 'reading' | 'writing'): string => {
    if (!testType || !scoreValue || scoreValue === 'badvalue') return 'Select...';
    
    const testScores = getTestScores(testType);
    return testScores[scoreValue]?.[skillType] || 'Select...';
  };
  
  const viewOfficialFormat = () => {
    router.push('/points-calculator/official-format');
  };
  
  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <div className="w-full">
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <h1 className="text-2xl md:text-3xl font-bold">Comprehensive Ranking System (CRS) Calculator</h1>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
                <p className="text-gray-700 dark:text-gray-300">This tool will help you calculate your Comprehensive Ranking System (CRS) score based on the answers you provide below.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <p className="text-gray-700 dark:text-gray-300"><strong>Legal disclaimer</strong></p>
                <p className="text-gray-700 dark:text-gray-300">This tool is intended solely for general guidance and reference purposes.</p>
                <p className="text-gray-700 dark:text-gray-300">In the event of any discrepancy between the results of this questionnaire and that provided by the Express Entry electronic system, the results provided by the system shall govern, in accordance with provisions of the <em>Immigration and Refugee Protection Act</em>, the <em>Immigration and Refugee Protection Regulations</em>, and Minister&apos;s Instructions issued under IRPA s.10.3.</p>
              </div>
              
              <div className="mb-8">
                <div className="space-y-8">
                  <form id="crs-form" className="wb-frmvld">
                    {expressEntryFactors.map((factor) => (
                      isQuestionVisible(factor.id) && (
                        <div key={factor.id} className="mb-4" id={getQuestionDivId(factor.id)}>
                          <div className="form-group">
                            {factor.id === 'officialLanguages' ? (
                              <>
                                <label className="form-label font-medium text-gray-800 dark:text-gray-100">
                                  <strong>{factor.name}</strong>
                                </label>
                                <p className="text-gray-700 dark:text-gray-300 small">
                                  {factor.description}
                                </p>
                              </>
                            ) : (
                              <>
                                <label htmlFor={factor.id} className="form-label font-medium text-gray-800 dark:text-gray-100">
                                  {factor.name}
                                </label>
                                
                                {factor.description && (
                                  <p className="text-gray-700 dark:text-gray-300 small">
                                    {factor.description.split('\n').map((line, i) => (
                                      <span key={i}>
                                        {line}
                                        {i < factor.description.split('\n').length - 1 && <br />}
                                      </span>
                                    ))}
                                  </p>
                                )}
                              </>
                            )}
                            
                            {/* Spouse section header */}
                            {factor.id === 'spouseEducation' && (
                              <div className="alert alert-info mt-4 mb-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                                <h4 className="alert-heading text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Spouse or Common-Law Partner Factors</h4>
                                <p className="mb-1 text-gray-700 dark:text-gray-300">These questions apply only if your spouse or common-law partner will come with you to Canada.</p>
                                <p className="mb-0 text-gray-700 dark:text-gray-300">To get an accurate score, make sure you answer all questions about your spouse.</p>
                              </div>
                            )}
                            
                            {/* Special handling for language test score sections */}
                            {factor.id === 'firstLanguageSpeaking' ? (
                              <div className="form-group">
                                <label className="form-label font-medium mb-3 text-gray-800 dark:text-gray-100">Enter your test scores:</label>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                  <div>
                                    <label htmlFor="firstLanguageSpeaking" className="form-label mb-2 text-gray-700 dark:text-gray-300">
                                      {selectedLanguageTest === 'A' ? 'CELPIP Speaking:' : 
                                       selectedLanguageTest === 'B' ? 'IELTS Speaking:' :
                                       selectedLanguageTest === 'C' ? 'TEF Speaking:' :
                                       selectedLanguageTest === 'D' ? 'TCF Speaking:' :
                                       selectedLanguageTest === 'E' ? 'PTE Speaking:' : 'Speaking:'}
                                    </label>
                                    <select
                                      id="firstLanguageSpeaking"
                                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                      value={selections.firstLanguageSpeaking || 'badvalue'}
                                      onChange={(e) => handleOptionSelect('firstLanguageSpeaking', e.target.value)}
                                    >
                                      <option value="badvalue">Select...</option>
                                      {languageScores.map((option) => (
                                        <option key={`firstLanguageSpeaking-${option.value}`} value={option.value}>
                                          {selectedLanguageTest ? 
                                            getLanguageScoreLabel(selectedLanguageTest, option.value, 'speaking') : 
                                            `CLB ${option.clbScore}`}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label htmlFor="firstLanguageListening" className="form-label mb-2 text-gray-700 dark:text-gray-300">
                                      {selectedLanguageTest === 'A' ? 'CELPIP Listening:' : 
                                       selectedLanguageTest === 'B' ? 'IELTS Listening:' :
                                       selectedLanguageTest === 'C' ? 'TEF Listening:' :
                                       selectedLanguageTest === 'D' ? 'TCF Listening:' :
                                       selectedLanguageTest === 'E' ? 'PTE Listening:' : 'Listening:'}
                                    </label>
                                    <select
                                      id="firstLanguageListening"
                                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                      value={selections.firstLanguageListening || 'badvalue'}
                                      onChange={(e) => handleOptionSelect('firstLanguageListening', e.target.value)}
                                    >
                                      <option value="badvalue">Select...</option>
                                      {languageScores.map((option) => (
                                        <option key={`firstLanguageListening-${option.value}`} value={option.value}>
                                          {selectedLanguageTest ? 
                                            getLanguageScoreLabel(selectedLanguageTest, option.value, 'listening') : 
                                            `CLB ${option.clbScore}`}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label htmlFor="firstLanguageReading" className="form-label mb-2 text-gray-700 dark:text-gray-300">
                                      {selectedLanguageTest === 'A' ? 'CELPIP Reading:' : 
                                       selectedLanguageTest === 'B' ? 'IELTS Reading:' :
                                       selectedLanguageTest === 'C' ? 'TEF Reading:' :
                                       selectedLanguageTest === 'D' ? 'TCF Reading:' :
                                       selectedLanguageTest === 'E' ? 'PTE Reading:' : 'Reading:'}
                                    </label>
                                    <select
                                      id="firstLanguageReading"
                                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                      value={selections.firstLanguageReading || 'badvalue'}
                                      onChange={(e) => handleOptionSelect('firstLanguageReading', e.target.value)}
                                    >
                                      <option value="badvalue">Select...</option>
                                      {languageScores.map((option) => (
                                        <option key={`firstLanguageReading-${option.value}`} value={option.value}>
                                          {selectedLanguageTest ? 
                                            getLanguageScoreLabel(selectedLanguageTest, option.value, 'reading') : 
                                            `CLB ${option.clbScore}`}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label htmlFor="firstLanguageWriting" className="form-label mb-2 text-gray-700 dark:text-gray-300">
                                      {selectedLanguageTest === 'A' ? 'CELPIP Writing:' : 
                                       selectedLanguageTest === 'B' ? 'IELTS Writing:' :
                                       selectedLanguageTest === 'C' ? 'TEF Writing:' :
                                       selectedLanguageTest === 'D' ? 'TCF Writing:' :
                                       selectedLanguageTest === 'E' ? 'PTE Writing:' : 'Writing:'}
                                    </label>
                                    <select
                                      id="firstLanguageWriting"
                                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                      value={selections.firstLanguageWriting || 'badvalue'}
                                      onChange={(e) => handleOptionSelect('firstLanguageWriting', e.target.value)}
                                    >
                                      <option value="badvalue">Select...</option>
                                      {languageScores.map((option) => (
                                        <option key={`firstLanguageWriting-${option.value}`} value={option.value}>
                                          {selectedLanguageTest ? 
                                            getLanguageScoreLabel(selectedLanguageTest, option.value, 'writing') : 
                                            `CLB ${option.clbScore}`}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            ) : factor.id === 'secondLanguageSpeaking' ? (
                              <div className="form-group">
                                <label className="form-label font-medium mb-3 text-gray-800 dark:text-gray-100">Enter your second language test scores:</label>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                  <div>
                                    <label htmlFor="secondLanguageSpeaking" className="form-label mb-2 text-gray-700 dark:text-gray-300">
                                      {selectedSecondLanguageTest === 'A' ? 'CELPIP Speaking:' : 
                                       selectedSecondLanguageTest === 'B' ? 'IELTS Speaking:' :
                                       selectedSecondLanguageTest === 'C' ? 'TEF Speaking:' :
                                       selectedSecondLanguageTest === 'D' ? 'TCF Speaking:' :
                                       selectedSecondLanguageTest === 'E' ? 'PTE Speaking:' : 'Speaking:'}
                                    </label>
                                    <select
                                      id="secondLanguageSpeaking"
                                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                      value={selections.secondLanguageSpeaking || 'badvalue'}
                                      onChange={(e) => handleOptionSelect('secondLanguageSpeaking', e.target.value)}
                                    >
                                      <option value="badvalue">Select...</option>
                                      {languageScores.map((option) => (
                                        <option key={`secondLanguageSpeaking-${option.value}`} value={option.value}>
                                          {selectedSecondLanguageTest ? 
                                            getLanguageScoreLabel(selectedSecondLanguageTest, option.value, 'speaking') : 
                                            `CLB ${option.clbScore}`}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label htmlFor="secondLanguageListening" className="form-label mb-2 text-gray-700 dark:text-gray-300">
                                      {selectedSecondLanguageTest === 'A' ? 'CELPIP Listening:' : 
                                       selectedSecondLanguageTest === 'B' ? 'IELTS Listening:' :
                                       selectedSecondLanguageTest === 'C' ? 'TEF Listening:' :
                                       selectedSecondLanguageTest === 'D' ? 'TCF Listening:' :
                                       selectedSecondLanguageTest === 'E' ? 'PTE Listening:' : 'Listening:'}
                                    </label>
                                    <select
                                      id="secondLanguageListening"
                                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                      value={selections.secondLanguageListening || 'badvalue'}
                                      onChange={(e) => handleOptionSelect('secondLanguageListening', e.target.value)}
                                    >
                                      <option value="badvalue">Select...</option>
                                      {languageScores.map((option) => (
                                        <option key={`secondLanguageListening-${option.value}`} value={option.value}>
                                          {selectedSecondLanguageTest ? 
                                            getLanguageScoreLabel(selectedSecondLanguageTest, option.value, 'listening') : 
                                            `CLB ${option.clbScore}`}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label htmlFor="secondLanguageReading" className="form-label mb-2 text-gray-700 dark:text-gray-300">
                                      {selectedSecondLanguageTest === 'A' ? 'CELPIP Reading:' : 
                                       selectedSecondLanguageTest === 'B' ? 'IELTS Reading:' :
                                       selectedSecondLanguageTest === 'C' ? 'TEF Reading:' :
                                       selectedSecondLanguageTest === 'D' ? 'TCF Reading:' :
                                       selectedSecondLanguageTest === 'E' ? 'PTE Reading:' : 'Reading:'}
                                    </label>
                                    <select
                                      id="secondLanguageReading"
                                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                      value={selections.secondLanguageReading || 'badvalue'}
                                      onChange={(e) => handleOptionSelect('secondLanguageReading', e.target.value)}
                                    >
                                      <option value="badvalue">Select...</option>
                                      {languageScores.map((option) => (
                                        <option key={`secondLanguageReading-${option.value}`} value={option.value}>
                                          {selectedSecondLanguageTest ? 
                                            getLanguageScoreLabel(selectedSecondLanguageTest, option.value, 'reading') : 
                                            `CLB ${option.clbScore}`}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label htmlFor="secondLanguageWriting" className="form-label mb-2 text-gray-700 dark:text-gray-300">
                                      {selectedSecondLanguageTest === 'A' ? 'CELPIP Writing:' : 
                                       selectedSecondLanguageTest === 'B' ? 'IELTS Writing:' :
                                       selectedSecondLanguageTest === 'C' ? 'TEF Writing:' :
                                       selectedSecondLanguageTest === 'D' ? 'TCF Writing:' :
                                       selectedSecondLanguageTest === 'E' ? 'PTE Writing:' : 'Writing:'}
                                    </label>
                                    <select
                                      id="secondLanguageWriting"
                                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                      value={selections.secondLanguageWriting || 'badvalue'}
                                      onChange={(e) => handleOptionSelect('secondLanguageWriting', e.target.value)}
                                    >
                                      <option value="badvalue">Select...</option>
                                      {languageScores.map((option) => (
                                        <option key={`secondLanguageWriting-${option.value}`} value={option.value}>
                                          {selectedSecondLanguageTest ? 
                                            getLanguageScoreLabel(selectedSecondLanguageTest, option.value, 'writing') : 
                                            `CLB ${option.clbScore}`}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            ) : factor.id === 'spouseLanguageSpeaking' ? (
                              <div className="form-group">
                                <label className="form-label font-medium mb-3 text-gray-800 dark:text-gray-100">Enter your spouse&apos;s test scores:</label>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                  <div>
                                    <label htmlFor="spouseLanguageSpeaking" className="form-label mb-2 text-gray-700 dark:text-gray-300">
                                      {selectedSpouseLanguageTest === 'A' ? 'CELPIP Speaking:' : 
                                       selectedSpouseLanguageTest === 'B' ? 'IELTS Speaking:' :
                                       selectedSpouseLanguageTest === 'C' ? 'TEF Speaking:' :
                                       selectedSpouseLanguageTest === 'D' ? 'TCF Speaking:' :
                                       selectedSpouseLanguageTest === 'E' ? 'PTE Speaking:' : 'Speaking:'}
                                    </label>
                                    <select
                                      id="spouseLanguageSpeaking"
                                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                      value={selections.spouseLanguageSpeaking || 'badvalue'}
                                      onChange={(e) => handleOptionSelect('spouseLanguageSpeaking', e.target.value)}
                                    >
                                      <option value="badvalue">Select...</option>
                                      {languageScores.map((option) => (
                                        <option key={`spouseLanguageSpeaking-${option.value}`} value={option.value}>
                                          {selectedSpouseLanguageTest ? 
                                            getLanguageScoreLabel(selectedSpouseLanguageTest, option.value, 'speaking') : 
                                            `CLB ${option.clbScore}`}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label htmlFor="spouseLanguageListening" className="form-label mb-2 text-gray-700 dark:text-gray-300">
                                      {selectedSpouseLanguageTest === 'A' ? 'CELPIP Listening:' : 
                                       selectedSpouseLanguageTest === 'B' ? 'IELTS Listening:' :
                                       selectedSpouseLanguageTest === 'C' ? 'TEF Listening:' :
                                       selectedSpouseLanguageTest === 'D' ? 'TCF Listening:' :
                                       selectedSpouseLanguageTest === 'E' ? 'PTE Listening:' : 'Listening:'}
                                    </label>
                                    <select
                                      id="spouseLanguageListening"
                                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                      value={selections.spouseLanguageListening || 'badvalue'}
                                      onChange={(e) => handleOptionSelect('spouseLanguageListening', e.target.value)}
                                    >
                                      <option value="badvalue">Select...</option>
                                      {languageScores.map((option) => (
                                        <option key={`spouseLanguageListening-${option.value}`} value={option.value}>
                                          {selectedSpouseLanguageTest ? 
                                            getLanguageScoreLabel(selectedSpouseLanguageTest, option.value, 'listening') : 
                                            `CLB ${option.clbScore}`}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label htmlFor="spouseLanguageReading" className="form-label mb-2 text-gray-700 dark:text-gray-300">
                                      {selectedSpouseLanguageTest === 'A' ? 'CELPIP Reading:' : 
                                       selectedSpouseLanguageTest === 'B' ? 'IELTS Reading:' :
                                       selectedSpouseLanguageTest === 'C' ? 'TEF Reading:' :
                                       selectedSpouseLanguageTest === 'D' ? 'TCF Reading:' :
                                       selectedSpouseLanguageTest === 'E' ? 'PTE Reading:' : 'Reading:'}
                                    </label>
                                    <select
                                      id="spouseLanguageReading"
                                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                      value={selections.spouseLanguageReading || 'badvalue'}
                                      onChange={(e) => handleOptionSelect('spouseLanguageReading', e.target.value)}
                                    >
                                      <option value="badvalue">Select...</option>
                                      {languageScores.map((option) => (
                                        <option key={`spouseLanguageReading-${option.value}`} value={option.value}>
                                          {selectedSpouseLanguageTest ? 
                                            getLanguageScoreLabel(selectedSpouseLanguageTest, option.value, 'reading') : 
                                            `CLB ${option.clbScore}`}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label htmlFor="spouseLanguageWriting" className="form-label mb-2 text-gray-700 dark:text-gray-300">
                                      {selectedSpouseLanguageTest === 'A' ? 'CELPIP Writing:' : 
                                       selectedSpouseLanguageTest === 'B' ? 'IELTS Writing:' :
                                       selectedSpouseLanguageTest === 'C' ? 'TEF Writing:' :
                                       selectedSpouseLanguageTest === 'D' ? 'TCF Writing:' :
                                       selectedSpouseLanguageTest === 'E' ? 'PTE Writing:' : 'Writing:'}
                                    </label>
                                    <select
                                      id="spouseLanguageWriting"
                                      className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                      value={selections.spouseLanguageWriting || 'badvalue'}
                                      onChange={(e) => handleOptionSelect('spouseLanguageWriting', e.target.value)}
                                    >
                                      <option value="badvalue">Select...</option>
                                      {languageScores.map((option) => (
                                        <option key={`spouseLanguageWriting-${option.value}`} value={option.value}>
                                          {selectedSpouseLanguageTest ? 
                                            getLanguageScoreLabel(selectedSpouseLanguageTest, option.value, 'writing') : 
                                            `CLB ${option.clbScore}`}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            ) : factor.id === 'secondLanguageType' ? (
                              <div className="mb-4">
                                <select
                                  id={factor.id}
                                  className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                  value={selections[factor.id] || 'badvalue'}
                                  onChange={(e) => handleOptionSelect(factor.id, e.target.value)}
                                >
                                  {getSecondLanguageTypeOptions().map((option) => (
                                    <option key={`${factor.id}-${option.value}`} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : factor.options && factor.options.length > 0 ? (
                              <div className="mb-4">
                                <select
                                  id={factor.id}
                                  className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                                  value={selections[factor.id] || 'badvalue'}
                                  onChange={(e) => handleOptionSelect(factor.id, e.target.value)}
                                >
                                  {factor.options.map((option) => (
                                    <option key={`${factor.id}-${option.value}`} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )
                    ))}
                    
                    {/* Submit Button */}
                    <div className="text-center mt-8">
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Please complete all required fields above before calculating your score.</p>
                      <button 
                        type="button" 
                        id="submit" 
                        className={`${isButtonDisabled 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'} 
                          text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200`}
                        onClick={calculateCRSScore}
                        disabled={isButtonDisabled}
                      >
                        Calculate your score
                      </button>
                    </div>
                  </form>
                  
                  {/* Results Section (Hidden by default) */}
                  {showResults && (
                    <div className="calculator-results py-6">
                      <h3 className="text-2xl font-bold mb-4">Your CRS Score</h3>
                      <div className="text-4xl font-bold text-blue-600 mb-6">{totalPoints}</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <h4 className="font-bold mb-2">Core/Human Capital Factors</h4>
                          <p className="text-2xl">{breakdown.coreFactors} points</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <h4 className="font-bold mb-2">Spouse Factors</h4>
                          <p className="text-2xl">{breakdown.spouseFactors} points</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <h4 className="font-bold mb-2">Skill Transferability</h4>
                          <p className="text-2xl">{breakdown.skillTransferability} points</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <h4 className="font-bold mb-2">Additional Points</h4>
                          <p className="text-2xl">{breakdown.additionalPoints} points</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={viewOfficialFormat}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-4"
                      >
                        View in Official IRCC Format
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 