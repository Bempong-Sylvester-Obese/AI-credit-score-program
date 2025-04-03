import pandas as pd
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from sklearn.cluster import KMeans

def preprocess_data(df, features):
    """
    Preprocess the dataset by selecting features, handling missing values, and scaling.
    """
    if not all(feature in df.columns for feature in features):
        raise ValueError("One or more required features are missing from the dataset.")
    
    # Select features
    df_features = df[features]
    
    # Handle missing values
    df_features = df_features.fillna(df_features.mean())
    
    # Normalize the data
    scaler = StandardScaler()
    df_scaled = scaler.fit_transform(df_features)
    
    return df_scaled

def plot_elbow_curve(df_scaled, max_clusters=10):
    """
    Plot the elbow curve to determine the optimal number of clusters.
    """
    wcss = []
    for i in range(1, max_clusters + 1):
        kmeans = KMeans(n_clusters=i, random_state=42, n_init=10)
        kmeans.fit(df_scaled)
        wcss.append(kmeans.inertia_)
    
    # Plot the Elbow Curve
    plt.figure(figsize=(8, 5))
    plt.plot(range(1, max_clusters + 1), wcss, marker='o', linestyle='--')
    plt.xlabel('Number of Clusters (k)')
    plt.ylabel('WCSS (Within-Cluster Sum of Squares)')
    plt.title('Elbow Method for Optimal k')
    plt.show()