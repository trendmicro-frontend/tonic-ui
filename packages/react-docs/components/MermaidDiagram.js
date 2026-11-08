import { Box, useColorMode, useTheme } from '@tonic-ui/react';
import { useEffect, useState } from 'react';
import { renderAsync } from 'pele/lazy';

// `pele/lazy` loads a diagram type the first time a page uses it, so any Mermaid
// type works without shipping every type in the initial bundle.

// Pele centres node labels. Left-align them inside their box and inset them from
// the border, which reads better for the two-line labels these pages use.
const alignNodeLabels = (svg) => svg.replace(
  /(<g class="pele-node[^"]*pele-shape-rect"[^>]*>)(<rect[^>]*>)(<text[^>]*>)([\s\S]*?)(<\/text>)/g,
  (match, group, rect, textOpen, body, textClose) => {
    const rectX = Number((rect.match(/ x="(-?[\d.]+)"/) ?? [])[1]);
    if (!Number.isFinite(rectX)) {
      return match;
    }
    const insetX = +(rectX + 12).toFixed(2);
    return `${group}${rect}${textOpen.replace('text-anchor="middle"', 'text-anchor="start"')}${body.replace(/x="0"/g, `x="${insetX}"`)}${textClose}`;
  },
);

const MermaidDiagram = ({ source }) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const [svg, setSvg] = useState('');

  useEffect(() => {
    // Pele measures label text with the browser's canvas, so the diagram is drawn
    // on the client only; the server has no font metrics to match it with.
    let active = true;
    renderAsync(source, {
      fontSize: 16,
      padding: 8,
      fontFamily: theme.get('fonts.base'),
    })
      .then(({ svg }) => {
        if (active) {
          setSvg(alignNodeLabels(svg));
        }
      })
      .catch(() => {
        if (active) {
          setSvg('');
        }
      });
    return () => {
      active = false;
    };
  }, [source, theme]);

  return (
    <Box
      className="mermaid-diagram"
      sx={{
        my: '6x',
        overflowX: 'auto',
        // Pele themes the SVG through CSS variables; map them to Tonic tokens so
        // the diagram follows the page's colour mode.
        '--pele-bg': theme.get('colors.background.highest'),
        '--pele-fg': theme.get('colors.text.primary'),
        '--pele-muted': theme.get('colors.text.secondary'),
        '--pele-line': theme.get('colors.text.secondary'),
        '--pele-surface': theme.get('colors.background.high'),
        '--pele-surface-alt': theme.get('colors.background.highest'),
        '--pele-border': theme.get('colors.border.subtle'),
        '--pele-accent': theme.get('colors.blue:60'),
        '& svg': {
          display: 'block',
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
        },
      }}
      data-color-mode={colorMode}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
