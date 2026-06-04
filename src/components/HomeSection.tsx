/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Feather, ArrowRight, Book, Sparkles, ChevronLeft, ChevronRight, User } from 'lucide-react';

interface HomeSectionProps {
  onStartAnalyze: () => void;
}

export default function HomeSection({ onStartAnalyze }: HomeSectionProps) {
  // Grammar Swipe Cards Data
  const grammars = [
    {
      author: "이상",
      work: "날개 (Wings, 1936)",
      quote: "날개야 다시 돋아라. 날자. 날자. 날자. 한 번만 더 날자꾸나. 한 번만 더 날아 보자꾸나.",
      emo1: "불안 43%",
      col1: "bg-ink border border-soft-border",
      emo2: "고요 21%",
      col2: "bg-receipt border border-soft-border text-ink",
      gauge: "평균 문장 8.2자",
      silhouette: "비대칭 비정형 레이어드 컷 / 리넨 & 코튼",
      nouns: "거울, 방, 날개, 아스피린",
      theme: "심리적 비정형"
    },
    {
      author: "윤동주",
      work: "서시 (Prologue, 1941)",
      quote: "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다.",
      emo1: "참회 52%",
      col1: "bg-denim text-paper",
      emo2: "별빛 28%",
      col2: "bg-gold text-ink",
      gauge: "평균 문장 14.5자",
      silhouette: "차분하고 흩날리는 와이드 아웃라인 / 소프트 울 & 크레이프 소작",
      nouns: "부끄러움, 바람, 별, 밤",
      theme: "청교도적 정화"
    },
    {
      author: "알베르 카뮈",
      work: "이방인 (The Stranger, 1942)",
      quote: "오늘 엄마가 죽었다. 아니, 어쩌면 어제였는지도 모른다.",
      emo1: "부조리 65%",
      col1: "bg-paper-dark text-ink",
      emo2: "태양 30%",
      col2: "bg-burgundy text-paper",
      gauge: "평균 문장 7.2자",
      silhouette: "단색의 견고한 직선적 칼라 칼라(Collar) / 마른 크라프트 코튼",
      nouns: "태양, 해변, 단총, 방관",
      theme: "허무주의적 건조"
    },
    {
      author: "프란츠 카프카",
      work: "변신 (The Metamorphosis, 1915)",
      quote: "어느 날 아침 그레고르 잠자가 불안한 꿈에서 깨어났을 때, 그는 침대 속에서 거대한 갑충으로 변해 있었다.",
      emo1: "소외 58%",
      col1: "bg-[#2D2A26] text-paper",
      emo2: "경악 22%",
      col2: "bg-burgundy text-paper",
      gauge: "평균 문장 11.2자",
      silhouette: "벌룬 셰이프의 오버사이즈 고독 실루엣 / 헤링본 울 & 견직",
      nouns: "벽, 갑각, 불면, 고독",
      theme: "실존적 고립"
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  const nextGrammar = () => {
    setCurrentIdx((prev) => (prev + 1) % grammars.length);
  };

  const prevGrammar = () => {
    setCurrentIdx((prev) => (prev - 1 + grammars.length) % grammars.length);
  };

  return (
    <div className="space-y-16 py-8 animate-fade-in film-grain lattice-shadow">
      
      {/* 1. Brand Intro Section */}
      <section className="text-center max-w-4xl mx-auto px-4 mt-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <span className="h-[1px] w-12 bg-burgundy/30" />
          <Feather className="w-5 h-5 text-burgundy pulse-indicator" />
          <span className="h-[1px] w-12 bg-burgundy/30" />
        </div>

        <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-burgundy font-bold uppercase mb-4">
          — VOLUME I: SEOCHON ATELIER ARCHIVE —
        </p>

        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-ink leading-[1.25] tracking-tight mb-8">
          “당신의 옷장과 책장이 <br className="sm:hidden" />
          같은 언어로 연결됩니다.”
        </h2>

        <p className="text-[#635F57] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-serif tracking-wide mb-10 border-l border-r border-[#D9CFBE] px-6 py-2">
          우리가 입는 오늘의 의복은 단지 표면의 직조가 아닌, 매 순간 써내려 간 사색의 단락입니다.<br className="hidden sm:inline" />
          오늘 당신이 고른 색채의 온도, 선의 아웃라인, 감촉의 단면을 고전의 문장으로 해설해 드립니다.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onStartAnalyze}
            id="start-analyze-cta"
            className="group relative flex items-center justify-center space-x-3 bg-burgundy text-paper px-10 py-5 rounded-none font-serif text-lg font-medium hover:bg-ink hover:text-paper shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Feather className="w-5 h-5" />
            <span>오늘의 착장 서평 자아내기</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            <div className="absolute -top-[5px] -left-[5px] w-2.5 h-2.5 bg-paper border border-burgundy rounded-none rotate-45" />
            <div className="absolute -bottom-[5px] -right-[5px] w-2.5 h-2.5 bg-paper border border-burgundy rounded-none rotate-45" />
          </button>
        </div>
      </section>

      {/* 2. Hero: 오늘의 아카이브 레지던트 (이상) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="border border-soft-border bg-receipt/80 backdrop-blur-sm p-6 sm:p-10 rounded-none relative shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-4 left-6 font-mono text-[9px] text-[#868A91] tracking-widest uppercase">
            TODAY'S RESIDENT CLASSIC
          </div>
          <div className="absolute top-4 right-6 bg-burgundy text-paper text-[9px] font-mono uppercase px-2 py-0.5 font-bold">
            CURATOR PICKS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-6">
            {/* Writer portrait in film grain */}
            <div className="md:col-span-5 relative group">
              <div className="aspect-[4/5] overflow-hidden border border-soft-border bg-ink relative shadow-inner">
                {/* Vintage dark photo representation with film overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-ink via-transparent to-paper/20 z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(rgba(139,44,44,0.15)_1.5px,transparent_1.5px)] [background-size:12px_12px]" />
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
                  alt="Yi Sang 1930s avant garde vibe portrait"
                  className="w-full h-full object-cover filter grayscale sepia brightness-90 contrast-120 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Monogram Seal */}
                <div className="absolute bottom-4 right-4 w-11 h-11 bg-burgundy/95 flex flex-col items-center justify-center border-2 border-paper/40 text-paper z-20 font-serif rounded-none shadow-md transform rotate-[-4deg] outline outline-1 outline-offset-1 outline-burgundy/40">
                  <span className="text-xs font-bold font-serif leading-none">李箱</span>
                  <span className="text-[7px] font-mono uppercase tracking-tight scale-75 -mt-0.5">SEAL</span>
                </div>
              </div>
              <div className="text-center font-mono text-[10px] text-silver mt-2">
                [ 1930s Avant-Garde Portrait, Yi Sang Archive ]
              </div>
            </div>

            {/* Content info */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-[11px] text-burgundy tracking-widest block uppercase font-bold">
                  RESIDENT WRITER: 이상 (Yi Sang, 1910–1937)
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-ink leading-tight">
                  박제된 기형의 옷감에 <br className="sm:hidden" />날개를 달아내다
                </h3>
              </div>

              <blockquote className="font-serif text-sm sm:text-base leading-relaxed text-[#1A1814] italic bg-paper-dark/30 p-5 border-l-2 border-burgundy font-medium">
                "박제가 되어버린 천재를 아시오? 나는 이따금 이 거울 속의 또 다른 나와 대조해 보곤 하오... <br className="sm:inline hidden" />두 어깨 위에 돋아 올려졌던 아바타같은 날개가 활활 타버린 고해 속에서, 한 번만 더 날아보자꾸나."
                <cite className="block text-right text-[11px] font-mono text-silver font-semibold mt-2 font-normal not-italic">
                  — 이상, 《날개 (Wings)》 편서 발췌
                </cite>
              </blockquote>

              <p className="text-sm font-serif text-[#635F57] leading-relaxed">
                모두가 획일적이고 평범한 직선에 머물 때, 이상 작가는 전위적인 비대칭 실루엣과 찢겨진 문단의 구조로 불안과 분열을 아름다운 사유로 지어냈습니다. 당신이 고른 기하학적 비정형의 코트나 크림 빛 리네 아틀리에 의류는 이미 1930년대 그의 은밀한 거울 속 사색과 일치할지 모릅니다.
              </p>

              <button
                onClick={onStartAnalyze}
                className="inline-flex items-center space-x-2 border border-burgundy text-burgundy hover:bg-burgundy hover:text-paper px-5 py-2.5 font-serif text-xs font-bold tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>이상 작가의 옷장(사유) 대조하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Translating Grammars Slider Component (Swipe 카로스) */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-baseline border-b border-soft-border pb-3">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">동행 번역 문법표 (Grammar Library)</h3>
            <p className="text-[#8A857C] text-xs font-mono tracking-widest uppercase mt-0.5">Author's Curation Lexicon</p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button
              onClick={prevGrammar}
              className="w-10 h-10 border border-soft-border bg-receipt flex items-center justify-center hover:bg-paper-dark hover:border-ink transition-colors cursor-pointer"
              aria-label="이전 작가"
            >
              <ChevronLeft className="w-5 h-5 text-ink" />
            </button>
            <button
              onClick={nextGrammar}
              className="w-10 h-10 border border-soft-border bg-receipt flex items-center justify-center hover:bg-paper-dark hover:border-ink transition-colors cursor-pointer"
              aria-label="다음 작가"
            >
              <ChevronRight className="w-5 h-5 text-ink" />
            </button>
          </div>
        </div>

        {/* Swipe Card Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Left panel: Work profile */}
          <div className="md:col-span-4 bg-receipt border border-soft-border p-8 flex flex-col justify-between relative shadow-sm">
            <div className="absolute top-4 left-4 text-[9px] font-mono text-silver uppercase font-bold">
              LEXICON SYSTEM VOL. {currentIdx + 1}
            </div>
            
            <div className="space-y-6 pt-4">
              <div>
                <span className="font-mono text-xs text-burgundy font-bold uppercase tracking-wider block">
                  {grammars[currentIdx].theme}
                </span>
                <h4 className="font-serif text-3xl font-extrabold text-ink mt-1">
                  {grammars[currentIdx].author}
                </h4>
                <p className="font-serif text-sm text-[#8A857C] italic mt-0.5">
                  《{grammars[currentIdx].work}》
                </p>
              </div>

              <blockquote className="font-serif text-xs text-ink-muted leading-relaxed italic border-l-2 border-soft-border pl-3">
                "{grammars[currentIdx].quote}"
              </blockquote>
            </div>

            <div className="pt-6 border-t border-soft-border">
              <span className="font-mono text-[9px] text-[#8A857C]/80 uppercase block">REPRESENTATIVE NOUNS</span>
              <p className="font-serif text-sm font-bold text-ink mt-1">
                {grammars[currentIdx].nouns}
              </p>
            </div>
          </div>

          {/* Right panel: Formula rules */}
          <div className="md:col-span-8 bg-paper-dark/25 border border-soft-border p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-soft-border pb-3">
                <span className="font-serif text-sm font-bold text-ink">정량적 변수 번역 방식</span>
                <span className="font-mono text-xs text-burgundy font-medium bg-receipt px-2.5 py-0.5 border border-soft-border">
                  100% Deterministic Engine
                </span>
              </div>

              {/* Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Emo Variable 1 on Palette */}
                <div className="space-y-2.5 bg-receipt p-4 border border-soft-border">
                  <span className="font-mono text-[10px] text-[#A0A5AD] uppercase block">
                    1. 감정 핵심 명사 대조 → 색상 채도
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className={`w-7 h-7 rounded-none ${grammars[currentIdx].col1} shrink-0 shadow-sm border border-soft-border/60`} />
                    <div>
                      <span className="font-serif text-sm font-bold text-ink">{grammars[currentIdx].emo1}</span>
                      <p className="font-serif text-[11px] text-ink-muted">메인 무드 보정 염료 배합</p>
                    </div>
                  </div>
                </div>

                {/* Emo Variable 2 */}
                <div className="space-y-2.5 bg-receipt p-4 border border-soft-border">
                  <span className="font-mono text-[10px] text-[#A0A5AD] uppercase block">
                    2. 감정 보조 어휘 → 액센트 색상
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className={`w-7 h-7 rounded-none ${grammars[currentIdx].col2} shrink-0 shadow-sm border border-soft-border/60`} />
                    <div>
                      <span className="font-serif text-sm font-bold text-ink">{grammars[currentIdx].emo2}</span>
                      <p className="font-serif text-[11px] text-ink-muted">보조 무드 색반 조화율</p>
                    </div>
                  </div>
                </div>

                {/* Avg Sentence Length */}
                <div className="space-y-2 bg-receipt p-4 border border-soft-border sm:col-span-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-[#A0A5AD] uppercase">
                      3. 작품 평균 문장의 길이 → 의복 사조 실루엣 매핑
                    </span>
                    <span className="font-mono text-[10px] text-burgundy font-semibold">
                      {grammars[currentIdx].gauge}
                    </span>
                  </div>
                  
                  {/* Gauge indicator */}
                  <div className="w-full bg-paper p-1 border border-soft-border shrink-0">
                    <div 
                      className="bg-burgundy h-1.5 transition-all duration-500" 
                      style={{ 
                        width: `${Math.min((parseFloat(grammars[currentIdx].gauge.replace(/[^0-9.]/g, '')) / 20) * 100, 100)}%` 
                      }} 
                    />
                  </div>
                  <p className="font-serif text-xs text-ink-muted pt-1">
                    <strong className="text-ink">최종 감정 실루엣: </strong> {grammars[currentIdx].silhouette}
                  </p>
                </div>

              </div>
            </div>

            <div className="pt-6 border-t border-soft-border flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="font-serif text-xs text-ink-muted leading-tight text-center sm:text-left">
                이 문법은 카뮈의 《이방인》 속 태양이나 윤동주의 부끄러움 비율을 감정하여 매핑합니다.
              </span>
              <button
                onClick={onStartAnalyze}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-ink text-paper hover:bg-burgundy px-5 py-2.5 font-serif text-xs font-bold uppercase transition-colors rounded-none whitespace-nowrap cursor-pointer"
              >
                <span>이 문법으로 의상 조율하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Steps / Core Guide Concept */}
      <section className="bg-paper-dark/30 border-y border-soft-border py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="font-mono text-[9px] text-burgundy tracking-widest uppercase font-bold block mb-1">
              THE PILGRIMAGE PATH
            </span>
            <h3 className="font-serif text-2xl font-bold text-ink">아카이브 서촌의 동행 방식</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-receipt border border-soft-border p-6 rounded-none relative group hover:border-[#8A857C] transition-all">
              <span className="font-mono text-[9px] text-[#A0A5AD] absolute top-4 right-4">ACT I</span>
              <div className="w-10 h-10 border border-soft-border bg-paper flex items-center justify-center text-burgundy font-serif font-bold text-sm mb-4">
                01
              </div>
              <h4 className="font-serif text-lg font-bold text-ink mb-2">착장의 기탁</h4>
              <p className="text-ink-muted text-xs leading-relaxed font-serif">
                오늘의 복식 전신 사진(OOTD)을 정각 엽서 분석기에 올려 소장권을 기명합니다. 보안 약조에 의해 연산 직후 기록은 즉시 휘발 소장됩니다.
              </p>
            </div>

            <div className="bg-receipt border border-soft-border p-6 rounded-none relative group hover:border-[#8A857C] transition-all">
              <span className="font-mono text-[9px] text-[#A0A5AD] absolute top-4 right-4">ACT II</span>
              <div className="w-10 h-10 border border-soft-border bg-paper flex items-center justify-center text-burgundy font-serif font-bold text-sm mb-4">
                02
              </div>
              <h4 className="font-serif text-lg font-bold text-ink mb-2">서촌 사서의 대조</h4>
              <p className="text-ink-muted text-xs leading-relaxed font-serif">
                옷깃의 염색 채도, 재봉선의 길이, 울과 리넨의 결감을 추정해 이상, 윤동주, 카뮈, 카프카 등 고전 전적의 어휘 빈도와 조율하여 감문 엽서를 작성합니다.
              </p>
            </div>

            <div className="bg-receipt border border-soft-border p-6 rounded-none relative group hover:border-[#8A857C] transition-all">
              <span className="font-mono text-[9px] text-[#A0A5AD] absolute top-4 right-4">ACT III</span>
              <div className="w-10 h-10 border border-soft-border bg-paper flex items-center justify-center text-burgundy font-serif font-bold text-sm mb-4">
                03
              </div>
              <h4 className="font-serif text-lg font-bold text-ink mb-2">실물 서간 매칭 여정</h4>
              <p className="text-ink-muted text-xs leading-relaxed font-serif">
                감정된 결과 엽서를 지참하시고 인근 동업 독립 책방인 '경복궁 책방', '서촌그책방'을 방문하시면 고서 시구 실물 보정 도장 소인 혜택을 드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Delicate Poetic Philosophy Footer */}
      <section className="bg-ink text-paper py-16 px-4 text-center relative overflow-hidden torn-bottom">
        <div className="max-w-xl mx-auto space-y-4">
          <Book className="w-6 h-6 text-burgundy mx-auto pulse-indicator" />
          <blockquote className="font-serif text-base sm:text-lg leading-relaxed text-paper-cream font-medium">
            "독서가 고독에 질감을 더하는 원사의 소품질이라면,<br />
            의복은 우리의 생각들이 마침내 골목과 조우하기 위해 걸쳐낸 육필 문장이다."
          </blockquote>
          <p className="text-[10px] font-mono tracking-[0.2em] text-[#8A857C] uppercase">
            — 서촌 필운대로 정각에서 편찬 —
          </p>
        </div>
      </section>

    </div>
  );
}
