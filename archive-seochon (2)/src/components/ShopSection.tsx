/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Star, Heart, Calendar, Users, Target, CircleDollarSign } from 'lucide-react';
import { Product } from '../types';

interface ShopSectionProps {
  products: Product[];
  onPurchaseMock: (product: Product) => void;
}

export default function ShopSection({ products, onPurchaseMock }: ShopSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Interactive Funding State
  const [fundedPct, setFundedPct] = useState<number>(78);
  const [fundedAmount, setFundedAmount] = useState<number>(3900000);
  const [backersCount, setBackersCount] = useState<number>(128);
  const [hasFunded, setHasFunded] = useState<boolean>(false);

  const categories = [
    { id: 'ALL', label: '전체 도장 기물 (Curation)' },
    { id: 'subscription', label: '분기 정기 구독 (Funding Box)' },
    { id: 'accessory', label: '수공예 악세사리 (Handcraft)' },
    { id: 'goods', label: '빈티지 큐레이션 (Old Items)' }
  ];

  // Curated single items and vintage goods
  const defaultProducts: Product[] = [
    {
      id: "prod-panama",
      title: "카뮈의 파나마 햇 (Classic Panama Straw Hat)",
      category: "accessory",
      price: 65000,
      imageUrl: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&w=600&q=80",
      shortDescription: "카뮈의 《이방인》 속 태양이 내리쬐던 알제 해변에서 영감을 얻은 무가공 천연 밀짚 햇입니다. 리본 바이어스는 세월의 세피아 색으로 황변 처리되었습니다.",
      literarySource: "알베르 카뮈 · 이방인",
      moodColor: "#8B2C2C"
    },
    {
      id: "prod-bookmark",
      title: "동주 서필 황동 북마크 (Brass Hand-Engraved Bookmark)",
      category: "accessory",
      price: 18000,
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
      shortDescription: "시인 윤동주의 사후 육필원고를 서책에 보존하는 황동 책갈피입니다. '잎새에 이는 바람에도...' 시구가 클래식 타이포로 각인되어 있습니다.",
      literarySource: "윤동주 · 서시",
      moodColor: "#2D3142"
    },
    {
      id: "prod-case",
      title: "이상의 안경집 가죽갑 (Yi Sang Leather Glasses Sleeve)",
      category: "accessory",
      price: 42000,
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      shortDescription: "천재 문장가 이상이 사용했던 기형의 거울 속 안경을 넣어둘 수 있는 베지터블 소가죽 보관 오가나이저입니다.",
      literarySource: "이상 · 날개",
      moodColor: "#1A1814"
    },
    {
      id: "prod-vintage-tape",
      title: "1980's 정각 쇠집게 기갑 (Vintage Solid Brass Heavy Clip)",
      category: "goods",
      price: 24000,
      imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80",
      shortDescription: "서촌 골목 고미술점 '경성골동방'에서 세월의 두께를 머금어 수집된 80년대 원목 종이 집게입니다. 가고 원고 뭉치를 실물 고정하기 에 합당합니다.",
      literarySource: "공방 아카이브 수집",
      moodColor: "#8A857C"
    },
    {
      id: "prod-vintage-paper",
      title: "소인 전적 양장 가고지 (Set of 10 Antique Ephemera sheets)",
      category: "goods",
      price: 15000,
      imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
      shortDescription: "사서들이 직접 서책 뒷수리를 하며 분류해 놓은 황변된 인쇄 양장 원고 사본 지면입니다. 서재 인테리어 혹은 촬영 배경 소품으로 적적합니다.",
      literarySource: "서촌 사화 수립",
      moodColor: "#B8995A"
    }
  ];

  // Merge database items if any (prepopulating or fallback)
  const allBoutiqueProducts = products.length > 0 
    ? [...products.filter(p => p.id !== 'prod-4'), ...defaultProducts]
    : defaultProducts;

  const filteredProducts = selectedCategory === 'ALL'
    ? allBoutiqueProducts
    : allBoutiqueProducts.filter((p) => p.category === selectedCategory);

  const handlePledgeFunding = () => {
    if (hasFunded) {
      alert("이미 이번 분기 계간 상자 서지 펀딩에 참여해 기명 독자 대장에 이름이 기록되었습니다.");
      return;
    }
    // Increment stats instantly in real-time UI
    setBackersCount(prev => prev + 1);
    setFundedAmount(prev => prev + 39000);
    const newPct = Math.round(((fundedAmount + 39000) / 5000000) * 100);
    setFundedPct(newPct);
    setHasFunded(true);
    alert("축하합니다! 분기 아카이브 구독 상자 [계간 서촌 원단 서간집] 펀딩 및 수공 인자 예약을 완료하셨습니다. 귀하의 기명 명단은 서림 대장에 즉각 수필되었습니다.");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-12 film-grain">
      
      {/* Editorial Header */}
      <div className="text-center font-serif">
        <span className="font-mono text-[9px] text-burgundy tracking-[0.25em] font-bold uppercase block mb-1">
          THE ARTISANS ATELIER SHOP
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-ink">아카이브 서촌 큐레이션 숍</h3>
        <p className="text-silver text-xs font-mono mt-1 uppercase tracking-widest">
          Handcrafted Literary Fashion Boutique
        </p>
      </div>

      {/* 1. ④ STORE [분기 구독 박스 - 텀블벅식 펀딩 현황] */}
      <section className="bg-receipt border border-soft-border p-6 sm:p-10 rounded-none max-w-5xl mx-auto relative shadow-sm">
        <div className="absolute top-4 left-6 font-mono text-[9px] text-[#868A91] tracking-widest uppercase">
          SEASONAL SUBSCRIBED PROJECT INDIE
        </div>
        <div className="absolute top-4 right-6 bg-burgundy text-paper text-[8px] font-mono px-2 py-0.5 font-bold uppercase">
          Funding Project
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          {/* Subscribed Box visual Banner */}
          <div className="lg:col-span-5 relative group">
            <div className="aspect-[4/3] sm:aspect-video lg:aspect-[4/5] overflow-hidden border border-soft-border bg-ink relative shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-paper/20 z-10" />
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b830c6038?auto=format&fit=crop&w=700&q=80"
                alt="Vintage Subscribed literary box mockup"
                className="w-full h-full object-cover filter sepia brightness-95 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-paper/95 backdrop-blur-sm p-4 border border-soft-border text-left">
                <span className="font-serif text-[10px] text-burgundy font-bold block">제1호 황변(黃變)의 기억</span>
                <p className="font-serif text-xs text-ink mt-0.5 leading-snug">
                  "계간 아카이브 서촌 원단 서간집 정본 상자"
                </p>
              </div>
            </div>
          </div>

          {/* Subscription details with interactive 📈 Tumblebug Funding progression */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-burgundy tracking-widest block uppercase font-bold">
                SEASON VALUE: 계간 서촌 원단 서간집 제1집
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-extrabold text-ink leading-tight">
                고전 문학의 질감을 원단 상자에 <br className="hidden sm:inline" />동행 기탁하는 분기 정기 구독 펀딩
              </h4>
              <p className="text-xs sm:text-sm text-[#635F57] leading-relaxed font-serif pt-1">
                서촌 아틀리에 사서들과 장인들이 손수 직조한 천연 면포, 시집 정본 원문 가인집, 레터프레스 각인 엽서, 그리고 서촌 인근 골목 속 오프라인 독립 서점과 차 살롱을 자유롭게 연동하는 특별 바우처 가죽 참(Charm)이 깃든 황변 서간 세트입니다.
              </p>
            </div>

            {/* DYNAMIC PROGRESS GAUGE */}
            <div className="bg-paper p-5 border border-soft-border space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] text-[#868A91] uppercase flex items-center gap-1 justify-center sm:justify-start">
                    <Target className="w-3.5 h-3.5 text-burgundy" /> 달성율
                  </span>
                  <p className="font-mono text-lg font-bold text-ink">{fundedPct}%</p>
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] text-[#868A91] uppercase flex items-center gap-1 justify-center sm:justify-start">
                    <CircleDollarSign className="w-3.5 h-3.5 text-burgundy" /> 모인 금액
                  </span>
                  <p className="font-mono text-lg font-bold text-ink">₩{fundedAmount.toLocaleString()}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] text-[#868A91] uppercase flex items-center gap-1 justify-center sm:justify-start">
                    <Users className="w-3.5 h-3.5 text-burgundy" /> 기명 서포터
                  </span>
                  <p className="font-mono text-lg font-bold text-ink">{backersCount}명</p>
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] text-[#868A91] uppercase flex items-center gap-1 justify-center sm:justify-start">
                    <Calendar className="w-3.5 h-3.5 text-burgundy" /> 남은 시간
                  </span>
                  <p className="font-mono text-lg font-bold text-ink">12일 남음</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="h-2 bg-receipt border border-soft-border overflow-hidden rounded-none">
                  <div 
                    className="h-full bg-burgundy transition-all duration-700" 
                    style={{ width: `${Math.min(fundedPct, 100)}%` }} 
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-[#8C8A91]">
                  <span>목표 금액: ₩5,000,000</span>
                  <span>75% 달성 시 의제 소장 발주 정합 확정</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-soft-border gap-4">
              <div>
                <span className="text-[10px] text-silver font-serif block font-bold">1회 동반 펀딩 참여 가격</span>
                <span className="font-mono text-lg font-bold text-ink">₩39,000 / 필람 정본 패키지</span>
              </div>
              
              <button
                onClick={handlePledgeFunding}
                className={`w-full sm:w-auto px-8 py-3.5 text-xs font-serif font-bold tracking-tight shadow-md transition-all rounded-none uppercase cursor-pointer ${
                  hasFunded 
                    ? 'bg-[#FAF7F0] text-emerald-800 border border-emerald-300' 
                    : 'bg-burgundy hover:bg-ink text-paper text-white hover:text-paper-cream'
                }`}
                id="subscribe-btn"
              >
                <span>{hasFunded ? '기명 독자 소장 정렬됨 ✓' : '서포터 밀어주기 (Funding Pledging)'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS */}
      <div className="flex justify-center overflow-x-auto py-2 border-b border-soft-border max-w-4xl mx-auto">
        <div className="flex space-x-2 px-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-serif rounded-none transition-all tracking-tight whitespace-nowrap border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-ink text-paper border-ink font-bold'
                  : 'bg-receipt text-silver border-soft-border hover:border-ink'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PRODUCTS DISPLAY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto" id="shop-product-grid">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-receipt border border-soft-border rounded-none overflow-hidden shadow-sm flex flex-col justify-between hover:border-burgundy hover:shadow-md transition-all group relative text-left font-serif"
          >
            {/* Visual Header image */}
            <div className="aspect-[3/4] bg-paper-dark border-b border-soft-border relative overflow-hidden">
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform filter brightness-95"
                referrerPolicy="no-referrer"
              />
              
              {/* Inspiration tag */}
              <div className="absolute bottom-3 left-3 bg-receipt/95 backdrop-blur-sm px-2.5 py-1 text-[10px] text-ink rounded-none shadow-sm border border-soft-border flex items-center space-x-1.5 animate-fade-in">
                {/* Mood Color Circle */}
                <span
                  className="w-2 h-2 border border-soft-border shrink-0 inline-block animate-pulse rounded-none"
                  style={{ backgroundColor: p.moodColor || '#8B2C2C' }}
                />
                <span>매칭작: {p.literarySource}</span>
              </div>

              {/* Care Label Code Stamp */}
              <div className="absolute top-3 right-3 bg-paper/90 backdrop-blur-sm px-1.5 py-0.5 text-[8px] font-mono text-silver rounded-none border border-soft-border">
                AS-{(p.id || 'PRD').toUpperCase().substring(0, 8)}
              </div>
            </div>

            {/* Product description content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#8A857C] block font-semibold">
                  {p.category.toUpperCase() === 'ACCESSORY' ? '수공 장신구' : p.category.toUpperCase() === 'VINTAGE' ? '빈티지 아카이브' : '계간 구독'}
                </span>
                <h5 className="font-serif text-base font-bold text-ink leading-tight group-hover:text-burgundy transition-colors">
                  {p.title}
                </h5>
                <p className="text-xs text-ink-muted/95 leading-relaxed line-clamp-3">
                  {p.shortDescription}
                </p>
              </div>

              <div className="pt-3.5 border-t border-soft-border flex justify-between items-center">
                <span className="font-mono text-sm sm:text-base font-extrabold text-ink">
                  ₩{p.price.toLocaleString()}
                </span>

                <button
                  onClick={() => onPurchaseMock(p)}
                  className="bg-receipt border border-soft-border hover:border-burgundy hover:text-burgundy hover:bg-paper-dark/10 transition-all px-4 py-2 text-xs font-serif flex items-center space-x-1.5 rounded-none cursor-pointer font-bold"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-burgundy" />
                  <span>주문 신청</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
