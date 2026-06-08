/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MoodRatio {
  mood: string;
  percentage: number;
}

export interface RecommendedSentence {
  text: string;
  author: string;
  source: string;
}

export interface RecommendedBook {
  title: string;
  author: string;
  coverUrl: string;
  description: string;
}

export interface RecommendedAccessory {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  literarySource: string;
}

export interface OOTDAnalysisResult {
  literaryMoodRatio: MoodRatio[];
  colorInterpretation: string;
  silhouetteInterpretation: string;
  materialInterpretation: string;
  reasoning: string[]; // Must be exactly 3 lines/sentences
  recommendedSentence: RecommendedSentence;
  recommendedBook: RecommendedBook;
  recommendedAccessory: RecommendedAccessory;
  photoUrl: string;
  date: string;
}

export interface Product {
  id: string;
  title: string;
  literarySource: string;
  moodColor: string;
  price: number;
  imageUrl: string;
  shortDescription: string;
  category: 'accessory' | 'subscription' | 'goods';
}

export interface ArchiveItem {
  id: string;
  photoUrl: string;
  moodName: string; // E.g., "데미안의 청춘", "오만과 편견의 오후"
  date: string;
  keyword: string;
  analysis: OOTDAnalysisResult;
}

export interface Bookstore {
  name: string;
  address: string;
  description: string;
  theme: string;
  lat: number;
  lng: number;
}

export interface GrammarRule {
  id: string;
  fashionFeature: string; // e.g., "Muted Burgundy Color", "Oversized Wool Coat"
  literaryMood: string; // e.g., "상실과 낭만", "고독한 멜랑콜리"
  literaryWork: string; // e.g., "젊은 베르테르의 슬픔"
  description: string;
}
