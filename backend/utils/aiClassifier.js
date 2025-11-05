import OpenAI from 'openai';

// Lazy OpenAI client: only initialize if key is present
let openai = null;
if (process.env.OPENAI_API_KEY) {
    try {
        openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    } catch (err) {
        // leave openai as null and fallback to keyword mapping
        openai = null;
    }
}

// Simple keyword-based fallback classifier
const keywordClassifier = (text) => {
    if (!text) return 'Other';
    const t = text.toLowerCase();
    if (t.includes('garbage') || t.includes('trash') || t.includes('waste')) return 'Garbage Issue';
    if (t.includes('pothole') || t.includes('road') || t.includes('asphalt') || t.includes('road damage')) return 'Road Damage';
    if (t.includes('water') || t.includes('leak') || t.includes('sewage')) return 'Water Leakage';
    if (t.includes('light') || t.includes('streetlight') || t.includes('electric') || t.includes('power')) return 'Streetlight Fault';
    if (t.includes('noise') || t.includes('loud')) return 'Noise Pollution';
    if (t.includes('woman') || t.includes('safety') || t.includes('harass')) return 'Other';
    return 'Other';
};

export const classifyComplaint = async (message) => {
    // If OpenAI not configured, use simple keyword fallback
    if (!openai) {
        return keywordClassifier(message);
    }

    try {
        const categories = [
            'Garbage Issue',
            'Road Damage',
            'Water Leakage',
            'Streetlight Fault',
            'Noise Pollution',
            'Other'
        ];

        const prompt = `You are an AI complaint categorizer.\nCategorize the following complaint message into ONE of these categories: ${categories.join(', ')}.\n\nMessage: "${message}"\n\nOnly return the category name.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }]
        });

        const text = response?.choices?.[0]?.message?.content?.trim();
        if (!text) return keywordClassifier(message);
        // Normalize to one of allowed categories
        const normalized = categories.find(c => c.toLowerCase() === text.toLowerCase());
        return normalized || keywordClassifier(message);
    } catch (err) {
        // On any error with OpenAI, fallback to keyword classifier
        return keywordClassifier(message);
    }
};