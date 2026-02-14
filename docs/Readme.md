# 🧠 AI Credit Score Program

<div align="center">

![Neural Cash Logo](public/logo-mono.png)

**AI-Powered Financial Profile Scoring System**

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.3-38B2AC.svg)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.x-green.svg)](https://python.org/)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-Latest-orange.svg)](https://scikit-learn.org/)

</div>

---

## 🎯 Overview

The AI Credit Score Program is a comprehensive financial technology solution that leverages machine learning to analyze transaction patterns and generate personalized Financial Profile Scores (FPS). Built with modern web technologies and advanced AI algorithms, it provides users with actionable insights to improve their financial health.

## ✨ Key Features

### 🎨 **Modern Web Interface**

- **Responsive Design**: Beautiful, mobile-first UI built with React and Tailwind CSS
- **Interactive Dashboards**: Real-time credit score visualization with Recharts
- **Smooth Animations**: Engaging user experience with scroll-triggered animations
- **Professional UI Components**: Custom-built components using Radix UI primitives

### 🤖 **AI-Powered Credit Scoring**

- **Machine Learning Model**: Random Forest classifier trained on transaction data
- **Feature Engineering**: Advanced feature extraction from transaction patterns
- **Risk Assessment**: Predictive modeling for creditworthiness evaluation
- **Model Persistence**: Trained models saved for production inference

### 📊 **Financial Analytics**

- **Transaction Analysis**: Deep insights into spending and saving patterns
- **Score Tracking**: Historical credit score progression over time
- **Smart Recommendations**: Personalized financial improvement strategies
- **Risk Visualization**: Feature importance analysis and model interpretability

### 🔐 **User Management**

- **Profile Generation**: Comprehensive user onboarding and data collection
- **Secure Authentication**: Protected user sessions and data privacy
- **Credit Calculator**: Interactive tools for credit assessment
- **Progress Monitoring**: Track financial health improvements over time

## 🏗️ Technology Stack

### **Frontend**

- **React 19** - Modern UI framework with hooks and functional components
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework for rapid styling
- **Recharts** - Beautiful, composable charting library
- **Radix UI** - Accessible, unstyled UI primitives
- **React Router** - Client-side routing for SPA navigation

### **Backend & AI**

- **Python 3.x** - Core AI/ML development language
- **Scikit-learn** - Machine learning algorithms and preprocessing
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing and array operations
- **Matplotlib** - Data visualization and plotting
- **Joblib** - Model serialization and persistence

### **Development Tools**

- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Python 3.8+**
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Bempong-Sylvester-Obese/AI-credit-score-program.git
   cd ai-credit-score-program
   ```
2. **Install frontend dependencies**

   ```bash
   npm install
   ```
3. **Install Python dependencies**

   ```bash
   pip install pandas numpy scikit-learn matplotlib joblib
   ```
4. **Start the development server**

   ```bash
   npm run dev
   ```
5. **Train the AI model** (optional)

   ```bash
   python src/train.py --data Data/raw/dataset1.csv
   ```

## 📁 Project Structure

```
AI-credit-score-program/
├── 📁 src/
│   ├── 📁 components/ui/          # Reusable UI components
│   ├── 📁 views/                  # Page components
│   │   ├── 📁 home/              # Landing page
│   │   ├── 📁 generate-credit/   # Credit score generation
│   │   ├── 📁 creditScoreAnalyses/ # Score analysis dashboard
│   │   ├── 📁 takeCredit/        # Credit calculator
│   │   └── 📁 login/             # Authentication
│   ├── 📁 features/              # Feature engineering pipeline
│   ├── train.py                  # ML model training
│   └── predict.py                # Model inference
├── 📁 models/                    # Trained ML models
├── 📁 Data/raw/                  # Raw transaction datasets
├── 📁 public/                    # Static assets
└── 📁 docs/                      # Documentation
```

## 🎮 Usage

### **For Users**

1. **Navigate to the homepage** - Explore services and features
2. **Generate Credit Score** - Fill out the profile form with your information
3. **View Analysis** - Get detailed insights into your financial profile
4. **Track Progress** - Monitor your score improvements over time
5. **Get Recommendations** - Receive personalized financial advice

### **For Developers**

1. **Model Training**: Use `train.py` to retrain the ML model with new data
2. **Feature Engineering**: Modify `features/` to add new predictive features
3. **UI Customization**: Update components in `src/components/ui/`
4. **Data Integration**: Connect new data sources in the feature pipeline

## 📈 Model Performance

The AI model achieves:

- **High Accuracy**: Robust credit risk prediction
- **Feature Importance**: Transaction count, net amount, and timing patterns
- **Scalability**: Handles large transaction datasets efficiently
- **Interpretability**: Clear feature importance visualization

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

*Empowering financial literacy through AI*

</div>
