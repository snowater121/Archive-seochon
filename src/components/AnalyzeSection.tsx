/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Feather, AlertCircle, FileImage, ShieldCheck, ChevronDown, ChevronUp, BookOpen, Layers } from 'lucide-react';
import { OOTDAnalysisResult } from '../types';

interface AnalyzeSectionProps {
  onAnalysisComplete: (result: OOTDAnalysisResult) => void;
}

export default function AnalyzeSection({ onAnalysisComplete }: AnalyzeSectionProps) {
  const [subTab, setSubTab] = useState<'upload' | 'grammar'>('upload');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingPhraseIndex, setLoadingPhraseIndex] = useState<number>(0);
  
  // Local state for expandable grammar items
  const [expandedGrammar, setExpandedGrammar] = useState<string | null>("YiSang");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Poetic Korean loading phrases to loop during server-side processing
  const loadingPhrases = [
    "의복의 외곽 실루엣의 기하학적 운율을 고르는 중...",
    "천의 한 올 한 올에 깃든 당신 만의 문체를 분해하는 중입니다...",
    "서촌의 가을 돌담 안개 사이로 문학적 색조를 번역하는 중...",
    "이상이 정면에 두었던 거울 속 심연으로 정체성을 환유하는 중...",
    "당신의 온기와 은은한 무늬가 직조해내는 아름다운 시구(詩句)를 인덱싱하는 중..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (analyzing) {
      interval = setInterval(() => {
        setLoadingPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [analyzing]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMessage('이미지 파일(*.png, *.jpg, *.jpeg)만 번역할 수 있습니다.');
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleStartAnalysis = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    setLoadingPhraseIndex(0);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64: selectedImage }),
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        onAnalysisComplete(data.analysis);
      } else {
        throw new Error(data.message || '분석 과정에서 일시적 번역 오류가 발생했습니다.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || '서버와의 통신이 원활하지 않습니다. 다시 시도해 주세요.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setErrorMessage(null);
    setAnalyzing(false);
  };

  const toggleExpand = (id: string) => {
    setExpandedGrammar(prev => prev === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in" id="analysis-container">
      {/* Editorial Title */}
      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-ink">의복과 서간 : 옷깃에 깃든 문장</h3>
        <p className="text-silver text-xs font-mono mt-1 uppercase tracking-widest">
          Atelier Style Critique & Letters
        </p>
      </div>

      {/* Sub-NavigationBar */}
      <div className="flex border-b border-soft-border mb-8 justify-center">
        <button
          onClick={() => setSubTab('upload')}
          className={`px-6 py-3 font-serif text-sm font-bold tracking-tight border-b-2 transition-all cursor-pointer ${
            subTab === 'upload'
              ? 'border-burgundy text-burgundy'
              : 'border-transparent text-[#8A857C] hover:text-ink'
          }`}
        >
          의복 기탁 분석 (OOTD Analysis)
        </button>
        <button
          onClick={() => setSubTab('grammar')}
          className={`px-6 py-3 font-serif text-sm font-bold tracking-tight border-b-2 transition-all cursor-pointer ${
            subTab === 'grammar'
              ? 'border-burgundy text-burgundy'
              : 'border-transparent text-[#8A857C] hover:text-ink'
          }`}
        >
          수사적 문법대장 (Grammar Sheets)
        </button>
      </div>

      {!analyzing ? (
        subTab === 'upload' ? (
          <div className="space-y-6">
            {/* Main Upload Zone */}
            {!selectedImage ? (
              <div
                id="upload-dropzone"
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileSelect}
                className={`border-2 border-dashed rounded-none p-12 md:p-24 min-h-[420px] text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-6 ${
                  dragActive 
                    ? 'border-burgundy bg-[#FAF7F0]' 
                    : 'border-soft-border hover:border-burgundy bg-paper-dark/20 hover:bg-paper-dark/40'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <UploadCloud className="w-16 h-16 text-burgundy opacity-75 pulse-indicator mb-2" />
                <div className="space-y-3 w-full max-w-2xl mx-auto">
                  <p className="font-serif text-base sm:text-lg font-bold text-ink break-keep leading-relaxed">
                    오늘 착용한 전신 사진 혹은 거울 피팅 사진을 올려주세요
                  </p>
                  <p className="text-xs sm:text-sm text-silver font-serif max-w-xl mx-auto break-keep leading-relaxed">
                    마우스로 이미지 파일을 이곳에 떨어뜨리거나, 이 기판 영역을 선택하여 모바일 사진첩을 엽니다.
                  </p>
                </div>
                <div className="pt-4 text-xs font-mono text-[#8C8A91] border-t border-soft-border w-2/3 max-w-md">
                  PNG, JPG, JPEG | 1회용 감정 보장 | No Logging
                </div>
              </div>
            ) : (
              /* Preview State */
              <div className="bg-receipt border border-soft-border rounded-none overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 p-6 relative">
                <div className="absolute top-4 right-4 text-[9px] font-mono text-silver">ATELIER CAPTURE</div>
                <div className="relative aspect-[3/4] bg-ink rounded-none overflow-hidden max-h-[480px] border border-soft-border">
                  <img
                    src={selectedImage}
                    alt="My OOTD preview"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={handleReset}
                    className="absolute top-3 right-3 bg-paper/95 hover:bg-burgundy hover:text-paper text-ink transition-colors px-3 py-1.5 text-xs font-serif rounded-none shadow-md border border-soft-border cursor-pointer"
                  >
                    사진 다시 기탁하기
                  </button>
                </div>

                <div className="flex flex-col justify-between py-2 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-burgundy">
                      <FileImage className="w-5 h-5" />
                      <span className="font-serif text-sm font-bold">의상 기탁 확인 완료</span>
                    </div>
                    <h4 className="font-serif text-xl font-bold text-ink leading-snug">
                      이 착장의 선과 색채를 고전 시문과 유기적으로 조율할 준비가 끝났습니다.
                    </h4>
                    <p className="text-silver text-xs leading-relaxed font-serif">
                      서촌의 사서들은 당신이 보낸 실루엣 정보에서 <strong className="text-burgundy">색채 조합, 윤곽 아웃라인, 질감 텍스처</strong>를 고도로 추출한 후, 가치관에 알맞은 문학적 마이크로 문법 매핑 연산을 실행합니다.
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-soft-border">
                    <button
                      onClick={handleStartAnalysis}
                      id="submit-analysis"
                      className="w-full flex items-center justify-center space-x-2 bg-burgundy hover:bg-ink text-paper transition-all py-4 rounded-none font-serif text-base font-semibold shadow-md cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <Feather className="w-5 h-5 animate-pulse" />
                      <span>기탁 착장 속 문학적 사조 읽어내기</span>
                    </button>
                    
                    <div className="flex items-start space-x-2 bg-paper-dark/30 p-3 text-[11px] text-[#635F57] font-serif">
                      <ShieldCheck className="w-4 h-4 text-[#8B2C2C] shrink-0 mt-0.5" />
                      <span>
                        <strong>기밀 조항:</strong> 기부해 주시는 착장은 감정 후 디스크 메모리에서 영구히 삭제 처분됩니다. 오로지 엽서 인자와 도서 매칭 추천 연산용 일회용 트레이싱으로 사용됩니다.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Validation Alert */}
            {errorMessage && (
              <div className="bg-[#FAF6F0] border border-burgundy/40 text-burgundy p-4 rounded-none flex items-center space-x-3 text-sm font-serif">
                <AlertCircle className="w-5 h-5 text-burgundy shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        ) : (
          /* SubTab "Grammar" Page - Interactive Lexicon Sheets as requested! */
          <div className="space-y-6">
            <div className="bg-receipt border border-soft-border p-6 rounded-none space-y-4">
              <span className="font-mono text-[9px] text-[#868A91] tracking-widest uppercase block">
                SEOCHON PLATFORM METRICS
              </span>
              <h4 className="font-serif text-lg font-bold text-ink">어떻게 옷장에서 고전의 사유가 도출될까요?</h4>
              <p className="text-xs text-silver font-serif leading-relaxed">
                아카이브 서촌의 동행 문법은 겉옷의 채도, 실루엣 기하학, 부자재 고유의 텍스처를 고성 전적 사본과 실시간 매칭하는 특수 아날로그 지향 엔진입니다. 가치 있는 작가 4인의 변수 테이블 도해를 참고하여 나만의 스타일이 어떤 사조를 자아내는지 미리 감상해 보세요.
              </p>
            </div>

            {/* Expandable Grammar cards container */}
            <div className="space-y-4 text-left">
              
              {/* Item 1: Yi Sang */}
              <div className="border border-soft-border bg-receipt">
                <button
                  onClick={() => toggleExpand("YiSang")}
                  className="w-full p-5 flex justify-between items-center bg-receipt hover:bg-paper-dark/10 transition-colors text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 bg-ink rounded-full" />
                    <div>
                      <span className="font-serif text-base font-bold text-ink">이상 (Yi Sang)</span>
                      <span className="text-xs font-serif text-silver italic ml-2">《날개》 (1936)</span>
                    </div>
                  </div>
                  {expandedGrammar === "YiSang" ? <ChevronUp className="w-4 h-4 text-ink" /> : <ChevronDown className="w-4 h-4 text-ink" />}
                </button>

                {expandedGrammar === "YiSang" && (
                  <div className="p-5 border-t border-soft-border bg-paper-dark/20 text-xs font-serif space-y-4 leading-relaxed text-ink">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-serif">
                      <div className="bg-receipt p-4 border border-soft-border space-y-1">
                        <strong className="text-burgundy text-xs">① 감성 배합 (색채)</strong>
                        <p className="text-[#635F57]">불안 43% ──→ 고농도의 챠콜 검정 (#1A1814)</p>
                        <p className="text-[#635F57]">고요 21% ──→ 미백빛 단백색 (#FAF7F0)</p>
                      </div>
                      <div className="bg-receipt p-4 border border-soft-border space-y-1">
                        <strong className="text-burgundy text-xs">② 아웃라인 (실루엣)</strong>
                        <p className="text-[#635F57]">평균 문장 길이 8.2글자의 전위성</p>
                        <p className="text-[#635F57]">──→ 비대칭 드레이프, 해체주의 아치 컷</p>
                      </div>
                      <div className="bg-receipt p-4 border border-soft-border space-y-1">
                        <strong className="text-burgundy text-xs">③ 텍스처 (도합 어휘)</strong>
                        <p className="text-[#635F57]">핵심 명사: 거울, 방, 날개, 시계</p>
                        <p className="text-[#635F57]">──→ 천연 거친 리넨과 구겨진 워시드 면</p>
                      </div>
                    </div>
                    <p className="text-[#8A857C] text-[11px] font-mono leading-normal border-t border-soft-border/60 pt-3">
                      * 이방성 규칙: 대조 색상 대비가 극명하고 실루엣이 흘러내리며 끝단의 실풀림이 조화될 때 지수가 85% 이상으로 도약합니다.
                    </p>
                  </div>
                )}
              </div>

              {/* Item 2: Yoon Dong-ju */}
              <div className="border border-soft-border bg-receipt">
                <button
                  onClick={() => toggleExpand("Yoon")}
                  className="w-full p-5 flex justify-between items-center bg-receipt hover:bg-paper-dark/10 transition-colors text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 bg-denim rounded-full" />
                    <div>
                      <span className="font-serif text-base font-bold text-ink">윤동주 (Yoon Dong-ju)</span>
                      <span className="text-xs font-serif text-silver italic ml-2">《서시》 (1941)</span>
                    </div>
                  </div>
                  {expandedGrammar === "Yoon" ? <ChevronUp className="w-4 h-4 text-ink" /> : <ChevronDown className="w-4 h-4 text-ink" />}
                </button>

                {expandedGrammar === "Yoon" && (
                  <div className="p-5 border-t border-soft-border bg-paper-dark/20 text-xs font-serif space-y-4 leading-relaxed text-ink">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-serif">
                      <div className="bg-receipt p-4 border border-soft-border space-y-1">
                        <strong className="text-burgundy text-xs">① 감성 배합 (색채)</strong>
                        <p className="text-[#635F57]">참회 52% ──→ 고요한 자정의 네이비 (#2D3142)</p>
                        <p className="text-[#635F57]">별빛 28% ──→ 윤이 꺼진 빈티지 골드 (#B8995A)</p>
                      </div>
                      <div className="bg-receipt p-4 border border-soft-border space-y-1">
                        <strong className="text-burgundy text-xs">② 아웃라인 (실루엣)</strong>
                        <p className="text-[#635F57]">평균 문장 길이 14.5자 서술형</p>
                        <p className="text-[#635F57]">──→ 넓고 차분하게 흘러내리는 와이드 스커트&팬츠</p>
                      </div>
                      <div className="bg-receipt p-4 border border-soft-border space-y-1">
                        <strong className="text-burgundy text-xs">③ 텍스처 (도합 어휘)</strong>
                        <p className="text-[#635F57]">핵심 명사: 별, 바람, 잎새, 부끄러움</p>
                        <p className="text-[#635F57]">──→ 자극이 적은 최고급 소모방 스무스 클래식 울</p>
                      </div>
                    </div>
                    <p className="text-[#8A857C] text-[11px] font-mono leading-normal border-t border-soft-border/60 pt-3">
                      * 청교도적 단정한 깃 구조, 정방향의 흐트러짐 없는 단추 배합에서 매칭 감응 지수가 90%에 이르게 설정되어 있습니다.
                    </p>
                  </div>
                )}
              </div>

              {/* Item 3: Albert Camus */}
              <div className="border border-soft-border bg-receipt">
                <button
                  onClick={() => toggleExpand("Camus")}
                  className="w-full p-5 flex justify-between items-center bg-receipt hover:bg-paper-dark/10 transition-colors text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 bg-gold rounded-full" />
                    <div>
                      <span className="font-serif text-base font-bold text-ink">알베르 카뮈 (Albert Camus)</span>
                      <span className="text-xs font-serif text-silver italic ml-2">《이방인》 (1942)</span>
                    </div>
                  </div>
                  {expandedGrammar === "Camus" ? <ChevronUp className="w-4 h-4 text-ink" /> : <ChevronDown className="w-4 h-4 text-ink" />}
                </button>

                {expandedGrammar === "Camus" && (
                  <div className="p-5 border-t border-soft-border bg-paper-dark/20 text-xs font-serif space-y-4 leading-relaxed text-ink">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-serif">
                      <div className="bg-receipt p-4 border border-soft-border space-y-1">
                        <strong className="text-burgundy text-xs">① 감성 배합 (색채)</strong>
                        <p className="text-[#635F57]">부조리 65% ──→ 고독한 세월의 베이지 (#D9CFBE)</p>
                        <p className="text-[#635F57]">태양 30% ──→ 정념의 번인 실 레드 (#8B2C2C)</p>
                      </div>
                      <div className="bg-receipt p-4 border border-soft-border space-y-1">
                        <strong className="text-burgundy text-xs">② 아웃라인 (실루엣)</strong>
                        <p className="text-[#635F57]">평균 문장 길이 7.2자 극단적 단문형</p>
                        <p className="text-[#635F57]">──→ 선명하게 가위질된 정직한 일자 라인 코트</p>
                      </div>
                      <div className="bg-receipt p-4 border border-soft-border space-y-1">
                        <strong className="text-burgundy text-xs">③ 텍스처 (도합 어휘)</strong>
                        <p className="text-[#635F57]">핵심 명사: 해변, 태양, 파도, 피스톨</p>
                        <p className="text-[#635F57]">──→ 사막에 말린 가공 코튼 무광 옥스포드직 원단</p>
                      </div>
                    </div>
                    <p className="text-[#8A857C] text-[11px] font-mono leading-normal border-t border-soft-border/60 pt-3">
                      * 무채색 칼라리스 싱글 자켓 및 미니멀 무드 장식 제한 원단에서 기계주의적 고독 정서가 극대화 검정됩니다.
                    </p>
                  </div>
                )}
              </div>

              {/* Item 4: Franz Kafka */}
              <div className="border border-soft-border bg-receipt">
                <button
                  onClick={() => toggleExpand("Kafka")}
                  className="w-full p-5 flex justify-between items-center bg-receipt hover:bg-paper-dark/10 transition-colors text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 bg-burgundy rounded-full" />
                    <div>
                      <span className="font-serif text-base font-bold text-ink">프란츠 카프카 (Franz Kafka)</span>
                      <span className="text-xs font-serif text-silver italic ml-2">《변신》 (1915)</span>
                    </div>
                  </div>
                  {expandedGrammar === "Kafka" ? <ChevronUp className="w-4 h-4 text-ink" /> : <ChevronDown className="w-4 h-4 text-ink" />}
                </button>

                {expandedGrammar === "Kafka" && (
                  <div className="p-5 border-t border-soft-border bg-paper-dark/20 text-xs font-serif space-y-4 leading-relaxed text-ink">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-serif">
                      <div className="bg-receipt p-4 border border-soft-border space-y-1">
                        <strong className="text-burgundy text-xs">① 감성 배합 (색채)</strong>
                        <p className="text-[#635F57]">소외 58% ──→ 탁막한 회조색 재회색 (#3E3A33)</p>
                        <p className="text-[#635F57]">갑각 22% ──→ 고요한 적갈색 원목 칼라</p>
                      </div>
                      <div className="bg-receipt p-4 border border-soft-border space-y-1">
                        <strong className="text-burgundy text-xs">② 아웃라인 (실루엣)</strong>
                        <p className="text-[#635F57]">평균 문장 길이 11.2자 고밀도 심리체</p>
                        <p className="text-[#635F57]">──→ 어깨선 지붕을 기괴하게 덮는 전장 오버사이즈 숄 숄더</p>
                      </div>
                      <div className="bg-receipt p-4 border border-soft-border space-y-1">
                        <strong className="text-burgundy text-xs">③ 텍스처 (도합 어휘)</strong>
                        <p className="text-[#635F57]">핵심 명사: 갑충, 사과, 거실 문, 고독</p>
                        <p className="text-[#635F57]">──→ 단단하지만 내부가 가공되지 않은 멜톤 기모 직물</p>
                      </div>
                    </div>
                    <p className="text-[#8A857C] text-[11px] font-mono leading-normal border-t border-soft-border/60 pt-3">
                      * 몸을 완전히 감싸 보호벽을 허무는 숄 오버코트 착용 시 감응 가치 지수가 수직 상승하게 조향되어 있습니다.
                    </p>
                  </div>
                )}
              </div>

            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setSubTab('upload')}
                className="inline-flex items-center space-x-2 bg-burgundy hover:bg-ink text-paper px-6 py-3 font-serif text-xs font-bold uppercase transition-colors rounded-none cursor-pointer"
              >
                <Layers className="w-4 h-4 animate-bounce-slow" />
                <span>나의 착장으로 즉시 감정 돌려보기</span>
              </button>
            </div>
          </div>
        )
      ) : (
        /* Poetic Loading State */
        <div className="bg-paper border border-ink/10 p-12 text-center rounded-none max-w-2xl mx-auto shadow-inner space-y-8 flex flex-col items-center justify-center min-h-[350px]">
          {/* Vintage Clock / Dial CSS Spinner */}
          <div className="relative w-16 h-16 border-2 border-burgundy/40 rounded-full flex items-center justify-center animate-spin">
            <div className="absolute top-1 w-0.5 h-7 bg-burgundy origin-bottom" />
            <div className="absolute left-1/2 w-4 h-0.5 bg-ink origin-left" />
          </div>

          <div className="space-y-3">
            <p className="font-serif text-lg font-bold text-burgundy animate-pulse">
              의복을 조율하고 서책을 뒤적입니다
            </p>
            {/* Dynamic Loop Phrase */}
            <p className="text-ink text-sm font-serif max-w-md mx-auto transition-all duration-500 h-12 flex items-center justify-center">
              " {loadingPhrases[loadingPhraseIndex]} "
            </p>
          </div>

          <span className="font-mono text-[10px] text-silver tracking-widest block">
            TRANSLATING VISUAL TEXT TO INTELLECTUAL SENSIBILITY
          </span>
        </div>
      )}
    </div>
  );
}
