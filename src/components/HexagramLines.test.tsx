import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HexagramLines, YinYao, YangYao } from './HexagramLines';
import type { LineResult } from '../utils/iching';

describe('HexagramLines 组件测试', () => {
  
  describe('YinYao 组件', () => {
    it('应该渲染阴爻符号', () => {
      render(<YinYao />);
      const yinLine = screen.getByRole('generic');
      expect(yinLine).toBeInTheDocument();
    });

    it('应该应用正确的样式类', () => {
      render(<YinYao isChanging={true} className="custom-class" />);
      const container = screen.getByRole('generic');
      expect(container).toHaveClass('custom-class');
    });

    it('变爻应该使用琥珀色', () => {
      render(<YinYao isChanging={true} />);
      const container = screen.getByRole('generic');
      const segments = container.querySelectorAll('div');
      segments.forEach(segment => {
        expect(segment).toHaveClass('bg-amber-600');
      });
    });

    it('静爻应该使用石色', () => {
      render(<YinYao isChanging={false} />);
      const container = screen.getByRole('generic');
      const segments = container.querySelectorAll('div');
      segments.forEach(segment => {
        expect(segment).toHaveClass('bg-stone-700');
      });
    });
  });

  describe('YangYao 组件', () => {
    it('应该渲染阳爻符号', () => {
      render(<YangYao />);
      const yangLine = screen.getByRole('generic');
      expect(yangLine).toBeInTheDocument();
    });

    it('变爻应该使用琥珀色', () => {
      render(<YangYao isChanging={true} />);
      const yangLine = screen.getByRole('generic');
      expect(yangLine).toHaveClass('bg-amber-600');
    });

    it('静爻应该使用石色', () => {
      render(<YangYao isChanging={false} />);
      const yangLine = screen.getByRole('generic');
      expect(yangLine).toHaveClass('bg-stone-700');
    });
  });

  describe('HexagramLines 组件', () => {
    it('应该渲染6个爻', () => {
      const lines: LineResult[] = [
        { value: 1, isChanging: false, lineType: 'youngYang' },
        { value: 0, isChanging: false, lineType: 'youngYin' },
        { value: 1, isChanging: false, lineType: 'youngYang' },
        { value: 0, isChanging: false, lineType: 'youngYin' },
        { value: 1, isChanging: false, lineType: 'youngYang' },
        { value: 0, isChanging: false, lineType: 'youngYin' },
      ];
      
      render(<HexagramLines lines={lines} />);
      const container = screen.getByRole('generic');
      const yaoElements = container.children[0].children;
      expect(yaoElements).toHaveLength(6);
    });

    it('应该正确渲染乾卦（全阳）', () => {
      const lines: LineResult[] = Array(6).fill(null).map(() => ({
        value: 1,
        isChanging: false,
        lineType: 'youngYang' as const
      }));
      
      render(<HexagramLines lines={lines} />);
      const container = screen.getByRole('generic');
      const yaoElements = container.children[0].children;
      
      Array.from(yaoElements).forEach((yao) => {
        expect(yao).toHaveClass('bg-stone-700');
      });
    });

    it('应该正确渲染坤卦（全阴）', () => {
      const lines: LineResult[] = Array(6).fill(null).map(() => ({
        value: 0,
        isChanging: false,
        lineType: 'youngYin' as const
      }));
      
      render(<HexagramLines lines={lines} />);
      const container = screen.getByRole('generic');
      const yaoElements = container.children[0].children;
      
      Array.from(yaoElements).forEach((yao) => {
        const segments = yao.querySelectorAll('div');
        expect(segments).toHaveLength(2); // 阴爻应该有两段
      });
    });

    it('应该正确渲染变爻', () => {
      const lines: LineResult[] = [
        { value: 1, isChanging: true, lineType: 'oldYang' },
        { value: 0, isChanging: false, lineType: 'youngYin' },
        { value: 1, isChanging: false, lineType: 'youngYang' },
        { value: 0, isChanging: false, lineType: 'youngYin' },
        { value: 1, isChanging: false, lineType: 'youngYang' },
        { value: 0, isChanging: false, lineType: 'youngYin' },
      ];
      
      render(<HexagramLines lines={lines} />);
      const container = screen.getByRole('generic');
      const yaoElements = container.children[0].children;
      
      // 第一个爻（初爻）应该是变爻
      const firstYao = yaoElements[5]; // 从下到上，所以初爻是最后一个
      expect(firstYao).toHaveClass('bg-amber-600');
    });

    it('应该使用flex-col-reverse布局', () => {
      const lines: LineResult[] = [
        { value: 1, isChanging: false, lineType: 'youngYang' },
        { value: 0, isChanging: false, lineType: 'youngYin' },
      ];
      
      render(<HexagramLines lines={lines} />);
      const container = screen.getByRole('generic');
      const flexContainer = container.children[0];
      expect(flexContainer).toHaveClass('flex-col-reverse');
    });
  });

  describe('爻的视觉一致性', () => {
    it('阴爻和阳爻应该有相同的高度', () => {
      render(<><YinYao /><YangYao /></>);
      
      const yinLine = screen.getAllByRole('generic')[0];
      const yangLine = screen.getAllByRole('generic')[1];
      
      // 两者都应该有 h-2 类（相同高度）
      expect(yinLine.querySelector('div')).toHaveClass('h-2');
      expect(yangLine).toHaveClass('h-2');
    });

    it('阴爻的两段应该有正确的宽度', () => {
      render(<YinYao />);
      const container = screen.getByRole('generic');
      const segments = container.querySelectorAll('div');
      
      segments.forEach(segment => {
        expect(segment).toHaveClass('w-[38px]');
      });
    });

    it('阳爻应该有正确的宽度', () => {
      render(<YangYao />);
      const yangLine = screen.getByRole('generic');
      expect(yangLine).toHaveClass('w-20');
    });
  });
});
