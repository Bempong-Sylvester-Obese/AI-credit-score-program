AI-credit-score-program/
├── data/
│   ├── raw/                # Original CSVs/Excel files
│   └── processed/          # Cleaned data (FEATURES & TARGETS)
├── models/
│   ├── trained_models/     # Serialized .pkl/.joblib files
│   └── experiments/        # Track hyperparameters/results
├── src/
│   ├── train.py            # Main training script
│   ├── predict.py          # Inference script
│   └── features/           # Feature engineering
│       ├── build_features.py
│       └── feature_pipeline.py
└── configs/
    └── params.yaml         # Model hyperparameters