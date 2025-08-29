# 🔒 Security Notice

## ⚠️ Environment Variables Exposed

**IMPORTANT**: The following sensitive information was accidentally committed to the repository:

- `GEMINI_API_KEY`: [REDACTED - Key was exposed and needs regeneration]
- `JWT_SECRET`: medihub-secret-key-2024

## 🚨 Immediate Actions Required

### 1. **Regenerate API Keys**
- **Google Gemini API**: Generate new API key at [Google AI Studio](https://makersuite.google.com/app/apikey)
- **JWT Secret**: Generate new secure secret key

### 2. **Update Environment Variables**
```bash
# Create new .env file
cp .env.example .env

# Add your new secure values:
GEMINI_API_KEY=your-new-gemini-api-key
JWT_SECRET=your-new-secure-jwt-secret
```

### 3. **Secure Deployment**
```bash
# For production deployment
export GEMINI_API_KEY="your-new-key"
export JWT_SECRET="your-new-secret"
./deploy.sh
```

## 🛡️ Security Best Practices

- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly
- Use strong, unique JWT secrets
- Enable 2FA on all service accounts

## 📞 Contact

If you have security concerns, please create a private issue or contact the repository maintainers directly.