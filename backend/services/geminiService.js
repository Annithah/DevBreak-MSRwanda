const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey && apiKey !== 'your-gemini-api-key-here') {
            this.genAI = new GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
        } else {
            console.warn('Gemini API key not configured. Using mock responses.');
            this.model = null;
        }
    }

    async getMedicalAdvice(symptoms, patientHistory = '') {
        try {
            if (!this.model) {
                return this.getMockMedicalAdvice(symptoms);
            }

            const prompt = `
                As a medical assistant for MediHub Rwanda, provide preliminary advice for these symptoms: ${symptoms}
                Patient history: ${patientHistory}
                
                Please provide:
                1. Possible conditions (with disclaimer)
                2. General care recommendations
                3. When to seek immediate medical attention
                4. Lifestyle suggestions
                
                IMPORTANT: Always include disclaimer that this is not a substitute for professional medical advice.
                Keep response concise and helpful for Rwanda context.
            `;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Gemini API error:', error);
            return this.getMockMedicalAdvice(symptoms);
        }
    }

    async chatWithPatient(message, context = '') {
        try {
            if (!this.model) {
                return this.getMockChatResponse(message);
            }

            const prompt = `
                You are a helpful medical assistant chatbot for MediHub Rwanda.
                Patient message: ${message}
                Context: ${context}
                
                Provide helpful, empathetic responses in a friendly tone.
                Always recommend professional medical consultation for serious concerns.
                Keep responses concise and relevant to Rwanda's healthcare context.
            `;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Gemini chat error:', error);
            return this.getMockChatResponse(message);
        }
    }

    getMockMedicalAdvice(symptoms) {
        return `
**Medical Advisory for: ${symptoms}**

**Possible Conditions:**
Based on your symptoms, this could be related to common conditions, but proper diagnosis requires medical examination.

**General Recommendations:**
- Rest and stay hydrated
- Monitor symptoms closely
- Take note of any changes

**Seek Immediate Medical Attention If:**
- Symptoms worsen rapidly
- You experience severe pain
- You have difficulty breathing

**Lifestyle Suggestions:**
- Maintain good hygiene
- Eat nutritious foods
- Get adequate sleep

**DISCLAIMER:** This is not a medical diagnosis. Please consult with a qualified healthcare provider for proper evaluation and treatment.
        `;
    }

    getMockChatResponse(message) {
        const responses = [
            "I understand your concern. For the best care, I recommend booking an appointment with one of our qualified doctors.",
            "Thank you for reaching out. While I can provide general information, a medical professional can give you personalized advice.",
            "I'm here to help! For specific medical concerns, our doctors are available for consultations through the platform.",
            "That's a great question. For accurate medical advice tailored to your situation, please consider scheduling an appointment."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

module.exports = new GeminiService();