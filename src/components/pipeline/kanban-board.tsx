'use client';

import React from 'react';
import { DealPipelineItem, DealStage } from '@/types/api';
import KanbanColumn from './kanban-column';

interface KanbanBoardProps {
  deals: DealPipelineItem[];
  onMoveStage: (dealId: string, currentStage: DealStage, direction: 'prev' | 'next') => void;
}

const columnsConfig: { stage: DealStage; label: string; description: string }[] = [
  {
    stage: 'DISCOVERED',
    label: '1. Discovered',
    description: 'Teridentifikasi',
  },
  {
    stage: 'RESEARCH',
    label: '2. Research',
    description: 'Pendalaman Profil',
  },
  {
    stage: 'PITCHED',
    label: '3. Pitched',
    description: 'Proposal Dikirim',
  },
  {
    stage: 'NEGOTIATION',
    label: '4. Negotiation',
    description: 'Audiensi & RAB',
  },
  {
    stage: 'CLOSED_WON',
    label: '5. Closed-Won',
    description: 'MoU / SPK Goal',
  },
  {
    stage: 'CLOSED_LOST',
    label: '6. Closed-Lost',
    description: 'Batal / Terkendala',
  },
];

export default function KanbanBoard({ deals, onMoveStage }: KanbanBoardProps) {
  const stageOrder: DealStage[] = [
    'DISCOVERED',
    'RESEARCH',
    'PITCHED',
    'NEGOTIATION',
    'CLOSED_WON',
    'CLOSED_LOST',
  ];

  const handleStageTransition = (
    dealId: string,
    currentStage: DealStage,
    direction: 'prev' | 'next'
  ) => {
    const currentIndex = stageOrder.indexOf(currentStage);
    let targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (targetIndex >= 0 && targetIndex < stageOrder.length) {
      onMoveStage(dealId, currentStage, direction);
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 pt-2 scrollbar-thin scrollbar-thumb-slate-300">
      {columnsConfig.map((col) => {
        const colDeals = deals.filter((d) => d.deal_stage === col.stage);
        return (
          <KanbanColumn
            key={col.stage}
            stage={col.stage}
            label={col.label}
            description={col.description}
            deals={colDeals}
            onMoveStage={handleStageTransition}
          />
        );
      })}
    </div>
  );
}
