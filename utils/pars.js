export function parseReceiptText(rawText) {
  const lines = rawText.split("\n").map(l => l.trim()).filter(Boolean);

  let vendor = lines[0] || null;
  let date = null;
  let amount = null;
  let paymentMethod = null;

  // Date regex
  const dateRegex = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}|\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})/;
  for (let line of lines) {
    const match = line.match(dateRegex);
    if (match) {
      date = match[0];
      break;
    }
  }

  // Amount regex: price format
  const amountRegex = /(?:\$|Rs\.?)?\s?\d+(?:\.\d{2})/;

  // Keywords for total amount
  const totalKeywords = ["total", "amount", "balance", "gross", "net", "grand total"];

  // Check each line for keywords + amount
  for (let i = 0; i < lines.length; i++) {
    const upper = lines[i].toUpperCase();

    if (totalKeywords.some(k => upper.includes(k.toUpperCase()))) {
      // 1st try: same line
      let match = lines[i].match(amountRegex);
      if (match) {
        amount = match[0].trim();
        break;
      }

      // 2nd try: next line (sometimes amount is below keyword)
      if (i + 1 < lines.length) {
        match = lines[i + 1].match(amountRegex);
        if (match) {
          amount = match[0].trim();
          break;
        }
      }
    }
  }

  // Fallback: last price-like number in receipt
  if (!amount) {
    for (let i = lines.length - 1; i >= 0; i--) {
      const match = lines[i].match(amountRegex);
      if (match) {
        amount = match[0].trim();
        break;
      }
    }
  }

  // Payment method detection
  const paymentKeywords = ["cash", "credit", "debit", "upi", "card"];
  for (let line of lines) {
    const lower = line.toLowerCase();
    if (paymentKeywords.some(k => lower.includes(k))) {
      paymentMethod = line;
      break;
    }
  }

  return { vendor, date, amount, paymentMethod };
}
