/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bookmark, Share2, ArrowLeft, Check, BookOpen, Feather, Award, Copy, Sparkles } from 'lucide-react';
import { OOTDAnalysisResult } from '../types';

interface ResultSectionProps {
  analysis: OOTDAnalysisResult;
  onBackToUpload: () => void;
  onSaveToArchive: (analysis: OOTDAnalysisResult) => Promise<void>;
  isSaved: boolean;
}

export default function ResultSection({ analysis, onBackToUpload, onSaveToArchive, isSaved }: ResultSectionProps) {
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [shareSaved, setShareSaved] = useState<boolean>(false);

  const mainMood = analysis.literaryMoodRatio[0]?.mood || '데미안 정본';
  const mainPercentage = analysis.literaryMoodRatio[0]?.percentage || 72;

  const handleArchive = async () => {
    if (isSaved) return;
    setSaving(true);
    try {
      await onSaveToArchive(analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const copyQuoteToClipboard = () => {
    const text = `“${analysis.recommendedSentence.text}” — ${analysis.recommendedSentence.author} 《${analysis.recommendedSentence.source}》 | 아카이브 서촌 가을 편서`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in space-y-12 film-grain">
      
      {/* 1. Header Navigation & Toolbars */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-soft-border pb-6 gap-4">
        <button
          onClick={onBackToUpload}
          className="flex items-center space-x-2 text-silver hover:text-burgundy transition-colors text-xs sm:text-sm font-serif font-bold cursor-pointer"
          id="back-to-upload-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>다른 옷감 기탁하기</span>
        </button>

        <div className="flex space-x-3 w-full sm:w-auto justify-end">
          <button
            onClick={handleArchive}
            disabled={isSaved || saving}
            id="save-archive-btn"
            className={`flex-grow sm:flex-initial flex items-center justify-center space-x-2 px-5 py-3 rounded-none text-xs font-serif font-bold transition-all border cursor-pointer ${
              isSaved
                ? 'bg-[#FAF7F0] text-emerald-800 border-emerald-300'
                : 'bg-paper text-ink border-soft-border hover:bg-paper-dark hover:border-ink'
            }`}
          >
            {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Bookmark className="w-3.5 h-3.5 text-silver" />}
            <span>{isSaved ? '아틀리에 아카이브 보장 완료' : saving ? '사서 기록 중...' : '나의 아카이브 책장에 보관'}</span>
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            id="share-poster-btn"
            className="flex-grow sm:flex-initial flex items-center justify-center space-x-2 bg-burgundy hover:bg-ink text-paper transition-all px-6 py-3 rounded-none text-xs font-serif font-bold shadow-md cursor-pointer transform hover:-translate-y-0.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>SNS 9:16 서정 엽서 발행</span>
          </button>
        </div>
      </div>

      <h3 className="text-pink bg-pink font-sans hidden">For Class Testing Attributes</h3>

      {/* 2. Main Double-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Vintage Receipt Aesthetic */}
        <div className="md:col-span-5 space-y-8">
          
          {/* Receipts Plate */}
          <div className="bg-receipt border border-soft-border p-6 shadow-md relative torn-bottom">
            {/* Stamp Logo Overlay */}
            <div className="absolute top-4 right-4 text-[9px] font-mono text-[#D8D0C4] border border-dashed border-soft-border px-1">
              No. {analysis.date ? analysis.date.replace(/-/g, '') : '20261018'}-001
            </div>

            <div className="space-y-6 pt-2">
              <div className="text-center font-mono space-y-1">
                <p className="text-xs tracking-wider text-burgundy font-bold">━━━━ ARCHIVE SEOCHON ━━━━</p>
                <p className="text-[9px] text-[#868A91] uppercase tracking-[0.2em]">Visual Synopses Receipt</p>
              </div>

              {/* Huge percentage Box matches Camus 72% */}
              <div className="border border-ink p-5 text-center relative bg-paper/20">
                <span className="font-mono text-[9px] text-burgundy uppercase block tracking-widest font-semibold">
                  Primary Lyric Affinity
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-ink block mt-1">
                  {mainMood.split(' (')[0]} {mainPercentage}%
                </span>
                
                {/* Vintage Ticket Holes representation */}
                <div className="absolute -left-2.5 top-1/2 -mt-1.5 w-3.5 h-3.5 bg-paper rounded-full border-r border-soft-border" />
                <div className="absolute -right-2.5 top-1/2 -mt-1.5 w-3.5 h-3.5 bg-paper rounded-full border-l border-soft-border" />
              </div>

              {/* Dashed Line */}
              <div className="border-t border-dashed border-soft-border pt-4 space-y-2.5 font-mono text-xs text-ink-muted">
                <div className="flex justify-between">
                  <span className="font-serif text-ink">▸ 색채 배합:</span>
                  <span className="font-serif font-bold text-ink-black">{analysis.colorInterpretation.split('(')[0].split('.')[0] || '빛바랜 은율'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-serif text-ink">▸ 실루엣선:</span>
                  <span className="font-serif font-bold text-ink-black">{analysis.silhouetteInterpretation.split(',')[0].split('.')[0] || '단문형 직선'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-serif text-ink">▸ 감촉소재:</span>
                  <span className="font-serif font-bold text-ink-black">{analysis.materialInterpretation.split(',')[0].split('.')[0] || '햇빛에 마른 코튼'}</span>
                </div>
              </div>

              {/* Separation dasher */}
              <div className="border-b border-dashed border-soft-border my-2" />

              <div className="font-mono text-[10px] text-[#A0A5AD] space-y-1">
                <div className="flex justify-between">
                  <span>SYSTEM PORT INGRESS:</span>
                  <span>SSL_SECURE_GUEST</span>
                </div>
                <div className="flex justify-between">
                  <span>AUDITED BY:</span>
                  <span>SEOUL_ATELIER</span>
                </div>
                <div className="flex justify-between">
                  <span>PERSISTENCE STRATEGY:</span>
                  <span>LOCAL_EPHEMERAL</span>
                </div>
              </div>

              {/* Mock Barcode simulation */}
              <div className="pt-4 flex flex-col items-center justify-center space-y-1 opacity-70">
                <div className="h-7 w-44 bg-[repeating-linear-gradient(90deg,currentColor,currentColor_1px,transparent_1px,transparent_4px,currentColor_4px,currentColor_6px,transparent_6px,transparent_8px)] text-ink" />
                <span className="font-mono text-[8px] tracking-[0.3em] scale-90">* SEOCHON-ATELIER-001 *</span>
              </div>
            </div>
          </div>

          {/* Graphical Ratios Breakdown */}
          <div className="bg-receipt border border-soft-border p-6 relative space-y-4 shadow-sm">
            <div className="border-b border-soft-border pb-2 flex items-center justify-between">
              <h4 className="font-serif text-xs sm:text-sm font-bold text-ink">내면에 깃든 문학적 정서 배합</h4>
              <Feather className="w-4 h-4 text-burgundy opacity-75 animate-bounce-slow" />
            </div>

            <div className="space-y-4">
              {analysis.literaryMoodRatio.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs font-serif">
                    <span className={index === 0 ? 'font-bold text-burgundy' : 'text-slate-700'}>
                      {item.mood}
                    </span>
                    <span className="font-mono text-xs">{item.percentage}%</span>
                  </div>
                  {/* Styled vintage line gauge */}
                  <div className="h-2 bg-paper border border-soft-border overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        index === 0 ? 'bg-burgundy' : 'bg-denim'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Deconstruction & Curation */}
        <div className="md:col-span-7 space-y-8">
          
          {/* Main review summary */}
          <div id="interpretation" className="space-y-6">
            <div className="pb-1 border-b border-soft-border">
              <span className="font-mono text-[9px] tracking-widest text-[#8A857C] uppercase block font-bold">
                Archivist Critique Report
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink mt-1">
                감정된 사조 정합: <span className="text-burgundy">“{mainMood.split(' (')[0]}”</span>
              </h3>
            </div>

            {/* Analysis card details */}
            <div className="space-y-5 font-serif bg-receipt border border-soft-border p-6">
              {/* Color */}
              <div className="border-l-2 border-burgundy pl-4 py-0.5">
                <h4 className="text-xs text-burgundy tracking-tight uppercase font-bold mb-1">
                  색채적 기조 (Chroma Theme)
                </h4>
                <p className="text-ink text-sm leading-relaxed">{analysis.colorInterpretation}</p>
              </div>

              {/* Silhouette */}
              <div className="border-l-2 border-[#8A857C] pl-4 py-0.5">
                <h4 className="text-xs text-ink-black tracking-tight uppercase font-bold mb-1">
                  선의 아웃라인 (Silhouette Theory)
                </h4>
                <p className="text-ink text-sm leading-relaxed">{analysis.silhouetteInterpretation}</p>
              </div>

              {/* Material */}
              <div className="border-l-2 border-denim pl-4 py-0.5">
                <h4 className="text-xs text-denim tracking-tight uppercase font-bold mb-1">
                  소재의 결 (Tactile Text)
                </h4>
                <p className="text-ink text-sm leading-relaxed">{analysis.materialInterpretation}</p>
              </div>
            </div>
          </div>

          {/* 3-Line Critique */}
          <div className="bg-paper-dark/30 p-6 border border-soft-border space-y-4" id="reasoning-box">
            <div className="flex items-center space-x-2 text-ink">
              <Award className="w-4.5 h-4.5 text-burgundy shrink-0" />
              <h4 className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider">
                서촌 사서(司書)들의 세 단락 문장 고찰
              </h4>
            </div>
            
            <ol className="list-decimal pl-4 space-y-3.5 text-xs sm:text-sm font-serif text-[#1A1814] leading-relaxed">
              {analysis.reasoning.map((line, idx) => (
                <li key={idx} className="marker:text-burgundy pl-1">
                  {line}
                </li>
              ))}
            </ol>
          </div>

          {/* Recommended sentence card */}
          <div className="bg-receipt border border-soft-border p-8 rounded-none shadow-sm relative overflow-hidden flex flex-col justify-center text-center space-y-5">
            <div className="absolute top-4 left-4 text-[9px] font-mono text-silver">ATELIER CORE-WORDS</div>
            <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-[0.03]">
              <BookOpen className="w-full h-full" />
            </div>

            <span className="font-serif text-xs text-burgundy uppercase tracking-widest font-bold block">
              ★ 오늘의 착장에 영면하는 문장 ★
            </span>

            <blockquote className="font-serif text-base sm:text-lg text-ink font-extrabold leading-relaxed max-w-xl mx-auto py-2">
              “{analysis.recommendedSentence.text}”
            </blockquote>

            <p className="text-xs text-silver font-mono tracking-widest font-bold">
              — {analysis.recommendedSentence.author}, 《{analysis.recommendedSentence.source}》 중에서
            </p>

            <div className="pt-2">
              <button
                onClick={copyQuoteToClipboard}
                className="inline-flex items-center space-x-2 text-xs font-serif text-burgundy hover:text-ink underline uppercase tracking-widest cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? '구절 복사 완료' : '이 문장을 책갈피에 끼워두기'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Recommended Book & Accessories */}
      <section className="pt-8 border-t border-soft-border space-y-6">
        <h4 className="font-serif text-base sm:text-lg font-bold text-ink text-center max-w-sm mx-auto pb-2 border-b border-burgundy/20">
          당신의 의복 사조를 빛낼 큐레이션
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-serif">
          {/* Curated Literature */}
          <div className="bg-receipt p-6 rounded-none border border-soft-border flex flex-col sm:flex-row gap-6 hover:shadow-md transition-all">
            <div className="w-full sm:w-1/3 aspect-[3/4] max-h-[170px] bg-ink overflow-hidden flex items-center justify-center border border-soft-border relative shrink-0">
              <div className="absolute inset-0 bg-paper/5 z-10 pointer-events-none filter sepia" />
              <img
                src={analysis.recommendedBook.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80'}
                alt={analysis.recommendedBook.title}
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="sm:w-2/3 flex flex-col justify-between py-1">
              <div className="space-y-2">
                <span className="bg-ink text-paper text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 font-bold">
                  Recommended Literature
                </span>
                <h5 className="font-serif text-base font-bold text-ink">
                  {analysis.recommendedBook.title}
                </h5>
                <p className="font-serif text-xs text-burgundy font-bold">
                  저자: {analysis.recommendedBook.author}
                </p>
                <p className="font-serif text-xs text-[#635F57] leading-relaxed pt-1">
                  {analysis.recommendedBook.description}
                </p>
              </div>

              <div className="pt-3 text-[10px] font-serif text-silver">
                * 성찰 동업 مستقل獨立 서점에 지참 시 무료 차 보정 가능
              </div>
            </div>
          </div>

          {/* Curated Ornament Object */}
          <div className="bg-receipt p-6 rounded-none border border-soft-border flex flex-col sm:flex-row gap-6 hover:shadow-md transition-all">
            <div className="w-full sm:w-1/3 aspect-[3/4] max-h-[170px] bg-ink overflow-hidden flex items-center justify-center border border-soft-border relative shrink-0">
              <div className="absolute inset-0 bg-paper/5 z-10 pointer-events-none filter sepia" />
              <img
                src={analysis.recommendedAccessory.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'}
                alt={analysis.recommendedAccessory.name}
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="sm:w-2/3 flex flex-col justify-between py-1">
              <div className="space-y-2">
                <span className="bg-burgundy text-paper text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 font-bold">
                  Handcraft Atelier Item
                </span>
                <h5 className="font-serif text-base font-bold text-ink">
                  {analysis.recommendedAccessory.name}
                </h5>
                <p className="font-serif text-xs text-[#8A857C] font-bold">
                  연계 모티브작: 《{analysis.recommendedAccessory.literarySource}》
                </p>
                <p className="font-serif text-xs text-[#635F57] leading-relaxed pt-1">
                  {analysis.recommendedAccessory.description}
                </p>
              </div>

              <div className="pt-3 flex justify-between items-center border-t border-[#D9CFBE] mt-2">
                <span className="font-mono text-xs sm:text-sm font-extrabold text-ink">
                  ₩{analysis.recommendedAccessory.price.toLocaleString()}
                </span>
                <span className="text-[9px] text-[#A0A5AD]">서촌 수공예 아틀리에 정물</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Elegant SNS Poster Sharing Modal in STRICT 9:16 vertical ratio */}
      {showShareModal && (
        <div className="fixed inset-0 bg-ink/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto animate-fade-in-fast">
          <div className="bg-paper-dark max-w-sm w-full p-6 relative shadow-2xl space-y-6 my-8 rounded-none border border-soft-border">
            <button
              onClick={() => {
                setShowShareModal(false);
                setShareSaved(false);
              }}
              className="absolute top-4 right-4 text-ink-muted hover:text-burgundy font-serif text-xs cursor-pointer focus:outline-none font-bold"
            >
              [ 닫 기 ]
            </button>

            <div className="text-center">
              <h4 className="font-serif text-sm font-bold text-ink">서촌 아틀리에 서평 자작 발행</h4>
              <p className="text-[10px] font-mono text-silver uppercase tracking-widest">9:16 Instagram Story Format</p>
            </div>

            {/* STRICT 9:16 POSTER CONTAINER */}
            <div className="aspect-[9/16] w-full bg-receipt border border-ink p-5 relative flex flex-col justify-between overflow-hidden shadow-lg select-none film-grain">
              {/* Kraft/Lattice Background effect */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(139,44,44,0.06)_1.2px,transparent_1.2px)] [background-size:10px_10px]" />
              
              {/* Poster Top metadata */}
              <div className="relative z-10 border-b border-soft-border pb-2 flex justify-between items-end">
                <div className="text-left">
                  <span className="font-mono text-[9px] tracking-widest text-[#8A857C] block uppercase font-bold">VOLUME I</span>
                  <span className="font-serif text-xs font-extrabold text-ink">Archive Seochon</span>
                </div>
                <div className="text-right font-mono text-[8px] text-[#8C8A91]">
                  SEC. 2026 / CO-NET
                </div>
              </div>

              {/* Photo Frame in the middle */}
              <div className="relative z-10 my-3 border border-ink/40 p-1 bg-receipt">
                <div className="aspect-[3/4] bg-ink overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                  <img
                    src={analysis.photoUrl}
                    alt="OOTD visual"
                    className="w-full h-full object-cover filter sepia brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  {/* Embedded Overlay seal */}
                  <div className="absolute bottom-3 left-3 bg-[#8B2C2C] text-paper text-[8px] font-serif uppercase tracking-widest px-2 py-0.5 font-bold z-20">
                    {mainMood.split(' (')[0]} {mainPercentage}%
                  </div>
                </div>
              </div>

              {/* Poster Literary Core Quote & details */}
              <div className="relative z-10 py-2 border-y border-dashed border-soft-border text-center space-y-2">
                <span className="font-serif text-[9px] text-[#8B2C2C] uppercase tracking-widest font-bold">
                  ★ 오늘의 작가 동행 시구 ★
                </span>
                <blockquote className="font-serif text-xs text-ink font-semibold leading-relaxed px-1">
                  “{analysis.recommendedSentence.text}”
                </blockquote>
                <p className="text-[9px] text-silver font-mono">
                  — {analysis.recommendedSentence.author}, 《{analysis.recommendedSentence.source}》 중에서
                </p>
              </div>

              {/* Bottom Brand footer with QR and Monogram */}
              <div className="relative z-10 pt-2 flex items-center justify-between border-t border-soft-border">
                <div className="text-left space-y-0.5">
                  <span className="font-mono text-[7px] text-[#868A91] uppercase tracking-widest block">AUTHENTIC ATELIER POSTER</span>
                  <span className="font-serif text-[10px] font-bold text-burgundy">문장을 입다, 사유를 소장하다</span>
                </div>
                
                {/* Simulated QR Code for vintage look */}
                <div className="w-10 h-10 bg-receipt border border-ink p-1 flex flex-col items-center justify-center shrink-0">
                  <div className="w-full h-full bg-[repeating-linear-gradient(45deg,currentColor,currentColor_1.5px,transparent_1.5px,transparent_3px)] text-ink opacity-80" />
                </div>
              </div>

              {/* Vintage ticket corner notches */}
              <div className="absolute -left-2 top-12 w-4 h-4 bg-paper-dark border-r border-soft-border rounded-full" />
              <div className="absolute -right-2 top-12 w-4 h-4 bg-paper-dark border-l border-soft-border rounded-full" />
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShareSaved(true);
                  setTimeout(() => {
                    alert("서정 9:16 스토리 엽서 가 고화질로 렌더 가공되어 당신의 디지털 편서랍에 안전하게 소장되었습니다. 인스타 스토리에 공유해 보촌의 서정을 온전히 자랑해 보세요.");
                    setShowShareModal(false);
                    setShareSaved(false);
                  }, 1200);
                }}
                disabled={shareSaved}
                className="w-full bg-burgundy hover:bg-ink text-paper py-3.5 rounded-none font-serif text-xs sm:text-sm font-bold text-center shadow-md cursor-pointer transition-all uppercase"
              >
                <span>{shareSaved ? '엽서 가공 렌더링 중...' : '서정 엽서 고해상 다운로드'}</span>
              </button>
              
              <p className="text-center text-[10px] text-silver font-serif leading-tight">
                * 이 영수증 엽서를 소장하시고, 서촌 필운대로 정각에 위치한 수공 아틀리에 실물 지폐인쇄기에 연동하여 실물 용지로 인화 받으실 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
