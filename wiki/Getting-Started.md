# 🚀 Getting Started

Follow these step-by-step instructions to set up the local environment for the Master Calisthenics Elite application.

## ⚙️ Local Environment Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/iammsp-star/calisthenics-india-website.git
   cd calisthenics-india-website
   ```

2. **Node.js Requirements**
   Ensure you have **Node.js** (v18+) installed.

3. **Install Dependencies**
   Run the following to install the required packages (like `@supabase/supabase-js`):
   ```bash
   npm install
   ```

4. **Environment Variables**
   Now that API keys are secured, you must set them through environment variables instead of hardcoding them. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   RAZORPAY_KEY_ID=your_razorpay_key
   ```
   *(Note: Never commit `.env` to GitHub.)*

5. **Run Locally**
   Start the local development server:
   ```bash
   npm run dev
   # or npx serve / live-server
   ```

---

## 🛠️ Troubleshooting

### Common SSL/DNS Issues (GitHub Pages to Vercel Migration)
During our migration from GitHub Pages to Vercel, we resolved several SSL/DNS issues:
- **DNS Propagation**: If you change the nameservers or A/CNAME records to Vercel (`76.76.21.21`), it may take up to 24-48 hours globally. Use Google Admin Toolbox (Dig) to verify `www.mastercalisthenicsindia.com` points to Vercel correctly.
- **SSL Certificate Provisioning**: Vercel automatically creates Let's Encrypt certificates. If it gets stuck pending, make sure your CAA records are either empty or specifically allow `letsencrypt.org`.
- **Force HTTPS**: Ensure the Vercel project's domain settings enforce HTTPS so that HTTP requests are automatically redirected.

### Error Prevention: Docker vs. npx
For developers managing our MCP server:
If you encounter environment orchestration issues, remember the **Docker vs. npx fix** we recently implemented. Instead of battling persistent Docker networking and volume mount problems locally, simply run it using `npx`. This ensures the server runs correctly in your local environment without virtualized network isolations.
