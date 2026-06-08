/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sliders, Plus, Trash2, Check, Tag, ShieldAlert, BarChart, FileCode, RefreshCcw } from 'lucide-react';
import { GrammarRule, Product } from '../types';

interface AdminSectionProps {
  grammarRules: GrammarRule[];
  products: Product[];
  onAddGrammar: (newRule: Omit<GrammarRule, 'id'>) => Promise<void>;
  onDeleteGrammar: (id: string) => Promise<void>;
  onAddProduct: (newProduct: Omit<Product, 'id'>) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
}

export default function AdminSection({
  grammarRules,
  products,
  onAddGrammar,
  onDeleteGrammar,
  onAddProduct,
  onDeleteProduct
}: AdminSectionProps) {
  
  const [activePanel, setActivePanel] = useState<'grammar' | 'catalog' | 'stats'>('grammar');

  // Grammar Rules Form State
  const [fashionFeature, setFashionFeature] = useState<string>('');
  const [literaryMood, setLiteraryMood] = useState<string>('');
  const [literaryWork, setLiteraryWork] = useState<string>('');
  const [grammarDesc, setGrammarDesc] = useState<string>('');

  // Catalog Products Form State
  const [productTitle, setProductTitle] = useState<string>('');
  const [productSource, setProductSource] = useState<string>('');
  const [productColor, setProductColor] = useState<string>('#7C2431');
  const [productPrice, setProductPrice] = useState<number>(18000);
  const [productImage, setProductImage] = useState<string>('');
  const [productDesc, setProductDesc] = useState<string>('');
  const [productCategory, setProductCategory] = useState<'accessory' | 'subscription' | 'goods'>('accessory');

  // Submit states
  const [processing, setProcessing] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAddGrammarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fashionFeature || !literaryMood || !literaryWork) return;

    setProcessing(true);
    setSuccessMsg(null);
    try {
      await onAddGrammar({
        fashionFeature,
        literaryMood,
        literaryWork,
        description: grammarDesc || '지정 도서 연결 문법 정본'
      });
      setFashionFeature('');
      setLiteraryMood('');
      setLiteraryWork('');
      setGrammarDesc('');
      setSuccessMsg('새 인화사전 규칙이 통사적으로 등록되었습니다.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productTitle || !productPrice) return;

    setProcessing(true);
    setSuccessMsg(null);
    try {
      await onAddProduct({
        title: productTitle,
        literarySource: productSource || '서촌 에클레틱 연구소',
        moodColor: productColor,
        price: productPrice,
        imageUrl: productImage || 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80',
        shortDescription: productDesc || '아카이브 빈티지 크래프트 소품.',
        category: productCategory
      });
      setProductTitle('');
      setProductSource('');
      setProductPrice(15000);
      setProductImage('');
      setProductDesc('');
      setSuccessMsg('의복 연계 큐레이팅 소장품이 카탈로그에 입고되었습니다.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-8" id="admin-container">
      {/* Editorial Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-soft-border pb-4 gap-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-ink flex items-center space-x-2">
            <Sliders className="w-6 h-6 text-burgundy shrink-0" />
            <span>아카이브 서촌 번역 학회 정무관</span>
          </h3>
          <p className="text-ink-muted text-xs font-mono uppercase tracking-widest mt-0.5">
            Curation Master & Grammar Administration panel
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-paper-dark border border-soft-border rounded-none p-0.5" id="admin-panel-tabs">
          <button
            onClick={() => setActiveTabPanel('grammar')}
            className={`px-3 py-1.5 text-xs font-serif rounded-none transition-all ${
              activePanel === 'grammar' ? 'bg-receipt text-ink shadow-sm border border-soft-border/40' : 'text-ink-muted hover:text-ink'
            }`}
          >
            번역 문법 사전 관리
          </button>
          <button
            onClick={() => setActiveTabPanel('catalog')}
            className={`px-3 py-1.5 text-xs font-serif rounded-none transition-all ${
              activePanel === 'catalog' ? 'bg-receipt text-ink shadow-sm border border-soft-border/40' : 'text-ink-muted hover:text-ink'
            }`}
          >
            소장품 관리
          </button>
          <button
            onClick={() => setActiveTabPanel('stats')}
            className={`px-3 py-1.5 text-xs font-serif rounded-none transition-all ${
              activePanel === 'stats' ? 'bg-receipt text-ink shadow-sm border border-soft-border/40' : 'text-ink-muted hover:text-ink'
            }`}
          >
            문학 무드 통계 및 명세서
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="bg-[#FCFAF6] border border-soft-border text-burgundy p-4 rounded-none flex items-center space-x-2 text-sm font-serif">
          <Check className="w-5 h-5 text-burgundy shrink-0 animate-bounce" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* PANEL 1: GRAMMAR RULES LIST & CREATOR */}
      {activePanel === 'grammar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
           {/* Creator form */}
          <div className="lg:col-span-5 bg-receipt border border-soft-border p-6 rounded-none space-y-4 font-serif text-xs">
            <h4 className="text-sm font-bold text-ink border-b border-soft-border pb-2">
              신규 의복-문학 대조 문법 등록
            </h4>

            <form onSubmit={handleAddGrammarSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-ink font-bold">의상 특징 명칭 (Fashion Feature)</label>
                <input
                  type="text"
                  value={fashionFeature}
                  onChange={(e) => setFashionFeature(e.target.value)}
                  className="w-full bg-receipt border border-soft-border p-2.5 rounded-none text-xs text-ink focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                  placeholder="예: 다크 카키 코듀로이 오버핏 셔츠"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-ink font-bold">대칭 치환 문학가/구절 (Matched Mood)</label>
                <input
                  type="text"
                  value={literaryMood}
                  onChange={(e) => setLiteraryMood(e.target.value)}
                  className="w-full bg-receipt border border-soft-border p-2.5 rounded-none text-xs text-burgundy focus:border-burgundy focus:ring-1 focus:ring-burgundy font-bold"
                  placeholder="예: 소로우가 월든 오두막에서 보낸 소요의 사색 "
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-ink font-bold">대상 문학 단행본 (Book Title / Work)</label>
                <input
                  type="text"
                  value={literaryWork}
                  onChange={(e) => setLiteraryWork(e.target.value)}
                  className="w-full bg-receipt border border-soft-border p-2.5 rounded-none text-xs text-ink focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                  placeholder="예: 헨리 데이비드 소로우 <월든>"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-ink font-bold">연구실 세부 서술평 (Editorial Commentary)</label>
                <textarea
                  value={grammarDesc}
                  onChange={(e) => setGrammarDesc(e.target.value)}
                  className="w-full bg-receipt border border-soft-border p-2.5 rounded-none text-xs text-ink-muted focus:border-burgundy focus:ring-1 focus:ring-burgundy font-serif"
                  placeholder="예: 소박하고 단단한 원목 오두막에서 기른 자연주의 향취..."
                  rows={3}
                />
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-burgundy hover:bg-ink text-paper py-3 transition-colors rounded-none font-bold flex items-center justify-center space-x-2 shadow-sm font-mono tracking-widest uppercase text-[10px]"
              >
                <Plus className="w-4 h-4" />
                <span>문학 문법 사전에 서증 등록</span>
              </button>
            </form>
          </div>

          {/* Rules lists table representation */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="font-serif text-sm font-bold text-ink">
              현재 활성화된 대조 사전 명세서 ({grammarRules.length}개 규칙 마운트됨)
            </h4>

            <div className="border border-soft-border rounded-none bg-receipt overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-serif">
                  <thead>
                    <tr className="bg-paper-dark/50 border-b border-soft-border text-[10px] uppercase font-mono text-ink-muted">
                      <th className="p-3">의복 패션 특징</th>
                      <th className="p-3">문학가 / 치환 무드</th>
                      <th className="p-3">원전 전적</th>
                      <th className="p-3 text-right">삭제</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-soft-border" id="grammar-table-body">
                    {grammarRules.map((r) => (
                      <tr key={r.id} className="hover:bg-paper-dark/10 transition-colors">
                        <td className="p-3 font-medium text-ink max-w-[150px] truncate">{r.fashionFeature}</td>
                        <td className="p-3 text-burgundy max-w-[150px] truncate">{r.literaryMood}</td>
                        <td className="p-3 text-ink-muted italic max-w-[120px] truncate">{r.literaryWork}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => onDeleteGrammar(r.id)}
                            className="text-silver hover:text-burgundy transition-colors p-1 rounded-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* PANEL 2: SHOP PRODUCTS CATALOG MANAGER */}
      {activePanel === 'catalog' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
           {/* Product form creator */}
          <div className="lg:col-span-5 bg-receipt border border-soft-border p-6 rounded-none space-y-4 font-serif text-xs">
            <h4 className="text-sm font-bold text-ink border-b border-soft-border pb-2">
              신규 소장 가치 큐레이팅 상품 입고
            </h4>

            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-ink font-bold">소장 컬렉션 명칭 (Product Title)</label>
                <input
                  type="text"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="w-full bg-receipt border border-soft-border p-2.5 rounded-none text-xs text-ink focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                  placeholder="예: 백야 빈티지 매트 가공 황동 주물 펜슬"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-ink font-bold">문학 원작 구저</label>
                  <input
                    type="text"
                    value={productSource}
                    onChange={(e) => setProductSource(e.target.value)}
                    className="w-full bg-receipt border border-soft-border p-2.5 rounded-none text-xs text-ink focus:border-burgundy"
                    placeholder="예: 백야 (도스토예프스키)"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-ink font-bold">무드 계열 헥사 색상</label>
                  <input
                    type="color"
                    value={productColor}
                    onChange={(e) => setProductColor(e.target.value)}
                    className="w-full h-9 bg-receipt border border-soft-border rounded-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-ink font-bold">상품 판매 가격 (₩)</label>
                  <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                    className="w-full bg-receipt border border-soft-border p-2.5 rounded-none text-xs text-ink font-mono focus:border-burgundy"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-ink font-bold">상품 카테고리 기입</label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value as any)}
                    className="w-full bg-receipt border border-soft-border p-2.5 rounded-none text-xs text-ink cursor-pointer focus:border-burgundy"
                  >
                    <option value="accessory">핸드크래프트 악세사리</option>
                    <option value="subscription">의복 정기 구독 상자</option>
                    <option value="goods">문학 사조 굿즈</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-ink font-bold">상품 권장 이미지 사진 경로 (Unsplash URL)</label>
                <input
                  type="text"
                  value={productImage}
                  onChange={(e) => setProductImage(e.target.value)}
                  className="w-full bg-receipt border border-soft-border p-2.5 rounded-none text-xs text-ink focus:border-burgundy"
                  placeholder="예: https://images.unsplash.com/photo-..."
                />
              </div>

              <div className="space-y-1">
                <label className="block text-ink font-bold">소장 큐레이션 해설 설명 (Curation Message)</label>
                <textarea
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  className="w-full bg-receipt border border-soft-border p-2.5 rounded-none text-xs text-ink-muted focus:border-burgundy"
                  placeholder="예: 고독을 수놓았던 그의 은은한 감성을 무겁지 않은 주물 가공에 매칭했습니다"
                  rows={2}
                />
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-burgundy hover:bg-ink text-paper py-3 transition-colors rounded-none font-bold flex items-center justify-center space-x-2 font-mono tracking-widest uppercase text-[10px]"
              >
                <Plus className="w-4 h-4" />
                <span>큐레이팅 소장품 카탈로그 기탁</span>
              </button>
            </form>
          </div>

          {/* Active Product list with deleter */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="font-serif text-sm font-bold text-ink">
              현재 입고되어 있는 공방 카탈로그 ({products.length}품목 마운트)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="admin-product-grid">
              {products.map((p) => (
                <div key={p.id} className="bg-receipt p-3 border border-soft-border rounded-none flex space-x-3 items-center justify-between font-serif text-xs shadow-sm">
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    <div className="w-10 h-10 bg-ink-muted rounded-none overflow-hidden shrink-0 border border-soft-border">
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="overflow-hidden">
                      <h5 className="font-bold text-ink truncate max-w-[150px]">{p.title}</h5>
                      <span className="text-[10px] text-ink-muted block font-mono">
                        ₩{p.price.toLocaleString()} | {p.category}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteProduct(p.id)}
                    className="text-silver hover:text-burgundy transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* PANEL 3: METADATA & TELEMETRY LOGS SCREEN */}
      {activePanel === 'stats' && (
        <div className="bg-receipt p-6 rounded-none border border-soft-border space-y-8 font-serif shadow-sm">
          
          {/* Core metadata statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-paper-dark/30 p-5 rounded-none border border-soft-border space-y-1 shadow-inner">
              <BarChart className="w-5 h-5 text-burgundy mx-auto" />
              <span className="text-[10px] text-ink-muted tracking-wider uppercase block">마운트된 번역 문법 규칙</span>
              <span className="text-2xl font-bold font-mono text-ink">{grammarRules.length} 개</span>
            </div>
            
            <div className="bg-paper-dark/30 p-5 rounded-none border border-soft-border space-y-1 shadow-inner">
              <Tag className="w-5 h-5 text-denim mx-auto" />
              <span className="text-[10px] text-ink-muted tracking-wider uppercase block">활성화된 커머스 매칭 상품</span>
              <span className="text-2xl font-bold font-mono text-ink">{products.length} 품목</span>
            </div>

            <div className="bg-paper-dark/30 p-5 rounded-none border border-soft-border space-y-1 shadow-inner">
              <FileCode className="w-5 h-5 text-burgundy mx-auto" />
              <span className="text-[10px] text-ink-muted tracking-wider uppercase block">Gemini 1.5 API Engine</span>
              <span className="text-xs font-mono font-bold text-burgundy bg-[#FCFAF6] inline-block px-2.5 py-1 rounded-none mt-1 border border-soft-border">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Simple Clean Audits log stream instead of larping CLI */}
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-soft-border">
              <h5 className="font-bold text-ink">아카이브 서촌 번역 활동 기록 (Recent System Events)</h5>
              <div className="flex items-center space-x-1.5 text-[10px] text-ink-muted font-mono">
                <RefreshCcw className="w-3.5 h-3.5 text-burgundy animate-spin" style={{ animationDuration: '4s' }} />
                <span>SECURE_AUDIT_LOGS</span>
              </div>
            </div>

            <div className="bg-receipt text-ink p-4 rounded-none font-mono text-[11px] leading-relaxed max-h-[220px] overflow-y-auto space-y-2 border border-soft-border font-serif">
              <p className="text-ink-muted">[11:00:15] ATELIER EVENT: 서촌 필운대로 정각 아틀리에 터치패널 활성화.</p>
              <p className="text-burgundy">[11:14:15] SELECTION EVENT: 색채적 기조에 따라 홍청(Chroma-Red) 및 실크 견직 대조 분석 완료.</p>
              <p className="text-ink-muted">[11:14:16] LITERATURE MATCH: 헤르만 헤세 《데미안》의 고전 문법과 유기적 감응 성공 :: 서평 구절 포갬.</p>
              <p className="text-ink-muted">[11:14:17] PRINTER SYSTEM: 가상 열감 영수증 인쇄기 인자 데이터 배장 송신.</p>
              <p className="text-burgundy">[12:22:41] ARCHIVE BACKUP: 방문 기탁자 착장 감정 기록 서정 서고(書庫)에 안전하게 소장 처리.</p>
              <p className="text-ink-muted">[12:33:12] DATABASE CHANGE: 최고 사서(司書)에 의해 구절 문맥 사전 대장 #g-5 규칙 개정됨.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Quick helper to bypass inner tab matching inside subcomponent
  function setActiveTabPanel(panel: 'grammar' | 'catalog' | 'stats') {
    setActivePanel(panel);
  }
}
