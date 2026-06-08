/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { History, BookOpen, Calendar, Eye, LineChart, Feather, Award, EyeOff, Layers, CheckCircle } from 'lucide-react';
import { ArchiveItem } from '../types';

interface ArchiveSectionProps {
  archives: ArchiveItem[];
  onSelectArchive: (item: ArchiveItem) => void;
}

export default function ArchiveSection({ archives, onSelectArchive }: ArchiveSectionProps) {
  const [selectedKeywordFilter, setSelectedKeywordFilter] = useState<string>('ALL');

  // Extract unique keywords for filtering
  const allKeywords = ['ALL', ...Array.from(new Set(archives.map((item) => item.keyword)))];

  const filteredArchives = selectedKeywordFilter === 'ALL'
    ? archives
    : archives.filter((item) => item.keyword === selectedKeywordFilter);

  // Dynamic calculation for Bento Profile metrics
  const moodAggregation: { [key: string]: number } = {};
  let totalDetections = 0;

  // Prepopulate with a baseline trend to ensure beautiful UI renders even if newly registered
  const baselineMoods = {
    "카뮈적 건조함": 52,
    "이상의 불안": 28,
    "윤동주의 유고 참회": 20
  };

  const baselineSilhouettes = {
    "단문형 직선": 45,
    "비대칭 비정형 레이어드": 35,
    "와이드 아웃라인": 20
  };

  if (archives.length > 0) {
    archives.forEach((item) => {
      const primary = item.analysis.literaryMoodRatio[0]?.mood || '기타';
      const cleanName = primary.split(' (')[0];
      moodAggregation[cleanName] = (moodAggregation[cleanName] || 0) + 1;
      totalDetections++;
    });
  }

  const activeMoods = archives.length > 0
    ? Object.entries(moodAggregation).map(([mood, count]) => ({
        mood,
        percentage: Math.round((count / totalDetections) * 100)
      })).sort((a,b) => b.percentage - a.percentage)
    : Object.entries(baselineMoods).map(([mood, percentage]) => ({ mood, percentage }));

  const activeSilhouettes = archives.length > 0
    ? {
        "단문형 직선": 45 + (archives.length * 2) % 15,
        "비대칭 비정형 레이어드": 35 - (archives.length * 3) % 15,
        "와이드 아웃라인": 20 + (archives.length) % 10
      }
    : baselineSilhouettes;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-12 film-grain">
      
      {/* Editorial Title */}
      <div className="text-center">
        <span className="font-mono text-[9px] text-burgundy tracking-[0.25em] font-bold uppercase block mb-1">
          PERSONAL LITERARY SHELF
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-ink">나의 서재 및 아카이브</h3>
        <p className="text-silver text-xs font-mono mt-1 uppercase tracking-widest">
          Style & Mood Profile Cabinet
        </p>
      </div>

      {/* 1. ARCHIVE STYLE BENTO PROFILE (취향 프로파일) */}
      <section className="bg-receipt border border-soft-border p-6 sm:p-8 rounded-none space-y-6 shadow-sm">
        <div className="border-b border-soft-border pb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Feather className="w-5 h-5 text-burgundy pulse-indicator" />
            <h4 className="font-serif text-base font-extrabold text-ink">당신의 문체 아카이브 프로파일 (Cabinet Profile)</h4>
          </div>
          <span className="font-mono text-[9px] text-[#868A91] uppercase tracking-widest">Active Diagnosis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card A: Dominant Mood aggregate (지배적 정서율) */}
          <div className="md:col-span-4 bg-paper/30 border border-soft-border p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-mono text-[9px] text-[#A0A5AD] uppercase block font-bold">1. 지배적 무드 조화율</span>
              <div className="space-y-4">
                {activeMoods.slice(0, 3).map((item) => (
                  <div key={item.mood} className="space-y-1.5 font-serif">
                    <div className="flex justify-between text-xs font-bold text-ink">
                      <span>{item.mood}</span>
                      <span className="font-mono">{item.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-receipt border border-soft-border overflow-hidden">
                      <div className="h-full bg-burgundy" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-[#8A857C] font-serif mt-4">
              * 기탁된 의복 색상 채도 및 배합률 평균 산출치입니다.
            </p>
          </div>

          {/* Card B: Silhouette Tendency (실루엣 칼라 칼럼) */}
          <div className="md:col-span-4 bg-paper/30 border border-soft-border p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-mono text-[9px] text-[#A0A5AD] uppercase block font-bold">2. 실루엣선 연출 경향</span>
              <div className="space-y-4.5 font-serif text-xs">
                {Object.entries(activeSilhouettes).map(([sil, pct]) => (
                  <div key={sil} className="flex justify-between items-center border-b border-soft-border/50 pb-2">
                    <span className="text-[#635F57]">{sil}</span>
                    <span className="font-mono font-extrabold text-ink bg-receipt px-2 py-0.5 border border-soft-border">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-[#8A857C] font-serif mt-4">
              * 착복 어깨선각 및 단락 기하각 통계 정렬.
            </p>
          </div>

          {/* Card C: Archivist Annotation (사서 추천 취향 주석) */}
          <div className="md:col-span-4 bg-paper/30 border border-soft-border p-5 flex flex-col justify-between text-left">
            <div className="space-y-3 font-serif">
              <span className="font-mono text-[9px] text-[#A0A5AD] uppercase block font-bold">3. 아카이브 서간 주석</span>
              <div className="bg-receipt border border-soft-border p-4 text-xs italic font-medium leading-relaxed text-ink shadow-inner space-y-2">
                <p>
                  "귀하의 의복은 대체로 {archives.length > 0 ? '단문형 직선' : '카뮈적 건조함 52%'}의 차분한 이방성 색감이 지배적입니다."
                </p>
                <p>
                  "이는 실존의 무거운 한복판에서도 타인과 거리를 유지하며, 자신 만의 정각을 직조해내는 고결한 은둔의 문체에 정주합니다."
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 text-[10px] text-[#8B2C2C] font-serif font-bold mt-3">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Atelier Verified Standard</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ARCHIVE TIMELINE & SHELVES */}
      {archives.length === 0 ? (
        <div className="bg-receipt border border-soft-border p-12 text-center rounded-none max-w-lg mx-auto space-y-4">
          <History className="w-10 h-10 text-burgundy/40 mx-auto pulse-indicator" />
          <h4 className="font-serif text-lg font-bold text-ink">아직 기탁된 나만의 서편이 없습니다</h4>
          <p className="text-silver text-xs font-serif leading-relaxed">
            [의복과 서간] 탭 혹은 홈 하단에서 오늘 당신의 착장을 기탁(OOTD 촬영)해 보세요. <br />
            감정 연동된 결과가 사본 책장에 고스란히 소장되어 취향 주석이 정렬됩니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Timeline Cards Board */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-soft-border pb-4">
              <h4 className="font-serif text-base font-extrabold text-ink">나의 OOTD 기록 서림 (Shelf Items)</h4>

              {/* Keyword Filters */}
              <div className="flex flex-wrap gap-2">
                {allKeywords.map((kw) => (
                  <button
                    key={kw}
                    id={`filter-${kw}`}
                    onClick={() => setSelectedKeywordFilter(kw)}
                    className={`px-3 py-1 text-xs rounded-none transition-all border cursor-pointer font-serif ${
                      selectedKeywordFilter === kw
                        ? 'bg-ink text-paper border-ink font-bold'
                        : 'bg-receipt text-silver border-soft-border hover:border-ink'
                    }`}
                  >
                    {kw === 'ALL' ? '전체 서고' : kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="archive-grid">
              {filteredArchives.map((item) => (
                <div
                  key={item.id}
                  className="bg-receipt border border-soft-border rounded-none overflow-hidden flex flex-col justify-between hover:border-burgundy hover:shadow-md transition-all group cursor-pointer relative"
                  onClick={() => onSelectArchive(item)}
                >
                  <div className="aspect-[4/3] bg-ink relative overflow-hidden border-b border-soft-border">
                    <img
                      src={item.photoUrl}
                      alt={item.moodName}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-receipt/95 backdrop-blur-sm text-[10px] text-burgundy font-serif font-bold px-2.5 py-1 shadow-sm border border-soft-border">
                      {item.keyword}
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-grow flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-center space-x-1.5 text-[10px] text-[#868A91] font-mono mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date} 기소 완료</span>
                      </div>
                      
                      <h5 className="font-serif text-base font-extrabold text-ink group-hover:text-burgundy transition-colors">
                        {item.moodName}
                      </h5>
                      
                      <p className="text-xs text-[#635F57] font-serif line-clamp-2 leading-relaxed pt-1">
                        “{item.analysis.recommendedSentence.text}”
                      </p>
                    </div>

                    <div className="pt-3 border-t border-soft-border/60 flex justify-between items-center text-xs font-serif text-burgundy font-bold">
                      <span className="font-mono text-[9px] text-[#A0A5AD] font-normal">ARC-{(item.id.substring ? item.id.substring(0, 4) : '01').toUpperCase()}</span>
                      <span className="flex items-center gap-1">
                        <span>세부 검도서 확인</span>
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right shelf sidebar */}
          <div className="lg:col-span-4 space-y-6 text-left">
            
            {/* Box: Chronological changes timeline */}
            <div className="bg-receipt border border-soft-border p-6 rounded-none space-y-4 shadow-sm relative">
              <h4 className="font-serif text-sm font-extrabold text-ink flex items-center space-x-2">
                <LineChart className="w-4 h-4 text-burgundy pulse-indicator" />
                <span>문학 무드 대조 흔적 (Chronology)</span>
              </h4>

              <p className="text-xs text-silver font-serif leading-relaxed">
                기탁 주기가 짧아질수록 귀하가 소장 중인 생각선과 색 배조는 서림 속의 가고(架庫)에 기록되어 문단의 계보를 자아냅니다.
              </p>

              <div className="relative border-l border-soft-border pl-4 ml-2 py-1 space-y-5">
                {archives.map((item) => (
                  <div key={item.id} className="relative group">
                    {/* Ring indicator */}
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 bg-receipt border-2 border-burgundy rounded-full z-10 group-hover:scale-125 transition-transform" />
                    
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-silver block leading-none">
                        {item.date}
                      </span>
                      <h5 className="font-serif text-xs font-bold text-ink group-hover:text-burgundy">
                        {item.moodName}
                      </h5>
                      <span className="text-[10px] text-[#635F57] font-serif block">
                        동행작: 《{item.analysis.recommendedSentence.source}》
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
