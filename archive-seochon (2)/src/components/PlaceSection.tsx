/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Printer, Compass, Info, Check, Calendar, ArrowRight, ShieldCheck, Map, Clock, Heart } from 'lucide-react';

interface Bookshop {
  name: string;
  address: string;
  distance: string;
  theme: string;
}

interface HistoricalSpot {
  id: string;
  name: string;
  description: string;
  quote: string;
  matchMood: string;
  hours: string;
  coord: string; // Grid location visual helper
}

export default function PlaceSection() {
  const [activeTab, setActiveTab] = useState<'map' | 'printer'>('map');
  const [receiptPrinted, setReceiptPrinted] = useState<boolean>(false);
  
  // Selected spot on map
  const [selectedSpotId, setSelectedSpotId] = useState<string>('yisang');

  // Simulated printer states
  const [receiptMood, setReceiptMood] = useState<string>('데미안 (헤르만 헤세)');
  const [receiptNote, setReceiptNote] = useState<string>('서촌의 가을 돌담길 아래, 사색하기 좋은 도화적 코듀로이 톤.');
  const [printDate, setPrintDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const historicalSpots: HistoricalSpot[] = [
    {
      id: "yisang",
      name: "이상의 집 (Yi Sang's House)",
      description: "천재 시인 이상이 삶의 가장 뜨거운 유년기를 보낸 터에 마련된 아방가르드 문화 보정 공간입니다. 거울과 미궁이라는 전위적 모티프로 서촌의 가장 어두운 문학성을 보존합니다.",
      quote: "“나는 거울 속의 나를 만지지는 못하오마는 거울이 아니었던들 내가 어찌 거울 속의 나를 만나보기만이라도 했겠소.”",
      matchMood: "이상의 불안 (날개 룩)",
      hours: "10:00 - 18:00 (월요일 휴관)",
      coord: "top-1/4 left-1/3"
    },
    {
      id: "yoon",
      name: "윤동주 하숙집 터 (Yoon Dong-ju's Room)",
      description: "시인 윤동주가 연전 시절 누상동 돌담집 아래 거처를 두고 매일 저녁 인왕산 뒷골목을 소소히 거닐며 정서를 가다듬던 역사 무대입니다. 부끄러움과 별을 헤던 차분한 시선이 머뭅니다.",
      quote: "“쉽게 쓰여진 시(詩)가 부끄러워, 나는 자꾸만 거리를 서성이고 차가운 바람에 귀를 대어 본다.”",
      matchMood: "윤동주의 유고 참회 (와이드 룩)",
      hours: "상시 개방 (실물 고가 터)",
      coord: "top-1/2 left-2/3"
    },
    {
      id: "boan",
      name: "통의동 보안여관 (Boan Inn)",
      description: "1930년대 시인 서정주, 김동리 등이 동인지 《시인부락》을 편찬하며 머문 근대 문학인들의 자정 아지트입니다. 오늘날에는 현대 시각 예술 전시관이자 고색창연한 아날로그 살롱으로 활용됩니다.",
      coord: "top-2/3 left-1/4",
      quote: "“우리는 여관방에 모여 밤이 깊도록 시와 바람을 논했다. 그것이 오늘날 예술가들의 단절에 맞서는 유일한 원사직이다.”",
      hours: "12:00 - 19:00 (월요일 휴무)",
      matchMood: "카뮈적 부조리 (직선 코트 룩)"
    },
    {
      id: "atelier",
      name: "아카이브 서촌 정각 아틀리에",
      description: "당신이 기탁하신 의상을 실시간 감정 연산 인덱싱하고, 수공 장신구를 전시하며, 한 장의 실물 열감 인쇄 영수증 발급 단말기를 보급하는 아카이브 서촌의 핵심 공간입니다.",
      quote: "“당신의 옷장과 책장을 같은 언어로 가늘게 잇습니다.”",
      matchMood: "전 클래식 정본 룩",
      hours: "11:00 - 20:00 (화요일 휴무)",
      coord: "top-1/3 left-2/5"
    }
  ];

  const partneringShops: Bookshop[] = [
    {
      name: '일층책방 (First Floor Books)',
      address: '서울 종로구 옥인길 15',
      distance: '체험존 정각에서 도보 4분',
      theme: '젊은 고독과 등단하지 않은 사색가들의 사본 서지'
    },
    {
      name: '서촌그책방 (Seochon Bookshelf)',
      address: '서울 종로구 가을자하문로',
      distance: '경복궁역 3번 출구 가호 골목',
      theme: '이웃들과 직접 번역한 유럽 리포트 소형 양장본'
    },
    {
      name: '오혜 독립서점 (Ohye Books)',
      address: '서울 종로구 필운대로 42-1',
      distance: '한옥 골목 안쪽 주택가 도보 9분',
      theme: '시, 가곡, 수필 등 극적인 감명의 타이포 각인본'
    }
  ];

  const handleSimulatePrint = () => {
    setReceiptPrinted(true);
    setTimeout(() => {
      document.getElementById('thermal-receipt-paper')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const selectedSpot = historicalSpots.find(s => s.id === selectedSpotId) || historicalSpots[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-12 film-grain">
      
      {/* Editorial Navigation Headers */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-soft-border pb-4 gap-4">
        <div className="text-left">
          <span className="font-mono text-[9px] text-burgundy tracking-[0.25em] font-bold uppercase block">
            OFFLINE EXPERIENCE GUIDE MAP
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-ink">서촌 아틀리에 및 명소 가이드</h3>
          <p className="text-silver text-xs font-mono mt-1 uppercase tracking-widest">
            Seochon Atelier Place Log
          </p>
        </div>

        <div className="flex bg-paper-dark border border-soft-border p-1">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 text-xs font-serif rounded-none cursor-pointer transition-all ${
              activeTab === 'map' ? 'bg-[#FAF7F0] text-ink font-bold shadow-sm' : 'text-silver hover:text-ink'
            }`}
          >
            서촌 문학 지도 안내
          </button>
          <button
            onClick={() => setActiveTab('printer')}
            id="thermal-printer-tab"
            className={`px-4 py-2 text-xs font-serif rounded-none cursor-pointer transition-all ${
              activeTab === 'printer' ? 'bg-[#FAF7F0] text-ink font-bold shadow-sm' : 'text-silver hover:text-ink'
            }`}
          >
            가상 태블릿 수필 인쇄기
          </button>
        </div>
      </div>

      {activeTab === 'map' ? (
        /* TAB 1: INTERACTIVE LITERARY SPOT MAP & NETWORK BOOKSHOPS */
        <div className="space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Interactive Retro Stylized Map representing Hanok grid */}
            <div className="lg:col-span-7 bg-receipt border border-soft-border p-6 flex flex-col justify-between relative shadow-sm min-h-[380px]">
              <div className="absolute top-4 left-4 text-[9px] font-mono text-silver uppercase font-bold">
                SEOCHON VINTAGE GEOGRAPHY INDEX
              </div>

              {/* Grid-based Map Container */}
              <div className="flex-grow my-8 bg-paper border border-soft-border relative min-h-[280px] flex items-center justify-center overflow-hidden">
                {/* Hanok grid/lattice background shadow overlay */}
                <div className="absolute inset-0 bg-white/20 opacity-90" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,44,44,0.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(139,44,44,0.03)_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
                
                {/* Inwangsan Mountain Symbol on Top Right */}
                <div className="absolute top-4 right-6 text-[10px] font-serif text-silver text-right leading-tight">
                  ⛰ 인왕산 자락 (仁王山)
                  <span className="block text-[8px] font-mono">WEST END GRID</span>
                </div>

                {/* Styled Pins mapped coordinates absolutely */}
                {historicalSpots.map((spot) => {
                  const isActive = spot.id === selectedSpotId;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setSelectedSpotId(spot.id)}
                      className={`absolute transition-all transform -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none focus:outline-none flex flex-col items-center group scale-100 ${
                        isActive ? 'scale-110 z-30' : 'z-10 hover:scale-105'
                      } ${spot.coord}`}
                    >
                      {/* Ring style pinpoint */}
                      <div className={`w-7 h-7 rounded-none flex items-center justify-center border border-divider shadow-md transition-all ${
                        isActive
                          ? 'bg-burgundy text-paper border-burgundy scale-110 animate-pulse'
                          : 'bg-receipt text-ink border-soft-border hover:border-ink'
                      }`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      
                      {/* Name tag */}
                      <span className={`mt-1.5 px-2 py-0.5 font-serif text-[10px] tracking-tight border shadow-xs opacity-90 whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-ink text-paper border-ink font-bold'
                          : 'bg-paper text-[#635F57] border-soft-border group-hover:text-ink group-hover:border-ink'
                      }`}>
                        {spot.name.split(' (')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="font-mono text-[8px] text-[#A0A5AD] uppercase text-right leading-none">
                * Click on the Pin points above to open historical details *
              </div>
            </div>

            {/* Right: Selected spot cards details */}
            <div className="lg:col-span-5 bg-receipt border border-soft-border p-6 font-serif flex flex-col justify-between text-left shadow-sm">
              <div className="space-y-5">
                <div className="border-b border-soft-border pb-3.5">
                  <span className="font-mono text-[10px] text-burgundy font-bold uppercase tracking-wider block">
                    SELECTED spot DESCRIPTION
                  </span>
                  <h4 className="font-serif text-xl font-extrabold text-ink mt-1">
                    {selectedSpot.name}
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-[#635F57] leading-relaxed">
                  {selectedSpot.description}
                </p>

                <blockquote className="bg-paper border-l-2 border-burgundy p-4 text-xs italic text-ink leading-relaxed font-medium">
                  {selectedSpot.quote}
                </blockquote>
              </div>

              <div className="border-t border-soft-border/60 pt-5 mt-6 space-y-3.5 text-xs">
                <div className="flex items-center space-x-2 text-[#8A857C]">
                  <Clock className="w-4 h-4 text-burgundy shrink-0" />
                  <span><strong>개방 시간: </strong> {selectedSpot.hours}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#8A857C]">
                  <Heart className="w-4 h-4 text-burgundy shrink-0" />
                  <span><strong>권유 매칭 무드: </strong> <span className="text-ink font-bold">{selectedSpot.matchMood}</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Partnership sections */}
          <section className="space-y-6">
            <div className="text-center">
              <h4 className="font-serif text-lg font-bold">서촌 독립서지 책방연대 (Colleague Bookstores)</h4>
              <p className="text-silver text-xs font-mono uppercase tracking-[0.2em] mt-1">Independent Curative Booksellers Alliance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {partneringShops.map((shop, idx) => (
                <div key={idx} className="bg-receipt border border-soft-border p-6 rounded-none hover:border-burgundy/40 transition-all flex flex-col justify-between space-y-4 hover:shadow-md relative font-serif">
                  <span className="absolute top-4 right-4 font-mono text-[9px] text-[#A0A5AD]">PARTNER-0{idx+1}</span>
                  <div className="space-y-2">
                    <span className="inline-block bg-paper-dark text-ink text-[9px] font-sans px-2 py-0.5 rounded-none font-bold">
                      Alliance 0{idx + 1}
                    </span>
                    <h5 className="font-serif text-base font-extrabold text-ink">{shop.name}</h5>
                    <p className="text-xs text-[#635F57] leading-relaxed pt-1">
                      {shop.theme}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-soft-border space-y-1 text-[11px] text-[#8C8A91]">
                    <p className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-burgundy shrink-0" />
                      <span className="truncate">{shop.address}</span>
                    </p>
                    <p className="text-burgundy text-[10px] font-bold pt-0.5">* {shop.distance}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      ) : (
        /* TAB 2: INTERACTIVE THERMAL RECEIPT MOCK PRINTER SIMULATOR */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Controls form panel */}
          <div className="md:col-span-5 bg-receipt p-6 rounded-none border border-soft-border space-y-6 font-serif text-left">
            <div>
              <span className="font-mono text-[9px] text-[#A0A5AD] tracking-widest uppercase font-semibold block">
                O2O Simulator
              </span>
              <h4 className="text-lg font-bold text-ink">체험존 영수증 수필 인화기</h4>
              <p className="text-xs text-silver mt-1 leading-relaxed">
                서촌 체험공방에 보급된 열감 프린터 출력을 모바일 브라우저로 미리 조율해 봅니다. 이 영수증 지면을 들고 시화 책방 방문 시 실물 소인을 득하실 수 있습니다.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Select mood */}
              <div className="space-y-1">
                <label className="block text-ink font-bold">인면할 시서 정본 작가</label>
                <select
                  value={receiptMood}
                  onChange={(e) => setReceiptMood(e.target.value)}
                  className="w-full bg-receipt border border-soft-border focus:border-burgundy focus:ring-1 focus:ring-burgundy p-2.5 rounded-none text-xs select-none cursor-pointer text-ink font-serif"
                >
                  <option value="날개 (이상정본 1936)">날개 (이상정본 1936)</option>
                  <option value="서시 (동주사화 1941)">서시 (동주사화 1941)</option>
                  <option value="이방인 (알베르 카뮈 1942)">이방인 (알베르 카뮈 1942)</option>
                  <option value="변신 (프란츠 카프카 1915)">변신 (프란츠 카프카 1915)</option>
                  <option value="오만과 편견 (제인 오스틴)">오만과 편견 (제인 오스틴)</option>
                </select>
              </div>

              {/* Editable note */}
              <div className="space-y-1">
                <label className="block text-ink font-bold">에디터 수필 한 꼬집</label>
                <textarea
                  value={receiptNote}
                  onChange={(e) => setReceiptNote(e.target.value)}
                  rows={3}
                  className="w-full bg-receipt border border-soft-border focus:border-burgundy focus:ring-1 focus:ring-burgundy p-2.5 rounded-none text-xs text-ink font-serif"
                  placeholder="착장에 대한 사서의 연계를 서술합니다"
                />
              </div>

              {/* Print Date */}
              <div className="space-y-1">
                <label className="block text-ink font-bold">인쇄일 기정</label>
                <input
                  type="date"
                  value={printDate}
                  onChange={(e) => setPrintDate(e.target.value)}
                  className="w-full bg-receipt border border-soft-border p-2.5 rounded-none text-xs text-ink font-mono"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleSimulatePrint}
                className="w-full bg-burgundy hover:bg-ink text-paper hover:text-paper-cream transition-all py-4 rounded-none font-serif text-xs font-bold flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                id="do-simulate-print"
              >
                <Printer className="w-4 h-4 animate-bounce-slow" />
                <span>영수증 프린터로 인면 출력 실행</span>
              </button>
              
              {receiptPrinted && (
                <button
                  onClick={() => setReceiptPrinted(false)}
                  className="w-full text-center text-[10px] text-silver uppercase tracking-widest underline cursor-pointer"
                >
                  기판 처음으로 리셋
                </button>
              )}
            </div>
          </div>

          {/* Thermal receipt display panel */}
          <div className="md:col-span-7 flex flex-col items-center justify-center py-4 bg-paper-dark/30 p-6 rounded-none border border-soft-border min-h-[350px]">
            {!receiptPrinted ? (
              <div className="text-center p-12 text-[#8C8A91] space-y-3 font-serif">
                <Printer className="w-12 h-12 mx-auto text-burgundy opacity-40 animate-pulse" />
                <p className="text-xs">왼쪽 수필란을 채우신 후 출력을 누르시면,<br />이 자리에 서촌 전용 시각 인화 감열지가 기계 사운드와 함께 기어 나옵니다.</p>
              </div>
            ) : (
              /* High loyalty retro thermal receipt simulation */
              <div
                id="thermal-receipt-paper"
                className="w-full max-w-sm bg-receipt border border-soft-border p-6 text-ink rounded-none shadow-md relative font-mono text-xs select-none space-y-4 text-left torn-bottom"
              >
                {/* Torn paper serration top effect */}
                <div className="absolute top-0 left-0 right-0 h-2 receipt-border opacity-85" />

                {/* Receipt Header details */}
                <div className="text-center pt-2 border-b border-dashed border-soft-border pb-4 space-y-1">
                  <h4 className="font-bold text-sm tracking-widest font-serif">[아카이브 서촌 공방 정본]</h4>
                  <p className="text-[9px] uppercase font-mono">O2O Garment Translating Hub</p>
                  <p className="text-[8px] font-mono">필운대로 앤티크 정각 단말: #0082</p>
                </div>

                {/* Print Datetime log */}
                <div className="flex justify-between text-[9px] border-b border-dashed border-soft-border pb-2 text-[#8C8A91]">
                  <span>PRINT DATE: {printDate}</span>
                  <span>SESSION: V-MOCK-SEOCHON</span>
                </div>

                {/* Items and core metrics */}
                <div className="space-y-4 py-2 border-b border-dashed border-soft-border font-serif">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-silver font-mono block">TRANSLATED ART 사조 명칭:</span>
                    <span className="font-serif font-bold text-burgundy block text-sm">
                      {receiptMood}
                    </span>
                  </div>

                  <div className="space-y-0.5 font-serif">
                    <span className="text-[9px] text-[#868A91] font-mono block">EDITOR CODES 패션 문법 해설:</span>
                    <p className="text-ink leading-relaxed whitespace-pre-line text-xs font-serif italic">
                      {receiptNote}
                    </p>
                  </div>

                  <div className="bg-paper p-3 font-serif font-bold border border-soft-border flex justify-between items-center text-[10px]">
                    <span className="text-ink">서촌 제휴 서림 책방 무상 율차 도장</span>
                    <span className="text-burgundy border border-burgundy px-2 py-0.5 bg-receipt text-[8px] font-bold">소용가능</span>
                  </div>
                </div>

                {/* Barcode representation using CSS stripes */}
                <div className="space-y-1.5 pt-2 text-center flex flex-col items-center">
                  <div className="w-11/12 h-8 bg-[linear-gradient(90deg,#1D1C1A_2px,transparent_2px,#1D1C1A_5px,transparent_6px,#1D1C1A_8px,transparent_10px,#1D1C1A_12px,transparent_13px,#1D1C1A_15px,transparent_20px)] bg-repeat-x opacity-80" />
                  <span className="text-[8px] tracking-[0.3em] uppercase block text-silver font-mono">
                    * SEOCHON-TRANS-2026-STATIONED *
                  </span>
                </div>

                {/* Privacy disclaimer footer */}
                <div className="pt-2 text-center text-[8px] text-[#8C8A91] font-serif leading-tight">
                  이 영수증은 서촌 독립서점 연대에 가입하셨거나<br />체험존을 무상 방문한 독자임을 전구 증명합니다.<br />본 감열 인쇄지는 화학적 사유로 자연 분해될 수 있습니다.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
