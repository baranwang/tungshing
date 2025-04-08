import { useEffect, useRef } from 'react';

import { EXPLANATION_MAP } from './constants';

import './explain.css';

/**
 * 高阶组件，为组件添加文本解释功能
 * 会为匹配EXPLANATION_MAP中关键词的文本添加下划线效果
 */
export const withExplain = <P extends object>(Component: React.ComponentType<P>) => {
  const ComponentWithExplain = (props: P) => {
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!wrapRef.current) return;

      // 创建文本节点列表
      const nodes = [...wrapRef.current.childNodes] as HTMLElement[];
      const textList: {
        node: Text;
        text: string | null;
        startIndex: number;
        endIndex: number;
      }[] = [];

      let currentIndex = 0;

      // 遍历DOM树获取所有文本节点
      while (nodes.length) {
        const node = nodes.shift();
        if (!node) continue;

        if (node.nodeType === Node.TEXT_NODE) {
          const textNode = node as unknown as Text;
          if (textNode.wholeText) {
            const startIndex = currentIndex;
            const endIndex = currentIndex + textNode.wholeText.length;
            currentIndex = endIndex;
            textList.push({
              node: textNode,
              text: textNode.textContent,
              startIndex,
              endIndex,
            });
          }
        } else {
          const childNodes = Array.from(node.childNodes) as HTMLElement[];
          nodes.unshift(...childNodes);
        }
      }

      // 获取所有文本内容
      const allContentText = textList.map((item) => item.text).join('');
      const matchList: RegExpExecArray[] = [];

      // 查找所有匹配项
      Object.keys(EXPLANATION_MAP).forEach((item) => {
        try {
          const reg = new RegExp(item, 'gmi');
          let match = reg.exec(allContentText);
          while (match) {
            matchList.push(match);
            match = reg.exec(allContentText);
          }
        } catch (error) {
          console.error(`正则表达式错误: ${item}`, error);
        }
      });

      // 若浏览器支持CSS Highlight API则创建高亮
      if (typeof window.Highlight === 'function' && CSS.highlights) {
        try {
          // 创建高亮实例
          const colorHighlight = new window.Highlight();
          CSS.highlights.set('explain-underline', colorHighlight);

          // 为每个匹配添加高亮
          for (const match of matchList) {
            const matchStartIndex = match.index;
            const matchEndIndex = matchStartIndex + match[0].length;
            let startNode: Node | null = null;
            let startIndex = 0;
            let endNode: Node | null = null;
            let endIndex = 0;

            // 找到匹配文本的起始和结束节点
            for (const textItem of textList) {
              if (matchStartIndex > textItem.endIndex) {
                continue;
              }
              if (matchEndIndex <= textItem.startIndex) {
                break;
              }

              if (textItem.startIndex <= matchStartIndex && matchStartIndex <= textItem.endIndex) {
                startNode = textItem.node;
                startIndex = matchStartIndex - textItem.startIndex;
              }
              if (textItem.startIndex <= matchEndIndex && matchEndIndex <= textItem.endIndex) {
                endNode = textItem.node;
                endIndex = matchEndIndex - textItem.startIndex;
              }
            }

            // 创建范围并添加到高亮
            if (startNode && endNode) {
              try {
                const range = new Range();
                range.setStart(startNode, startIndex);
                range.setEnd(endNode, endIndex);
                colorHighlight.add(range);
                range.commonAncestorContainer.parentElement?.setAttribute(
                  'title',
                  EXPLANATION_MAP[range.commonAncestorContainer.textContent],
                );
                // (range.commonAncestorContainer as HTMLElement).setAttribute(
                //   'title',
                //   EXPLANATION_MAP[range.commonAncestorContainer.textContent],
                // );
              } catch (error) {
                console.error('创建高亮范围失败:', error);
              }
            }
          }
        } catch (error) {
          console.error('高亮设置失败:', error);
        }
      }

      // 清理函数
      return () => {
        if (CSS.highlights) {
          CSS.highlights.delete('explain-underline');
        }
      };
    }, []);

    return (
      <div ref={wrapRef} className="explain-wrapper">
        <Component {...props} />
      </div>
    );
  };

  ComponentWithExplain.displayName = `withExplain(${Component.displayName || Component.name || 'Component'})`;

  return ComponentWithExplain;
};
