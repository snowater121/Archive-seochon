/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import AnalyzeSection from './components/AnalyzeSection';
import ResultSection from './components/ResultSection';
import ArchiveSection from './components/ArchiveSection';
import ShopSection from './components/ShopSection';
import PlaceSection from './components/PlaceSection';
import AdminSection from './components/AdminSection';
import { Product, GrammarRule, ArchiveItem, OOTDAnalysisResult } from './types';
import { ShoppingBag, ArrowRight, X, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2700);
    return () => clearTimeout(timer);
  }, []);
  
  // Database States
  const [products, setProducts] = useState<Product[]>([]);
  const [grammarRules, setGrammarRules] = useState<GrammarRule[]>([]);
  const [archives, setArchives] = useState<ArchiveItem[]>([]);
  
  // Translation Active States
  const [currentAnalysis, setCurrentAnalysis] = useState<OOTDAnalysisResult | null>(null);
  const [isCurrentSaved, setIsCurrentSaved] = useState<boolean>(false);

  // Purchasing Overlay Card Mock Selection
  const [orderedProduct, setOrderedProduct] = useState<Product | null>(null);

  // 1. Initial State Hydration via API
  useEffect(() => {
    async function fetchData() {
      try {
        const prodRes = await fetch('/api/products');
        const prodData = await prodRes.json();
        if (prodData.success) setProducts(prodData.products);

        const gramRes = await fetch('/api/grammar');
        const gramData = await gramRes.json();
        if (gramData.success) setGrammarRules(gramData.grammarRules);

        const archRes = await fetch('/api/archive');
        const archData = await archRes.json();
        if (archData.success) setArchives(archData.archives);
      } catch (err) {
        console.error('Failed to populate Archive Seochon database fields:', err);
      }
    }
    fetchData();
  }, []);

  // 2. Action triggers
  const handleOOTDAnalyzed = (result: OOTDAnalysisResult) => {
    setCurrentAnalysis(result);
    setIsCurrentSaved(false);
    setActiveTab('result'); // Jump to result page immediately
  };

  const handleSaveToArchive = async (analysis: OOTDAnalysisResult) => {
    try {
      const response = await fetch('/api/archive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photoUrl: analysis.photoUrl,
          moodName: analysis.literaryMoodRatio[0]?.mood?.split(' (')[0] || '데미안 정본',
          keyword: analysis.recommendedSentence.source || '문학 클래식',
          analysis: analysis,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Refresh archives state
        setArchives((prev) => [data.archive, ...prev]);
        setIsCurrentSaved(true);
      } else {
        alert(data.message || '아카이브 보관 등록에 오류가 발생했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('서버 저장 실패: 통신 상태를 확인해주세요.');
    }
  };

  const handlePurchaseSelect = (product: Product) => {
    setOrderedProduct(product);
  };

  const handleSelectArchiveItem = (item: ArchiveItem) => {
    setCurrentAnalysis(item.analysis);
    setIsCurrentSaved(true); // Since it came from archive, it must have been saved previously
    setActiveTab('result');
  };

  // 3. Admin rules modification triggers
  const handleAddGrammar = async (newRule: Omit<GrammarRule, 'id'>) => {
    try {
      const response = await fetch('/api/grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRule),
      });
      const data = await response.json();
      if (data.success) {
        setGrammarRules((prev) => [...prev, data.rule]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGrammar = async (id: string) => {
    try {
      const response = await fetch(`/api/grammar/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        setGrammarRules((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      if (data.success) {
        setProducts((prev) => [...prev, data.product]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col justify-between selection:bg-burgundy selection:text-paper font-sans">
      
      {/* Editorial Top navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Render */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomeSection onStartAnalyze={() => setActiveTab('analyze')} />
        )}

        {activeTab === 'analyze' && (
          <AnalyzeSection onAnalysisComplete={handleOOTDAnalyzed} />
        )}

        {activeTab === 'result' && currentAnalysis && (
          <ResultSection
            analysis={currentAnalysis}
            onBackToUpload={() => setActiveTab('analyze')}
            onSaveToArchive={handleSaveToArchive}
            isSaved={isCurrentSaved}
          />
        )}

        {activeTab === 'archive' && (
          <ArchiveSection
            archives={archives}
            onSelectArchive={handleSelectArchiveItem}
          />
        )}

        {activeTab === 'shop' && (
          <ShopSection
            products={products}
            onPurchaseMock={handlePurchaseSelect}
          />
        )}

        {activeTab === 'place' && <PlaceSection />}

        {activeTab === 'admin' && (
          <AdminSection
            grammarRules={grammarRules}
            products={products}
            onAddGrammar={handleAddGrammar}
            onDeleteGrammar={handleDeleteGrammar}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </main>

      {/* Footer block */}
      <footer className="border-t border-soft-border bg-receipt py-8 px-4 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[11px] font-mono text-[#A0A5AD] gap-4">
          <div className="text-center md:text-left space-y-1">
            <p className="font-serif text-xs text-ink-muted">© 2026 Archive Seochon (아카이브 서촌).</p>
            <p>고전문학의 전경과 은유를 직조 원단에 담는 패션 해설 위원회.</p>
          </div>
          
          <div className="flex space-x-6">
            <span className="hover:text-burgundy transition-colors select-none cursor-help">이용약관</span>
            <span className="hover:text-burgundy transition-colors select-none cursor-help">개인정보처리방침</span>
            <span className="text-burgundy font-serif font-bold">당신의 무드는 책방에 닿습니다</span>
          </div>
        </div>
      </footer>

      {/* 4. Elegant Styled Curation Purchase Overlay */}
      {orderedProduct && (
        <div className="fixed inset-0 bg-ink/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in-fast">
          <div className="bg-paper border-2 border-burgundy max-w-md w-full p-6 sm:p-8 rounded-none shadow-xl relative space-y-6">
            <button
              onClick={() => setOrderedProduct(null)}
              className="absolute top-4 right-4 text-ink-muted hover:text-ink font-serif text-xs cursor-pointer focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 text-center border-b border-soft-border pb-4">
              <ShoppingBag className="w-8 h-8 text-burgundy mx-auto shrink-0 animate-bounce" />
              <h4 className="font-serif text-lg font-bold text-ink">공방 소장품 대여기 정본</h4>
              <p className="text-[10px] text-ink-muted font-mono uppercase tracking-widest">
                Curated Reservation Ticket
              </p>
            </div>

            <div className="space-y-4 font-serif">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-20 bg-ink-muted rounded-none overflow-hidden border border-soft-border shrink-0">
                  <img
                    src={orderedProduct.imageUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80'}
                    alt={orderedProduct.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-ink text-sm leading-tight">{orderedProduct.title}</h5>
                  <span className="text-xs text-burgundy block font-semibold mt-0.5">
                    동반 출처: {orderedProduct.literarySource || '고전 문학인 명의'}
                  </span>
                  <span className="text-xs text-ink-muted font-mono block mt-1">
                    신청가: ₩{orderedProduct.price?.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-paper-dark/50 p-4 rounded-none text-xs text-ink-muted leading-relaxed space-y-2 border border-soft-border">
                <p>
                  <strong>본 안내는 예약 청구 티켓입니다.</strong> 아카이브 서촌 공방 제품은 천연 소재를 사용해 수제로 소량 제작됩니다.
                </p>
                <p>
                  서촌 정각 아틀리에에 직접 방문하시거나 정기 수송을 신청하신 독자 명부 순으로 우선 소장권을 양도해 드립니다.
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setOrderedProduct(null)}
                className="flex-1 bg-receipt border border-soft-border hover:bg-paper-dark text-ink py-3 text-xs font-serif font-bold transition-all text-center rounded-none"
              >
                예약 내역 보류
              </button>
              
              <button
                onClick={() => {
                  alert(`[${orderedProduct.title}] 공방 수공예 예약 대여 신청서가 아카이브 서촌 장부에 누락 없이 기재되었습니다. 기입하신 이메일 접수처로 서명용 공방 확인서가 발송됩니다.`);
                  setOrderedProduct(null);
                }}
                className="flex-1 bg-burgundy hover:bg-ink text-paper py-3 text-xs font-serif font-bold transition-all text-center flex items-center justify-center space-x-2 rounded-none shadow-md"
                id="confirm-reservation-btn"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>독자 명부 기명 신청</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showSplash && (
        <div className="fixed inset-0 bg-paper z-50 flex flex-col items-center justify-center film-grain animate-fade-out-slow" style={{ animationDelay: '2200ms', animationFillMode: 'forwards' }}>
          <div className="text-center space-y-6 max-w-sm px-4">
            {/* Monogram Seal Stamp */}
            <div className="w-14 h-14 border border-soft-border flex flex-col items-center justify-center rounded-none bg-receipt shadow-sm mx-auto p-3 relative animate-pulse">
              <span className="font-serif text-base font-bold tracking-tight text-ink">AS</span>
              <span className="font-mono text-[7px] text-silver uppercase tracking-[0.1em] scale-90">SEOCHON</span>
              <div className="absolute top-1 left-1 w-1 h-1 rounded-none bg-burgundy/40" />
              <div className="absolute bottom-1 right-1 w-1 h-1 rounded-none bg-burgundy/40" />
            </div>

            <div className="space-y-1">
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
                Archive Seochon
              </h1>
              <span className="font-mono text-[9px] text-burgundy tracking-[0.25em] font-bold uppercase block">
                — VOLUME I —
              </span>
            </div>

            <div className="border-t border-soft-border/60 pt-4">
              <p className="font-serif text-xs leading-loose text-[#635F57] italic">
                “당신의 옷장과 책장을 같은 언어로 연결합니다.”
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <span className="w-1.5 h-1.5 bg-burgundy rounded-none animate-ping" />
                <span className="font-mono text-[9px] text-silver uppercase tracking-widest block block">
                  Preparing Literary Indigo Engine...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
