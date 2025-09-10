
// Add the content property to your QuranPage interface in quran-data.ts

export interface QuranPage {
  page: number;
  surahId: number;
  startAyah: number;
  endAyah: number;
  juz: number;
  hizb: number;
  content?: string; // Add this optional property
  memorizationStats?: {
    attempts: number;
    errors: number;
    score: number;
    lastRead?: Date;
  };
}

export interface Surah {
    id:number ;
    sura_no: number;
    name: string;
    name_ar: string;
    name_en: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
    pages: number[];
    memorizationStats?: {
      completedPages: number;
      totalScore: number;
      masteryPercentage: number;
      lastRead?: Date;
    };
  }
  
  export interface QuranPage {
    page: number;
    surahId: number;
    startAyah: number;
    endAyah: number;
    juz: number;
    hizb: number;
    memorizationStats?: {
      attempts: number;
      errors: number;
      score: number;
      lastRead?: Date;
    };
  }
  
 
  
  export const QURAN_PAGES: QuranPage[] = [
    // Add these to the QURAN_PAGES array in quran-data.ts
// Example entries for Surah Al-An'am (id: 6) pages
 
{
  page: 1,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 1,
    errors: 2,
    score: 3
  }
},
{
  page: 2,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 10
  }
},
{
  page: 3,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 2
  }
},
{
  page: 4,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 15
  }
},
{
  page: 5,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 30
  }
},
{
  page: 6,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 80
  }
},
{
  page: 7,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 90
  }
},
{
  page: 8,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 100
  }
},
{
  page: 9,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 70
  }
},
{
  page: 10,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 60
  }
},
{
  page: 11,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 50
  }
},
{
  page: 12,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 80
  }
},
{
  page: 13,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 30
  }
},
{
  page: 14,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 100
  }
},
{
  page: 15,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 70
  }
},
{
  page: 16,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 80
  }
},
{
  page: 17,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 60
  }
},
{
  page: 18,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 30
  }
},
{
  page: 19,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 20
  }
},
{
  page: 20,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 10
  }
},
{
  page: 21,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 100
  }
},
{
  page: 22,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 80
  }
},

{
  page: 23,
  surahId: 6,
  startAyah: 11,
  endAyah: 20,
  juz: 7,
  hizb: 14,
  memorizationStats: {
    attempts: 0,
    errors: 0,
    score: 10
  }
},



// Continue for all 20 pages (128-147)
    {
      page: 1,
      surahId: 1,
      startAyah: 1,
      endAyah: 7,
      juz: 1,
      hizb: 1,
      memorizationStats: {
        attempts: 5,
        errors: 0,
        score: 95,
        lastRead: new Date("2024-03-20")
      }
    },
    {
      page: 2,
      surahId: 2,
      startAyah: 1,
      endAyah: 5,
      juz: 1,
      hizb: 1,
      memorizationStats: {
        attempts: 4,
        errors: 2,
        score: 85,
        lastRead: new Date("2024-03-22")
      }
    },
    {
      page: 3,
      surahId: 2,
      startAyah: 6,
      endAyah: 16,
      juz: 1,
      hizb: 1,
      memorizationStats: {
        attempts: 3,
        errors: 1,
        score: 90,
        lastRead: new Date("2024-03-23")
      }
    },
    {
      page: 106,
      surahId: 5,
      startAyah: 83,
      endAyah: 96,
      juz: 7,
      hizb: 13,
      memorizationStats: {
        attempts: 2,
        errors: 1,
        score: 90,
        lastRead: new Date("2024-03-25")
      }
    },
    {
      page: 107,
      surahId: 5,
      startAyah: 97,
      endAyah: 108,
      juz: 7,
      hizb: 13,
      memorizationStats: {
        attempts: 1,
        errors: 0,
        score: 95,
        lastRead: new Date("2024-03-25")
      }
    },
    // Add more pages here
  ];