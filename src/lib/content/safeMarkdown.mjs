const HTML_ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]);
}

function safeHttpUrl(value) {
  if (/\p{Cc}/u.test(value)) return null;

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

function renderInline(value) {
  const tokenPattern = /\*\*([^*\n]+)\*\*|\[([^\]\n]+)\]\(([^)\s]+)\)/g;
  const output = [];
  let cursor = 0;

  for (const match of value.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    output.push(escapeHtml(value.slice(cursor, index)));

    if (match[1] !== undefined) {
      output.push(`<strong>${escapeHtml(match[1])}</strong>`);
    } else {
      const label = escapeHtml(match[2]);
      const url = safeHttpUrl(match[3]);
      output.push(url
        ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`
        : label);
    }

    cursor = index + match[0].length;
  }

  output.push(escapeHtml(value.slice(cursor)));
  return output.join('');
}

/**
 * Render the deliberately small markdown subset used by blog entries.
 * Every content character is escaped before code-owned tags are inserted.
 */
export function renderSafeMarkdown(value) {
  const lines = String(value).split(/\r?\n/);
  const output = [];
  let listType = null;
  let paragraph = [];

  function flushParagraph() {
    if (paragraph.length > 0) {
      output.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  }

  function closeList() {
    if (listType) output.push(`</${listType}>`);
    listType = null;
  }

  function openList(type) {
    if (listType === type) return;
    closeList();
    output.push(`<${type}>`);
    listType = type;
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '#') continue;
    if (!trimmed) {
      flushParagraph();
      closeList();
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph();
      closeList();
      output.push(`<h3>${renderInline(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph();
      closeList();
      output.push(`<h2>${renderInline(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph();
      openList('ul');
      output.push(`<li>${renderInline(trimmed.slice(2))}</li>`);
      continue;
    }

    const orderedItem = trimmed.match(/^\d+\.\s+(.*)$/);
    if (orderedItem) {
      flushParagraph();
      openList('ol');
      output.push(`<li>${renderInline(orderedItem[1])}</li>`);
      continue;
    }

    closeList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();
  return output.join('\n');
}
